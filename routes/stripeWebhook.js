const express = require('express')
const { handleStripeWebhook } = require('../controllers/stripeWebhookController')
const bodyParser = require("body-parser")

const router = express.Router()

// overall route: /api/webhook/stripe-webhook 
router.post("/stripe-webhook", bodyParser.raw({type:"application/json"}), handleStripeWebhook)

module.exports = router 