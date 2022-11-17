## later
- require auth (superuser) to CRUD products in db 

## stripe notes 
- we provide it with the ids of the products we want to buy and a count for each
- send that to the server, which has pricing info 
- server will respond with a new url to a checkout page 
- frontend can re-direct to the new url (a checkout page)


## citations 
1. Brad Traversy, "Modeling Our Data" (part of a Udemy course called "MERN eCommerce From Scratch"), [link](https://www.udemy.com/course/mern-ecommerce/)
2. Web Dev Simplified, "How To Accept Payments With Stripe", [link](https://www.youtube.com/watch?v=1r-F3FIONl8)
3. "STRIPE error: In order to use Checkout, you must set an account or business name at https://dashboard.stripe.com/account", [link](https://stackoverflow.com/questions/64476542/stripe-error-in-order-to-use-checkout-you-must-set-an-account-or-business-name)
4. bike photo - Photo by Robert Bye on Unsplash
5. helmet photo - Photo by Cobi Krumholz on Unsplash
6. The Net Ninja, "MERN Stack Tutorial #6 - Controllers (part 1)", [link](https://www.youtube.com/watch?v=oEHHjs1UVXQ&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=6)
7. The Net Ninja, "MERN Authentication Tutorial #2 - User Routes, Controller & Model", [link](https://www.youtube.com/watch?v=b5LDOW8WJ9A&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=2)