const express = require('express');
const dotenv = require('dotenv').config()
const Evervault = require('@evervault/sdk');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());

const PaymentProviders = {
  Stripe: require('./paymentProviders/stripe.js'),
  CheckoutCom: require('./paymentProviders/checkoutcom.js'),
}

const evervault = new Evervault(process.env.EVERVAULT_API_KEY);
const mySecret = process.env.EVERVAULT_API_KEY;
evervault.enableOutboundRelay();

app.post('/api/checkout', async (req, res) => {
  const { card } = req.body
  console.log(card)

  const paymentOptions = {
    card: card,
    amount: 100,
    currency: 'eur',
    paymentReference: 'plant_purchase'
  }

  let paymentProvider = PaymentProviders.Stripe;
  if (card.bin === "424242") {
    paymentProvider = PaymentProviders.CheckoutCom;
  }
  const payment = await paymentProvider.makePayment(paymentOptions);

  res.send(payment);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
