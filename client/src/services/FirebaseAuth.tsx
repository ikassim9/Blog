import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 

const firebaseConfig = {

    apiKey: process.env.REACT_APP_API_KEY,
  
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  
    projectId: process.env.REACT_APP_PROJECT_ID,
  
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  
    appId: process.env.REACT_APP_FIREBASEID,
  
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const FirebaseAuth = getAuth(app);

export {FirebaseAuth}