import mongoose from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  isAdmin: {
    type: Boolean, 
    required: true,
    default: false
  }
})

// add a static method for signup 
// add a static method for login 

// module.exports = mongoose.model('User', userSchema)