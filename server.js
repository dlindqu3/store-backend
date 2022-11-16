require('dotenv').config()
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const checkoutRoutes = require('./routes/checkout')
const productsRoutes = require('./routes/products')

const app = express()

app.use(cors({
  origin: 'http://localhost:3000'
}))

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/checkout', checkoutRoutes)
app.use('/api/products', productsRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => {

    app.listen(process.env.PORT, () => {
      console.log(`connected to the db and listening on port ${process.env.PORT}`)
    })

  })
  .catch((err) => {console.log(err)})
