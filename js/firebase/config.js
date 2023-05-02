// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-analytics.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA7w4o1JdDCXyRPRoAMbfTraYIYSkXR6eE',
  authDomain: 'number-seek.firebaseapp.com',
  projectId: 'number-seek',
  storageBucket: 'number-seek.appspot.com',
  messagingSenderId: '206625503131',
  appId: '1:206625503131:web:5be84396f95207b009933e',
  measurementId: 'G-2P7GRYQE4W',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
const analytics = getAnalytics(app)
