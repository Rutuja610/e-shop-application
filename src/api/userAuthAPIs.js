// Importing jwt_decode library to decode JWT tokens
import jwt_decode from "jwt-decode";

// Function to handle user login
/**
 * Performs user login by making a POST request to the login API.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves with user details if login is successful, or rejects with an error message if login fails.
 *
 * @example
 * doLogin('user@example.com', 'password123')
 *   .then(user => {
 *     console.log('Login successful:', user);
 *   })
 *   .catch(error => {
 *     console.error('Login failed:', error);
 *   });
 */
export const doLogin = (email, password) => {
  let promiseResolveRef = null; // Reference to resolve the promise
  let promiseRejectRef = null; // Reference to reject the promise
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve; // Assign resolve function to reference
    promiseRejectRef = reject; // Assign reject function to reference
  });

  // Making a POST request to the login API
  fetch("https://dev-project-ecommerce.upgrad.dev/api/auth/signin", {
    method: "POST",
    body: JSON.stringify({
      username: email, // Sending email as username
      password: password, // Sending password
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Setting content type to JSON
    },
  })
    .then((response) => {
      response
        .json()
        .then((json) => {
          if (response.ok) {
            // If response is successful
            let token =
              "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBkZW1vLmNvbSIsImlhdCI6MTczNDUzMjU3NCwiZXhwIjoxNzM0NTQwOTc0fQ.dK6CANh9aoW4zlO-yi8Kmzs1I-ZJekP4iiOQVdhdQbyKzqqGE5hCHNkPtps8UnMkOzuxsdJOdHdViSgGFJB3rw"; // change this token to yours

            let decoded = jwt_decode(token); // Decoding the JWT token
            promiseResolveRef({
              username: json.email, // User email
              accessToken: token, // Access token
              accessTokenTimeout: decoded.exp * 1000, // Token expiration time in epoch
              roles: json.roles, // User roles
              userId: json.id, // User ID
              response: response, // Original response
            });
          } else {
            // If response is not successful
            promiseRejectRef({
              reason: "Server error occurred. Please try again.", // Error message
              response: response, // Original response
            });
          }
        })
        .catch((error) => {
          // Handling JSON parsing errors
          promiseRejectRef({
            reason: "Bad Credentials. Please try again.", // Error message
            response: error, // Error object
          });
        });
    })
    .catch((err) => {
      // Handling network errors
      promiseRejectRef({
        reason: "Some error occurred. Please try again.", // Error message
        response: err, // Error object
      });
    });

  return promise; // Returning the promise
};

// Function to handle user signup
export const doSignup = (requestJson) => {
  let promiseResolveRef = null; // Reference to resolve the promise
  let promiseRejectRef = null; // Reference to reject the promise
  let promise = new Promise((resolve, reject) => {
    promiseResolveRef = resolve; // Assign resolve function to reference
    promiseRejectRef = reject; // Assign reject function to reference
  });

  // Making a POST request to the signup API
  fetch("https://dev-project-ecommerce.upgrad.dev/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(requestJson), // Sending request JSON
    headers: {
      "Content-type": "application/json; charset=UTF-8", // Setting content type to JSON
    },
  })
    .then((response) => {
      response
        .json()
        .then((json) => {
          if (response.ok) {
            // If response is successful
            promiseResolveRef({
              message: json.message, // Success message
              response: response, // Original response
            });
          } else {
            // If response is not successful
            let message = json.message;
            if (message === undefined || message === null) {
              message = "Server error occurred. Please try again."; // Default error message
            }
            promiseRejectRef({
              reason: message, // Error message
              response: response, // Original response
            });
          }
        })
        .catch((err) => {
          // Handling JSON parsing errors
          promiseRejectRef({
            reason: "Some error occurred. Please try again.", // Error message
            response: err, // Error object
          });
        });
    })
    .catch((err) => {
      // Handling network errors
      promiseRejectRef({
        reason: "Some error occurred. Please try again.", // Error message
        response: err, // Error object
      });
    });

  return promise; // Returning the promise
};
