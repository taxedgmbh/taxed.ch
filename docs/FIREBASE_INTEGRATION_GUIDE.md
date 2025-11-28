# Firebase Integration Guide - Client Portal for Taxed.ch

## 📊 Current Situation Analysis

### ✅ What Already Exists

**iOS App (TaxedGmbH_IOS):**
- **Fully functional Firebase setup** with authentication, Firestore, Storage
- **Complete data models** for Users, Tax Documents, Workspaces, Chat, etc.
- **Firestore database:** `taxedgmbh` (project ID)
- **Storage buckets:** `taxedgmbh.firebasestorage.app` and `taxedgmbh.appspot.com`
- **Firebase Authentication** with email/password

**Website (taxed.ch):**
- **Admin Portal:** ✅ Already uses Firebase (experts/admins only)
- **Client Portal:** ❌ Just a UI mockup, not connected to Firebase

---

## 🔥 Firebase Configuration

### Project Details

**From iOS App (`GoogleService-Info.plist`):**
```xml
Project ID: taxedgmbh
API Key: AIzaSyAeVchuS_dJW1NuMBLAVDM-jgM3hQFw53E
Auth Domain: taxedgmbh.firebaseapp.com (inferred)
Storage Bucket: taxedgmbh.firebasestorage.app
Messaging Sender ID: 1041568476163
App ID: 1:1041568476163:ios:1c704617fbfbbb2c8a7236
Database URL: https://taxedgmbh-default-rtdb.europe-west1.firebasedatabase.app
```

**Current Web Config (`src/config/firebase.ts`):**
```typescript
// Using environment variables (not yet set)
apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "your-api-key"
authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "your-auth-domain"
projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "your-project-id"
```

---

## 🗄️ Firestore Database Structure

### Collections Used by iOS App

#### 1. `users` Collection
**Purpose:** User profiles for customers, experts, and admins

**Schema:**
```typescript
{
  id: string (Firebase UID)
  email: string
  emailVerified: boolean
  name: string
  role: "customer" | "expert" | "admin"
  phone?: string

  // Tax Information
  person1Name?: string
  person1AhvNumber?: string
  person2Name?: string  // For joint filing
  person2AhvNumber?: string
  canton?: string
  municipality?: string
  municipalityId?: string
  maritalStatus?: "single" | "married" | "divorced" | "widowed" | "registered_partnership"
  numberOfChildren?: number

  // Address
  street?: string
  postalCode?: string
  city?: string

  // Expert assignment
  assignedExpertId?: string

  // Workspace
  workspaceIds?: string[]
  activeWorkspaceId?: string

  // Versioning
  profileVersion: number
  profileLastUpdatedAt: Date

  createdAt: Date
  updatedAt: Date
  lastLoginAt?: Date
}
```

**Security Rules:**
- Users can only read/write their own profile
- Authentication required

---

#### 2. `documents` Collection
**Purpose:** Tax documents uploaded by customers

**Schema:**
```typescript
{
  id: string (auto-generated)
  customerId: string (user UID)
  workspaceId?: string
  expertId?: string

  // File Info
  name: string
  originalFilename?: string
  storageUrl: string  // Firebase Storage path
  thumbnailUrl?: string
  fileSize?: number
  mimeType?: string
  pageCount?: number

  // AI Classification
  category: "income" | "deduction" | "pillar" | "wealth" | "liabilities" |
            "foreignIncome" | "foreignPension" | "foreignWealth" | "taxTreaty" |
            "foreignTax" | "uncategorized"
  subcategory?: string
  aiConfidence?: number
  extractedText?: string
  aiSummary?: string

  // Status
  status: "uploading" | "processing" | "pending" | "reviewed" | "approved" | "rejected"
  workflowStatus?: "uploading" | "processing" | "pendingClassification" | "classified" |
                   "pendingReview" | "reviewed" | "approved" | "coverGenerated" |
                   "finalized" | "submitted" | "rejected"

  // Tax Info
  taxYear: number
  canton?: string
  municipality?: string
  amount?: number
  currency?: string

  // Notes
  expertNotes?: string
  userNotes?: string

  // Foreign Currency
  originalAmount?: number
  foreignCurrency?: string
  exchangeRate?: number
  exchangeRateType?: "mid_year" | "year_end" | "custom"

  // Timestamps
  uploadedAt: Date
  processedAt?: Date
  reviewedAt?: Date
  updatedAt: Date

  // PDF Generation
  coverSheetUrl?: string
  processedDocumentUrl?: string
  pdfGenerationStatus?: "pending" | "generating" | "completed" | "failed"
  needsRegeneration?: boolean
}
```

**Security Rules:**
- Customers can read/write their own documents
- Experts can read documents assigned to them
- Queries filtered by `customerId`

---

#### 3. `chats` Collection
**Purpose:** Real-time messaging between customer and expert

**Schema:**
```typescript
{
  id: string
  customerId: string
  expertId: string
  lastMessage?: string
  lastMessageAt?: Date
  unreadCount?: number
  createdAt: Date
  updatedAt: Date
}
```

**Sub-collection: `chats/{chatId}/messages`**
```typescript
{
  id: string
  senderId: string
  senderRole: "customer" | "expert"
  message: string
  sentAt: Date
  isRead: boolean
}
```

**Security Rules:**
- Customer/Expert can only access chats where they are participants
- List queries allowed for authenticated users

---

#### 4. `workspaces` Collection
**Purpose:** Collaborative tax filing (shared access to documents)

**Schema:**
```typescript
{
  id: string
  name: string
  ownerId: string
  memberIds: string[]  // All members with access
  taxYear: number
  canton?: string
  createdAt: Date
  updatedAt: Date
}
```

**Security Rules:**
- Members can read workspaces where they are in `memberIds`
- Only owner can delete

---

#### 5. `notifications` Collection
**Purpose:** User notifications

**Schema:**
```typescript
{
  id: string
  userId: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: Date
}
```

---

## 🔐 Authentication Flow

### Current Admin Portal (Working)

1. User enters email/password
2. `signInWithEmailAndPassword()` via Firebase Auth
3. Fetch user from `users/{uid}` collection
4. Check `role` field (only "expert" or "admin" allowed)
5. Store in `AdminAuthContext`

### Proposed Client Portal (To Build)

**Same flow, but allow "customer" role:**

1. User enters email/password on `/client-portal/login`
2. `signInWithEmailAndPassword()` via Firebase Auth
3. Fetch user from `users/{uid}` collection
4. Check `role === "customer"`
5. Store in `ClientAuthContext` (new context)
6. Redirect to `/client-portal/dashboard`

---

## 🚀 Implementation Plan

### Phase 1: Connect Web App to Firebase

**Step 1: Update Firebase Config**

Create `.env` file in root:
```bash
VITE_FIREBASE_API_KEY=AIzaSyAeVchuS_dJW1NuMBLAVDM-jgM3hQFw53E
VITE_FIREBASE_AUTH_DOMAIN=taxedgmbh.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=taxedgmbh
VITE_FIREBASE_STORAGE_BUCKET=taxedgmbh.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=1041568476163
VITE_FIREBASE_APP_ID=1:1041568476163:web:YOUR_WEB_APP_ID
```

**Note:** Need to register web app in Firebase Console to get web-specific App ID.

---

### Phase 2: Create Client Authentication Context

**File:** `src/contexts/ClientAuthContext.tsx`

```typescript
import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

interface ClientAuthContextType {
  currentUser: User | null;
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

export const ClientAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as User;
          // Only allow customers
          if (userData.role === 'customer') {
            setCurrentUser({ ...userData, id: firebaseUser.uid });
          } else {
            await signOut(auth);
            setCurrentUser(null);
          }
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      if (userData.role !== 'customer') {
        await signOut(auth);
        throw new Error('Access denied. This portal is for customers only.');
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <ClientAuthContext.Provider value={{ currentUser, loading, login, logout }}>
      {children}
    </ClientAuthContext.Provider>
  );
};
```

---

### Phase 3: Create Client Login Page

**File:** `src/pages/ClientLoginPage.tsx`

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const ClientLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useClientAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/client-portal/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Client Portal Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ClientLoginPage;
```

---

### Phase 4: Update Client Portal Dashboard

**File:** `src/components/ClientPortal.tsx` (rewrite to fetch real data)

```typescript
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ClientPortal = () => {
  const { currentUser } = useClientAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      if (!currentUser?.id) return;

      const q = query(
        collection(db, 'documents'),
        where('customerId', '==', currentUser.id),
        orderBy('uploadedAt', 'desc'),
        limit(10)
      );

      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setDocuments(docs);
      setLoading(false);
    };

    fetchDocuments();
  }, [currentUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Welcome, {currentUser?.name}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{documents.length}</p>
              <p className="text-sm text-gray-600">Total uploaded</p>
            </CardContent>
          </Card>

          {/* Add more summary cards */}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Recent Documents</h2>
          {documents.map(doc => (
            <div key={doc.id} className="border-b py-3">
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-gray-600">
                {doc.category} • {new Date(doc.uploadedAt?.toDate()).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
```

---

### Phase 5: Protected Routes

**File:** `src/components/ProtectedRoute.tsx`

```typescript
import { Navigate } from 'react-router-dom';
import { useClientAuth } from '@/contexts/ClientAuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useClientAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/client-portal/login" />;
  }

  return children;
};

export default ProtectedRoute;
```

**Update `src/App.jsx`:**
```typescript
import ClientAuthProvider from '@/contexts/ClientAuthContext';
import ClientLoginPage from '@/pages/ClientLoginPage';
import ProtectedRoute from '@/components/ProtectedRoute';

// In Routes:
<Route path="/client-portal/login" element={<ClientLoginPage />} />
<Route
  path="/client-portal"
  element={
    <ProtectedRoute>
      <ClientPortalPage />
    </ProtectedRoute>
  }
/>
```

---

## 🔒 Security Considerations

### Current Issues

1. **Backend PHP API (`backend/client-portal.php`):**
   - Uses MySQL database (`u497646184_taxedgmbh`)
   - **Not connected to Firebase**
   - Would need complete rewrite to use Firestore

2. **Decision: Use Firebase Only**
   - iOS app already uses Firebase exclusively
   - No need for duplicate MySQL database
   - Firestore provides real-time updates
   - Firebase Storage for documents

### Firestore Security Rules

**Current rules (from iOS project):**
```javascript
match /documents/{documentId} {
  allow get: if isAuthenticated() && isOwner(resource.data.customerId);
  allow list: if isAuthenticated();
  allow create: if isAuthenticated() && isOwner(request.resource.data.customerId);
  allow update, delete: if isAuthenticated() && isOwner(resource.data.customerId);
}
```

**These rules are already perfect for web client portal!**

---

## 📦 Firebase Storage

### Document Upload Flow

1. User selects file in browser
2. Upload to Firebase Storage: `documents/{customerId}/{taxYear}/{filename}`
3. Get download URL
4. Create Firestore document with `storageUrl`
5. Trigger Cloud Function (optional) for AI classification

**Storage Rules (from iOS project):**
```javascript
match /documents/{customerId}/{taxYear}/{filename} {
  allow read: if request.auth != null && request.auth.uid == customerId;
  allow write: if request.auth != null && request.auth.uid == customerId;
}
```

---

## 🎯 Next Steps

### Immediate (To Make Client Portal Work)

1. **Register Web App in Firebase Console**
   - Go to Firebase Console → Project Settings
   - Add Web App
   - Copy Web App ID to `.env`

2. **Create `.env` file** with Firebase credentials

3. **Create `ClientAuthContext.tsx`** for customer authentication

4. **Create `ClientLoginPage.tsx`** for customer login

5. **Update `ClientPortal.jsx`** to fetch real Firestore data

6. **Add Protected Routes** to require authentication

7. **Test with iOS app data** (customers already exist in Firestore)

### Future Enhancements

- Document upload to Firebase Storage
- Real-time chat with expert
- Workspace collaboration
- File download/viewing
- Profile management
- Password reset flow

---

## 🔄 Migration Strategy

### Option A: Keep Both Systems (Current)
- Admin portal → Firebase (experts/admins)
- Client portal → MySQL via PHP API (customers)
- **Problem:** Data duplication, complex sync

### Option B: Firebase Only (Recommended)
- Admin portal → Firebase ✅ (already working)
- Client portal → Firebase ✅ (implement as described above)
- iOS app → Firebase ✅ (already working)
- **Benefit:** Single source of truth, real-time sync, simplified architecture

### Recommended: Option B

**Reasoning:**
1. iOS app already has all the data in Firestore
2. Firestore rules are already configured correctly
3. No need to maintain duplicate MySQL database
4. Real-time updates across all platforms
5. Unified authentication system

---

## 📝 TypeScript Types for Web

Create `src/types/firebase.ts`:

```typescript
export interface User {
  id: string;
  email: string;
  emailVerified: boolean;
  name: string;
  role: 'customer' | 'expert' | 'admin';
  phone?: string;
  person1Name?: string;
  person1AhvNumber?: string;
  person2Name?: string;
  person2AhvNumber?: string;
  canton?: string;
  municipality?: string;
  maritalStatus?: 'single' | 'married' | 'divorced' | 'widowed' | 'registered_partnership';
  numberOfChildren?: number;
  street?: string;
  postalCode?: string;
  city?: string;
  assignedExpertId?: string;
  workspaceIds?: string[];
  activeWorkspaceId?: string;
  profileVersion: number;
  profileLastUpdatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}

export interface TaxDocument {
  id: string;
  customerId: string;
  workspaceId?: string;
  expertId?: string;
  name: string;
  originalFilename?: string;
  storageUrl: string;
  thumbnailUrl?: string;
  fileSize?: number;
  mimeType?: string;
  category: 'income' | 'deduction' | 'pillar' | 'wealth' | 'liabilities' |
            'foreignIncome' | 'foreignPension' | 'foreignWealth' | 'taxTreaty' |
            'foreignTax' | 'uncategorized';
  subcategory?: string;
  aiConfidence?: number;
  extractedText?: string;
  aiSummary?: string;
  status: 'uploading' | 'processing' | 'pending' | 'reviewed' | 'approved' | 'rejected';
  expertNotes?: string;
  userNotes?: string;
  taxYear: number;
  canton?: string;
  amount?: number;
  currency?: string;
  uploadedAt: Date;
  processedAt?: Date;
  reviewedAt?: Date;
  updatedAt: Date;
}
```

---

## ✅ Summary

**Current State:**
- ✅ Firebase fully configured in iOS app
- ✅ Admin portal uses Firebase (experts/admins)
- ❌ Client portal UI is just a mockup
- ❌ Backend PHP API not needed (use Firestore instead)

**Solution:**
- Connect client portal directly to Firebase (same as iOS app)
- Reuse existing authentication, Firestore rules, Storage rules
- Single source of truth across web + mobile

**Effort:** 4-6 hours to implement Phase 1-5 above

**Result:** Fully functional client portal with real-time data from Firebase

---

*Last updated: November 28, 2025*
*Created for: Taxed GmbH Web Client Portal*
