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
      product: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: "Product"
      }, 
       quantity: {
        type: Number,
        required: true
      }
    }
  ]
})


module.exports = mongoose.model('Cart', cartSchema)