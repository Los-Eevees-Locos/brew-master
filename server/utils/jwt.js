const jwt = require("jsonwebtoken")

const createJwt = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}

const attachCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // process.env.NODE_ENV === 'production'
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  })
}

module.exports = { createJwt, attachCookie }
