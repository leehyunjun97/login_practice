// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBt_slLy39Lf6fs2sa-rNew3MbhI-Bk2W8',
  authDomain: 'montamp-be910.firebaseapp.com',
  projectId: 'montamp-be910',
  storageBucket: 'montamp-be910.appspot.com',
  messagingSenderId: '521151855932',
  appId: '1:521151855932:web:1d696c63985128b911f239',
  measurementId: 'G-8NKXTW18Z3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage(app);
