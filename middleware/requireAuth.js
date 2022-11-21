const jwt = require('jsonwebtoken')
const User = require("../models/userModel")
require('dotenv').config()

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization){
    return res.status(401).json({error: 'Authorization token required.'})
  }
  const token = authorization.split(" ")[1]

  try {
    // verify token 
    const { _id } = jwt.verify(token, process.env.SECRET)
    // attach user's _id to req, next middleware can use it
    req.user_id = await User.findOne({ _id }).select("_id")
    next()
  } catch(err){
    console.log(err)
    res.status(401).json({error: 'Request not authorized.'})
  }
}

module.exports = requireAuth 