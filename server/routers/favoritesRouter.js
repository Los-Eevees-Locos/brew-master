const express = require("express")
const {
  getAllFavorites,
  addFavorite,
  deleteFavorite,
} = require("../controllers/favoritesController.js")
const currentUser = require("../middlewares/currentUser.js")
const requireAuth = require("../middlewares/requireAuth.js")

const router = express.Router()

// checks cookie before getting to controller
// decode jwt from cookie and attach userid to req.currentUser
router.use(currentUser, requireAuth)

router.get("/", getAllFavorites)
router.post("/", addFavorite)
router.delete("/", deleteFavorite)

module.exports = router
