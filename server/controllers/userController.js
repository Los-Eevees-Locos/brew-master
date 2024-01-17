const db = require('../models/tapdancerModels');

//adds new row with a specified userID and name, and adds empty array to favoriteIDs column
const addUserQuery = `INSERT INTO user_info (userID, name, favoriteIDs)
                      VALUES (${UserID}, ${newUserName}, ARRAY[]::varchar(36)[]);`;

const getUserQuery = ``


const signup = async (req, res, next) => {
  console.log("💥 userController - Signup")
  const { username, password } = req.body

  // VALIDATE INPUTS
  if (!username || !password) {
    return next({
      log: "userController.signup: Invalid inputs",
      status: 400,
      message: "Please provide valid username and password",
    })
  }
  if (password.length < 4) {
    return next({
      log: "userController.signup: Invalid inputs",
      status: 400,
      message: "Password must be at least 4 characters long",
    })
  }

  // CHECK FOR EXISTING USER

  // CREATE NEW USER

  // ATTACH COOKIE

  res.send({ message: "💥 Hello from signup" })
}

const signin = async (req, res, next) => {
  console.log("💥 userController - Signin")
  const { username, password } = req.body

  // VALIDATE INPUTS
  if (!username || !password || password.length < 4) {
    return next({
      log: "userController.signup: Invalid inputs",
      status: 400,
      message: "Please provide valid username and password",
    })
  }

  // FIND USER

  // CHECK PASSWORD

  // ATTACH COOKIE

  res.send({ message: "💥 Hello from signin" })
}
const signout = async (req, res, next) => {
  console.log("💥 userController - Signout")
  console.log(req.body)

  // RESET COOKIE TO NULL
  res.cookie("token", null, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 500),
  })

  res.send({ message: "💥 Hello from signout" })
}

module.exports = { signup, signin, signout }
