// import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyBt7yXCgeCV0a3JXPOGmDDgk2fzLSEQUP8",
  authDomain: "irawo-7ec8b.firebaseapp.com",
  projectId: "irawo-7ec8b",
  storageBucket: "irawo-7ec8b.appspot.com",
  messagingSenderId: "649238854497",
  appId: "1:649238854497:web:6e26348064636174d16320"
};


const app = firebase.initializeApp(firebaseConfig);

export default app