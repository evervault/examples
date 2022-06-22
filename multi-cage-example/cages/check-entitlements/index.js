const axios = require('axios')

exports.handler = async (data) => {
  const minimumAge = 20;
  const maximumAge = 50;
  
  const { age, ailments } = data;

  var error = false, errorMessages = [], entitlement = 0;
  
  if (age === undefined || ailments === undefined) {
    error = true;
    errorMessages = ['Must include age and ailments in request'];
  } else if (minimumAge < age && maximumAge > age) {
    entitlement = (maximumAge - age) / (ailments.length + 1) * 10000;
  } else {
    error = true;
    errorMessages = [`Must be between ${minimumAge} and ${maximumAge} to qualify for the pension`];
  }
  
  return await evervault.encrypt({
    error,
    errorMessages: error ? errorMessages : undefined,
    result: error ? undefined : {
      entitlement: entitlement
    }
  });
};
