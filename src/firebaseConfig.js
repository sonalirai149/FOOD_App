import { initializeApp } from "firebase/app";
import { getAuth,getAnalytics } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDE2vioRrkW9ESu6pGEF7eCoii0ImmUWvc",
    authDomain: "foodapp-f524a.firebaseapp.com",
    projectId: "foodapp-f524a",
    storageBucket: "foodapp-f524a.firebasestorage.app",
    messagingSenderId: "992989756418",
    appId: "1:992989756418:web:a928364fec4e55bba5fb1b",
    measurementId: "G-FYWDC3Z52F"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
