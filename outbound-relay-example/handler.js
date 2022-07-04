"use strict";
const axios = require('axios');
const Evervault = require('@evervault/sdk');

module.exports.evRelayExample = async (event) => {
  const body = JSON.parse(event.body);

  // Initialize the Evervault SDK with your API Key
  // setting the `intercept` option to true turns on the outbound relay
  const evervault = new Evervault(process.env.EVERVAULT_API_KEY, {intercept: true});

  // Generate a mock transaction for this card
  const transaction = processTransaction(body.creditCardNumber);

  // Create the payment details object
  const paymentDetails = {
    creditCardNumber: body.creditCardNumber,
    transaction,
  }

  // Encrypt the payment details
  const encryptedPaymentDetails = await evervault.encrypt(paymentDetails);


  // Send the transaction information to be processed
  // Since intercept is turned on this will be passed through relay and decrypted on the way out
  await axios({
    method: 'post',
    url: process.env.REQUEST_ENDPOINT,
    data: encryptedPaymentDetails
  })

  // Return the encrypted transaction information to the user
  return {
    statusCode: 200,
    body: JSON.stringify(encryptedPaymentDetails),
  };
};

const processTransaction = (creditCardNumber) => {
  return {
    transactionConfirmationCode: Math.floor(Math.random() * 10000000),
    timestamp: Date.now(),
  };
}