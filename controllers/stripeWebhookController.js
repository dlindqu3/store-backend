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
      res.status(400).send({err: err.message}).end()
      return
    }
  }

  if (stripeEvent.type === "payment_intent.succeeded"){

    // getting customer data works 
    let currentEmail = stripeEvent.data.object.customer_email
    let customer = await stripe.customers.list({
      email: currentEmail,
    })

    // finding the user works 
    let user = customer.data[0].metadata.user

    // find the cart works 
    let cart = await Cart.find({user: user})

    // let orderObj = {}
    // orderObj["user"] = customer.data[0].metadata.user
    // orderObj["customer"] = customer.data[0].id
    // orderObj["totalCost"] = stripeEvent.data.object.amount
    // orderObj["shippingAddress"] = stripeEvent.data.object.charges.data[0].billing_details.address

    
    // orderObj["orderItems"] = cart[0].cartItems


    // let dbOrder 
    // const orderData =  new Order(orderObj); 
    // try {
    //   dbOrder = await orderData.save()
    // } catch (err){
    //   res.status(500).json(err)
    // }


    // webhook error even after deleteCart commented out 

    // this does not work 
    // let deletedCart
    // try {
    //   deletedCart = await Cart.findByIdAndDelete(cart[0]._id)
    // } catch (err){
    //   res.send({"error": err})
    // }
    

    // test on 12.30 
    res.send({ aa: "bb", customer, user, cart, stripeEvent})

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