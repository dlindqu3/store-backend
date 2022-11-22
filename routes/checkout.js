const express = require('express')
const { get } = require('mongoose')
const { handleCheckout, getCartProductsDetails } = require('../controllers/checkoutController')


const router = express.Router()

router.get("/pre-checkout/get-cart-products-details", getCartProductsDetails)

// overall route: /api/checkout/create-checkout-session
router.post('/create-checkout-session', handleCheckout)


module.exports = router 