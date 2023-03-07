const express = require('express');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());

const PaymentProviders = {
  Stripe: require('./paymentProviders/stripe.js')
}

app.post('/api/checkout', async (req, res) => {
  // code goes here
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})