import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBCw6BH3dqMAqQq1n8ykjLGiWOOgzsREPU",
  authDomain: "anime-bond.firebaseapp.com",
  projectId: "anime-bond",
  storageBucket: "anime-bond.firebasestorage.app",
  messagingSenderId: "866095061882",
  appId: "1:866095061882:web:bb1d0103853a0eba7214c3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
auth.languageCode = "en";
// export const db = getFireStore(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
