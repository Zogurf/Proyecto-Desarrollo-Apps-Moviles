// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHzE3b6t0IF4f6XStkxAL67whWGYMyiQY",
  authDomain: "login-appmovil.firebaseapp.com",
  projectId: "login-appmovil",
  storageBucket: "login-appmovil.firebasestorage.app",
  messagingSenderId: "319977886010",
  appId: "1:319977886010:web:5c7a38062c4dd867430003"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(appFirebase);

export default appFirebase; // permite usarlo en el royecto