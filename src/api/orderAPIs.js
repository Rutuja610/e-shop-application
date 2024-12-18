//Rest APIs for order

/**
 * Creates an order by sending a POST request to the specified API endpoint.
 * 
 * @param {Object} requestJson - The JSON object containing order details.
 * @param {string} accessToken - The access token for authentication.
 * @returns {Promise<Object>} - A promise that resolves with the response object on success, or rejects with an error message and response object on failure.
 * 
 * @example
 * createOrder(orderDetails, token)
 *   .then(response => {
 *     console.log('Order created successfully:', response);
 *   })
 *   .catch(error => {
 *     console.error('Error creating order:', error);
 *   });
 */
export const createOrder = (requestJson, accessToken) => {
	//Note: we are returning promise so that we can resolve it by using appropriate data type like json or text
	//caller of the function should only be concerned with returned data on success or failure message
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	fetch('https://dev-project-ecommerce.upgrad.dev/api/orders', {
		method: 'POST',
		body: JSON.stringify(requestJson),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
			'x-auth-token': accessToken,
		},
	}).then((response) => {
		response.text().then(() => {
			if(response.ok) {
				promiseResolveRef({
					response: response,
				});
			} else {
				promiseRejectRef({
					reason: "Some error occurred. Please try again.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		promiseRejectRef({
			reason: "Server error occurred. Please try again.",
			response: err,
		});
	});
	return promise;
};