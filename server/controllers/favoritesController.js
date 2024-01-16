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
