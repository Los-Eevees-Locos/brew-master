const signup = async (req, res, next) => {
  console.log("💥 userController - Signup")
  console.log(req.body)

  res.send({ message: "💥 Hello from signup" })
}

const signin = async (req, res, next) => {
  console.log("💥 userController - Signin")
  console.log(req.body)

  res.send({ message: "💥 Hello from signin" })
}
const signout = async (req, res, next) => {
  console.log("💥 userController - Signout")
  console.log(req.body)

  res.send({ message: "💥 Hello from signout" })
}

module.exports = { signup, signin, signout }
