import {createContext, useState} from "react";

const ServicesCtx = createContext();

//Note: this is custom service hook, it is used for displaying alert messages to user,
//since react will keep repainting components according to its internal logic,
//alert messages may not be visible at correct moment or may get lost during repainting cycle of react,
//this hook ensures that such cases don't happen
/**
 * Custom hook that provides services context and a provider component.
 *
 * @returns {Object} An object containing the Services context and provider component.
 */
const useServices = () => {

	/**
	 * State to store the message.
	 * @type {[string|null, Function]}
	 */
	const [message, setMessage] = useState(null);

	/**
	 * State to store the message level.
	 * @type {[string|null, Function]}
	 */
	const [level, setLevel] = useState(null);

	/**
	 * Function to broadcast a message with a specific level.
	 *
	 * @param {string} messageBroadcast - The message to broadcast.
	 * @param {string} messageLevel - The level of the message.
	 */
	const broadcastMessage = (messageBroadcast, messageLevel) => {
		setMessage(messageBroadcast);
		setLevel(messageLevel);
	};

	return {
		/**
		 * Services context.
		 */
		ServicesCtx,

		/**
		 * Services provider component.
		 *
		 * @param {Object} props - The component props.
		 * @param {React.ReactNode} props.children - The children components.
		 * @returns {JSX.Element} The provider component.
		 */
		ServicesProvider: ({ children }) => (
			<ServicesCtx.Provider value={{ message, level, broadcastMessage }}>
				{children}
			</ServicesCtx.Provider>
		)
	};
};

export default useServices;