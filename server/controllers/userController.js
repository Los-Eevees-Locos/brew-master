const db = require('../models/tapdancerModels');
const { createJwt, attachCookie } = require('../utils/jwt');
const { hashPassword, comparePassword } = require('../utils/password');

//adds new row with a specified userID and name, and adds empty array to favoriteIDs column
// const addUserQuery = `INSERT INTO user_info (userID, name, hashedpass)
//                       VALUES ('${userID}', '${newUserName}', ${hashedpass};`;

const addUserQuery = `INSERT INTO users (name, password)
                      VALUES ($1, $2)
                      RETURNING userid, name;`;

// const getAllUsersQuery = `SELECT name
//                           FROM user_info;`

const getUserFromUsername = `SELECT * from users WHERE name=$1`;

const signup = async (req, res, next) => {
  // console.log("💥 userController - Signup")
  const { username, password } = req.body;

  // VALIDATE INPUTS
  if (!username || !password) {
    return next({
      log: 'userController.signup: Invalid inputs',
      status: 400,
      message: 'Please provide valid username and password',
    });
  }
  if (password.length < 4) {
    return next({
      log: 'userController.signup: Invalid inputs',
      status: 400,
      message: 'Password must be at least 4 characters long',
    });
  }

  // CHECK FOR EXISTING USER
  const { rows } = await db.query(getUserFromUsername, [username]);
  const existingUser = rows ? rows[0] : null;
  if (existingUser) {
    return next({
      log: '🤢 userController.signup - User with username exists',
      status: 400,
      message: 'User already exists, signin instead',
    });
  }

  try {
    // HASH PASSWORD
    const hashedPass = await hashPassword(password);
    // INSERT NEW USER
    const { rows } = await db.query(addUserQuery, [username, hashedPass]);

    // CREATE JWT AND ATTACH TO COOKIE
    const token = createJwt(rows[0].userid);
    attachCookie(res, token);

    // SEND RESPONSE
    return res.status(201).send({ newUser: rows[0].name });
  } catch (err) {
    return next({
      log: `❌ userController.signup - error creating new user: ${err}`,
      status: 500,
      message: 'Internal error',
    });
  }
};

const signin = async (req, res, next) => {
  // console.log("💥 userController - Signin")
  const { username, password } = req.body;

  // VALIDATE INPUTS
  if (!username || !password || password.length < 4) {
    return next({
      log: 'userController.signin: Invalid inputs',
      status: 400,
      message: 'Please provide valid username and password',
    });
  }

  // FIND USER BY NAME
  // IF NONE THROW ERROR
  const { rows } = await db.query(getUserFromUsername, [username]);
  if (!rows.length) {
    return next({
      log: 'userController.signin: username does not exist',
      status: 400,
      message: 'Username does not exist',
    });
  }

  // CHECK PASSWORD
  const passMatch = await comparePassword(password, rows[0].password);

  // IF DONT MATCH THROW ERROR
  if (!passMatch) {
    return next({
      log: 'userController.signin: password does not match',
      status: 400,
      message: 'Password is incorrect',
    });
  }
  // CREATE JWT
  // ATTACH COOKIE TO RESPONSE OBJECT
  const token = createJwt(rows[0].userid);
  attachCookie(res, token);

  // RESPOND WITH USER'S NAME
  res.send({ name: rows[0].name });
};

const signout = async (req, res, next) => {
  // console.log("💥 userController - Signout")
  // RESET COOKIE TO NULL
  res.cookie('token', null, {
    httpOnly: true,
    secure: false,
    expires: new Date(Date.now() + 500),
  });

  res.send({ message: '✅ Signout successful' });
};

module.exports = { signup, signin, signout };
