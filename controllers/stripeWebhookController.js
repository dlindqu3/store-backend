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
    } catch (err) {
      res.status(400).send({err: err.message});
    }
  }

  let orderObj = {}

  let testObj = {
    user: "63920e650f2a9cf7c0e809aa", 
    customer: "cust_12345",
    orderItems: [{product: "6378f062a0d04237a135b702", quantity: 3}], 
    totalCost: 75000, 
  shippingAddress: {
    city: "Doraville",
    country: "US",
    line1: "5432 Buford Highway Northeast",
    line2: null,
    postal_code: "30340",
    state: "GA"
    }
  }

  // SHOULD THIS BE "payment_intent.succeeded"? payment_intent is listed elsewhere on the req and incoming res 
  if (stripeEvent.type === "checkout.session.completed"){
    const paymentIntent = stripeEvent.data.object
    // update db with an order here 
    let parsedCart = JSON.parse(req.body.data.object.metadata.cart)

    orderObj["user"] = req.body.data.object.metadata.user

    // search for customer by email 
    let customerObj = await stripe.customers.list({
      email: req.body.data.object.email
    });
    orderObj["customer"] = customerObj.data[0].id
    // ADD CUSTOMER ID HERE 
    orderObj["orderItems"] = []

    let totalCost = 0

    for (let i = 0; i < parsedCart.cartArray.length; i++){
      let currentItem = parsedCart.cartArray[i]
      let newObj = {}
      newObj["quantity"] = currentItem.quantity
      newObj["id"] = currentItem.id
      orderObj["orderItems"].push(newObj)
      
      // add to totalCost
      let currentItemTotalCost = currentItem.price * currentItem.quantity
      totalCost += currentItemTotalCost
    }

    orderObj["totalCost"] = totalCost
    
    let shippingAddress = {}
    shippingAddress["city"] = req.body.data.object.customerDetails.address.city
    shippingAddress["county"] = req.body.data.object.customerDetails.address.county
    shippingAddress["line1"] = req.body.data.object.customerDetails.address.line1
    shippingAddress["line2"] = req.body.data.object.customerDetails.address.line2
    shippingAddress["postal_code"] = req.body.data.object.customerDetails.address.postal_code
    shippingAddress["state"] = req.body.data.object.customerDetails.address.state
    orderObj["shippingAddress"] = shippingAddress
 

    // use orderObj to create a new instance of the order class in the db 
    let dbOrder
    try {
      const newOrder = new Order(orderObj)
      dbOrder = await newOrder.save()
      // res.status(200).send(savedOrder)
    } catch (err) {
      res.status(400).json({ mssg: err.message })
    }
  } else if (stripeEvent.type !== "checkout.session.completed"){
    // const paymentIntent = stripeEvent.data.object
    // send back failure message 
    res.send({error: "The payment attempt failed."})
  }

  res.send({stripeEv: stripeEvent})
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