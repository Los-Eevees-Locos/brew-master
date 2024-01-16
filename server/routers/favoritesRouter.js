const express = require("express")
const {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoritesController.js")

const router = express.Router()

router.get("/", getAllFavorites)
router.post("/", addFavorite)
router.delete("/", deleteFavorite)

module.exports = router
