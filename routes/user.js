const { signupUser, loginUser } = require("../controllers/userController")
const express = require('express')

const router = express.Router()


// signup route 
// overall route: /api/user/signup
router.post('/signup', signupUser)


// login route 
// overall route: /api/user/login
router.post('/login', loginUser)


module.exports = router 