require('dotenv').config()
const User = require("../models/userModel")
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
  // args: payload, secret, optiond
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '4d' })
}

// signup 
const signupUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const user = await User.signup(username, email, password)
    // this token will be a long string of the payload, heading, and secret
    const token = createToken(user._id)
    res.status(200).send({ username, token})
  } catch (err){
    res.status(400).json({ error: err.message})
  }
}

// login 
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.login(email, password)
    // this token will be a long string of the payload, heading, and secret
    const token = createToken(user._id)
    res.status(200).send({ username: user['username'], email: user['email'], token })
  } catch (err){
    res.status(400).json({ error: err.message})
  }
}


module.exports = { loginUser, signupUser }