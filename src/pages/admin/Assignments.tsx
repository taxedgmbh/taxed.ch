import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { db } from '../../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import {
  Users,
  UserCheck,
  UserX,
  Search,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  BarChart3
} from 'lucide-react';
import { User } from '../../types/admin';

interface ExpertWithStats extends User {
  assignedCustomersCount: number;
  pendingDocuments: number;
  completedDocuments: number;
  avgReviewTime: number;
}

interface CustomerForAssignment extends User {
  documentCount: number;
  pendingDocuments: number;
}

const Assignments: React.FC = () => {
  const { currentUser, isAdmin } = useAdminAuth();
  const [experts, setExperts] = useState<ExpertWithStats[]>([]);
  const [unassignedCustomers, setUnassignedCustomers] = useState<CustomerForAssignment[]>([]);
  const [assignedCustomers, setAssignedCustomers] = useState<CustomerForAssignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [reassigning, setReassigning] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      loadAssignmentData();
    }
  }, [isAdmin]);

  const loadAssignmentData = async () => {
    try {
      setLoading(true);

      // Load experts
      const expertsQuery = query(
        collection(db, 'users'),
        where('role', '==', 'expert')
      );
      const expertsSnapshot = await getDocs(expertsQuery);

      const expertsData: ExpertWithStats[] = await Promise.all(
        expertsSnapshot.docs.map(async (expertDoc) => {
          const expert = { id: expertDoc.id, ...expertDoc.data() } as User;

          // Count assigned customers
          const customersQuery = query(
            collection(db, 'users'),
            where('assignedExpertId', '==', expert.id)
          );
          const customersSnapshot = await getDocs(customersQuery);
          const assignedCustomersCount = customersSnapshot.size;

          // Count pending documents
          const pendingDocsQuery = query(
            collection(db, 'documents'),
            where('expertId', '==', expert.id),
            where('status', '==', 'pending')
          );
          const pendingDocsSnapshot = await getDocs(pendingDocsQuery);

          // Count completed documents
          const completedDocsQuery = query(
            collection(db, 'documents'),
            where('expertId', '==', expert.id),
            where('status', '==', 'approved')
          );
          const completedDocsSnapshot = await getDocs(completedDocsQuery);

          return {
            ...expert,
            assignedCustomersCount,
            pendingDocuments: pendingDocsSnapshot.size,
            completedDocuments: completedDocsSnapshot.size,
            avgReviewTime: 0 // Can be calculated if needed
          };
        })
      );

      setExperts(expertsData);

      // Load unassigned customers
      const unassignedQuery = query(
        collection(db, 'users'),
        where('role', '==', 'customer'),
        where('assignedExpertId', '==', null)
      );
      const unassignedSnapshot = await getDocs(unassignedQuery);

      const unassignedData: CustomerForAssignment[] = await Promise.all(
        unassignedSnapshot.docs.map(async (customerDoc) => {
          const customer = { id: customerDoc.id, ...customerDoc.data() } as User;

          // Count documents
          const docsQuery = query(
            collection(db, 'documents'),
            where('customerId', '==', customer.id)
          );
          const docsSnapshot = await getDocs(docsQuery);
          const documentCount = docsSnapshot.size;

          // Count pending
          const pendingDocs = docsSnapshot.docs.filter(
            doc => doc.data().status === 'pending'
          ).length;

          return {
            ...customer,
            documentCount,
            pendingDocuments: pendingDocs
          };
        })
      );

      setUnassignedCustomers(unassignedData);

      // Load assigned customers
      const assignedQuery = query(
        collection(db, 'users'),
        where('role', '==', 'customer')
      );
      const assignedSnapshot = await getDocs(assignedQuery);

      const assignedData: CustomerForAssignment[] = (await Promise.all(
        assignedSnapshot.docs.map(async (customerDoc) => {
          const customer = { id: customerDoc.id, ...customerDoc.data() } as User;

          if (!customer.assignedExpertId) return null;

          // Count documents
          const docsQuery = query(
            collection(db, 'documents'),
            where('customerId', '==', customer.id)
          );
          const docsSnapshot = await getDocs(docsQuery);
          const documentCount = docsSnapshot.size;

          // Count pending
          const pendingDocs = docsSnapshot.docs.filter(
            doc => doc.data().status === 'pending'
          ).length;

          return {
            ...customer,
            documentCount,
            pendingDocuments: pendingDocs
          };
        })
      )).filter(c => c !== null) as CustomerForAssignment[];

      setAssignedCustomers(assignedData);
    } catch (error) {
      console.error('Error loading assignment data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignCustomer = async (customerId: string, expertId: string) => {
    try {
      setReassigning(true);

      await updateDoc(doc(db, 'users', customerId), {
        assignedExpertId: expertId,
        updatedAt: Timestamp.now()
      });

      // Reload data
      await loadAssignmentData();
      setSelectedCustomer(null);
      setSelectedExpert(null);
    } catch (error) {
      console.error('Error assigning customer:', error);
      alert('Failed to assign customer');
    } finally {
      setReassigning(false);
    }
  };

  const handleUnassignCustomer = async (customerId: string) => {
    if (!confirm('Are you sure you want to unassign this customer?')) return;

    try {
      setReassigning(true);

      await updateDoc(doc(db, 'users', customerId), {
        assignedExpertId: null,
        updatedAt: Timestamp.now()
      });

      await loadAssignmentData();
    } catch (error) {
      console.error('Error unassigning customer:', error);
      alert('Failed to unassign customer');
    } finally {
      setReassigning(false);
    }
  };

  const getWorkloadColor = (count: number) => {
    if (count === 0) return 'text-green-600 bg-green-100';
    if (count < 5) return 'text-blue-600 bg-blue-100';
    if (count < 10) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredCustomers = unassignedCustomers.filter(
    customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">This page is restricted to administrators only.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer Assignments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage customer-expert assignments</p>
        </div>
        <button
          onClick={loadAssignmentData}
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Experts</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{experts.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserCheck className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Assigned Customers</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{assignedCustomers.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserX className="h-6 w-6 text-orange-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Unassigned</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{unassignedCustomers.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experts Workload */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Expert Workload</h3>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="space-y-3">
          {experts.map((expert) => (
            <div key={expert.id} className="border rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600">
                      {expert.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{expert.name}</p>
                    <p className="text-xs text-gray-500">{expert.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-medium ${getWorkloadColor(expert.assignedCustomersCount)}`}>
                      {expert.assignedCustomersCount}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Customers</div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-600">
                      {expert.pendingDocuments}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Pending</div>
                  </div>

                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">
                      {expert.completedDocuments}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Completed</div>
                  </div>

                  {selectedCustomer && (
                    <button
                      onClick={() => handleAssignCustomer(selectedCustomer, expert.id)}
                      disabled={reassigning}
                      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                    >
                      <ArrowRight className="h-4 w-4 mr-1" />
                      Assign
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Unassigned Customers */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Unassigned Customers ({unassignedCustomers.length})
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Search customers..."
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className={`hover:bg-gray-50 ${selectedCustomer === customer.id ? 'bg-indigo-50' : ''}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.canton}, {customer.municipality}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {customer.documentCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      {customer.pendingDocuments}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => setSelectedCustomer(customer.id === selectedCustomer ? null : customer.id)}
                      className={`${
                        selectedCustomer === customer.id
                          ? 'text-red-600 hover:text-red-900'
                          : 'text-indigo-600 hover:text-indigo-900'
                      }`}
                    >
                      {selectedCustomer === customer.id ? 'Cancel' : 'Select'}
                    </button>
                  </td>
                </tr>
              ))}
              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm
                      ? 'No customers found matching your search'
                      : 'No unassigned customers'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assignment Instructions */}
      {selectedCustomer && (
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-indigo-600 mr-2" />
            <p className="text-sm font-medium text-indigo-900">
              Customer selected. Click "Assign" next to an expert above to complete the assignment.
            </p>
          </div>
        </div>
      )}

      {/* Assigned Customers (for reassignment) */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            Currently Assigned ({assignedCustomers.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Assigned Expert</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Documents</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pending</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {assignedCustomers.slice(0, 10).map((customer) => {
                const expert = experts.find(e => e.id === customer.assignedExpertId);
                return (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">{customer.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-indigo-600">
                            {expert?.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="ml-2">
                          <div className="text-sm font-medium text-gray-900">{expert?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.documentCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        {customer.pendingDocuments}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleUnassignCustomer(customer.id)}
                        disabled={reassigning}
                        className="text-red-600 hover:text-red-900 disabled:opacity-50"
                      >
                        Unassign
                      </button>
                    </td>
                  </tr>
                );
              })}
              {assignedCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No assigned customers
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

export default Assignments;
