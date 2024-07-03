// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYGMLAGCVvHJfka7UfvIwz7MYoe6x_DhU",
  authDomain: "foodorder-38770.firebaseapp.com",
  projectId: "foodorder-38770",
  storageBucket: "foodorder-38770.appspot.com",
  messagingSenderId: "900323721054",
  appId: "1:900323721054:web:a231fe63b7fa832518d9cf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);