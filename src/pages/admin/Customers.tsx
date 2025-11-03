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
  QueryConstraint,
  getDocs
} from 'firebase/firestore';
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
  MessageSquare,
  ChevronRight,
  Users as UsersIcon,
  Filter,
  UserCheck
} from 'lucide-react';
import { User, Document } from '../../types/admin';

interface CustomerWithStats extends User {
  documentCount: number;
  pendingDocuments: number;
  completedDocuments: number;
  lastActivity?: Date;
}

const Customers: React.FC = () => {
  const { currentUser, isAdmin } = useAdminAuth();
  const [customers, setCustomers] = useState<CustomerWithStats[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<CustomerWithStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cantonFilter, setCantonFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');

  useEffect(() => {
    if (!currentUser) return;

    const loadCustomers = async () => {
      try {
        const constraints: QueryConstraint[] = [
          where('role', '==', 'customer'),
          orderBy('name')
        ];

        // If expert, only show assigned customers
        if (currentUser.role === 'expert') {
          constraints.push(where('assignedExpertId', '==', currentUser.id));
        }

        const customersQuery = query(collection(db, 'users'), ...constraints);

        const unsubscribe = onSnapshot(customersQuery, async (snapshot) => {
          const customersData: CustomerWithStats[] = [];

          for (const doc of snapshot.docs) {
            const customer = { id: doc.id, ...doc.data() } as User;

            // Get document stats for each customer
            const docsQuery = query(
              collection(db, 'documents'),
              where('customerId', '==', customer.id)
            );
            const docsSnapshot = await getDocs(docsQuery);

            let pendingCount = 0;
            let completedCount = 0;
            let lastActivity = customer.updatedAt;

            docsSnapshot.forEach((docData) => {
              const document = docData.data();
              if (document.status === 'pending') {
                pendingCount++;
              } else if (document.status === 'approved') {
                completedCount++;
              }

              // Track last activity
              if (document.uploadedAt?.toDate &&
                  (!lastActivity || document.uploadedAt.toDate() > lastActivity)) {
                lastActivity = document.uploadedAt.toDate();
              }
            });

            customersData.push({
              ...customer,
              documentCount: docsSnapshot.size,
              pendingDocuments: pendingCount,
              completedDocuments: completedCount,
              lastActivity
            });
          }

          setCustomers(customersData);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error('Error loading customers:', error);
        setLoading(false);
      }
    };

    loadCustomers();
  }, [currentUser, isAdmin]);

  // Apply client-side filtering
  useEffect(() => {
    let filtered = [...customers];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.canton?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.municipality?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Canton filter
    if (cantonFilter !== 'all') {
      filtered = filtered.filter(customer => customer.canton === cantonFilter);
    }

    // Status filter
    if (statusFilter === 'active') {
      filtered = filtered.filter(customer => customer.pendingDocuments > 0);
    } else if (statusFilter === 'inactive') {
      filtered = filtered.filter(customer => customer.pendingDocuments === 0);
    }

    setFilteredCustomers(filtered);
  }, [customers, searchTerm, cantonFilter, statusFilter]);

  // Get unique cantons for filter dropdown
  const cantons = Array.from(new Set(customers.map(c => c.canton).filter(Boolean))).sort();

  const getCompletionRate = (customer: CustomerWithStats) => {
    if (customer.documentCount === 0) return 0;
    return Math.round((customer.completedDocuments / customer.documentCount) * 100);
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
      {/* Header with filters */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Customer Management</h2>
          <p className="mt-1 text-sm text-gray-500">
            Manage and view all customer profiles and their documents
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by name, email, canton, or municipality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              >
                <option value="all">All Customers</option>
                <option value="active">Active (Pending Docs)</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Canton Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Canton
              </label>
              <select
                className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={cantonFilter}
                onChange={(e) => setCantonFilter(e.target.value)}
              >
                <option value="all">All Cantons</option>
                {cantons.map(canton => (
                  <option key={canton} value={canton}>{canton}</option>
                ))}
              </select>
            </div>

            {/* Stats Summary */}
            <div className="flex items-center justify-end">
              <div className="text-sm text-gray-600">
                <span className="font-medium">{filteredCustomers.length}</span> of{' '}
                <span className="font-medium">{customers.length}</span> customers
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <div key={customer.id} className="bg-white shadow rounded-lg hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium text-lg">
                        {customer.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{customer.name}</h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Mail className="h-4 w-4 mr-1" />
                        {customer.email}
                      </div>
                    </div>
                  </div>
                  {customer.assignedExpertId && (
                    <div className="flex items-center text-sm text-green-600">
                      <UserCheck className="h-4 w-4 mr-1" />
                      Assigned
                    </div>
                  )}
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  {customer.canton && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {customer.canton}, {customer.municipality}
                    </div>
                  )}
                  {customer.lastActivity && (
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Last active: {new Date(customer.lastActivity).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Document Statistics */}
                <div className="border-t pt-4">
                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-gray-500">Total Docs</div>
                      <div className="text-xl font-semibold text-gray-900">
                        {customer.documentCount}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Pending</div>
                      <div className="text-xl font-semibold text-yellow-600">
                        {customer.pendingDocuments}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Completed</div>
                      <div className="text-xl font-semibold text-green-600">
                        {customer.completedDocuments}
                      </div>
                    </div>
                  </div>

                  {/* Completion Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">Completion</span>
                      <span className="text-sm text-gray-600">{getCompletionRate(customer)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${getCompletionRate(customer)}%` }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/admin/customers/${customer.id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      View Profile
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                    <Link
                      to={`/admin/documents?customer=${customer.id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Documents
                    </Link>
                    <Link
                      to={`/admin/messages?customerId=${customer.id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No customers found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;