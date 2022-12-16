require('dotenv').config()
const Stripe = require("stripe")
const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

let handleStripeWebhook = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET
  let stripeEvent
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers['stripe-signature'];
    try {
      stripeEvent = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  if (stripeEvent.type === "payment_intent.succeeded"){
    const paymentIntent = stripeEvent.data.object
    console.log('full stripe paymentIntent obj after success: ', paymentIntent)
    console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`)
    // update db with an order here 
    
  } else if (stripeEvent.type === "payment_intent.payment_failed"){
    const paymentIntent = stripeEvent.data.object
    console.log('full stripe paymentIntent obj after failure: ', paymentIntent)
    console.log(`PaymentIntent for ${paymentIntent.amount} failed!`)
  }
  console.log('handleStripeWebhook called')
}

module.exports = { handleStripeWebhook };