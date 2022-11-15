const products = new Map([
  [1, {
    name: "Bike", 
    image: "./images/bike.jpg",
    description: "lightweight aluminum frame",
    brand: "Star",
    category: "Sports Equipment",
    priceInCents: 25000, 
    numReviews: 0,
    rating: 1
  }], 
  [2, {
    name: "Bike Helmet", 
    image: "./images/helmet.jpg",
    description: "lightweight and durable",
    brand: "Stellar",
    category: "Sports Equipment",
    priceInCents: 45000, 
    numReviews: 0,
    rating: 1
  }]
])
// this is the older, pre-ES6 syntax
// use with const products = require('./data/data.js') etc. 
module.exports = products