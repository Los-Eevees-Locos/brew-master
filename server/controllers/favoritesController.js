const db = require('../models/tapdancerModels');

let userID, breweryID;

const getAllFavoritesQuery = `SELECT favoriteIDs 
                              FROM user_info 
                              WHERE userID = VALUES($1);`;

const addFavoriteQuery = `UPDATE user_info
                          SET favoriteIDs = array_append(favoriteIDs, ${breweryID})
                          WHERE userID = ${userID};`;

const deleteFavoriteQuery = `UPDATE user_info
                             SET favoriteIDs = array_remove(favoriteIDs, ${breweryID})
                             WHERE userID = ${userID};`;

const getAllFavorites = async (req, res, next) => {
  console.log('💥 getAllFavorites');
  console.log('req.body: ', req.body);

  // get userID from cookie - if no cookie, throw error
  const values = [userID];

  // FIND ALL FAVAORITES ASSOCIATED WITH USER ID
  // SEND FAVORITES BACK

  try {
    res.locals.getfavorites = await db.query(getAllFavoritesQuery, values);
    console.log('res.locals: ', res.locals);
    return next();
  } catch (err) {
    return next(err);
  }

  res.send({ message: '💥 Hello from favoritesRouter - getAllFavorites' });
};

const addFavorite = async (req, res, next) => {
  console.log('💥 addFavorite');
  console.log('req.body: ', req.body);

  // get userID from cookie - if no cookie throw er

  // get brewery data from req.body
  breweryID = req.body.breweryID;

  // find user in DB and get current array of favBreweries
  // update user with added brewery ID

  // search for brewery in brewery table
  // if does not exist write it to the DB

  try {
    res.locals.addfavorites = await db.query(addFavoriteQuery, values);
    console.log('res.locals: ', res.locals);
    return next();
  } catch (err) {
    return next(err);
  }

  res.send({ message: '💥 Hello from favoritesRouter - addFavorite' });
};

const deleteFavorite = async (req, res, next) => {
  console.log('💥 deleteFavorite');
  console.log('req.body: ', req.body);

  userID = req.body.userID;
  breweryID = req.body.breweryID;

  // FIND FAVORITE BY USER ID AND BREWERY ID?

  // DELETE FROM DATABASE

  // SEND BACK SUCCESS MESSAGE

  try {
    res.locals.deletefavorite = await db.query(deleteFavoriteQuery, values);
    console.log('res.locals: ', res.locals);
    return next();
  } catch (err) {
    return next(err);
  }

  res.send({ message: '💥 Hello from favoritesRouter - deleteFavorite' });
};

module.exports = { getAllFavorites, addFavorite, deleteFavorite };
