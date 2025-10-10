import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, MessageCircle, Calendar, Shield, Download } from 'lucide-react';

const ClientPortal = () => {
  return (
    <div className="min-h-screen bg-light-gray-bg-1 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-dark-gray">Client Portal</h1>
          <p className="text-lg text-dark-gray/80 mt-2">
            Secure access to your tax documents and case management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Tax Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Access and manage your tax documents
              </p>
              <Button className="w-full">View Documents</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Upload new tax documents securely
              </p>
              <Button className="w-full">Upload Files</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-5 w-5 mr-2" />
                Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Communicate with your tax advisor
              </p>
              <Button className="w-full">View Messages</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Schedule and manage appointments
              </p>
              <Button className="w-full">Schedule Meeting</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Manage your account security settings
              </p>
              <Button className="w-full">Security Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Downloads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-dark-gray/70 mb-4">
                Download completed tax returns
              </p>
              <Button className="w-full">Download Files</Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-dark-gray mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-dark-gray/70">Tax return 2023 submitted</span>
              <span className="text-xs text-gray-500">2 days ago</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-200">
              <span className="text-sm text-dark-gray/70">Document uploaded: Salary certificate</span>
              <span className="text-xs text-gray-500">1 week ago</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-dark-gray/70">Meeting scheduled with advisor</span>
              <span className="text-xs text-gray-500">2 weeks ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
