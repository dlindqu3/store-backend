require('dotenv').config()
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const productsRoutes = require('./routes/products')
const cartRoutes = require("./routes/cart")
const checkoutRoutes = require('./routes/checkout')
const userRoutes = require('./routes/user')
const ordersRoutes = require("./routes/orders")
const stripeWebhookRoutes = require("./routes/stripeWebhook")

const app = express()
 
const allowedOrigins = ['http://localhost:4000', 'http://localhost:3000', 'https://swift-store-frontend-topaz.vercel.app'];

const options = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200
};

app.use(cors(options))

// if this route is located before the bodyParser middleware, and I specify express.raw({type: "application/json"}) in the route, it uses raw body data like stripe expects 
app.use('/api/webhook', stripeWebhookRoutes)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})


// routes
app.use('/api/user', userRoutes)
app.use('/api/products', productsRoutes)
app.use("/api/cart", cartRoutes)
app.use('/api/orders', ordersRoutes)
app.use('/api/checkout', checkoutRoutes)


app.get('/', (req, res) => {
  res.send({mssg: "home page on server"})
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    app.listen(process.env.PORT, () => {
      console.log(`connected to the db and listening on port ${process.env.PORT}`)
    })

  })
  .catch((err) => {console.log(err)})
