
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"


export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "shoppers-d8968.firebaseapp.com",
  projectId: "shoppers-d8968",
  storageBucket: "shoppers-d8968.appspot.com",
  messagingSenderId: "521618741899",
  appId: "1:521618741899:web:7b32773701292a1e73928e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app