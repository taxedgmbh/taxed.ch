import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from '../../contexts/AdminAuthContext';
import PrivateRoute from '../../components/admin/PrivateRoute';
import AdminLayout from '../../components/admin/AdminLayout';
import Login from './Login';
import Dashboard from './Dashboard';
import Documents from './Documents';
import DocumentDetail from './DocumentDetail';
import Customers from './Customers';
import Messages from './Messages';

// Placeholder components - to be implemented
const Analytics: React.FC = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
    <p className="mt-2 text-gray-600">Analytics features coming soon...</p>
  </div>
);

const Assignments: React.FC = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Assignment Management</h2>
    <p className="mt-2 text-gray-600">Manage customer-expert assignments</p>
  </div>
);

const CustomerDetail: React.FC = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Customer Profile</h2>
    <p className="mt-2 text-gray-600">Detailed customer information</p>
  </div>
);

const Settings: React.FC = () => (
  <div className="text-center py-12">
    <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
    <p className="mt-2 text-gray-600">Account and system settings</p>
  </div>
);

const AdminApp: React.FC = () => {
  return (
    <AdminAuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route element={
          <PrivateRoute>
            <AdminLayout />
          </PrivateRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:id" element={<DocumentDetail />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/:id" element={<CustomerDetail />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/assignments" element={
            <PrivateRoute requireAdmin>
              <Assignments />
            </PrivateRoute>
          } />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Catch all - redirect to dashboard */}
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </AdminAuthProvider>
  );
};

export default AdminApp;