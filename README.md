# E-Commerce Application

This is the README file for the E-Commerce Application. This document provides detailed instructions on how to set up and run the application, as well as how to change the `x-auth-token` value in the `userAuthAPIs.js` file.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Changing the x-auth-token](#changing-the-x-auth-token)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed [Node.js](https://nodejs.org/) (version 14 or higher).
- You have a code editor, such as [Visual Studio Code](https://code.visualstudio.com/).

## Installation

To install the application, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/E-Commerce Application.git
    ```

2. Navigate to the project directory:
    ```sh
    cd E-Commerce Application
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Running the Application

To run the application, use the following command:
```sh
npm start
```

The application will start, and you can access it at `http://localhost:3000`.

## Changing the x-auth-token

To change the `x-auth-token` value in the `userAuthAPIs.js` file, follow these steps:

1. Open the `userAuthAPIs.js` file located in the `src/api` directory:
    ```sh
    /src/api/userAuthAPIs.js
    ```

2. Locate the line where the `x-auth-token` is set. It should look something like this:
    ```javascript
    const token = 'your-current-token';
    ```

3. Replace `'your-current-token'` with the new token value you received from the response:
    ```javascript
    const token = 'new-token-value';
    ```

4. Save the file.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.