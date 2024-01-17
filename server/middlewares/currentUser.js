const jwt = require("jsonwebtoken")

const currentUser = (req, _res, next) => {
  const { token } = req.cookies

  if (!token) return next()

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY)
    req.currentUser = payload.userId
    return next()
  } catch (err) {
    return next({
      log: "❌ currentUser middleware - JWT error",
      status: 500,
      message: "Internal error",
    })
  }
}

module.exports = currentUser
