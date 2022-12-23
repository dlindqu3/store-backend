const express = require('express')
const { createOrder, readOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.use(requireAuth)

// overall route: /api/orders/create-order
router.post('/create-order', createOrder)

// overall route: /api/orders/get-single-user-orders/:userId
router.get('/get-single-user-orders/:userId', readOrders)

// overall route: /api/orders/update/:id
router.get('/update/:id', updateOrder) 

// overall route: /api/orders/delete/:id
router.get('/delete/:id', deleteOrder) 

module.exports = router 