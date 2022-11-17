const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


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
 
  // validation 
  if (!username || !email || !password){
    throw Error('Please enter a value for each field')
  }

  if (!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

  if (!validator.isStrongPassword(password)){
    throw Error('Password is not strong enough')
  }
 

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
userSchema.statics.login = async function(email, password){
    
    if (!email || !password){
      throw Error('Please enter a value for each field')
    }
    const user = await this.findOne({ email })
    if (!user){
      throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match){
      throw Error('Incorrect password')
    }
    return user
} 

module.exports = mongoose.model('User', userSchema)