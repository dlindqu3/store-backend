const express = require('express')
const { get } = require('mongoose')
const { handleCheckout, handleGetDetailsThenCheckout, handleStripeWebhook } = require('../controllers/checkoutController')
const requireAuth = require("../middleware/requireAuth")


const router = express.Router()

router.use(requireAuth)

// overall route: /api/checkout/create-checkout-session
router.post('/create-checkout-session', handleCheckout)

// overall route: /api/checkout/combo/handle-get-details-then-checkout
router.post('/combo/handle-get-details-then-checkout', handleGetDetailsThenCheckout)

// overall route: /api/checkout/stripe-webhook 
router.post("/stripe-webhook", handleStripeWebhook)

module.exports = router 