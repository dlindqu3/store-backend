require('dotenv').config()
const Product = require('../models/productModel')


// create product in db
const createProduct = async (req, res) => {
  const { user, name, image, description, brand, category, price } = req.body
  try {
    const newProduct = await Product.create({ user, name, image, description, brand, category, price })
    res.status(200).json(newProduct)
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

module.exports = { createProduct, getAllProducts, getSingleProduct }