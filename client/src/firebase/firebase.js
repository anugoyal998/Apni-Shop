import firebase from "firebase";
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDnsWyS8x8hARDdLpcHQrIlc2KonqunJXk",
  authDomain: "apni-shop-322111.firebaseapp.com",
  projectId: "apni-shop-322111",
  storageBucket: "apni-shop-322111.appspot.com",
  messagingSenderId: "356761217916",
  appId: "1:356761217916:web:320a91aac72bd1f0f5d2f9",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
