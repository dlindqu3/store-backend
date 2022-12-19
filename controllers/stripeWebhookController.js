require('dotenv').config()
const Order = require('../models/orderModel')
const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

let handleStripeWebhook = async (req, res) => {
  
  // verify that the event comes from stripe 
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  console.log('webhook called')
  let stripeEvent
  if (endpointSecret) {
    const signature = req.headers['stripe-signature'];
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
      // this works 
      res.send({stripeEvent: stripeEvent})
      console.log('stripeEvent: ', stripeEvent)
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      res.send({err: err.message});
    }
  }

  if (stripeEvent.type === "payment_intent.succeeded"){
    const paymentIntent = stripeEvent.data.object
    // update db with an order here 
    let orderObj = {}
    // orderObj["user"] = 
    
  } else if (stripeEvent.type === "payment_intent.payment_failed"){
    const paymentIntent = stripeEvent.data.object
    // send back failure message 
  }
}

module.exports = { handleStripeWebhook };

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