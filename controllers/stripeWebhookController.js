require('dotenv').config()
const Order = require('../models/orderModel')
const Cart = require("../models/cartModel")
const Stripe = require("stripe")


const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

let handleStripeWebhook = async (req, res) => {
  
  // verify that the event comes from stripe 
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  // console.log('webhook called')

  let stripeEvent
  if (endpointSecret) {
    const signature = req.headers['stripe-signature'];
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      )
      console.log("webhook verified")
    } catch (err) {
      console.log("webhook error message: ", err.message)
      res.status(400).end()
      return
    }
  }

  if (stripeEvent.type === "payment_intent.succeeded"){

    let currentEmail = stripeEvent.data.object.charges.data[0].billing_details.email
    // code below added after last successful commit 
    let customer = await stripe.customers.list({
      email: currentEmail,
    });

    // code above added after last successful commit 

    // this testObj works so far 
    let testObj = {}
    testObj["user"] = customer.data[0].metadata.user
    testObj["customer"] = customer.data[0].id
    // testObj["orderItems"] = []
    testObj["totalCost"] = stripeEvent.data.object.amount
    testObj["shippingAddress"] = stripeEvent.data.object.charges.data[0].billing_details.address

    let cart = await Cart.find({user: customer.data[0].metadata.user})
    testObj["orderItems"] = cart[0].cartItems

    // this res obj works so far 
    res.send({success: true, aa: "bb", testObj: testObj, cart: cart, stripeEv: stripeEvent})
  } else if (stripeEvent.type === "payment_intent.payment_failed"){
    res.send({success: false, stripeEv: stripeEvent})
  }

  console.log("event type: ", stripeEvent.type)
  console.log("event.data.object: ", stripeEvent.data.object)
  console.log("event.data.object.id: ", stripeEvent.data.object.id)
  res.send({stripeEv: stripeEvent})
}

module.exports = { handleStripeWebhook };



  // let testObj = {
  //   user: "63920e650f2a9cf7c0e809aa", 
  //   customer: "cust_12345",
  //   orderItems: [{product: "6378f062a0d04237a135b702", quantity: 3}], 
  //   totalCost: 75000, 
  // shippingAddress: {
  //   city: "Doraville",
  //   country: "US",
  //   line1: "5432 Buford Highway Northeast",
  //   line2: null,
  //   postal_code: "30340",
  //   state: "GA"
  //   }
  // }


// order item sample: 
// { 
//   user: "", 
//   orderItems: [{product: "", quantity: ""}], 
//   totalCost: "", 
//   shippingAddress: 
//     {
//       city: "Doraville",
//       country: "US",
//       line1: "5432 Buford Highway Northeast",
//       line2: null,
//       postal_code: "30340",
//       state: "GA"
//     }
// }