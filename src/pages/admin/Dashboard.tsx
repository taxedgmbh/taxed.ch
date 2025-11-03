import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { db } from '../../config/firebase';
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore';
import {
  FileText,
  Users,
  MessageSquare,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Document, User, Conversation, ExpertStats } from '../../types/admin';

const Dashboard: React.FC = () => {
  const { currentUser, isAdmin } = useAdminAuth();
  const [stats, setStats] = useState<ExpertStats>({
    totalCustomers: 0,
    pendingDocuments: 0,
    reviewedToday: 0,
    reviewedThisWeek: 0,
    reviewedThisMonth: 0,
    unreadMessages: 0
  });
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribers: (() => void)[] = [];

    // Get statistics
    const loadStats = async () => {
      try {
        // Get assigned customers count
        if (currentUser.role === 'expert') {
          const customersQuery = query(
            collection(db, 'users'),
            where('assignedExpertId', '==', currentUser.id)
          );
          unsubscribers.push(
            onSnapshot(customersQuery, (snapshot) => {
              setStats(prev => ({ ...prev, totalCustomers: snapshot.size }));
            })
          );
        } else {
          const customersQuery = query(
            collection(db, 'users'),
            where('role', '==', 'customer')
          );
          unsubscribers.push(
            onSnapshot(customersQuery, (snapshot) => {
              setStats(prev => ({ ...prev, totalCustomers: snapshot.size }));
            })
          );
        }

        // Get pending documents count
        let pendingQuery;
        if (currentUser.role === 'expert') {
          pendingQuery = query(
            collection(db, 'documents'),
            where('expertId', '==', currentUser.id),
            where('status', '==', 'pending')
          );
        } else {
          pendingQuery = query(
            collection(db, 'documents'),
            where('status', '==', 'pending')
          );
        }

        unsubscribers.push(
          onSnapshot(pendingQuery, (snapshot) => {
            setStats(prev => ({ ...prev, pendingDocuments: snapshot.size }));
          })
        );

        // Get unread messages count
        const conversationsQuery = query(
          collection(db, 'conversations'),
          where('expertId', '==', currentUser.id),
          where('unreadCountExpert', '>', 0)
        );

        unsubscribers.push(
          onSnapshot(conversationsQuery, (snapshot) => {
            const totalUnread = snapshot.docs.reduce(
              (sum, doc) => sum + (doc.data().unreadCountExpert || 0),
              0
            );
            setStats(prev => ({ ...prev, unreadMessages: totalUnread }));
          })
        );

        // Get recent documents
        let recentDocsQuery;
        if (currentUser.role === 'expert') {
          recentDocsQuery = query(
            collection(db, 'documents'),
            where('expertId', '==', currentUser.id),
            orderBy('uploadedAt', 'desc'),
            limit(5)
          );
        } else {
          recentDocsQuery = query(
            collection(db, 'documents'),
            orderBy('uploadedAt', 'desc'),
            limit(5)
          );
        }

        unsubscribers.push(
          onSnapshot(recentDocsQuery, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            } as Document));
            setRecentDocuments(docs);
          })
        );

        setLoading(false);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
        setLoading(false);
      }
    };

    loadStats();

    return () => {
      unsubscribers.forEach(unsubscribe => unsubscribe());
    };
  }, [currentUser, isAdmin]);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {currentUser?.name}!
        </h1>
        <p className="mt-1 text-gray-600">
          Here's an overview of your tax consultation workspace
        </p>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Customers
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.totalCustomers}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/customers"
                className="font-medium text-indigo-600 hover:text-indigo-900"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Pending Documents
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.pendingDocuments}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/documents"
                className="font-medium text-indigo-600 hover:text-indigo-900"
              >
                Review now
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <MessageSquare className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Unread Messages
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.unreadMessages}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/messages"
                className="font-medium text-indigo-600 hover:text-indigo-900"
              >
                View messages
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Reviewed Today
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stats.reviewedToday}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link
                to="/admin/analytics"
                className="font-medium text-indigo-600 hover:text-indigo-900"
              >
                View analytics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Documents
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Latest uploaded documents requiring review
          </p>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentDocuments.length > 0 ? (
                recentDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <div className="text-sm font-medium text-gray-900">
                          {doc.fileName}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.customerId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {doc.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {doc.uploadedAt instanceof Timestamp
                        ? new Date(doc.uploadedAt.toDate()).toLocaleDateString()
                        : new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        to={`/admin/documents/${doc.id}`}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No recent documents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;