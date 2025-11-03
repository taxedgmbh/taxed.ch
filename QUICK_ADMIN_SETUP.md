# 🚀 Quick Admin Portal Setup (You Already Have Firebase!)

Since you already have Firebase Authentication, Firestore, and Storage enabled, you just need to:

## ✅ Step 1: Create Admin User (5 minutes)

### A) Add User to Authentication
https://console.firebase.google.com/project/taxedgmbh/authentication/users

1. Click **"Add user"**
2. Email: `admin@taxed.ch` (or your preferred email)
3. Password: Your secure password
4. Click **"Add user"**
5. **Copy the UID** (looks like: `abc123def456...`)

### B) Add User to Firestore
https://console.firebase.google.com/project/taxedgmbh/firestore/data/~2Fusers

1. If `users` collection doesn't exist, create it
2. Click **"Add document"**
3. Document ID: **Paste the UID from above**
4. Add fields:

| Field | Type | Value |
|-------|------|-------|
| email | string | admin@taxed.ch |
| name | string | Admin User |
| role | string | admin |
| createdAt | timestamp | (current time) |
| updatedAt | timestamp | (current time) |

5. Click **"Save"**

## ✅ Step 2: Set Firestore Security Rules (2 minutes)

⚠️ **IMPORTANT**: You currently don't have security rules configured!

https://console.firebase.google.com/project/taxedgmbh/firestore/rules

**Use the rules from `FIRESTORE_RULES_FOR_YOUR_STRUCTURE.txt`** - they're designed for your existing data structure (documents with userId, chats with participantIds, etc.)

Or use these simplified rules to get started:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
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

    // Users collection
    match /users/{userId} {
      allow read: if isAuthenticated();
      allow write: if isAdmin();
    }

    // Documents collection
    match /documents/{documentId} {
      allow read, update: if isExpertOrAdmin();
      allow create, delete: if isAdmin();
    }

    // Conversations collection
    match /conversations/{conversationId} {
      allow read, write: if isExpertOrAdmin();
    }

    // Messages collection
    match /messages/{messageId} {
      allow read, write: if isExpertOrAdmin();
    }

    // Tax cases collection (if you use it)
    match /taxCases/{caseId} {
      allow read, write: if isExpertOrAdmin();
    }
  }
}
```

Click **"Publish"**

## ✅ Step 3: Update Storage Rules (2 minutes)

https://console.firebase.google.com/project/taxedgmbh/storage/rules

**Option A: With Custom Claims (Recommended)**

See `UPDATED_STORAGE_RULES.txt` - requires setting up custom claims (see `SET_USER_ROLES.md`)

**Option B: Temporary Test Rules (Quick Start)**

Update your existing rules to allow authenticated users to read all documents temporarily:

```javascript
// Tax documents: documents/{userId}/{document}
match /documents/{userId}/{document} {
  // TEMPORARY: Allow all authenticated users to read for testing
  allow read: if isAuthenticated();

  allow write: if isAuthenticated() &&
                 (isOwner(userId)) &&
                 isValidSize() &&
                 isValidFileType();

  allow delete: if isAuthenticated() && isOwner(userId);
}
```

⚠️ **Remember**: This is permissive for testing. Use proper custom claims later (see `SET_USER_ROLES.md`).

## ✅ Step 4: Test Your Admin Portal! 🎉

### Open the Admin Portal:
```
http://localhost:5173/admin
```

### Login:
- Email: `admin@taxed.ch`
- Password: Your password from Step 1

### You Should See:
- ✅ Dashboard with statistics
- ✅ Navigation: Documents, Customers, Messages
- ✅ Your name in the sidebar
- ✅ Logout button

## 🎯 What Works Right Now

With the setup above, you can:

✅ **Login** as admin
✅ **View Dashboard** with statistics
✅ **Access all pages** (Documents, Customers, Messages)
✅ **Read documents** from Storage (if you use temporary rules)

## 🔄 What to Do Next

### For Production Use:

1. **Set up Custom Claims** (see `SET_USER_ROLES.md`)
   - This makes Storage rules more secure
   - Allows proper expert/admin distinction

2. **Create Expert Users**
   - Same process as admin, but set `role: 'expert'`

3. **Add Test Data** (optional)
   - Create a test customer in Firestore
   - Upload a test document to Storage
   - Test the document review workflow

## 🆘 Troubleshooting

### Can't login
- Verify email/password are correct
- Check user exists in Authentication
- Check user has `role: 'admin'` in Firestore

### "Permission Denied" on documents
- Check Firestore rules are published
- Verify Storage rules allow read access
- Try the temporary permissive Storage rule

### White screen after login
- Open browser console (F12)
- Check for red errors
- Verify user document exists in Firestore with `role` field

## 📱 Quick Test Checklist

- [ ] Created admin user in Authentication
- [ ] Added admin user to Firestore with role
- [ ] Updated Firestore rules
- [ ] Updated Storage rules (at least temporary)
- [ ] Can login at http://localhost:5173/admin
- [ ] Dashboard loads successfully
- [ ] Can navigate to all pages

## 🎉 You're Ready!

Your admin portal is now functional! You can start using it right away.

**Login URL**: http://localhost:5173/admin

For more detailed documentation:
- `COMPLETE_FIREBASE_SETUP.md` - Full setup guide
- `SET_USER_ROLES.md` - Custom claims setup
- `ADMIN_PORTAL_README.md` - Feature documentation
