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
  let cart 
  let dbOrder

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

    let currentEmail = stripeEvent.data.object.customer_email
    let customer = await stripe.customers.list({
      email: currentEmail,
    })

    let orderObj = {}
    orderObj["user"] = customer.data[0].metadata.user
    orderObj["customer"] = customer.data[0].id
    orderObj["totalCost"] = stripeEvent.data.object.amount
    orderObj["shippingAddress"] = stripeEvent.data.object.charges.data[0].billing_details.address

    cart = await Cart.find({user: customer.data[0].metadata.user})
    orderObj["orderItems"] = cart[0].cartItems



    const orderData =  new Order(orderObj); 
    try {
      dbOrder = await orderData.save()
    } catch (err){
      res.status(500).json(err)
    }

    // try {
    //   Cart.findByIdAndDelete(cart._id)
    // } catch (err){
    //   res.send({"error": err})
    // }
    

    // this res obj works so far 
    res.send({success: true, aa: "bb", cart: cart, customer: customer, dbOrder: dbOrder, stripeEv: stripeEvent})
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