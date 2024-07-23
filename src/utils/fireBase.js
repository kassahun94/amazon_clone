
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth";

//  web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAZc2z_v5Mk7evVJbcwL1b0Cc0hMpoH88o",
	authDomain: "clone-658b4.firebaseapp.com",
	projectId: "clone-658b4",
	storageBucket: "clone-658b4.appspot.com",
	messagingSenderId: "411292029312",
	appId: "1:411292029312:web:50a55eaca910aa3f047165",
	measurementId: "G-KS1HG1FW7S",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = app.firestore();