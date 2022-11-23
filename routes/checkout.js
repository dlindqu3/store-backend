const express = require('express')
const { get } = require('mongoose')
const { handleCheckout, getCartProductsDetails, handleGetDetailsThenCheckout } = require('../controllers/checkoutController')


const router = express.Router()

// overall route: /api/checkout/get-cart-products-details
router.get("/pre-checkout/get-cart-products-details", getCartProductsDetails)

// overall route: /api/checkout/create-checkout-session
router.post('/create-checkout-session', handleCheckout)

// overall route: /api/checkout/combo/handle-get-details-then-checkout
router.get('/combo/handle-get-details-then-checkout', handleGetDetailsThenCheckout)


module.exports = router 