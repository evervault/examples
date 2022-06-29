"use strict";

module.exports.evRelayExample = async (event) => {
  const body = JSON.parse(event.body);

  // Store the user's details in the database
  const dbRecord = storeInDatabase(body);

  // Return the database record to the user
  return {
    statusCode: 200,
    body: JSON.stringify(dbRecord),
  };
};

const storeInDatabase = ({ firstName, lastName, socialSecurityNumber }) => {
  console.log(`First Name: ${firstName}, Last Name: ${lastName}, SSN: ${socialSecurityNumber}`);

  return {
    id: 1,
    firstName,
    lastName,
    socialSecurityNumber,
  }
}