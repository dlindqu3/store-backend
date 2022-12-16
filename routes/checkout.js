const express = require('express')
const { handleCheckout, handleGetDetailsThenCheckout } = require('../controllers/checkoutController')
const requireAuth = require("../middleware/requireAuth")


const router = express.Router()


router.use(requireAuth)

// overall route: /api/checkout/create-checkout-session
router.post('/create-checkout-session', handleCheckout)

// overall route: /api/checkout/combo/handle-get-details-then-checkout
router.post('/combo/handle-get-details-then-checkout', handleGetDetailsThenCheckout)

module.exports = router 