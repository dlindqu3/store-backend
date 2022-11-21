const express = require('express')
const requireAuth = require("../middleware/requireAuth")
const { createCart, readCart, updateCart , deleteCart} = require('../controllers/cartController')

const router = express.Router()

router.use(requireAuth)

// overall route: /api/cart/create-cart
router.post("/create-cart", createCart)

// overall route: /api/cart/read-cart/:userId
router.get("/read-cart/:userId", readCart)

// overall route: /api/cart/update-cart/:id
router.put("/update-cart/:id", updateCart)

// overall route: /api/cart/delete-cart/:id
router.delete("/delete-cart/:id", deleteCart)

module.exports = router 