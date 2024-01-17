const bcrypt = require('bcryptjs')

const hashPassword = async (providedPassword) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(providedPassword, salt)

  return hashedPassword
}

const comparePassword = async (providedPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(providedPassword, hashedPassword)

  return isMatch
}

module.exports = { hashPassword, comparePassword }