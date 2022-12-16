require('dotenv').config()
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
      res.send({stripeEv: stripeEvent})
      console.log('stripeEvent: ', stripeEvent)
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      res.send({err: err.message});
    }
  }

  // if (stripeEvent.type === "payment_intent.succeeded"){
  //   const paymentIntent = stripeEvent.data.object
  //   console.log('full stripe paymentIntent obj after success: ', paymentIntent)
  //   console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
  //   // update db with an order here 
    
  // } else if (stripeEvent.type === "payment_intent.payment_failed"){
  //   const paymentIntent = stripeEvent.data.object
  //   console.log('full stripe paymentIntent obj after failure: ', paymentIntent)
  //   console.log(`PaymentIntent for ${paymentIntent.amount} failed!`)
  // }
}

module.exports = { handleStripeWebhook };