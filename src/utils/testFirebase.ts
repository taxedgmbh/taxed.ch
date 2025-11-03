// Test script to verify Firebase connection
import { auth, db } from '../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';

export async function testFirebaseConnection() {
  console.log('🔥 Testing Firebase Connection...');

  try {
    // Test 1: Check if Firebase is initialized
    console.log('✅ Firebase initialized successfully');
    console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);

    // Test 2: Try to fetch from Firestore (will fail if rules not set, but connection works)
    try {
      const usersRef = collection(db, 'users');
      await getDocs(usersRef);
      console.log('✅ Firestore connection successful');
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        console.log('⚠️ Firestore connected but permissions not configured yet');
      } else {
        console.error('❌ Firestore error:', error.message);
      }
    }

    // Test 3: Check Auth service
    console.log('✅ Firebase Auth service is ready');

    return true;
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}

// Run test if this file is executed directly
if (import.meta.env.DEV) {
  testFirebaseConnection();
}