import firebase from 'firebase/app';
import 'firebase/auth';

// Optionally import the services that you want to use
//import {...} from "firebase/auth";
//import {...} from "firebase/database";
//import {...} from "firebase/firestore";
//import {...} from "firebase/functions";
//import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyAPKUIcTcTAUOTBDFVdqiw0HNZndW0JT5A',
  authDomain: 'chat-app-expo-68be2.firebaseapp.com',
  projectId: 'chat-app-expo-68be2',
  storageBucket: 'chat-app-expo-68be2.appspot.com',
  messagingSenderId: '828410446844',
  appId: '1:828410446844:web:502aeaf18fea020687e879',
};
let Firebase;
if (firebase.apps.length === 0) {
  Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;
