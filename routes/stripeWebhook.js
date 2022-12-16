const express = require('express')
const { handleStripeWebhook } = require('../controllers/stripeWebhookController')

const router = express.Router()

// overall route: /api/webhook/stripe-webhook 
router.post("/stripe-webhook", express.raw({type: "application/json"}), handleStripeWebhook)

module.exports = router 