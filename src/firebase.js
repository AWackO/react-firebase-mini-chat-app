import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const app = initializeApp({
  apiKey: "AIzaSyBLRYGMy84yER778wojBbZqWKj-MfqhfeI",
  authDomain: "mini-react-chat-app-3d29a.firebaseapp.com",
  projectId: "mini-react-chat-app-3d29a",
  storageBucket: "mini-react-chat-app-3d29a.appspot.com",
  messagingSenderId: "259337581827",
  appId: "1:259337581827:web:3de9e5c063449fcc1ba536",
});

const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage();

export { db, auth, storage, app };
