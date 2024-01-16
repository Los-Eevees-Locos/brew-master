const db = require('../models/tapdancerModels');

//adds new row with a specified userID and name, but does not add anything to favoriteIDs column
const addUser = `INSERT INTO user_info (userID, name)
                 VALUES (${newUserID}, ${newUserName});` 


const addFavQuery = ''


const getAllFavorites = async (req, res, next) => {
  console.log("💥 getAllFavorites")
  console.log(req.body)

  res.send({ message: "💥 Hello from favoritesRouter - getAllFavorites" })
}

const addFavorite = async (req, res, next) => {
  console.log("💥 addFavorite")
  console.log(req.body)

  res.send({ message: "💥 Hello from favoritesRouter - addFavorite" })
}

const deleteFavorite = async (req, res, next) => {
  console.log("💥 deleteFavorite")
  console.log(req.body)

  res.send({ message: "💥 Hello from favoritesRouter - deleteFavorite" })
}

module.exports = { getAllFavorites, addFavorite, deleteFavorite }
