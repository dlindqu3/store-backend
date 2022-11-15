require('dotenv').config()
const express = require("express")
const cors = require('cors')
const checkoutRoutes = require('./routes/checkout')

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


app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})