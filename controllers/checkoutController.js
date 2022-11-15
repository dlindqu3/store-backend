require('dotenv').config()
const products = require('../data/data.js')
const Stripe = require('stripe')

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)

const handleCheckout = async (req, res) => {

  // console.log('handleCheckout called')

  let sessionData = {}
  sessionData.payment_method_types = ['card']
  sessionData.mode = 'payment'
  sessionData.success_url = `${process.env.CLIENT_URL}/checkout/success`
  sessionData.cancel_url = `${process.env.CLIENT_URL}/checkout/cancel`
  // line_items will be an array of objects
  sessionData.line_items = req.body.items.map((item) => {
    let currentItem = products.get(item.id)
    return {
      price_data: {
        currency: 'usd', 
        product_data: {
        name: currentItem.name
        },
      unit_amount: currentItem.priceInCents
      },
      quantity: item.quantity
    }
  })

  // console.log('sessionData: ', sessionData)

  try {
    const session = await stripe.checkout.sessions.create(sessionData)
    res.json({ url: session.url })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = { handleCheckout }