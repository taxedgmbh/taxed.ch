import React from 'react';
import { Navigate } from 'react-router-dom';
import { useClientAuth } from '@/contexts/ClientAuthContext';

interface ProtectedClientRouteProps {
  children: React.ReactNode;
}

const ProtectedClientRoute: React.FC<ProtectedClientRouteProps> = ({ children }) => {
  const { currentUser, loading } = useClientAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-steel-blue"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/client-portal/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedClientRoute;
