const db = require('../models/tapdancerModels');
const {hashPassword, comparePassword} = require('../utils/password')

let userID, newUserName;

//adds new row with a specified userID and name, and adds empty array to favoriteIDs column
const addUserQuery = `INSERT INTO user_info (userID, name, hashedpass)
                      VALUES ('${userID}', '${newUserName}', ${hashedpass};`;

const getAllUsersQuery = `SELECT name 
                          FROM user_info;`

const getUserFromUsername = `SELECT * from user_info WHERE name=$1`


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
  const {rows} = await db.query(getUserFromUsername, [username])
  const existingUser = rows[0]
  if (existingUser) {
    return next({
      log: '🤢 userController.signup - User with username exists',
      status: 400,
      message: "User already exists, signin instead"
    })
  }
  
  // HASH PASSWORD
  const hashedPass = await hashPassword(password);



  try {
    res.locals.getAllUsers = await db.query(getAllUsersQuery)
    console.log('res.locals: ', res.locals)
  } catch (err) {
    return next(err)
  }

  // CREATE NEW USER
  // pass in provided password into password function and save hashed PW and name to database

  try {
    res.locals.addUser = await db.query(addUserQuery)
    console.log('res.locals: ', res.locals)
    return next()
  } catch (err) {
    return next(err)
  }

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
