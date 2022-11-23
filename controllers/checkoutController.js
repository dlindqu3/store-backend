require("dotenv").config();
const Stripe = require("stripe");
const Product = require('../models/productModel');


const getCartProductsDetails = async (cartItems) => {

  // let cartItems = req.body.cartData

  let products = []

  try {
    for (let i = 0; i < cartItems.length; i++){
      let currentCartItem = cartItems[i]
      let currentCartItemQuantity = currentCartItem.quantity
      let currentCartItemId = currentCartItem.itemId
      let currentProduct = await Product.findById(currentCartItemId)
      products.push({ currentProduct, currentCartItemQuantity })
    }
    return { products: products }
  } catch (err){
    res.json({ error: err.message })
  }
}



const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);


const handleCheckout = async (productsObj, res) => {

  let sessionData = {
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    success_url: `${process.env.CLIENT_URL}/checkout/success`,
    mode: "payment",
    payment_method_types: ["card"],
    // line_items: [{}, {}],
  };

  // line_items will be an array of objects
  let line_items_data = productsObj.products.map((item) => {
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

  try {
    const session = await stripe.checkout.sessions.create(sessionData)
    // creating a stripe checkout session provides you with a url that you can re-route to in order to handle checkout
    return { url: session.url }
  } catch (err) {
    res.json({ error: err.message })
  }
};

const handleGetDetailsThenCheckout = async (req, res) => {
  try {
    
    let cartItems = req.body.cartData
    let productDetailsData = await getCartProductsDetails(cartItems)
    // res.send(productDetailsData)
    let checkoutUrl = await handleCheckout(productDetailsData)
    res.status(200).send(checkoutUrl)

  } catch (err){
    res.send(err)
  }
  
  // if (productDetailsData.error){
  //   res.json({ error: productDetailsData.error.message })
  // }
  // let checkoutData = handleCheckout(productDetailsData, res)
  // if (checkoutData.error){
  //   res.json({error: checkoutData.error.message })
  // }
}

module.exports = { handleCheckout, getCartProductsDetails, handleGetDetailsThenCheckout };

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