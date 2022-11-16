const express = require('express')
const { createProduct, getAllProducts, getSingleProduct } = require('../controllers/productsController')

const router = express.Router()

// overall route: /api/products/create-product 
router.post('/create-product', createProduct)

// overall route: /api/products/get-all-products
router.get('/get-all-products', getAllProducts)

// overall route: /api/products/single/:id
router.get('/single/:id', getSingleProduct) 

module.exports = router 