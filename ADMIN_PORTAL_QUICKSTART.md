# Admin Portal Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Set up Firebase Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Add your Firebase credentials to `.env`:
```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### Step 2: Install and Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Step 3: Access the Portal

Open your browser and navigate to:
```
http://localhost:5173/admin
```

### Step 4: Create Test Users (Firebase Console)

Go to Firebase Console → Authentication → Add user:

**Expert Account:**
- Email: `expert@taxed.ch`
- Password: `TestExpert123!`

**Admin Account:**
- Email: `admin@taxed.ch`
- Password: `TestAdmin123!`

### Step 5: Add User Roles in Firestore

Go to Firebase Console → Firestore → Create these documents:

**Collection: `users`**

Document 1 (use the UID from the expert user):
```json
{
  "email": "expert@taxed.ch",
  "name": "Test Expert",
  "role": "expert",
  "createdAt": "SERVER_TIMESTAMP",
  "updatedAt": "SERVER_TIMESTAMP"
}
```

Document 2 (use the UID from the admin user):
```json
{
  "email": "admin@taxed.ch",
  "name": "Test Admin",
  "role": "admin",
  "createdAt": "SERVER_TIMESTAMP",
  "updatedAt": "SERVER_TIMESTAMP"
}
```

## 📱 Portal Features

Once logged in, you can:

### As Expert:
- ✅ Review pending documents
- 💬 Chat with assigned customers
- 📊 View dashboard statistics
- 👥 Manage assigned customers

### As Admin (all expert features plus):
- 🔄 Assign customers to experts
- 📈 View system-wide analytics
- 👤 Manage all users

## 🎯 Test the Portal

### 1. Login
- Go to `http://localhost:5173/admin`
- Use your test credentials

### 2. Navigate Main Sections
- **Dashboard** - Overview and statistics
- **Documents** - Review customer documents
- **Customers** - Manage customer profiles
- **Messages** - Real-time chat

### 3. Sample Test Flow
1. Login as admin
2. Check dashboard for overview
3. Go to Documents → Review a pending document
4. Navigate to Messages → Start a conversation
5. Visit Customers → View customer profiles

## 🔧 Troubleshooting

### Can't Login?
- Check user exists in Firebase Authentication
- Verify user has 'expert' or 'admin' role in Firestore
- Check browser console for errors

### No Data Showing?
- Ensure Firestore security rules are set correctly
- Verify collections exist in Firestore
- Check network tab for API errors

### Images Not Loading?
- Verify Firebase Storage is enabled
- Check storage security rules
- Ensure documents reference valid storage paths

## 📦 Deploy to Production

### Option 1: Firebase Hosting (Easiest)
```bash
# Build the app
npm run build

# Install Firebase CLI
npm install -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Deploy
firebase deploy --only hosting
```

### Option 2: Vercel (One-Click)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## 🛠 Customize the Portal

### Change Colors/Theme
Edit Tailwind classes in components:
- Primary color: `bg-indigo-600` → `bg-blue-600`
- Accent color: `text-indigo-600` → `text-green-600`

### Add New Pages
1. Create component in `src/pages/admin/`
2. Add route in `src/pages/admin/AdminApp.tsx`
3. Add navigation link in `src/components/admin/AdminLayout.tsx`

### Modify Data Structure
Update types in `src/types/admin.ts`

## 📞 Need Help?

- Check `ADMIN_PORTAL_README.md` for detailed documentation
- Review browser console for error messages
- Verify Firebase services are enabled
- Ensure all environment variables are set

## ✅ Success Checklist

- [ ] Firebase project created
- [ ] Environment variables configured
- [ ] npm install completed
- [ ] Portal loads at /admin
- [ ] Can login with test account
- [ ] Dashboard displays correctly
- [ ] Documents page loads
- [ ] Messages work in real-time

You're all set! The admin portal is ready to use. 🎉