import mongoose from "mongoose"

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  // product or user? 
  name: {
    type: String, 
    required: true
  },
  rating: {
    type: Number, 
    required: true, 
    unique: true
  },
  comment: {
    type: String, 
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Review', reviewSchema)