const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
userSchema.statics.signup = async function ( username, email, password) {
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('This email is already in use')
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ username, email, password: hash })
  return user
}


// add a static method for login 

module.exports = mongoose.model('User', userSchema)