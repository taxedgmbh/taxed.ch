import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-light-gray-bg-1 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-gray">Admin Panel</h1>
          <p className="text-lg text-dark-gray/80 mt-2">
            Secure administrative access to Taxed GmbH systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Manage user accounts and permissions
              </p>
              <Button className="w-full">Access User Management</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Manage blog posts and website content
              </p>
              <Button className="w-full">Access Content Editor</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Monitor system performance and security
              </p>
              <Button className="w-full">View System Status</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
