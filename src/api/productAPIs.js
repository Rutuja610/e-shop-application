// Rest APIs for product

// Function to fetch all products
export const fetchAllProducts = (accessToken) => {
	// Create a new promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	// Make a GET request to fetch all products
	fetch('https://dev-project-ecommerce.upgrad.dev/api/products', {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken, // Set the access token in the headers
		},
	}).then((response) => {
		// Parse the response as JSON
		response.json().then((json) => {
			if(response.ok) {
				// Resolve the promise with the response data if successful
				promiseResolveRef({
					data: json,
					response: response,
				});
			} else {
				// Reject the promise with an error message if not successful
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		// Reject the promise if an error occurs during the fetch
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise; // Return the promise
};

// Function to create a new product
export const createProduct = (requestJson, accessToken) => {
	// Create a new promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	// Make a POST request to create a new product
	fetch('https://dev-project-ecommerce.upgrad.dev/api/products', {
		method: 'POST',
		body: JSON.stringify(requestJson), // Set the request body
		headers: {
			'Content-type': 'application/json; charset=UTF-8', // Set the content type
			'x-auth-token': accessToken, // Set the access token in the headers
		},
	}).then((response) => {
		// Parse the response as text
		response.text().then((json) => {
			if(response.ok) {
				// Resolve the promise with a success message if successful
				promiseResolveRef({
					message: "Product " + requestJson.name + " added successfully.",
					response: response,
				});
			} else {
				// Reject the promise with an error message if not successful
				let message = json.message;
				if(message === undefined || message === null) {
					message = "Server error occurred. Please try again.";
				}
				promiseRejectRef({
					reason: message,
					response: response,
				});
			}
		});
	}).catch((err) => {
		// Reject the promise if an error occurs during the fetch
		promiseRejectRef({
			reason: "Some error occurred. Please try again.",
			response: err,
		});
	});
	return promise; // Return the promise
};

// Function to delete a product
export const deleteProduct = (id, accessToken) => {
	// Create a new promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	// Make a DELETE request to delete a product
	fetch('https://dev-project-ecommerce.upgrad.dev/api/products/'+id, {
		method: 'DELETE',
		headers: {
			'x-auth-token': accessToken, // Set the access token in the headers
		},
	}).then((response) => {
		// Parse the response as text
		response.text().then(() => {
			if(response.ok) {
				// Resolve the promise if successful
				promiseResolveRef({
					response: response,
				});
			} else {
				// Reject the promise with an error message if not successful
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		// Reject the promise if an error occurs during the fetch
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise; // Return the promise
};

// Function to modify a product
export const modifyProduct = (requestJson, accessToken) => {
	// Create a new promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	// Make a PUT request to modify a product
	fetch('https://dev-project-ecommerce.upgrad.dev/api/products/' + requestJson.id, {
		method: 'PUT',
		body: JSON.stringify(requestJson), // Set the request body
		headers: {
			'Content-type': 'application/json; charset=UTF-8', // Set the content type
			'x-auth-token': accessToken, // Set the access token in the headers
		},
	}).then((response) => {
		// Parse the response as text
		response.text().then((json) => {
			if(response.ok) {
				// Resolve the promise with a success message if successful
				promiseResolveRef({
					message: "Product " + requestJson.name + " modified successfully.",
					response: response,
				});
			} else {
				// Reject the promise with an error message if not successful
				let message = json.message;
				if(message === undefined || message === null) {
					message = "Server error occurred. Please try again.";
				}
				promiseRejectRef({
					reason: message,
					response: response,
				});
			}
		});
	}).catch((err) => {
		// Reject the promise if an error occurs during the fetch
		promiseRejectRef({
			reason: "Some error occurred. Please try again.",
			response: err,
		});
	});
	return promise; // Return the promise
};

// Function to view a product
export const viewProduct = (id, accessToken) => {
	// Create a new promise
	let promiseResolveRef = null;
	let promiseRejectRef = null;
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});
	// Make a GET request to view a product
	fetch('https://dev-project-ecommerce.upgrad.dev/api/products/'+id, {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken, // Set the access token in the headers
		},
	}).then((response) => {
		// Parse the response as JSON
		response.json().then((json) => {
			if(response.ok) {
				// Resolve the promise with the response data if successful
				promiseResolveRef({
					value: json,
					response: response,
				});
			} else {
				// Reject the promise with an error message if not successful
				promiseRejectRef({
					reason: "Server error occurred.",
					response: response,
				});
			}
		});
	}).catch((err) => {
		// Reject the promise if an error occurs during the fetch
		promiseRejectRef({
			reason: "Some error occurred.",
			response: err,
		});
	});
	return promise; // Return the promise
};