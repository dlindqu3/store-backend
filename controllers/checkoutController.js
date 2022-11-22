require("dotenv").config();
const Stripe = require("stripe");
const Product = require('../models/productModel');


const getCartProductsDetails = async (req, res) => {
  // req.body.cartItems 
  let cartItems = [
    {
      itemId: "6378f1082d11c2df21c3dd31", 
      quantity: 50
    }, 
    {
      itemId: "6378f062a0d04237a135b702", 
      quantity: 20 
    }
  ]
  let products = []
  for (let i = 0; i < cartItems.length; i++){
    let currentCartItem = cartItems[i]
    let currentCartItemQuantity = currentCartItem.quantity
    let currentCartItemId = currentCartItem.itemId
    let currentProduct = await Product.findById(currentCartItemId)
    products.push({ currentProduct, currentCartItemQuantity })
  }
  return res.status(200).json({ products: products })
}

// sample return value from getCartProductsDetails: 
// {
//   "products": [
//     {
//       "currentProduct": {
//         "_id": "6378f1082d11c2df21c3dd31",
//         "name": "Defender Ultra",
//         "image": "/images/helmet.jpg",
//         "description": "lightweight and aerodynamic design",
//         "brand": "Star Bikes",
//         "category": "Sports",
//         "price": 75000,
//         "quantityInStock": 750,
//         "__v": 0
//       },
//       "currentCartItemQuantity": 50
//     },
//     {
//       "currentProduct": {
//         "_id": "6378f062a0d04237a135b702",
//         "name": "Ignite 4500",
//         "image": "/images/bike.jpg",
//         "description": "lightweight aluminum frame",
//         "brand": "Star Bikes",
//         "category": "Sports",
//         "price": 275000,
//         "quantityInStock": 750,
//         "__v": 0
//       },
//       "currentCartItemQuantity": 20
//     }
//   ]
// }



const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

const handleCheckout = async (req, res) => {

  let sessionData = {
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    success_url: `${process.env.CLIENT_URL}/checkout/success`,
    mode: "payment",
    payment_method_types: ["card"],
    // line_items: [{}, {}],
  };

  // line_items will be an array of objects
  let line_items_data = req.body.products.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
        name: item.currentProduct.name
        },
      unit_amount: item.currentProduct.price
      },
      quantity: item.currentCartItemQuantity
    }
  })

  sessionData['line_items'] = line_items_data

  // res.json(sessionData)

  try {
    const session = await stripe.checkout.sessions.create(sessionData)
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
};

module.exports = { handleCheckout, getCartProductsDetails };
