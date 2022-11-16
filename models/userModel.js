const mongoose = require('mongoose')

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
  }
})

// add a static method for signup 
// add a static method for login 

// module.exports = mongoose.model('User', userSchema)