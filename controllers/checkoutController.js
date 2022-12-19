require("dotenv").config();
const Stripe = require("stripe");
const Product = require('../models/productModel');

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

// argument array: productDetailsAndQuantities
const handleCheckout = async (arr, userId) => {

  // let customer = stripe.customers.create({metadata: {
  //   userId: userId,
  //   cart: arr
  // }})

  let sessionData = {
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    success_url: `${process.env.CLIENT_URL}/checkout/success`,
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"]
      },
    metadata: {user: userId, cartData: arr}
    // line_items: [{}, {}],
  };

  // line_items will be an array of objects
  let line_items_data = arr.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
        name: item.name
        },
      unit_amount: item.price
      },
      quantity: item.quantity
    }
  })

  sessionData['line_items'] = line_items_data

  try {
    // return { "sessionData" : sessionData }
    const session = await stripe.checkout.sessions.create(sessionData)
    // creating a stripe checkout session provides you with a url that you can re-route to in order to handle checkout
    console.log('session: ', session)
    console.log('sessionId: ', session.id)
    return { url: session.url, sessionId: session.id }

  } catch (err) {
    res.json({ error: err.message })
  }
};

const handleGetDetailsThenCheckout = async (req, res) => {
  try {
    console.log('handleGetDetailsThenCheckout called')
    // console.log('handleGetDetailsThenCheckout body: ', req.body)

    let cartItems = req.body.items
    let userId = req.body.userId
    
    let productDetailsAndQuantities = []

    for (let i = 0; i < cartItems.length; i++){
      let currentItem = cartItems[i]
      let newObj = {}
      let currentItemId = currentItem.id
      let currentItemQuantity = currentItem.quantity 
      newObj["quantity"] = currentItemQuantity

      let productDetailsData = await Product.findById(currentItemId)
      newObj["id"] = productDetailsData.id
      newObj["name"] = productDetailsData.name
      newObj["price"] = productDetailsData.price
      productDetailsAndQuantities.push(newObj)
    }

    // console.log('productDetailsAndQuantities: ', productDetailsAndQuantities)
    let checkoutData = await handleCheckout(productDetailsAndQuantities, userId)
    // // here, checkoutData is an object that looks like: 
    // // { "url": "https://checkout.stripe.com/c/pay/cs_test_abcdefg..."}
    res.status(200).send(checkoutData)

  } catch (err){
    res.send(err)
  }
}

module.exports = { handleCheckout, handleGetDetailsThenCheckout };

