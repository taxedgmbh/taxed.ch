import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { User } from '../types/admin';

interface ClientAuthContextType {
  currentUser: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const ClientAuthContext = createContext<ClientAuthContextType | undefined>(undefined);

export const useClientAuth = () => {
  const context = useContext(ClientAuthContext);
  if (!context) {
    throw new Error('useClientAuth must be used within ClientAuthProvider');
  }
  return context;
};

// Firebase is deliberately loaded via dynamic import so the ~113KB (gzip)
// vendor-firebase chunk stays out of the initial bundle. Public pages render
// without it; auth restores during browser idle time, and login() pulls it
// on demand.
const loadFirebase = async () => {
  const [{ auth, db }, authMod, firestoreMod] = await Promise.all([
    import('../config/firebase'),
    import('firebase/auth'),
    import('firebase/firestore')
  ]);
  return {
    auth,
    db,
    signInWithEmailAndPassword: authMod.signInWithEmailAndPassword,
    signOut: authMod.signOut,
    onAuthStateChanged: authMod.onAuthStateChanged,
    doc: firestoreMod.doc,
    getDoc: firestoreMod.getDoc
  };
};

const scheduleIdle = (callback: () => void): (() => void) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 4000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 2000);
  return () => clearTimeout(id);
};

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    const cancelIdle = scheduleIdle(async () => {
      try {
        const fb = await loadFirebase();
        if (cancelled || !fb.auth || !fb.db) {
          setLoading(false);
          return;
        }
        unsubscribe = fb.onAuthStateChanged(fb.auth, async (user) => {
          if (user) {
            setFirebaseUser(user);
            try {
              const userDoc = await fb.getDoc(fb.doc(fb.db!, 'users', user.uid));
              if (userDoc.exists()) {
                const userData = userDoc.data() as User;
                // Only allow customers to access the client portal
                if (userData.role === 'customer') {
                  setCurrentUser({ ...userData, id: user.uid });
                } else {
                  await fb.signOut(fb.auth!);
                  setCurrentUser(null);
                  setFirebaseUser(null);
                }
              }
            } catch (error) {
              console.error('Error fetching user data:', error);
              setCurrentUser(null);
            }
          } else {
            setCurrentUser(null);
            setFirebaseUser(null);
          }
          setLoading(false);
        });
      } catch (error) {
        console.error('Deferred Firebase load failed:', error);
        setLoading(false);
      }
    });

    return () => {
      cancelled = true;
      cancelIdle();
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const fb = await loadFirebase();
    if (!fb.auth || !fb.db) {
      throw new Error('Authentication is temporarily unavailable. Please try again.');
    }
    try {
      const userCredential = await fb.signInWithEmailAndPassword(fb.auth, email, password);

      // Check if user has customer role
      const userDoc = await fb.getDoc(fb.doc(fb.db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data() as User;
        if (userData.role !== 'customer') {
          await fb.signOut(fb.auth);
          throw new Error('Access denied. This portal is for customers only. Please use the admin portal if you are an expert or admin.');
        }
      } else {
        await fb.signOut(fb.auth);
        throw new Error('User data not found.');
      }
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        throw new Error('No user found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Incorrect password.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Invalid email address.');
      } else {
        throw error;
      }
    }
  };

  const logout = async () => {
    const fb = await loadFirebase();
    if (!fb.auth) return;
    try {
      await fb.signOut(fb.auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value: ClientAuthContextType = {
    currentUser,
    firebaseUser,
    loading,
    login,
    logout
  };

  return (
    <ClientAuthContext.Provider value={value}>
      {children}
    </ClientAuthContext.Provider>
  );
};
