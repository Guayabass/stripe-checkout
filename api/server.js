const stripe = require('stripe')(process.env.STRIPE_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: 'price_1Q6XIVDkcf3EClPZnQeAqOAb',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/success.html`,
      cancel_url: `${req.headers.origin}/cancel.html`,
    });

    res.status(200).json({ id: session.id });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}


// const express = require('express');
// require('dotenv').config();
// const stripe = require('stripe')(process.env.STRIPE_KEY);
// const app = express();
// app.use(express.static('public'));

// const YOUR_DOMAIN = 'https://guayabass.github.io';

// app.post('/create-checkout-session', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price: 'price_1Q6XIVDkcf3EClPZnQeAqOAb',
//         quantity: 1,
//       },
//       {
//         price: 'price_1Q9Rx3Dkcf3EClPZtJn9FoLO',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
// });

//   res.redirect(303, session.url);
// });

// app.listen(4242, () => console.log('Running on port 4242'));