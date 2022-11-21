require('dotenv').config()
const Cart = require('../models/cartModel');


const createCart = async (req, res) => {
  const cartData =  new Cart(req.body); 
  try {
    let dbCart = await cartData.save()
    res.status(200).json(dbCart)
  } catch (err){
    res.status(500).json(err)
  }
}

// read cart 
const readCart = async (req, res) => {
  try {
    // find with userID
    const cart = await Cart.find({user: req.params.userId})
    res.status(200).json(cart)
  } catch (err){
    res.status(500).json(err)
  }
}


// update cart 
const updateCart = async (req, res) => {
  try {
    // find with cartID 
    let updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      // You should set the new option to true to return the document after update was applied.
      { new: true }
    )
    res.status(200).json(updatedCart)
  } catch (err){
    res.status(500).json(err)
  }
}

// delete cart 
const deleteCart = async (req, res) => {
  try {
    // find with cartID 
    await Cart.findByIdAndDelete(req.params.id)
    res.status(200).json("The cart has been deleted.")
  } catch(err){
    res.status(500).json(err)
  }
}


module.exports = { createCart, readCart, updateCart, deleteCart }