import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
 
const firebaseConfig = {

    apiKey: "AIzaSyDXEAnwJrQYeTn1QXlGrnwAWtQG8HrMsDk",
  
    authDomain: "blog-12e8f.firebaseapp.com",
  
    projectId: "blog-12e8f",
  
    storageBucket: "blog-12e8f.appspot.com",
  
    messagingSenderId: "434922222007",
  
    appId: "1:434922222007:web:0a03a49e48ecff41f7b832"
  
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const FirebaseAuth = getAuth(app);

export {FirebaseAuth}