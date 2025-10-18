import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Lock, 
  ArrowRight,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
  requireRole?: string;
  requirePermission?: string;
  redirectTo?: string;
  className?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback,
  requireAuth = true,
  requireRole,
  requirePermission,
  redirectTo = '/login',
  className = ''
}) => {
  const { user, isLoading, isAuthenticated, hasRole, hasPermission } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${className}`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </motion.div>
      </div>
    );
  }

  // Check authentication requirement
  if (requireAuth && !isAuthenticated) {
    return fallback || <UnauthorizedAccess redirectTo={redirectTo} />;
  }

  // Check role requirement
  if (requireRole && !hasRole(requireRole)) {
    return fallback || <InsufficientPermissions requiredRole={requireRole} />;
  }

  // Check permission requirement
  if (requirePermission && !hasPermission(requirePermission)) {
    return fallback || <InsufficientPermissions requiredPermission={requirePermission} />;
  }

  // All checks passed, render children
  return <>{children}</>;
};

interface UnauthorizedAccessProps {
  redirectTo: string;
}

const UnauthorizedAccess: React.FC<UnauthorizedAccessProps> = ({ redirectTo }) => {
  const handleLogin = () => {
    window.location.href = redirectTo;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 shadow-xl">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Lock className="w-8 h-8 text-red-600" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-8">
              You need to be logged in to access this page. Please sign in to continue.
            </p>
            
            <Button
              onClick={handleLogin}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Sign In to Continue
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

interface InsufficientPermissionsProps {
  requiredRole?: string;
  requiredPermission?: string;
}

const InsufficientPermissions: React.FC<InsufficientPermissionsProps> = ({ 
  requiredRole, 
  requiredPermission 
}) => {
  const handleContactSupport = () => {
    window.location.href = '/contact';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 shadow-xl">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-8 h-8 text-yellow-600" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Insufficient Permissions
            </h2>
            <p className="text-gray-600 mb-4">
              You don't have the required permissions to access this page.
            </p>
            
            {requiredRole && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Required role: <strong>{requiredRole}</strong>
                  </span>
                </div>
              </div>
            )}
            
            {requiredPermission && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <span className="text-sm text-yellow-800">
                    Required permission: <strong>{requiredPermission}</strong>
                  </span>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <Button
                onClick={() => window.history.back()}
                variant="outline"
                className="w-full"
              >
                Go Back
              </Button>
              <Button
                onClick={handleContactSupport}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Contact Support
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

// Higher-order component for easier usage
export const withAuthGuard = <P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<AuthGuardProps, 'children'> = {}
) => {
  return (props: P) => (
    <AuthGuard {...options}>
      <Component {...props} />
    </AuthGuard>
  );
};

// Role-based guard
export const withRoleGuard = <P extends object>(
  Component: React.ComponentType<P>,
  role: string
) => {
  return withAuthGuard(Component, { requireRole: role });
};

// Permission-based guard
export const withPermissionGuard = <P extends object>(
  Component: React.ComponentType<P>,
  permission: string
) => {
  return withAuthGuard(Component, { requirePermission: permission });
};

// Admin guard
export const withAdminGuard = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return withAuthGuard(Component, { requireRole: 'admin' });
};

// Client guard
export const withClientGuard = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return withAuthGuard(Component, { requireRole: 'client' });
};






