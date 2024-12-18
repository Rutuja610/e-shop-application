// Rest APIs for category

// Function to fetch all categories
export const fetchAllCategories = (accessToken) => {
	// Initialize references for promise resolution and rejection
	let promiseResolveRef = null;
	let promiseRejectRef = null;

	// Create a new promise
	let promise = new Promise((resolve, reject) => {
		promiseResolveRef = resolve;
		promiseRejectRef = reject;
	});

	// Make a GET request to fetch categories
	fetch('https://dev-project-ecommerce.upgrad.dev/api/products/categories', {
		method: 'GET',
		headers: {
			'x-auth-token': accessToken, // Set the authorization token in headers
		},
	}).then((response) => {
		// Parse the response as JSON
		response.json().then((json) => {
			// Capitalize every category and ensure uniqueness
			let arr = [];
			for(let i = 0; i < json.length; i++) {
				let c = json[i].toUpperCase(); // Convert category to uppercase
				if(!arr.includes(c)) {
					arr.push(c); // Add unique categories to the array
				}
			}
			arr.sort(); // Sort the categories alphabetically
			arr = ["ALL", ...arr]; // Add "ALL" at the beginning of the array

			// Resolve or reject the promise based on the response status
			if(response.ok) {
				promiseResolveRef({
					data: arr, // Return the processed categories
					response: response,
				});
			} else {
				promiseRejectRef({
					reason: "Server error occurred.", // Error message for server error
					response: response,
				});
			}
		});
	}).catch((err) => {
		// Handle any errors that occur during the fetch
		promiseRejectRef({
			reason: "Some error occurred.", // Error message for fetch error
			response: err,
		});
	});

	// Return the promise
	return promise;
};