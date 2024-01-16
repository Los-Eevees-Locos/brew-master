const db = require('../models/tapdancerModels');

const getAllFavoritesQuery = `SELECT favoriteIDs 
                              FROM user_info 
                              WHERE userID = ${userID};`;

//adds new row with a specified userID and name, and adds empty array to favoriteIDs column
const addUserQuery = `INSERT INTO user_info (userID, name, favoriteIDs)
                      VALUES (${newUserID}, ${newUserName}, ARRAY[]::varchar(36)[]);`;

const addFavoriteQuery = `UPDATE user_info
                          SET favoriteIDs = array_append(favoriteIDs, ${newFavoriteID})
                          WHERE userID = ${userID};`;

const deleteFavoriteQuery = `UPDATE user_info
                             SET favoriteIDs = array_remove(favoriteIDs, ${favoriteID})
                             WHERE userID = ${userID};`;

const getAllFavorites = async (req, res, next) => {
  console.log("💥 getAllFavorites")
  console.log(req.body)

  // FIND ALL FAVAORITES ASSOCIATED WITH USER ID

  // SEND FAVORITES BACK

  res.send({ message: '💥 Hello from favoritesRouter - getAllFavorites' });
};

const addFavorite = async (req, res, next) => {
  console.log('💥 addFavorite');
  console.log(req.body);

  // VALIDATE INPUTS

  // WRITE NEW FAVORITE TO DB

  // SEND BACK SUCCESS MESSAGE || ALL FAVORITES || NEW FAVORITE

  res.send({ message: '💥 Hello from favoritesRouter - addFavorite' });
};

const deleteFavorite = async (req, res, next) => {
  console.log('💥 deleteFavorite');
  console.log(req.body);

  // FIND FAVORITE BY USER ID AND BREWERY ID?

  // DELETE FROM DATABASE

  // SEND BACK SUCCESS MESSAGE
  res.send({ message: '💥 Hello from favoritesRouter - deleteFavorite' });
};

module.exports = { getAllFavorites, addFavorite, deleteFavorite };
