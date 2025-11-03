# Required Firestore Indexes for Admin Portal

## ✅ Indexes You Already Have

Great! You already have these indexes:

1. **documents**: `userId`, `uploadedAt`
2. **documents**: `userId`, `category`, `uploadedAt`
3. **users**: `canton`, `role`
4. **users**: `email`
5. **users**: `role`, `createdAt`
6. **chats**: `participantIds`, `lastMessageAt`
7. **messages**: `chatId`, `sentAt`
8. **notifications**: `userId`, `isRead`, `createdAt`

## 🔍 Additional Indexes Needed for Admin Portal

The admin portal queries your data differently than the customer app. You'll need these additional indexes:

### 1. Documents by Expert and Status

**Collection**: `documents`
**Fields**: `expertId` (Ascending), `status` (Ascending), `uploadedAt` (Descending)

**Why**: For experts to see their pending documents sorted by upload date

### 2. Documents by Status Only

**Collection**: `documents`
**Fields**: `status` (Ascending), `uploadedAt` (Descending)

**Why**: For admins to see all pending documents across all experts

### 3. Users by Assigned Expert

**Collection**: `users`
**Fields**: `assignedExpertId` (Ascending), `name` (Ascending)

**Why**: For experts to see their assigned customers

### 4. Conversations by Expert

**Collection**: `conversations`
**Fields**: `expertId` (Ascending), `updatedAt` (Descending)

**Why**: For the messages page to show expert's conversations

### 5. Conversations with Unread Messages

**Collection**: `conversations`
**Fields**: `expertId` (Ascending), `unreadCountExpert` (Ascending)

**Why**: For counting unread messages per expert

### 6. Messages by Conversation

**Collection**: `messages`
**Fields**: `conversationId` (Ascending), `sentAt` (Ascending)

**Why**: For displaying chat messages in order

*Note: You already have `chatId, sentAt` - if you're using `conversationId` in the admin portal but `chatId` in your app, you'll need to unify these field names.*

## 🚀 How to Create Indexes

### Option 1: Automatic (Recommended)

1. Open your admin portal: http://localhost:5173/admin
2. Login and try to use features
3. When you get an error like "requires an index", click the link in the error
4. It will take you to Firebase Console with the index pre-configured
5. Click "Create Index"
6. Wait 2-3 minutes for the index to build

### Option 2: Manual Creation

Go to: https://console.firebase.google.com/project/taxedgmbh/firestore/indexes

Click **"Create Index"** and add each index from the list above.

For example, for documents by expert and status:
- **Collection ID**: `documents`
- **Field 1**: `expertId` - Ascending
- **Field 2**: `status` - Ascending
- **Field 3**: `uploadedAt` - Descending
- Click "Create"

## 🔄 Data Model Compatibility

Your existing data structure is excellent! The admin portal expects:

### Documents Collection
```javascript
{
  userId: "customer_uid",        // ✅ You have this
  expertId: "expert_uid",         // ⚠️ Need to add this field
  category: "income|expense|...", // ✅ You have this
  status: "pending|reviewed|...", // ⚠️ Need to add this field
  uploadedAt: timestamp,          // ✅ You have this
  // ... other fields
}
```

### Users Collection
```javascript
{
  email: "user@example.com",      // ✅ You have this
  role: "customer|expert|admin",  // ✅ You have this
  assignedExpertId: "expert_uid", // ⚠️ Need to add for customers
  canton: "ZH",                   // ✅ You have this
  // ... other fields
}
```

### Conversations Collection (maps to your chats)
```javascript
{
  customerId: "customer_uid",
  expertId: "expert_uid",
  participantIds: [...],          // ✅ You already have this in chats
  unreadCountExpert: 0,
  unreadCountCustomer: 0,
  lastMessageTime: timestamp,
  updatedAt: timestamp
}
```

## 📝 Data Migration Needed

You might need to add these fields to existing documents:

### For Documents:
```javascript
// Add to each document in 'documents' collection:
{
  expertId: null,  // Will be set when expert is assigned
  status: "pending"  // Default for new uploads
}
```

### For Users (customers only):
```javascript
// Add to each customer in 'users' collection:
{
  assignedExpertId: null  // Will be set when expert is assigned
}
```

### Batch Update Script

Create a one-time script to add missing fields:

```javascript
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

async function addMissingFields() {
  // Update documents
  const docsSnapshot = await db.collection('documents').get();
  const batch = db.batch();

  docsSnapshot.forEach(doc => {
    if (!doc.data().expertId) {
      batch.update(doc.ref, {
        expertId: null,
        status: 'pending'
      });
    }
  });

  await batch.commit();
  console.log('✅ Updated documents');

  // Update customer users
  const usersSnapshot = await db.collection('users')
    .where('role', '==', 'customer').get();
  const batch2 = db.batch();

  usersSnapshot.forEach(doc => {
    if (!doc.data().assignedExpertId) {
      batch2.update(doc.ref, {
        assignedExpertId: null
      });
    }
  });

  await batch2.commit();
  console.log('✅ Updated users');
}

addMissingFields();
```

## 🎯 Summary

| Task | Priority | Time |
|------|----------|------|
| Set Firestore security rules | 🔴 Critical | 2 min |
| Create missing indexes | 🟡 High | 5 min |
| Add `expertId` to documents | 🟡 High | Script |
| Add `status` to documents | 🟡 High | Script |
| Add `assignedExpertId` to users | 🟡 High | Script |

## 🆘 If You Get Index Errors

When you use the admin portal, you'll see errors like:

```
The query requires an index. You can create it here:
https://console.firebase.google.com/...
```

**Just click the link!** Firebase will show you exactly what index to create. Then:
1. Click "Create Index"
2. Wait 2-3 minutes
3. Refresh the admin portal
4. It will work!

This is the easiest way to create the exact indexes you need.
