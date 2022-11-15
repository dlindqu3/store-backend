import mongoose from "mongoose"
import reviewSchema from "./reviewModel"

const Schema = mongoose.Schema

const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    // this is like a foreign key, it adds a relationship between product and user
    ref: 'User'
  },
  name: {
    type: String, 
    required: true, 
    unique: true
  },
  image: {
    type: String, 
    required: true
  },
  description: {
    type: String, 
    required: true, 
    default: 0
  },
  brand: {
    type: String, 
    required: true
  },
  category: {
    type: String, 
    required: true
  },
  price: {
    type: Number, 
    required: true, 
    default: 0
  },
  numReviews: {
    type: Number, 
    required: true, 
    default: 0
  },
  rating: {
    type: String, 
    required: true
  },
  reviews: [reviewSchema]
})

// module.exports = mongoose.model('Product', productSchema)