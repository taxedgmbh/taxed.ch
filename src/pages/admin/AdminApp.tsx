import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from '../../contexts/AdminAuthContext';
import PrivateRoute from '../../components/admin/PrivateRoute';
import AdminLayout from '../../components/admin/AdminLayout';
import ErrorBoundary from '../../components/ErrorBoundary';
import Login from './Login';
import Dashboard from './Dashboard';
import Documents from './Documents';
import DocumentDetail from './DocumentDetail';
import Customers from './Customers';
import CustomerDetail from './CustomerDetail';
import Messages from './Messages';
import Analytics from './Analytics';
import Assignments from './Assignments';
import Settings from './Settings';

const AdminApp: React.FC = () => {
  return (
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default AdminApp;