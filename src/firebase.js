import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAZnQa9sbJGlGSMozYABpBYco5Ef9ivYdU",
  authDomain: "formularoexpo.firebaseapp.com",
  projectId: "formularoexpo",
  storageBucket: "formularoexpo.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "95732731911",
  appId: "1:95732731911:web:f50c172130cf5e1f3a1aa2",
  measurementId: "G-Y5DQLX07DV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, serverTimestamp }; // Added serverTimestamp export