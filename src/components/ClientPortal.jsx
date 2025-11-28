import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useClientAuth } from '@/contexts/ClientAuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, MessageCircle, Calendar, Shield, Download, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClientPortal = () => {
  const { currentUser, logout } = useClientAuth();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalDocuments: 0,
    pendingReview: 0,
    approved: 0,
    unreadMessages: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser?.id) return;

      try {
        // Fetch documents
        const docsQuery = query(
          collection(db, 'documents'),
          where('customerId', '==', currentUser.id),
          orderBy('uploadedAt', 'desc'),
          limit(10)
        );

        const docsSnapshot = await getDocs(docsQuery);
        const docs = docsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          uploadedAt: doc.data().uploadedAt?.toDate()
        }));

        setDocuments(docs);

        // Calculate stats
        setStats({
          totalDocuments: docs.length,
          pendingReview: docs.filter(d => d.status === 'pending').length,
          approved: docs.filter(d => d.status === 'approved').length,
          unreadMessages: 0 // TODO: Fetch from chats collection
        });

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/client-portal/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light-gray-bg-1 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-steel-blue"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-gray-bg-1 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-dark-gray">Welcome, {currentUser?.name}</h1>
            <p className="text-lg text-dark-gray/80 mt-2">
              Secure access to your tax documents and case management
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleLogout}
            className="flex items-center"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-steel-blue/10 to-blue-600/10 border-steel-blue/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-3xl font-bold text-dark-gray mt-1">{stats.totalDocuments}</p>
                </div>
                <FileText className="w-12 h-12 text-steel-blue/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Review</p>
                  <p className="text-3xl font-bold text-dark-gray mt-1">{stats.pendingReview}</p>
                </div>
                <Calendar className="w-12 h-12 text-yellow-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-dark-gray mt-1">{stats.approved}</p>
                </div>
                <Shield className="w-12 h-12 text-green-600/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-3xl font-bold text-dark-gray mt-1">{stats.unreadMessages}</p>
                </div>
                <MessageCircle className="w-12 h-12 text-blue-600/60" />
              </div>
            </CardContent>
          </Card>
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

        {/* Recent Documents */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-dark-gray">Recent Documents</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {documents.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No documents uploaded yet</p>
              <Button className="mt-4">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First Document
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      doc.status === 'approved' ? 'bg-green-100' :
                      doc.status === 'pending' ? 'bg-yellow-100' :
                      'bg-gray-100'
                    }`}>
                      <FileText className={`w-5 h-5 ${
                        doc.status === 'approved' ? 'text-green-600' :
                        doc.status === 'pending' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`} />
                    </div>
                    <div>
                      <p className="font-medium text-dark-gray">{doc.name}</p>
                      <p className="text-sm text-gray-500">
                        {doc.category} • {doc.taxYear} • {doc.uploadedAt?.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      doc.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {doc.status}
                    </span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;
