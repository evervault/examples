const dotenv = require('dotenv').config()
const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_API_KEY);
const PROVIDER_NAME = 'Stripe';

const makePayment = async (options) => {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      number: options.card.number,
      exp_month: options.card.expMonth,
      exp_year: options.card.expYear,
      cvc: options.card.cvc
    },
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: options.amount,
    currency: options.currency,
    payment_method: paymentMethod.id,
    confirm: true,
  });

  if (paymentIntent.status === "succeeded") {
    return {
      paymentId: paymentIntent.id,
      provider: PROVIDER_NAME,
      status: "success"
    }
  }
  return {
    paymentId: paymentIntent.id,
    provider: PROVIDER_NAME,
    status: "failure"
  }
}

module.exports = {
  makePayment,
};
