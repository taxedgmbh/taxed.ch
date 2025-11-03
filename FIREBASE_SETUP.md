# 🔥 Firebase Setup for Admin Portal

## Your Firebase Project Details
- **Project ID**: taxedgmbh
- **Region**: europe-west1 (Frankfurt)
- **Storage Bucket**: taxedgmbh.firebasestorage.app

## ⚠️ IMPORTANT: Get Your Web App ID

Your `.env` file is almost complete, but you need the web-specific App ID. Here's how to get it:

### Step 1: Register Web App in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/project/taxedgmbh/overview)
2. Click the gear icon ⚙️ → **Project settings**
3. Scroll down to **Your apps** section
4. Click **Add app** → Select **Web** (</> icon)
5. Register with name: "Tax Admin Portal"
6. You'll get a configuration like:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyAeVchuS_dJW1NuMBLAVDM-jgM3hQFw53E",
  authDomain: "taxedgmbh.firebaseapp.com",
  databaseURL: "https://taxedgmbh-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "taxedgmbh",
  storageBucket: "taxedgmbh.firebasestorage.app",
  messagingSenderId: "1041568476163",
  appId: "1:1041568476163:web:XXXXXXXXXX" // ← You need this!
};
```

7. Copy the `appId` value and update your `.env` file:
```
VITE_FIREBASE_APP_ID=1:1041568476163:web:YOUR_ACTUAL_WEB_APP_ID
```

## 📝 Update Firestore Security Rules

Go to [Firestore Rules](https://console.firebase.google.com/project/taxedgmbh/firestore/rules) and add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function getUserData() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data;
    }

    function isExpert() {
      return isAuthenticated() && getUserData().role == 'expert';
    }

    function isAdmin() {
      return isAuthenticated() && getUserData().role == 'admin';
    }

    function isExpertOrAdmin() {
      return isExpert() || isAdmin();
    }

    function isAssignedExpert(customerId) {
      return isExpert() &&
        get(/databases/$(database)/documents/users/$(customerId)).data.assignedExpertId == request.auth.uid;
    }

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated() &&
        (request.auth.uid == userId || isExpertOrAdmin());
      allow write: if isAdmin();
    }

    // Documents collection
    match /documents/{documentId} {
      allow read: if isExpertOrAdmin() &&
        (isAdmin() || isAssignedExpert(resource.data.customerId));
      allow update: if isExpertOrAdmin() &&
        (isAdmin() || isAssignedExpert(resource.data.customerId));
      allow create, delete: if isAdmin();
    }

    // Conversations collection
    match /conversations/{conversationId} {
      allow read: if isExpertOrAdmin() &&
        (isAdmin() || resource.data.expertId == request.auth.uid);
      allow write: if isExpertOrAdmin() &&
        (isAdmin() || resource.data.expertId == request.auth.uid);
    }

    // Messages collection
    match /messages/{messageId} {
      allow read, write: if isExpertOrAdmin();
    }

    // Tax cases collection
    match /taxCases/{caseId} {
      allow read: if isExpertOrAdmin() &&
        (isAdmin() || isAssignedExpert(resource.data.customerId));
      allow write: if isExpertOrAdmin() &&
        (isAdmin() || isAssignedExpert(resource.data.customerId));
    }
  }
}
```

## 🔐 Update Storage Security Rules

Go to [Storage Rules](https://console.firebase.google.com/project/taxedgmbh/storage/rules) and add:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper function to check if user is expert or admin
    function isExpertOrAdmin() {
      return request.auth != null &&
        request.auth.token.role in ['expert', 'admin'];
    }

    // Documents folder
    match /documents/{customerId}/{fileName} {
      allow read: if request.auth != null && (
        request.auth.uid == customerId || // Customer can read their own
        isExpertOrAdmin() // Experts/admins can read all
      );
      allow write: if request.auth != null && (
        request.auth.uid == customerId || // Customer can upload
        isExpertOrAdmin() // Experts/admins can write
      );
    }
  }
}
```

## 👤 Create Admin Users

### Option A: Using Firebase Console (Easy)

1. Go to [Authentication](https://console.firebase.google.com/project/taxedgmbh/authentication/users)
2. Click **Add user**
3. Create admin account:
   - Email: `admin@taxed.ch`
   - Password: `SecureAdminPass123!`
4. Copy the User UID
5. Go to [Firestore](https://console.firebase.google.com/project/taxedgmbh/firestore)
6. Create document in `users` collection with the UID as document ID:

```json
{
  "email": "admin@taxed.ch",
  "name": "Admin User",
  "role": "admin",
  "createdAt": "November 3, 2024 at 12:00:00 AM UTC+1",
  "updatedAt": "November 3, 2024 at 12:00:00 AM UTC+1"
}
```

### Option B: Using Admin SDK Script

Create `scripts/createAdmin.js`:

```javascript
const admin = require('firebase-admin');

// Initialize admin SDK with service account
admin.initializeApp({
  projectId: 'taxedgmbh',
  databaseURL: 'https://taxedgmbh-default-rtdb.europe-west1.firebasedatabase.app'
});

async function createAdminUser() {
  try {
    // Create auth user
    const userRecord = await admin.auth().createUser({
      email: 'admin@taxed.ch',
      password: 'SecureAdminPass123!',
      displayName: 'Admin User',
      emailVerified: true
    });

    // Add custom claims
    await admin.auth().setCustomUserClaims(userRecord.uid, { role: 'admin' });

    // Add to Firestore
    await admin.firestore().collection('users').doc(userRecord.uid).set({
      email: 'admin@taxed.ch',
      name: 'Admin User',
      role: 'admin',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log('Admin user created successfully:', userRecord.uid);
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();
```

## 🎯 Quick Test

1. **Start the development server:**
```bash
npm run dev
```

2. **Navigate to admin portal:**
```
http://localhost:5173/admin
```

3. **Login with your admin account**

4. **Verify access to:**
   - Dashboard with statistics
   - Documents page
   - Customers page
   - Messages interface

## 📊 Create Test Data (Optional)

To test the portal, add some sample data in Firestore:

### Sample Customer
Collection: `users`
```json
{
  "email": "john.doe@example.com",
  "name": "John Doe",
  "role": "customer",
  "assignedExpertId": "YOUR_EXPERT_UID",
  "canton": "Zurich",
  "municipality": "Zurich",
  "createdAt": "SERVER_TIMESTAMP"
}
```

### Sample Document
Collection: `documents`
```json
{
  "customerId": "CUSTOMER_UID",
  "expertId": "EXPERT_UID",
  "fileName": "invoice_2024.pdf",
  "category": "expense",
  "status": "pending",
  "aiSummary": "Business expense from Office Supplies AG",
  "aiConfidence": 0.92,
  "amount": 1250.50,
  "taxYear": 2024,
  "uploadedAt": "SERVER_TIMESTAMP"
}
```

## 🚀 Deploy to Production

### Firebase Hosting Setup

1. **Install Firebase CLI:**
```bash
npm install -g firebase-tools
```

2. **Login to Firebase:**
```bash
firebase login
```

3. **Initialize hosting:**
```bash
firebase init hosting
```

Choose:
- Use existing project: `taxedgmbh`
- Public directory: `dist`
- Single-page app: `Yes`
- GitHub Actions: `No` (unless you want CI/CD)

4. **Build and deploy:**
```bash
npm run build
firebase deploy --only hosting
```

Your admin portal will be available at:
```
https://taxedgmbh.web.app/admin
https://taxedgmbh.firebaseapp.com/admin
```

## 🔒 Security Checklist

- [x] `.env` file is in `.gitignore`
- [ ] Web App ID obtained from Firebase Console
- [ ] Firestore security rules configured
- [ ] Storage security rules configured
- [ ] Admin user created with proper role
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Regular security audits scheduled

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Firebase services are enabled
3. Ensure all environment variables are set
4. Check Firestore/Storage rules

## 🎉 Success!

Once you complete these steps, your admin portal will be fully functional with:
- Secure authentication
- Role-based access control
- Real-time data synchronization
- Document management system
- Customer communication tools

The portal is production-ready and scalable!