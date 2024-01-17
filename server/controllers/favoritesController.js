const db = require("../models/tapdancerModels")

const getAllFavoritesQuery = `SELECT favoritebreweries 
                              FROM users 
                              WHERE userID = $1;`

const addFavoriteQuery = `UPDATE users
                          SET favoritebreweries = array_append(favoritebreweries, $1 )
                          WHERE userid = $2;`

const deleteFavoriteQuery = `UPDATE users
                             SET favoritebreweries = array_remove(favoritebreweries, $1 )
                             WHERE userID = $2;`

const getAllFavorites = async (req, res, next) => {
  // console.log("💥 getAllFavorites")
  try {
    const { rows } = await db.query(getAllFavoritesQuery, [req.currentUser])
    res.status(200).send({ favoriteBreweries: rows[0].favoritebreweries })
  } catch (err) {
    return next({
      log: "🤢 favoritesController.getAllFavorites - Error querying database",
      status: 500,
      message: "Something went wrong, grab a beer and try again",
    })
  }
}

const addFavorite = async (req, res, next) => {
  // console.log("💥 addFavorite")
  // get brewery data from req.body
  const { breweryId } = req.body
  // req.currentUser is set in middlewares/currentUser.js
  const userId = req.currentUser

  // search for brewery in brewery table
  const { rows } = await db.query(getAllFavoritesQuery, [userId])
  const favoritedList = rows[0].favoritebreweries
  // if brewery is already favorited
  if (favoritedList.includes(breweryId)) {
    return next({
      log: "🤢 favoritesController.addFavorite - brewery is already favorited",
      status: 500,
      message: "Brewery is already favorited. Not sure how that happened.",
    })
  }

  try {
    // add breweryId to the user's favoritebreweries column
    await db.query(addFavoriteQuery, [breweryId, userId])
    return res.send({ message: "success" })
  } catch (err) {
    return next({
      log: "🤢 favoritesController.addFavorite - Error querying database",
      status: 500,
      message: "Something went wrong, grab a beer and try again",
    })
  }
}

const deleteFavorite = async (req, res, next) => {
  // console.log("💥 deleteFavorite")
  const { breweryId } = req.body

  if (!breweryId) {
    return next({
      log: "🙄 favoritesController.deleteFavorite - They tried to delete nothing",
      status: 400,
      message: "We can't delete nothing",
    })
  }

  try {
    const result = await db.query(deleteFavoriteQuery, [
      breweryId,
      req.currentUser,
    ])
    return res.status(200).send({ message: "success" })
  } catch (err) {
    return next({
      log: "🤢 favoritesController.deleteFavorite - DB query error",
      status: 500,
      message: "Something went wrong. Grab a 🍺 and try again later",
    })
  }
}

module.exports = { getAllFavorites, addFavorite, deleteFavorite }
