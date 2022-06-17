const Evervault = requrie('@evervault/sdk')

const evervault = new Evervault(process.env.EVERVAULT_API_KEY, {intercept: true})

module.exports.handleRequest = async (event) => {
    const body = JSON.parse(event.body)
    var result;
    
    if ('validate-user-credentials' == body.action) {
	result = await evervault.run(process.env.VALIDATE_USER_CREDENTIALS_CAGE, body);
    } else if ('check-entitlements' == body.action) {
	result = await evervault.run(process.env.CHECK_ENTITLEMENTS_CAGE, body);
    } else {
	return { statusCode: 400, errorMessages: ["Illegal Operation"] };
    }

    return {
	statusCode: result.error ? 501 : 200,
	body: JSON.stringify(result.result)
    }
}
