const dotenv = require('dotenv').config()

const { Checkout } = require('checkout-sdk-node');

const cko = new Checkout(process.env.CHECKOUT_COM_SECRET_KEY, {
    pk: process.env.CHECKOUT_COM_PUBLIC_KEY
});

const PROVIDER_NAME = 'checkout.com';

const makePayment = async (options) => {
    const payment = await cko.payments.request({
        "source": {
            "type": "card",
            "number": options.card.number,
            "expiry_month": options.card.expMonth,
            "expiry_year": options.card.expYear
        },
        "amount": options.amount,
        "currency": options.currency.toUpperCase(),
        "reference": options.paymentReference,
        "processing_channel_id": process.env.CHECKOUT_COM_PROCESSOR_CHANNEL_ID,
    });

    if (payment.status === "Authorized") {
        return {
            paymentId: payment.id,
            provider: PROVIDER_NAME,
            status: "success"
        }
    }
    return {
        paymentId: payment.id,
        provider: PROVIDER_NAME,
        status: "failure"
    }
}

module.exports = {
    makePayment
};
