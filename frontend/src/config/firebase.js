import { initializeApp } from "firebase/app";

import "firebase/auth";
import { getAuth } from "firebase/auth";

import  { firebaseConfig } from "./config";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;