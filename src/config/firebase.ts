// Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getFunctions, type Functions } from 'firebase/functions';
import type { FirebaseApp } from 'firebase/app';

// Environment variables override the committed defaults. The web config is
// public by design (it ships in every served JS bundle); access control is
// enforced by Firebase security rules, not by hiding these values. The
// defaults keep CI builds (no .env on the runner) fully functional.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDlUxpc-zb-f9rStzwnLbMzbD1mfgnSeu0',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'taxedgmbh.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'taxedgmbh',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'taxedgmbh.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '1041568476163',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:1041568476163:web:4740e7522f72f5568a7236',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase defensively: a bad or missing configuration must
// degrade Firebase-backed features, never blank the whole site.
let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;
let functions: Functions | undefined;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  functions = getFunctions(app);
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('Firebase initialization failed — continuing without Firebase:', error);
}

export { auth, db, storage, functions };
export default app;
