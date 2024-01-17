const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const favoriteRouter = require("./routers/favoritesRouter")
const userRouter = require("./routers/userRouter")

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/user", userRouter)
app.use("/favorites", favoriteRouter)

app.use("*", (req, res) => {
  res.status(404).send({ message: "Not found" })
})

app.use((err, req, res, next) => {
  const defaultError = {
    log: "Internal error",
    status: 500,
    message: "Something went wrong",
  }

  const error = Object.assign(defaultError, err)

  console.log("🤢 Error caught: ", error.log)

  res.status(error.status).send({ message: error.message })
})

module.exports = app
