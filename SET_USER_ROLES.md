# Setting User Roles with Custom Claims

Your existing Storage rules are great! To make them work with the admin portal, you need to set **custom claims** on users so that Firebase knows who is an expert/admin.

## 🔑 What are Custom Claims?

Custom claims add extra information to a user's authentication token. Your Storage rules check for `request.auth.token.role`, so we need to add the `role` claim to each user.

## 📋 Two Ways to Set Custom Claims

### **Option 1: Using Firebase Console (Quick Test)**

Unfortunately, you can't set custom claims directly in the Firebase Console. You need to use the Admin SDK.

### **Option 2: Using Firebase Admin SDK (Recommended)**

Create a Node.js script that runs once to set roles on your users.

#### Step 1: Install Firebase Admin SDK

```bash
cd server  # or create a new folder for admin scripts
npm install firebase-admin
```

#### Step 2: Get Service Account Key

1. Go to: https://console.firebase.google.com/project/taxedgmbh/settings/serviceaccounts/adminsdk
2. Click **"Generate new private key"**
3. Save the JSON file as `service-account-key.json`
4. **⚠️ IMPORTANT**: Add to `.gitignore` - never commit this file!

#### Step 3: Create `set-user-roles.js`

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://taxedgmbh-default-rtdb.europe-west1.firebasedatabase.app"
});

async function setUserRole(email, role) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);

    // Set custom claims
    await admin.auth().setCustomUserClaims(user.uid, { role: role });

    console.log(`✅ Set role '${role}' for user: ${email} (${user.uid})`);
    console.log(`   User needs to sign out and sign in again for changes to take effect.`);

    // Also update Firestore
    await admin.firestore().collection('users').doc(user.uid).update({
      role: role,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`✅ Updated Firestore document for user`);
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

async function setRolesForAllUsers() {
  console.log('🔧 Setting user roles...\n');

  // Set role for admin
  await setUserRole('admin@taxed.ch', 'admin');

  // Add more users here:
  // await setUserRole('expert1@taxed.ch', 'expert');
  // await setUserRole('expert2@taxed.ch', 'expert');

  console.log('\n✅ Done! Users need to sign out and sign in again.');
  process.exit(0);
}

// Run the script
setRolesForAllUsers();
```

#### Step 4: Run the Script

```bash
node set-user-roles.js
```

## 🚀 Quick Setup Steps

### 1. Create Admin User (if not done yet)

**Authentication:**
https://console.firebase.google.com/project/taxedgmbh/authentication/users

- Email: `admin@taxed.ch`
- Password: Your secure password
- Copy the UID

**Firestore:**
https://console.firebase.google.com/project/taxedgmbh/firestore/data/~2Fusers

Create document with the UID:
```json
{
  "email": "admin@taxed.ch",
  "name": "Admin User",
  "role": "admin",
  "createdAt": [timestamp],
  "updatedAt": [timestamp]
}
```

### 2. Set Custom Claims

Run the script above to add `role` to the user's token.

### 3. Update Storage Rules

Copy the rules from `UPDATED_STORAGE_RULES.txt` to:
https://console.firebase.google.com/project/taxedgmbh/storage/rules

### 4. Test

1. Open: http://localhost:5173/admin
2. Login with admin@taxed.ch
3. Try accessing the Documents page
4. Upload a test document

## 🔄 Alternative: Temporary Permissive Rules (Testing Only)

If you want to test immediately without setting up custom claims, use this **temporary** storage rule:

```javascript
// Tax documents: documents/{userId}/{document}
match /documents/{userId}/{document} {
  // TEMPORARY: Allow all authenticated users to read
  // TODO: Replace with proper role checking
  allow read: if isAuthenticated();

  allow write: if isAuthenticated() &&
                 (isOwner(userId)) &&
                 isValidSize() &&
                 isValidFileType();

  allow delete: if isAuthenticated() && isOwner(userId);
}
```

**⚠️ Remember to change back to proper rules after testing!**

## ✅ Verify Custom Claims Work

After setting claims and user logs in again, check in browser console:

```javascript
// In admin portal, open browser console and run:
import { auth } from './src/config/firebase';
auth.currentUser.getIdTokenResult().then(token => {
  console.log('Custom claims:', token.claims);
});
```

You should see:
```json
{
  "role": "admin",
  // ... other fields
}
```

## 📚 Firestore Rules (Already Good!)

Your Firestore rules should already work since they query the `users` collection to check roles. Make sure they look like this:

```javascript
function isAdmin() {
  return isAuthenticated() &&
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
}
```

## 🎯 Summary

1. ✅ Your existing Firebase setup is good
2. ⏳ Add custom claims to users using the script above
3. ✅ Update Storage rules to allow experts/admins
4. ✅ Test the admin portal

Your admin portal will work once custom claims are set!
