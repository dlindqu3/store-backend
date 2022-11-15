const express = require('express')
const { handleCheckout } = require('../controllers/checkoutController')

const router = express.Router()

// overall route: /api/checkout/create-checkout-session
router.post('/create-checkout-session', handleCheckout)


module.exports = router 