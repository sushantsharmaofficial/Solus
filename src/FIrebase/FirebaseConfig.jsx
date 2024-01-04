import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDN3WwEIFTMWv7b-Un_rOOSfOo8nr4dSOE",
  authDomain: "sharma-store-79804.firebaseapp.com",
  projectId: "sharma-store-79804",
  storageBucket: "sharma-store-79804.appspot.com",
  messagingSenderId: "432083560242",
  appId: "1:432083560242:web:8002ba722a88e7c87a592b",
};

const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };
