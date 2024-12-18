import {createContext, useState} from "react";
import {doLogin} from "../api/userAuthAPIs";

// Create a context for authentication
const AuthCtx = createContext();

// Note: this hook is used for auth purposes and will be saved in browser cache
const useAuthentication = () => {

	// Get initial state from local storage
	let initialState = localStorage.getItem("upgrad_eshop_logged_in_user_details");

	// Function to persist user details in local storage
	let persistInCache = (json) => {
		initialState.user = json.username;
		initialState.userId = json.userId;
		initialState.roles = json.roles;
		initialState.accessToken = json.accessToken;
		initialState.accessTokenTimeout = json.accessTokenTimeout;
		localStorage.setItem("upgrad_eshop_logged_in_user_details", JSON.stringify(initialState));
	};

	// Function to clear user details from local storage
	let clearCache = () => {
		initialState = {
			user: null,
			userId: null,
			roles: null,
			accessToken: null,
			accessTokenTimeout: null,
		};
		localStorage.setItem("upgrad_eshop_logged_in_user_details", JSON.stringify(initialState));
	};

	// Initialize state if not present in local storage or if access token is expired
	if(initialState === null || initialState === undefined) {
		initialState = {
			user: null,
			userId: null,
			roles: null,
			accessToken: null,
			accessTokenTimeout: null,
		};
	} else {
		initialState = JSON.parse(initialState);
		if(initialState.accessTokenTimeout !== null && initialState.accessTokenTimeout < Date.now()) {
			clearCache();
		}
	}

	// State variables for user details
	const [loggedInUser, setLoggedInUser] = useState(initialState.user);
	const [loggedInUserId, setLoggedInUserId] = useState(initialState.userId);
	const [roles, setRoles] = useState(initialState.roles);
	const [accessToken, setAccessToken] = useState(initialState.accessToken);
	const [accessTokenTimeout, setAccessTokenTimeout] = useState(initialState.accessTokenTimeout);
	const [loginError, setLoginError] = useState(null);

	// Function to handle user login
	const login = (email, password) => {
		let promiseResolveRef = null;
		let promiseRejectRef = null;
		let promise = new Promise((resolve, reject) => {
			promiseResolveRef = resolve;
			promiseRejectRef = reject;
		});
		doLogin(email, password).then(json => {
			setLoggedInUser(json.username);
			setLoggedInUserId(json.userId);
			setRoles(json.roles);
			setAccessToken(json.accessToken);
			setAccessTokenTimeout(json.accessTokenTimeout);
			setLoginError(null);
			persistInCache(json);
			promiseResolveRef(json);
		}).catch(json => {
			setLoggedInUser(null);
			setLoggedInUserId(null);
			setRoles(null);
			setAccessToken(null);
			setAccessTokenTimeout(null);
			setLoginError(json.reason);
			promiseRejectRef(json);
		});
		return promise;
	};

	// Function to handle user logout
	const logout = () => {
		setLoggedInUser(null);
		setLoggedInUserId(null);
		setRoles(null);
		setAccessToken(null);
		setAccessTokenTimeout(null);
		setLoginError(null);
		clearCache();
		return new Promise((resolve) => {
			resolve();
		});
	};

	// Function to check if user has a specific role
	const hasRole = (roleArray) => {
		if(roleArray === undefined || roleArray === null) {
			return true;
		}
		if(initialState.roles !== null) {
			for (let i = 0; i < initialState.roles.length; i++) {
				for (let j = 0; j < roleArray.length; j++) {
					if (initialState.roles[i] === roleArray[j]) {
						return true;
					}
				}
			}
		}
		return false;
	};

	// Function to check if access token is valid
	const isAccessTokenValid = () => {
		return !(accessTokenTimeout !== null && accessTokenTimeout < Date.now());
	};

	return {
		AuthCtx,
		AuthProvider: ({ children }) => (
			<AuthCtx.Provider value={{ loginError, loggedInUser, loggedInUserId, accessToken, accessTokenTimeout, roles, login, logout, hasRole, isAccessTokenValid }}>
				{children}
			</AuthCtx.Provider>
		)
	};
};

export default useAuthentication;