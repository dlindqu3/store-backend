require('dotenv').config()
const Product = require('../models/productModel')


// create product in db
const createProduct = async (req, res) => {
  const { user, name, image, description, brand, category, price } = req.body
  try {
    const productData = new Product({ user, name, image, description, brand, category, price })
    let dbProduct = await productData.save()
    res.status(200).json(dbProduct)
  } catch (err) {
    res.status(400).json({ mssg: err.message })
  }
}

// read all products 
const getAllProducts = async (req, res) => {
  const products = await Product.find({})
  res.status(200).send({ allProducts: products })
}

// read single product 
const getSingleProduct = async (req, res) => {
  const id = req.params.id
  const currentProduct = await Product.findById(id)
  if (!currentProduct){
    return res.status(404).json({error: 'this product does not exist'})
  }
  res.status(200).json(currentProduct)
}

// update product 
// example: update quantity in stock after each order 

module.exports = { createProduct, getAllProducts, getSingleProduct }

// sample products: 
// {
//   "name": "Ignite 4000", 
//   "image": "/images/bike.jpg", 
//   "description": "lightweight aluminum frame", 
//   "brand": "Star Bikes", 
//   "category": "Sports", 
//   "price": 275000
// }

// {
//   "name": "Prospeed Helmet",
//   "image": "/images/helmet.jpg",
//   "description": "lightweight and durable",
//   "brand": "Star Bikes",
//   "category": "Sports",
//   "price": 35000
// }