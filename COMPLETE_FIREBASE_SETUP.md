# 🔥 Complete Firebase Setup - Step by Step

## ✅ Step 1: Firebase Configuration (DONE!)
Your Firebase credentials are now configured in `.env`

---

## 🔐 Step 2: Enable Firebase Authentication (2 minutes)

### Go to Firebase Console:
https://console.firebase.google.com/project/taxedgmbh/authentication/providers

### Enable Email/Password Authentication:
1. Click **"Get started"** (if first time)
2. Click on **"Email/Password"** provider
3. **Enable** the toggle
4. Click **"Save"**

---

## 💾 Step 3: Enable Firestore Database (2 minutes)

### Go to Firestore Console:
https://console.firebase.google.com/project/taxedgmbh/firestore

### Create Database:
1. Click **"Create database"**
2. Choose **"Start in production mode"**
3. Select location: **"europe-west1 (Frankfurt)"** (same as your iOS app)
4. Click **"Enable"**

### Set Security Rules:
After database is created, go to **Rules** tab and replace with:

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

    // Tax cases collection
    match /taxCases/{caseId} {
      allow read, write: if isExpertOrAdmin();
    }
  }
}
```

Click **"Publish"**

---

## 📦 Step 4: Enable Firebase Storage (2 minutes)

### Go to Storage Console:
https://console.firebase.google.com/project/taxedgmbh/storage

### Enable Storage:
1. Click **"Get started"**
2. Choose **"Start in production mode"**
3. Select location: **"europe-west1 (Frankfurt)"**
4. Click **"Done"**

### Set Storage Rules:
Go to **Rules** tab and replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Helper function
    function isAuthenticated() {
      return request.auth != null;
    }

    function isExpertOrAdmin() {
      return isAuthenticated() &&
        request.auth.token.role in ['expert', 'admin'];
    }

    // Documents folder
    match /documents/{customerId}/{fileName} {
      allow read: if isAuthenticated();
      allow write: if isExpertOrAdmin();
    }
  }
}
```

Click **"Publish"**

---

## 👤 Step 5: Create Your First Admin User (3 minutes)

### A) Create Authentication User

**Go to:**
https://console.firebase.google.com/project/taxedgmbh/authentication/users

1. Click **"Add user"**
2. **Email**: `admin@taxed.ch` (or your preferred email)
3. **Password**: Choose a secure password (e.g., `TaxAdmin2024!`)
4. Click **"Add user"**
5. **COPY THE USER UID** that appears (e.g., `abc123def456...`)

### B) Add User Data to Firestore

**Go to:**
https://console.firebase.google.com/project/taxedgmbh/firestore/data

1. Click **"+ Start collection"**
2. **Collection ID**: `users`
3. Click **"Next"**
4. **Document ID**: Paste the UID you copied above
5. Add these fields:

   | Field | Type | Value |
   |-------|------|-------|
   | `email` | string | `admin@taxed.ch` |
   | `name` | string | `Admin User` |
   | `role` | string | `admin` |
   | `createdAt` | timestamp | Click clock icon → Current time |
   | `updatedAt` | timestamp | Click clock icon → Current time |

6. Click **"Save"**

---

## 🧪 Step 6: Test Your Admin Portal!

### Open the Admin Portal:
```
http://localhost:5173/admin
```

### Login:
- **Email**: `admin@taxed.ch`
- **Password**: [Your password from Step 5]

### You Should See:
- ✅ Dashboard with statistics
- ✅ Navigation sidebar (Documents, Customers, Messages)
- ✅ Welcome message with your name
- ✅ All admin features accessible

---

## 🎯 Quick Test Checklist

- [ ] Authentication enabled
- [ ] Firestore database created
- [ ] Firestore rules set
- [ ] Storage enabled
- [ ] Storage rules set
- [ ] Admin user created in Auth
- [ ] Admin user added to Firestore with role
- [ ] Can login to http://localhost:5173/admin
- [ ] Dashboard loads successfully

---

## 🆘 Troubleshooting

### "Permission Denied" error
- Check Firestore rules are published
- Verify user has `role: 'admin'` in Firestore
- Make sure document ID in Firestore matches Auth UID

### Can't login / "Invalid credentials"
- Verify email and password are correct
- Check user exists in Authentication tab
- Try resetting password in Firebase Console

### White screen after login
- Open browser console (F12)
- Check for red error messages
- Verify all environment variables are set correctly

### Firebase initialization errors
- Restart dev server: Stop and run `npm run dev` again
- Check `.env` file has all values filled in
- Verify Web App ID is correct

---

## 📞 Need Help?

Check these resources:
- Browser console (F12) for detailed errors
- Firebase Console logs
- Network tab for failed requests

---

## 🚀 Next Steps After Setup

Once logged in successfully:

1. **Create Test Data** (optional):
   - Add a test customer in Firestore
   - Upload a test document
   - Send a test message

2. **Invite Expert Users**:
   - Create users with `role: 'expert'`
   - Assign customers to experts

3. **Deploy to Production**:
   - Build: `npm run build`
   - Deploy: `firebase deploy --only hosting`

---

**Your admin portal is ready to use!** 🎉