import { initializeApp } from 'firebase/app';
import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCPsvOgob0ayTDMS9yGbkcsEwKRUlK8ykA",
  authDomain: "gowshik-garments.firebaseapp.com",
  projectId: "gowshik-garments",
  storageBucket: "gowshik-garments.firebasestorage.app",
  messagingSenderId: "564537007165",
  appId: "1:564537007165:web:a73f45806cf3118abb1e54"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Firestore persistence failed: multiple tabs open');
  } else if (err.code === 'unimplemented') {
    console.warn('Firestore persistence not supported in this browser');
  }
});
