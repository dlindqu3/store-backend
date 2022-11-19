const mongoose = require('mongoose')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  // user that is the purchaser
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User"
  },
  orderItems: [
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
  shippingAddress: {
    streetAddress: {type: String, required: true },
    city: {type: String, required: true },
    zipCode: {type: String, required: true },
    country: {type: String, required: true }
  },
  paymentMethod: {
    type: String, 
    required: true
  },
  // data back from Stripe
  // not the same as the Traversy, Traversy used PayPal 
  paymentResult: {
    type: String, 
    required: true
  },
  
  taxPrice: {
    type: Number, 
    required: true,
    default: 0.0
  },
  shippingPrice: {
    type: Number, 
    required: true,
    default: 0.0
  },
  totalPrice: {
    type: Number, 
    required: true,
    default: 0.0
  },
  isPaid: {
    type: Boolean, 
    required: true,
    default: false
  },
  hasShipped: {
    type: Boolean, 
    required: true,
    default: false
  },
  // perhaps make the default time required for each product delivery = 48 hours 
  hasArrived: {
    type: Boolean, 
    required: true,
    default: false
  }
}, {
  timestamps: true
})


// module.exports = mongoose.model('Order', orderSchema)