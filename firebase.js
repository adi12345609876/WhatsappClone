import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCtXMiEgZ9BDOfYe0IQSKMrSKm_t-9crKQ",
  authDomain: "whatsappclone-64391.firebaseapp.com",
  databaseURL: "https://whatsappclone-64391-default-rtdb.firebaseio.com",
  projectId: "whatsappclone-64391",
  storageBucket: "whatsappclone-64391.appspot.com",
  messagingSenderId: "94039143120",
  appId: "1:94039143120:web:5831f0d00362ba56de24d5",
  measurementId: "G-NZF6XDJW5P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

//signInWithEmailAndPassword
export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
//createUserWithEmailAndPassword
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
