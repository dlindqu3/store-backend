## stripe notes 
- we provide it with the ids of the products we want to buy and a count for each
- send that to the server, which has pricing info 
- server will respond with a new url to a checkout page 
- frontend can re-direct to the new url (a checkout page)


## stripe api choices
- Stripe Checkout is a prebuilt payment page that you can redirect your customer to for simple purchases and subscriptions. It provides many features, such as Apple Pay, Google Pay, internationalization, and form validation.
- Stripe's Charges and Payment Intents APIs let you build custom payment flows and experiences.
- ** this project uses Checkout, not Charges & Payment Intents  

## checkout webhook 
- Register your publicly accessible HTTPS URL in the Stripe dashboard.


## citations 
1. Brad Traversy, "Modeling Our Data" (part of a Udemy course called "MERN eCommerce From Scratch"), [link](https://www.udemy.com/course/mern-ecommerce/)
2. Web Dev Simplified, "How To Accept Payments With Stripe", [link](https://www.youtube.com/watch?v=1r-F3FIONl8)
3. "STRIPE error: In order to use Checkout, you must set an account or business name at https://dashboard.stripe.com/account", [link](https://stackoverflow.com/questions/64476542/stripe-error-in-order-to-use-checkout-you-must-set-an-account-or-business-name)
4. bike photo - Photo by Robert Bye on Unsplash
5. helmet photo - Photo by Cobi Krumholz on Unsplash
6. The Net Ninja, "MERN Stack Tutorial #6 - Controllers (part 1)", [link](https://www.youtube.com/watch?v=oEHHjs1UVXQ&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=6)
7. The Net Ninja, "MERN Authentication Tutorial #2 - User Routes, Controller & Model", [link](https://www.youtube.com/watch?v=b5LDOW8WJ9A&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=2)
8. The Net Ninja, "MERN Authentication Tutorial #3 - Signing Up & Hashing Passwords", [link](https://www.youtube.com/watch?v=mjZIv4ey0ps&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=3)
9. The Net Ninja, "MERN Authentication Tutorial #4 - Email & Password Validation", [link](https://www.youtube.com/watch?v=sRFI6L0a38E&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=4)
10. The Net Ninja, "MERN Authentication Tutorial #6 - Signing Tokens", [link](https://www.youtube.com/watch?v=MsudBMepwO8&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=6)
11. The Net Ninja, "MERN Authentication Tutorial #7 - Logging Users In", [link](https://www.youtube.com/watch?v=Jdt0mygy-74&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=7)
12. The Net Ninja, "MERN Authentication Tutorial #14 - Protecting API Routes", [link](https://www.youtube.com/watch?v=MrEoixi8QY4&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=14)
13. Stripe, "API Reference", [link](https://stripe.com/docs/api?lang=node)
14. Lama Dev, "Node.js E-Commerce App REST API with MongoDB | Shopping API with Stripe & JWT", [link](https://www.youtube.com/watch?v=rMiRZ1iRC0A)
15. "Multiple awaits inside one async function", [link](https://stackoverflow.com/questions/67919400/multiple-awaits-inside-one-async-function)
16. "Custom Checkout", [link](https://stripe.com/docs/payments/checkout/customization)