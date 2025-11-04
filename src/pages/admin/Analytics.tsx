import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { db } from '../../config/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  orderBy,
  limit
} from 'firebase/firestore';
import {
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Download
} from 'lucide-react';
import { Document, User as UserType } from '../../types/admin';

interface AnalyticsData {
  totalDocuments: number;
  approvedDocuments: number;
  rejectedDocuments: number;
  pendingDocuments: number;
  totalCustomers: number;
  activeCustomers: number;
  totalExperts: number;
  avgReviewTime: number;
  documentsThisMonth: number;
  documentsLastMonth: number;
  categoryBreakdown: Record<string, number>;
  statusBreakdown: Record<string, number>;
  monthlyTrend: Array<{ month: string; count: number }>;
  topExperts: Array<{ expertId: string; expertName: string; documentsReviewed: number }>;
}

const Analytics: React.FC = () => {
  const { currentUser, isAdmin } = useAdminAuth();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalDocuments: 0,
    approvedDocuments: 0,
    rejectedDocuments: 0,
    pendingDocuments: 0,
    totalCustomers: 0,
    activeCustomers: 0,
    totalExperts: 0,
    avgReviewTime: 0,
    documentsThisMonth: 0,
    documentsLastMonth: 0,
    categoryBreakdown: {},
    statusBreakdown: {},
    monthlyTrend: [],
    topExperts: []
  });
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'quarter' | 'year'>('month');

  useEffect(() => {
    loadAnalytics();
  }, [currentUser, dateRange]);

  const loadAnalytics = async () => {
    if (!currentUser) return;

    try {
      setLoading(true);

      // Get date ranges
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      let startDate: Date;
      switch (dateRange) {
        case 'week':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case 'quarter':
          startDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
          break;
        case 'year':
          startDate = new Date(now.getFullYear() - 1, now.getMonth(), 1);
          break;
        default: // month
          startDate = startOfMonth;
      }

      // Query documents
      let docsQuery;
      if (currentUser.role === 'expert') {
        docsQuery = query(
          collection(db, 'documents'),
          where('expertId', '==', currentUser.id)
        );
      } else {
        docsQuery = query(collection(db, 'documents'));
      }

      const docsSnapshot = await getDocs(docsQuery);
      const documents = docsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Document));

      // Calculate statistics
      const totalDocuments = documents.length;
      const approvedDocuments = documents.filter(d => d.status === 'approved').length;
      const rejectedDocuments = documents.filter(d => d.status === 'rejected').length;
      const pendingDocuments = documents.filter(d => d.status === 'pending').length;

      // Documents this month vs last month
      const documentsThisMonth = documents.filter(d => {
        const uploadDate = d.uploadedAt instanceof Timestamp ? d.uploadedAt.toDate() : new Date(d.uploadedAt);
        return uploadDate >= startOfMonth;
      }).length;

      const documentsLastMonth = documents.filter(d => {
        const uploadDate = d.uploadedAt instanceof Timestamp ? d.uploadedAt.toDate() : new Date(d.uploadedAt);
        return uploadDate >= startOfLastMonth && uploadDate <= endOfLastMonth;
      }).length;

      // Category breakdown
      const categoryBreakdown: Record<string, number> = {};
      documents.forEach(doc => {
        categoryBreakdown[doc.category] = (categoryBreakdown[doc.category] || 0) + 1;
      });

      // Status breakdown
      const statusBreakdown: Record<string, number> = {};
      documents.forEach(doc => {
        statusBreakdown[doc.status] = (statusBreakdown[doc.status] || 0) + 1;
      });

      // Monthly trend (last 6 months)
      const monthlyTrend: Array<{ month: string; count: number }> = [];
      for (let i = 5; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
        const monthDocs = documents.filter(d => {
          const uploadDate = d.uploadedAt instanceof Timestamp ? d.uploadedAt.toDate() : new Date(d.uploadedAt);
          return uploadDate >= monthDate && uploadDate <= monthEnd;
        }).length;
        monthlyTrend.push({
          month: monthDate.toLocaleDateString('en-US', { month: 'short' }),
          count: monthDocs
        });
      }

      // Average review time (in hours)
      const reviewedDocs = documents.filter(d => d.reviewedAt);
      let totalReviewTime = 0;
      reviewedDocs.forEach(doc => {
        const uploaded = doc.uploadedAt instanceof Timestamp ? doc.uploadedAt.toDate() : new Date(doc.uploadedAt);
        const reviewed = doc.reviewedAt instanceof Timestamp ? doc.reviewedAt.toDate() : new Date(doc.reviewedAt);
        const timeDiff = reviewed.getTime() - uploaded.getTime();
        totalReviewTime += timeDiff;
      });
      const avgReviewTime = reviewedDocs.length > 0
        ? totalReviewTime / reviewedDocs.length / (1000 * 60 * 60) // Convert to hours
        : 0;

      // Get customers
      const customersQuery = query(
        collection(db, 'users'),
        where('role', '==', 'customer')
      );
      const customersSnapshot = await getDocs(customersQuery);
      const totalCustomers = customersSnapshot.size;

      // Active customers (uploaded docs in last 30 days)
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      const activeCustomerIds = new Set(
        documents
          .filter(d => {
            const uploadDate = d.uploadedAt instanceof Timestamp ? d.uploadedAt.toDate() : new Date(d.uploadedAt);
            return uploadDate >= thirtyDaysAgo;
          })
          .map(d => d.customerId)
      );
      const activeCustomers = activeCustomerIds.size;

      // Get experts
      const expertsQuery = query(
        collection(db, 'users'),
        where('role', '==', 'expert')
      );
      const expertsSnapshot = await getDocs(expertsQuery);
      const totalExperts = expertsSnapshot.size;

      // Top experts by documents reviewed
      const expertCounts: Record<string, { name: string; count: number }> = {};
      const expertMap: Record<string, string> = {};

      expertsSnapshot.docs.forEach(doc => {
        expertMap[doc.id] = doc.data().name || 'Unknown';
      });

      documents.forEach(doc => {
        if (doc.expertId && doc.reviewedAt) {
          if (!expertCounts[doc.expertId]) {
            expertCounts[doc.expertId] = {
              name: expertMap[doc.expertId] || 'Unknown',
              count: 0
            };
          }
          expertCounts[doc.expertId].count++;
        }
      });

      const topExperts = Object.entries(expertCounts)
        .map(([expertId, data]) => ({
          expertId,
          expertName: data.name,
          documentsReviewed: data.count
        }))
        .sort((a, b) => b.documentsReviewed - a.documentsReviewed)
        .slice(0, 5);

      setAnalytics({
        totalDocuments,
        approvedDocuments,
        rejectedDocuments,
        pendingDocuments,
        totalCustomers,
        activeCustomers,
        totalExperts,
        avgReviewTime,
        documentsThisMonth,
        documentsLastMonth,
        categoryBreakdown,
        statusBreakdown,
        monthlyTrend,
        topExperts
      });
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    const report = `
Tax Admin Analytics Report
Generated: ${new Date().toLocaleString()}
Date Range: ${dateRange}

OVERVIEW
========
Total Documents: ${analytics.totalDocuments}
Approved: ${analytics.approvedDocuments}
Rejected: ${analytics.rejectedDocuments}
Pending: ${analytics.pendingDocuments}

CUSTOMERS
=========
Total Customers: ${analytics.totalCustomers}
Active Customers (30 days): ${analytics.activeCustomers}

EXPERTS
=======
Total Experts: ${analytics.totalExperts}
Average Review Time: ${analytics.avgReviewTime.toFixed(2)} hours

MONTHLY COMPARISON
==================
This Month: ${analytics.documentsThisMonth}
Last Month: ${analytics.documentsLastMonth}
Change: ${((analytics.documentsThisMonth - analytics.documentsLastMonth) / (analytics.documentsLastMonth || 1) * 100).toFixed(1)}%

CATEGORY BREAKDOWN
==================
${Object.entries(analytics.categoryBreakdown).map(([cat, count]) => `${cat}: ${count}`).join('\n')}

TOP EXPERTS
===========
${analytics.topExperts.map((e, i) => `${i + 1}. ${e.expertName}: ${e.documentsReviewed} documents`).join('\n')}
`;

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-report-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const monthlyChange = getPercentageChange(analytics.documentsThisMonth, analytics.documentsLastMonth);

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
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Performance metrics and insights</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
          <button
            onClick={exportReport}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FileText className="h-6 w-6 text-indigo-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Documents</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{analytics.totalDocuments}</div>
                    <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                      monthlyChange >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {monthlyChange >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(monthlyChange).toFixed(1)}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Customers</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{analytics.activeCustomers}</div>
                    <div className="ml-2 text-sm text-gray-500">/ {analytics.totalCustomers}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Avg Review Time</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {analytics.avgReviewTime.toFixed(1)}h
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Activity className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Approval Rate</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {analytics.totalDocuments > 0
                        ? ((analytics.approvedDocuments / analytics.totalDocuments) * 100).toFixed(1)
                        : 0}%
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Status Breakdown */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Document Status</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Approved</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900 mr-3">
                  {analytics.approvedDocuments}
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{
                      width: `${analytics.totalDocuments > 0
                        ? (analytics.approvedDocuments / analytics.totalDocuments) * 100
                        : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Pending</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900 mr-3">
                  {analytics.pendingDocuments}
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{
                      width: `${analytics.totalDocuments > 0
                        ? (analytics.pendingDocuments / analytics.totalDocuments) * 100
                        : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">Rejected</span>
              </div>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-gray-900 mr-3">
                  {analytics.rejectedDocuments}
                </span>
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{
                      width: `${analytics.totalDocuments > 0
                        ? (analytics.rejectedDocuments / analytics.totalDocuments) * 100
                        : 0}%`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Document Categories</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {Object.entries(analytics.categoryBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700 capitalize">{category}</span>
                  <div className="flex items-center">
                    <span className="text-sm font-semibold text-gray-900 mr-3">{count}</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{
                          width: `${analytics.totalDocuments > 0
                            ? (count / analytics.totalDocuments) * 100
                            : 0}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Document Upload Trend</h3>
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex items-end space-x-2 h-64">
          {analytics.monthlyTrend.map((data, index) => {
            const maxCount = Math.max(...analytics.monthlyTrend.map(d => d.count), 1);
            const height = (data.count / maxCount) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '100%' }}>
                  <div
                    className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg flex items-end justify-center pb-1"
                    style={{ height: `${height}%` }}
                  >
                    {data.count > 0 && (
                      <span className="text-xs font-medium text-white">{data.count}</span>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2">{data.month}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Experts */}
      {isAdmin && analytics.topExperts.length > 0 && (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Top Performing Experts</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {analytics.topExperts.map((expert, index) => (
              <div key={expert.expertId} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-sm font-medium text-indigo-600">#{index + 1}</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{expert.expertName}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-semibold text-gray-900 mr-3">
                    {expert.documentsReviewed} docs
                  </span>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${(expert.documentsReviewed / analytics.topExperts[0].documentsReviewed) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
