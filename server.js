require('dotenv').config()
const axios = require('axios')
const express = require("express")
const cors = require('cors')
const Stripe = require('stripe')
const products = require('./data/data.js')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY)


// stripe checkout
app.post("/create-checkout-session", async (req, res) => {
  
  // console.log('req.body: ', req.body)

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
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})