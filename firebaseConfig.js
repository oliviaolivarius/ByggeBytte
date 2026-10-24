import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBk1E9SzxhtH4cZ0MwCfwuiTONL1NvBz8s',
  authDomain: 'inno---byggebytte.firebaseapp.com',
  projectId: 'inno---byggebytte',
  storageBucket: 'inno---byggebytte.firebasestorage.app',
  messagingSenderId: '161335311000',
  appId: '1:161335311000:web:d949889a7bfef77c406eed',
  measurementId: 'G-WHZ8Z6HVMQ',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { app };