/* eslint-disable no-undef */
const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";

const PREFIX_USER_SVC = "/api/user";

const CREATE_USER_SVC = "/createUser";
const LOGIN_SVC = "/login";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_CREATE_USER_SVC =  URI_USER_SVC + PREFIX_USER_SVC + CREATE_USER_SVC;
export const URL_LOGIN_SVC = URI_USER_SVC + PREFIX_USER_SVC + LOGIN_SVC;

export const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID
};

export default firebaseConfig; 
