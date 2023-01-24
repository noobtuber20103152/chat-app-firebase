
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// GoogleAuthProvider
const firebaseConfig = {
    apiKey: "AIzaSyAAZQx94ovVQEHsd0nf8ZZS86OQ1u0LxEI",
    authDomain: "whatschat-efe39.firebaseapp.com",
    projectId: "whatschat-efe39",
    storageBucket: "whatschat-efe39.appspot.com",
    messagingSenderId: "267323770571",
    appId: "1:267323770571:web:f5e06676fb43c430757d4e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const authes = 
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
export { auth, db, provider };
