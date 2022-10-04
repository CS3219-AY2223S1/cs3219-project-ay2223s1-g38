// eslint-disable-next-line no-undef
const URI_USER_SVC = process.env.URI_USER_SVC || "http://localhost:8000";

const PREFIX_USER_SVC = "/api/user";

const CREATE_USER_SVC = "/createUser";
const LOGIN_SVC = "/login";

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_CREATE_USER_SVC =  URI_USER_SVC + PREFIX_USER_SVC + CREATE_USER_SVC;
export const URL_LOGIN_SVC = URI_USER_SVC + PREFIX_USER_SVC + LOGIN_SVC;

export const firebaseConfig = {
	apiKey: "AIzaSyCK_0eJ03LOYFjRfoMvwQ7ZfZBg5mTxQXA",
	authDomain: "cs3219-algohike.firebaseapp.com",
	projectId: "cs3219-algohike",
	storageBucket: "cs3219-algohike.appspot.com",
	messagingSenderId: "903233715776",
	appId: "1:903233715776:web:af225c16214c2e773729a5",
	measurementId: "G-E0TQJS6QEH"
};
