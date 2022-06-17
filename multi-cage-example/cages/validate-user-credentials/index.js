const validate = require('validate.js')
const { phone: validatePhone } = require('phone')

exports.handler = async (data) => {
    var error = false, errorMessages = []
    const { isValid } = validatePhone(data.number);
    
    if (!isValid) {
	error = true;
	errorMessages.push('Invalid phone number. Must be in the form +region:number.');
    }
    
    if (validate(data, { email: { email: true} })) {
	error = true;
	errorMessages.push('Invalid email provided');
    }

    return { error, errorMessages: error ? await evervault.encrypt(errorMessages) : undefined }
};
