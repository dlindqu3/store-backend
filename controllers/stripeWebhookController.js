require('dotenv').config()
const Order = require('../models/orderModel')
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