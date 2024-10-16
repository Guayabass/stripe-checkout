const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_KEY);
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: 'price_1Q6XIVDkcf3EClPZnQeAqOAb',
        quantity: 1,
      },
      {
        price: 'price_1Q9Rx3Dkcf3EClPZtJn9FoLO',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
});

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));