// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "car-marketplace-b3269.firebaseapp.com",
  projectId: "car-marketplace-b3269",
  storageBucket: "car-marketplace-b3269.appspot.com",
  messagingSenderId: "34590416985",
  appId: "1:34590416985:web:e0315a4da4d773d6b61148",
  measurementId: "G-FVEGZ5CX0E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
















// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "mern-estate-a0f6a.firebaseapp.com",
//   projectId: "mern-estate-a0f6a",
//   storageBucket: "mern-estate-a0f6a.firebasestorage.app",
//   messagingSenderId: "513817853305",
//   appId: "1:513817853305:web:c346293e8f87c1c1d9c3a8"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);