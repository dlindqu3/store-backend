require('dotenv').config()
const Order = require('../models/orderModel');


// create an order 
const createOrder = async (orderData) => {
  try {
    const newOrder = new Order(orderData)
    let dbOrder = await newOrder.save()
    res.status(200).json(dbOrder)
  } catch (err) {
    res.status(400).json({ mssg: err.message })
  }
}

// get orders for a single user
const readOrders = async (req, res) => {
  try {
    // find with userID
    const orders = await Order.find({user: req.params.userId})
    res.status(200).json(orders)
  } catch (err){
    res.status(500).json(err)
  }
}

// update order 
// **perhaps don't have this route**
const updateOrder = async (req, res) => {
  try {
    // find with orderID 
    let updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      // You should set the new option to true to return the document after update was applied.
      { new: true }
    )
    res.status(200).json(updatedOrder)
  } catch (err){
    res.status(500).json(err)
  }
}

// delete order 
const deleteOrder = async (req, res) => {
  try {
    // find with orderID 
    await Order.findByIdAndDelete(req.params.id)
    res.status(200).json("The order has been deleted.")
  } catch(err){
    res.status(500).json(err)
  }
}


module.exports = { createOrder, readOrders, updateOrder, deleteOrder }