import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "zenstudio-731de.firebaseapp.com",
  projectId: "zenstudio-731de",
  storageBucket: "zenstudio-731de.appspot.com",
  messagingSenderId: "1081225143171",
  appId: "1:1081225143171:web:354f255ccef24818ba4cb6",
  measurementId: "G-40H557QPPV"
};

// Initialize Firebase only if there are no existing apps
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

// Get Firebase storage
export const storage = getStorage(app);
