const dotenv = require("dotenv")
dotenv.config()
const app = require("./app.js")

const PORT = process.env.PORT || 3000
console.log(process.env.PORT)
console.log(process.env.DB_STRING)

const start = async () => {
  // check .env variables are defined here
  // if (!process.env.DB_STRING) throw new Error('❌ process.env.DB_STRING must be defined')

  // try {
  // connect to DB Here
  // await pg.connect(process.env.DB_STRING) or something like that
  // console.log("🍃 Connected to the Database...")
  // } catch (error) {
  // console.log(error)
  // }

  app.listen(PORT, () => {
    console.log(`✅ Server listening on port ${PORT}...\n🍻 Happy brewing 🍻`)
  })
}

start()
