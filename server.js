require('dotenv').config()
const axios = require('axios')
const express = require("express")
const cors = require('cors')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY) 

const storeItems = new Map([
  [1, { priceInCents: 25000, name: "bike" }], 
  [2, { priceInCents: 5500, name: "bike helmet" }]
])

app.get("/", (req, res) => {
  res.json({mssg: 'hello'})
})

// stripe stuff 
app.post("/create-checkout-session", async (req, res) => {
  
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], 
      mode: 'payment',
      // re-route to success_url or cancel_url after payment page
      // stripe handles the payment page/url 
      success_url: `${process.env.SERVER_URL}/checkout/success`,
      cancel_url: `${process.env.SERVER_URL}/checkout/cancel`, 
      // put item in form stripe expects
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: 'usd', 
            product_data: {
              name: storeItem.name
            },
            unit_amount: storeItem.priceInCents
          },
          quantity: item.quantity
        }
      })

    })
    res.json({ url: session.url })
  } catch (err){
    res.status(500).json({ error: err.message })
  }
  // res.json({ url: 'hello' })
})

app.get("/checkout/success", () => {
  console.log('checkout success page')
})

app.get("/checkout/cancel", () => {
  console.log('checkout cancel page')
})

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})