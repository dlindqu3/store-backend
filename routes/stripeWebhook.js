const express = require('express')
const { handleStripeWebhook } = require('../controllers/stripeWebhookController')

const router = express.Router()

// overall route: /api/webhook/stripe-webhook 
router.post("/stripe-webhook", handleStripeWebhook)

module.exports = router 