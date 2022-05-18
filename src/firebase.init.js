import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR8T0NGapqk6KPZfTmYyI9KsUtdKzGPbw",
  authDomain: "to-do-app-904b4.firebaseapp.com",
  projectId: "to-do-app-904b4",
  storageBucket: "to-do-app-904b4.appspot.com",
  messagingSenderId: "276360677541",
  appId: "1:276360677541:web:0684bcb592ede99b95a54c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;