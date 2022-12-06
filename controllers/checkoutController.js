require("dotenv").config();
const Stripe = require("stripe");
const Product = require('../models/productModel');


const getCartProductsDetails = async (cartItemsObj) => {

  let products = []

  // cartItemsObj: 
  // {
  //   "cartItems": [
  //     {
  //       "itemId": "6378f062a0d04237a135b702",
  //       "quantity": 2
  //     },
  //     {
  //       "itemId": "6378f1082d11c2df21c3dd31",
  //       "quantity": 3
  //     }
  //   ]
  // }

  let cartItemsData = cartItemsObj["cartItems"]
  
  try {
    for (let i = 0; i < cartItemsData.length; i++){
      let currentCartItem = cartItemsData[i]
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


const handleCheckout = async (productDetailsObj) => {

  let sessionData = {
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    success_url: `${process.env.CLIENT_URL}/checkout/success`,
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"]
      }
    // line_items: [{}, {}],
  };

  // line_items will be an array of objects
  let line_items_data = productDetailsObj.products.map((item) => {
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
    // return { "sessionData" : sessionData }
    const session = await stripe.checkout.sessions.create(sessionData)
    // creating a stripe checkout session provides you with a url that you can re-route to in order to handle checkout
    return { url: session.url }
  } catch (err) {
    res.json({ error: err.message })
  }
};

const handleGetDetailsThenCheckout = async (req, res) => {
  try {
    console.log('handleGetDetailsThenCheckout called')
    let cartItems = req.body.cartData
    let cartItemsObj = { "cartItems": cartItems }
    let productDetailsData = await getCartProductsDetails(cartItemsObj)
    // res.status(200).send(productDetailsData)
    // works to here 

    let checkoutData = await handleCheckout(productDetailsData)
    // here, checkout data is an object that looks like: 
    // { "url": "https://checkout.stripe.com/c/pay/cs_test_abcdefg..."}
    res.status(200).send(checkoutData)

  
  } catch (err){
    res.send(err)
  }
}

module.exports = { handleCheckout, getCartProductsDetails, handleGetDetailsThenCheckout };

