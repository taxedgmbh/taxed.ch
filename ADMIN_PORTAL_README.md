# Tax Consultant Admin Portal

## Overview

A comprehensive web-based admin portal for tax consultants to review customer documents, communicate with clients, and manage tax cases. Built with React, TypeScript, and Firebase.

## Features

### Core Functionality

1. **Authentication & Authorization**
   - Email/password authentication via Firebase Auth
   - Role-based access control (expert/admin roles)
   - Protected routes with session management

2. **Document Review Dashboard**
   - Priority queue for pending documents
   - AI-powered document classification with confidence scores
   - Filter by status, category, tax year, and customer
   - Full document image viewer with zoom/rotate controls
   - Approve/reject workflow with expert notes

3. **Customer Management**
   - View all assigned customers (experts) or all customers (admins)
   - Customer profiles with contact info and tax details
   - Document completion tracking per customer
   - Quick access to customer documents and messages

4. **Real-time Chat Interface**
   - Live messaging with customers using Firestore
   - Unread message counts and notifications
   - Message history with read receipts
   - Search conversations by customer name/email

5. **Assignment Management (Admin only)**
   - Assign customers to experts
   - View expert workload statistics
   - Reassign customers between experts

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with responsive design
- **Backend**: Firebase (Firestore, Storage, Auth, Functions)
- **State Management**: React Context API
- **Routing**: React Router v6
- **UI Icons**: Lucide React
- **Build Tool**: Vite

## Project Structure

```
src/
├── config/
│   └── firebase.ts              # Firebase configuration
├── contexts/
│   └── AdminAuthContext.tsx     # Authentication context
├── types/
│   └── admin.ts                 # TypeScript type definitions
├── components/
│   └── admin/
│       ├── AdminLayout.tsx      # Main layout with navigation
│       └── PrivateRoute.tsx     # Protected route wrapper
└── pages/
    └── admin/
        ├── AdminApp.tsx          # Main admin app router
        ├── Login.tsx             # Login page
        ├── Dashboard.tsx         # Dashboard with statistics
        ├── Documents.tsx         # Document list with filters
        ├── DocumentDetail.tsx    # Document review interface
        ├── Customers.tsx         # Customer management
        └── Messages.tsx          # Real-time chat interface
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Firebase project with Firestore, Storage, and Authentication enabled
- Access to Firebase console

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd taxed.ch
npm install
```

### 2. Configure Firebase

1. Go to Firebase Console → Project Settings → General
2. Scroll down to "Your apps" and click "Add app" → Web
3. Register your app with a nickname (e.g., "Tax Admin Portal")
4. Copy the Firebase configuration

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 4. Firebase Security Rules

Update your Firestore rules to allow expert/admin access:

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }

    function isExpert() {
      return isAuthenticated() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'expert';
    }

    function isAdmin() {
      return isAuthenticated() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
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
      allow read: if isExpertOrAdmin();
      allow update: if isExpertOrAdmin();
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
  }
}
```

### 5. Create Initial Admin User

Run this script in Firebase Console or create a Cloud Function:

```javascript
// Create admin user
const admin = require('firebase-admin');
admin.initializeApp();

async function createAdminUser() {
  // Create auth user
  const userRecord = await admin.auth().createUser({
    email: 'admin@taxed.ch',
    password: 'SecurePassword123!',
    displayName: 'Admin User'
  });

  // Add user data to Firestore
  await admin.firestore().collection('users').doc(userRecord.uid).set({
    email: 'admin@taxed.ch',
    name: 'Admin User',
    role: 'admin',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  });
}
```

## Development

### Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

Access the admin portal at `http://localhost:5173/admin`

### Build for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## Deployment Options

### Option 1: Firebase Hosting (Recommended)

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Initialize Firebase Hosting:
```bash
firebase init hosting
```

3. Configure hosting in `firebase.json`:
```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

4. Deploy:
```bash
npm run build
firebase deploy --only hosting
```

### Option 2: Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run build
vercel --prod
```

### Option 3: Netlify

1. Build the project:
```bash
npm run build
```

2. Deploy via Netlify CLI or drag the `dist` folder to Netlify dashboard

## Testing

### Test Credentials

For development/testing, you can create test users with different roles:

- **Admin**: Can view all customers, assign experts, full access
- **Expert**: Can only view assigned customers and their documents

### Sample Data Structure

```javascript
// Sample document
{
  id: "doc123",
  customerId: "customer456",
  expertId: "expert789",
  fileName: "invoice_2024.pdf",
  category: "expense",
  status: "pending",
  aiSummary: "Business expense invoice from Office Supplies Co.",
  aiConfidence: 0.92,
  amount: 1250.50,
  taxYear: 2024,
  uploadedAt: Timestamp,
  updatedAt: Timestamp
}

// Sample user
{
  id: "user123",
  email: "john.expert@taxed.ch",
  name: "John Expert",
  role: "expert",
  assignedCustomers: ["customer1", "customer2"],
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

## API Endpoints Used

The portal uses Firebase SDK methods for all operations:

- **Authentication**: `signInWithEmailAndPassword()`, `signOut()`
- **Firestore**: Real-time listeners with `onSnapshot()`
- **Storage**: `getDownloadURL()` for document images
- **Updates**: `updateDoc()` for status changes and notes

## Security Considerations

1. **Authentication**: Only users with expert/admin roles can access the portal
2. **Data Access**: Experts can only see their assigned customers
3. **Document Access**: Storage rules should restrict access to authorized users
4. **HTTPS**: Always deploy with SSL/TLS enabled
5. **Environment Variables**: Never commit Firebase keys to repository

## Troubleshooting

### Common Issues

1. **"Access Denied" error on login**
   - Ensure user has 'expert' or 'admin' role in Firestore
   - Check Firebase Auth is enabled

2. **Documents not loading**
   - Verify Firestore security rules
   - Check collection names match exactly
   - Ensure documents have required fields

3. **Images not displaying**
   - Check Firebase Storage rules allow read access
   - Verify storage bucket configuration
   - Ensure file paths match pattern: `documents/{customerId}/{fileName}`

4. **Real-time updates not working**
   - Check Firestore composite indexes
   - Verify network connectivity
   - Check browser console for WebSocket errors

## Support

For issues or questions:
- Check browser console for detailed error messages
- Review Firebase console logs
- Ensure all Firebase services are enabled
- Verify security rules are properly configured

## Future Enhancements

- [ ] Bulk document operations
- [ ] Advanced analytics dashboard
- [ ] Email notifications for new documents
- [ ] Document OCR improvements
- [ ] Mobile app for experts
- [ ] Audit trail for all actions
- [ ] Export functionality for reports
- [ ] Integration with tax filing systems

## License

Proprietary - All rights reserved