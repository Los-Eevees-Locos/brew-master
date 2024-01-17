const requireAuth = (req, res, next) => {
  // check if req.currentUser exists
  // if it does, move onto to the next middleware
  if (req.currentUser) return next()
  // if not throw a not authorized error
  return next({
    log: "❌ requireAuth middleware - No valid cookie",
    status: 401,
    message: "Invalid credentials",
  })
}
module.exports = requireAuth
