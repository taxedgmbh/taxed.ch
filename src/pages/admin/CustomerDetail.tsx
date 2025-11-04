import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { db } from '../../config/firebase';
import { doc, getDoc, collection, query, where, getDocs, updateDoc, Timestamp } from 'firebase/firestore';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  Edit,
  Save,
  X,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  User as UserIcon,
  Briefcase,
  Tag
} from 'lucide-react';
import { User, Document } from '../../types/admin';

interface CustomerStats {
  totalDocuments: number;
  pendingDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
  totalAmount: number;
  avgReviewTime: number;
  lastActivity: Date | null;
}

const CustomerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser, isAdmin } = useAdminAuth();

  const [customer, setCustomer] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [stats, setStats] = useState<CustomerStats>({
    totalDocuments: 0,
    pendingDocuments: 0,
    approvedDocuments: 0,
    rejectedDocuments: 0,
    totalAmount: 0,
    avgReviewTime: 0,
    lastActivity: null
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    canton: '',
    municipality: '',
    expertise: [] as string[]
  });

  useEffect(() => {
    loadCustomerData();
  }, [id]);

  const loadCustomerData = async () => {
    if (!id) return;

    try {
      setLoading(true);

      // Load customer data
      const customerDoc = await getDoc(doc(db, 'users', id));
      if (!customerDoc.exists()) {
        console.error('Customer not found');
        navigate('/admin/customers');
        return;
      }

      const customerData = { id: customerDoc.id, ...customerDoc.data() } as User;
      setCustomer(customerData);
      setEditForm({
        name: customerData.name,
        email: customerData.email,
        canton: customerData.canton || '',
        municipality: customerData.municipality || '',
        expertise: customerData.expertise || []
      });

      // Load documents
      const docsQuery = query(
        collection(db, 'documents'),
        where('customerId', '==', id)
      );
      const docsSnapshot = await getDocs(docsQuery);
      const docsData = docsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Document));
      setDocuments(docsData);

      // Calculate statistics
      const totalDocuments = docsData.length;
      const pendingDocuments = docsData.filter(d => d.status === 'pending').length;
      const approvedDocuments = docsData.filter(d => d.status === 'approved').length;
      const rejectedDocuments = docsData.filter(d => d.status === 'rejected').length;

      const totalAmount = docsData.reduce((sum, doc) => sum + (doc.amount || 0), 0);

      // Calculate average review time
      const reviewedDocs = docsData.filter(d => d.reviewedAt);
      let totalReviewTime = 0;
      reviewedDocs.forEach(doc => {
        const uploaded = doc.uploadedAt instanceof Timestamp ? doc.uploadedAt.toDate() : new Date(doc.uploadedAt);
        const reviewed = doc.reviewedAt instanceof Timestamp ? doc.reviewedAt.toDate() : new Date(doc.reviewedAt);
        totalReviewTime += reviewed.getTime() - uploaded.getTime();
      });
      const avgReviewTime = reviewedDocs.length > 0
        ? totalReviewTime / reviewedDocs.length / (1000 * 60 * 60) // Convert to hours
        : 0;

      // Find last activity
      let lastActivity: Date | null = null;
      docsData.forEach(doc => {
        const uploadDate = doc.uploadedAt instanceof Timestamp ? doc.uploadedAt.toDate() : new Date(doc.uploadedAt);
        if (!lastActivity || uploadDate > lastActivity) {
          lastActivity = uploadDate;
        }
      });

      setStats({
        totalDocuments,
        pendingDocuments,
        approvedDocuments,
        rejectedDocuments,
        totalAmount,
        avgReviewTime,
        lastActivity
      });
    } catch (error) {
      console.error('Error loading customer data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!id) return;

    try {
      await updateDoc(doc(db, 'users', id), {
        name: editForm.name,
        canton: editForm.canton,
        municipality: editForm.municipality,
        expertise: editForm.expertise,
        updatedAt: Timestamp.now()
      });

      setCustomer(prev => prev ? { ...prev, ...editForm } : null);
      setEditing(false);
    } catch (error) {
      console.error('Error updating customer:', error);
      alert('Failed to update customer information');
    }
  };

  const getCompletionRate = () => {
    if (stats.totalDocuments === 0) return 0;
    return Math.round((stats.approvedDocuments / stats.totalDocuments) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-12">
        <UserIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Customer not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/customers')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Customers
        </button>
        <div className="flex items-center space-x-3">
          <Link
            to={`/admin/messages?customerId=${id}`}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Send Message
          </Link>
          {isAdmin && (
            editing ? (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
                <button
                  onClick={() => {
                    setEditing(false);
                    setEditForm({
                      name: customer.name,
                      email: customer.email,
                      canton: customer.canton || '',
                      municipality: customer.municipality || '',
                      expertise: customer.expertise || []
                    });
                  }}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )
          )}
        </div>
      </div>

      {/* Customer Profile Card */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-20 w-20 rounded-full bg-white flex items-center justify-center">
              <span className="text-3xl font-bold text-indigo-600">
                {customer.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="ml-6">
              {editing ? (
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="text-2xl font-bold text-white bg-white bg-opacity-20 rounded px-3 py-1 border-2 border-white"
                />
              ) : (
                <h1 className="text-2xl font-bold text-white">{customer.name}</h1>
              )}
              <p className="mt-1 text-indigo-100 capitalize">{customer.role}</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-gray-700">
              <Mail className="h-5 w-5 mr-3 text-gray-400" />
              {editing ? (
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="flex-1 px-3 py-1 border border-gray-300 rounded"
                  disabled
                />
              ) : (
                <span>{customer.email}</span>
              )}
            </div>

            <div className="flex items-center text-gray-700">
              <MapPin className="h-5 w-5 mr-3 text-gray-400" />
              {editing ? (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Canton"
                    value={editForm.canton}
                    onChange={(e) => setEditForm({ ...editForm, canton: e.target.value })}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded"
                  />
                  <input
                    type="text"
                    placeholder="Municipality"
                    value={editForm.municipality}
                    onChange={(e) => setEditForm({ ...editForm, municipality: e.target.value })}
                    className="flex-1 px-3 py-1 border border-gray-300 rounded"
                  />
                </div>
              ) : (
                <span>{customer.canton}, {customer.municipality}</span>
              )}
            </div>

            <div className="flex items-center text-gray-700">
              <Calendar className="h-5 w-5 mr-3 text-gray-400" />
              <span>
                Joined {customer.createdAt instanceof Timestamp
                  ? customer.createdAt.toDate().toLocaleDateString()
                  : new Date(customer.createdAt).toLocaleDateString()}
              </span>
            </div>

            {stats.lastActivity && (
              <div className="flex items-center text-gray-700">
                <Clock className="h-5 w-5 mr-3 text-gray-400" />
                <span>Last active {stats.lastActivity.toLocaleDateString()}</span>
              </div>
            )}

            {customer.assignedExpertId && (
              <div className="flex items-center text-gray-700">
                <Briefcase className="h-5 w-5 mr-3 text-gray-400" />
                <span>Assigned Expert: {customer.assignedExpertId}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Documents</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.totalDocuments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.pendingDocuments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Approved</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{stats.approvedDocuments}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DollarSign className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Amount</dt>
                  <dd className="text-2xl font-semibold text-gray-900">
                    CHF {stats.totalAmount.toLocaleString()}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Completion Progress */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Document Completion</h3>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm font-semibold text-gray-900">{getCompletionRate()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${getCompletionRate()}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.approvedDocuments}</div>
              <div className="text-xs text-gray-500">Approved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{stats.pendingDocuments}</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.rejectedDocuments}</div>
              <div className="text-xs text-gray-500">Rejected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900">Recent Documents</h3>
          <Link
            to={`/admin/documents?customer=${id}`}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Document</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documents.slice(0, 10).map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-sm font-medium text-gray-900">{doc.fileName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500 capitalize">{doc.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      doc.status === 'approved' ? 'bg-green-100 text-green-800' :
                      doc.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      doc.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {doc.uploadedAt instanceof Timestamp
                      ? doc.uploadedAt.toDate().toLocaleDateString()
                      : new Date(doc.uploadedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/admin/documents/${doc.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No documents uploaded yet
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

export default CustomerDetail;
