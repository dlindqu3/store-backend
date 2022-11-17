const User = require("../models/userModel")


// signup 
const signupUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.signup(username, email, password)
    res.status(200).send({ username, user})
  } catch (err){
    res.status(400).json({ error: err.message})
  }
}

// login 
const loginUser = async (req, res) => {
  res.json({mssg: "login route"})
}


module.exports = { loginUser, signupUser }