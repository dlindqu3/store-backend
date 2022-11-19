const mongoose = require('mongoose')

const Schema = mongoose.Schema

const cartSchema = new Schema({
  // user that is the purchaser
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User"
  },
  cartItems: [
    {
      name: { type: String, required: true }, 
      quantity: { type: Number, required: true }, 
      image: { type: String, required: true }, 
      unitPrice: { type: Number, required: true }, 
      product: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Product"
       }
    }
  ],
  totalPrice: {
    type: Number, 
    required: true,
    default: 0.0
  }
})

module.exports = mongoose.model('Cart', cartSchema)