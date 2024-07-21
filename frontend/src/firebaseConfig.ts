// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { FirebaseStorage, getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCrWd1y0DN9B4ayY7Z1_VGiD2gl3wXIi78',
  authDomain: 'innomarket-b4f82.firebaseapp.com',
  databaseURL:
    'https://innomarket-b4f82-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'innomarket-b4f82',
  storageBucket: 'innomarket-b4f82.appspot.com',
  messagingSenderId: '104332412839',
  appId: '1:104332412839:web:55fc04b9f0d76d3eb2d882',
  measurementId: 'G-5K84JSREFN'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export { app, storage };
