const dotenv = require("dotenv")
dotenv.config()
const app = require("./app.js")

const PORT = process.env.PORT || 3000

const start = async () => {
  // check .env variables are defined here
  if (!process.env.DB_STRING)
    throw new Error("❌ process.env.DB_STRING must be defined")
  if (!process.env.JWT_KEY)
    throw new Error("❌ process.env.JWT_KEY must be defined")
  if (!process.env.JWT_LIFETIME)
    throw new Error("❌ process.env.JWT_LIFETIME must be defined")

  // Start up application
  app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}...\n🍻 Happy brewing 🍻`)
  })
}

start()
