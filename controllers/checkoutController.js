require("dotenv").config();
const Stripe = require("stripe");
const Product = require('../models/productModel');

const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

// argument array: productDetailsAndQuantities
const handleCheckout = async (arr, userId, userEmail) => {

  // see if there is already a stripe customer for current user, can list all customers and filter by email 
    let customer = await stripe.customers.list({
      email: userEmail,
    });
    console.log('customers with a given email: ', customer)

    if (!customer.data[0]){
      // if there is no existing stripe customer with the given email: 
      // make a new stripe customer
      try {
        const customer = await stripe.customers.create({
          email: userEmail,
          metadata: {
            user: userId.toString(),
            cart: JSON.stringify({cartArray: arr})
          }
        });
        console.log('new customer: ', customer)
      } catch (err){
        console.log('error creating new customer: ', err.message)
      }
    }
    // if there is an existing stripe customer with the provided email
    // update stripe customer with current cart
    else if (customer.data[0]){
      // console.log('existing customer data: ', customer.data[0])
      let currentCustomerId = customer.data[0].id
      try {
        customer = await stripe.customers.update(
          currentCustomerId,
          {metadata: {
            user: userId.toString(),
            cart: JSON.stringify({cartArray: arr})
          }}
        )
      } catch(err){
        console.log('update customer error: ', err.message)
      }
    }


  console.log('handleCheckout called')
  // console.log('arr: ', arr, "userId: ", userId)

  let sessionData = {
    cancel_url: `${process.env.CLIENT_URL}/checkout/cancel`,
    success_url: `${process.env.CLIENT_URL}/checkout/success?id={CHECKOUT_SESSION_ID}`,
    mode: "payment",
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["US"]
      },
    metadata: {
      user: userId.toString(),
      cart: JSON.stringify({cartArray: arr})
    }

    // line_items: [{}, {}],
  };

  // line_items will be an array of objects
  let line_items_data = arr.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
        name: item.name
        },
      unit_amount: item.price
      },
      quantity: item.quantity
    }
  })

  sessionData['line_items'] = line_items_data

  // console.log('sessionData: ', sessionData)
  try {
    const session = await stripe.checkout.sessions.create(sessionData)
    // creating a stripe checkout session provides you with a url that you can re-route to in order to handle checkout
    // console.log('session: ', session)
    // console.log('sessionId: ', session.id)
    return { url: session.url, sessionId: session.id }

  } catch (err) {
    console.log({error: err.message})
    res.json({ error: err.message })
  }
};

const handleGetDetailsThenCheckout = async (req, res) => {
  try {
    console.log('handleGetDetailsThenCheckout called')
    // console.log('handleGetDetailsThenCheckout body: ', req.body)

    let cartItems = req.body.items
    let userId = req.body.userId
    let userEmail = req.body.userEmail
    
    let productDetailsAndQuantities = []

    for (let i = 0; i < cartItems.length; i++){
      let currentItem = cartItems[i]
      let newObj = {}
      let currentItemId = currentItem.id
      let currentItemQuantity = currentItem.quantity 
      newObj["quantity"] = currentItemQuantity

      let productDetailsData = await Product.findById(currentItemId)
      newObj["id"] = productDetailsData.id
      newObj["name"] = productDetailsData.name
      newObj["price"] = productDetailsData.price
      productDetailsAndQuantities.push(newObj)
    }

    // console.log('productDetailsAndQuantities: ', productDetailsAndQuantities)
    let checkoutData = await handleCheckout(productDetailsAndQuantities, userId, userEmail)
    console.log('checkoutData: ', checkoutData)
    // // here, checkoutData is an object that looks like: 
    // // { "url": "https://checkout.stripe.com/c/pay/cs_test_abcdefg..."}
    res.status(200).send(checkoutData)

  } catch (err){
    res.send(err)
  }
}

module.exports = { handleCheckout, handleGetDetailsThenCheckout };

