import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { db, storage } from '../../config/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import {
  ArrowLeft,
  FileText,
  Download,
  CheckCircle,
  XCircle,
  MessageSquare,
  Save,
  Clock,
  Calendar,
  DollarSign,
  Tag,
  User,
  AlertCircle,
  Loader2,
  ZoomIn,
  ZoomOut,
  RotateCw
} from 'lucide-react';
import { Document, DocumentStatus } from '../../types/admin';

const DocumentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAdminAuth();

  const [document, setDocument] = useState<Document | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [expertNotes, setExpertNotes] = useState('');
  const [imageZoom, setImageZoom] = useState(1);
  const [imageRotation, setImageRotation] = useState(0);
  const [showConfirmDialog, setShowConfirmDialog] = useState<{
    action: DocumentStatus;
    show: boolean;
  }>({ action: 'approved', show: false });

  useEffect(() => {
    loadDocument();
  }, [id]);

  const loadDocument = async () => {
    if (!id) return;

    try {
      const docRef = doc(db, 'documents', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const docData = { id: docSnap.id, ...docSnap.data() } as Document;
        setDocument(docData);
        setExpertNotes(docData.expertNotes || '');

        // Get image URL from Firebase Storage
        if (docData.customerId && docData.fileName) {
          const storageRef = ref(storage, `documents/${docData.customerId}/${docData.fileName}`);
          const url = await getDownloadURL(storageRef);
          setImageUrl(url);
        }
      } else {
        console.error('Document not found');
        navigate('/admin/documents');
      }
    } catch (error) {
      console.error('Error loading document:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus: DocumentStatus) => {
    if (!document || !id) return;

    setSaving(true);
    try {
      const docRef = doc(db, 'documents', id);
      await updateDoc(docRef, {
        status: newStatus,
        expertNotes,
        reviewedAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        reviewedBy: currentUser?.id
      });

      setDocument({
        ...document,
        status: newStatus,
        expertNotes,
        reviewedAt: new Date(),
        updatedAt: new Date()
      });

      setShowConfirmDialog({ action: newStatus, show: false });

      // Show success message or redirect
      setTimeout(() => {
        navigate('/admin/documents');
      }, 1000);
    } catch (error) {
      console.error('Error updating document:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!document || !id) return;

    setSaving(true);
    try {
      const docRef = doc(db, 'documents', id);
      await updateDoc(docRef, {
        expertNotes,
        updatedAt: Timestamp.now()
      });

      setDocument({
        ...document,
        expertNotes,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving notes:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleZoomIn = () => setImageZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setImageZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleRotate = () => setImageRotation(prev => (prev + 90) % 360);

  const getStatusColor = (status: DocumentStatus) => {
    switch(status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-500';
    if (confidence > 0.8) return 'text-green-600';
    if (confidence > 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!document) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Document not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/admin/documents')}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Documents
          </button>

          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(document.status)}`}>
              {document.status}
            </span>
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <FileText className="h-6 w-6 mr-3 text-gray-400" />
              {document.fileName}
            </h1>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <User className="h-4 w-4 mr-2" />
                Customer: {document.customerId}
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-4 w-4 mr-2" />
                Tax Year: {document.taxYear}
              </div>
              <div className="flex items-center text-gray-600">
                <Tag className="h-4 w-4 mr-2" />
                Category: <span className="ml-1 capitalize">{document.category}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                Uploaded: {document.uploadedAt instanceof Timestamp
                  ? new Date(document.uploadedAt.toDate()).toLocaleString()
                  : new Date(document.uploadedAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Image Viewer */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Document Preview</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleZoomOut}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Zoom Out"
              >
                <ZoomOut className="h-5 w-5 text-gray-600" />
              </button>
              <span className="text-sm text-gray-600">{Math.round(imageZoom * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Zoom In"
              >
                <ZoomIn className="h-5 w-5 text-gray-600" />
              </button>
              <button
                onClick={handleRotate}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Rotate"
              >
                <RotateCw className="h-5 w-5 text-gray-600" />
              </button>
              <a
                href={imageUrl}
                download={document.fileName}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Download"
              >
                <Download className="h-5 w-5 text-gray-600" />
              </a>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden bg-gray-50" style={{ height: '600px' }}>
            {imageUrl ? (
              <div className="w-full h-full overflow-auto flex items-center justify-center">
                <img
                  src={imageUrl}
                  alt={document.fileName}
                  className="max-w-none transition-transform duration-200"
                  style={{
                    transform: `scale(${imageZoom}) rotate(${imageRotation}deg)`,
                    transformOrigin: 'center'
                  }}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No preview available</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Document Information & Actions */}
        <div className="space-y-6">
          {/* AI Analysis */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI Analysis</h2>

            <div className="space-y-4">
              {document.aiConfidence && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Confidence Score</span>
                    <span className={`text-sm font-semibold ${getConfidenceColor(document.aiConfidence)}`}>
                      {Math.round(document.aiConfidence * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        document.aiConfidence > 0.8 ? 'bg-green-500' :
                        document.aiConfidence > 0.5 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${document.aiConfidence * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {document.amount && (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Detected Amount</span>
                  <span className="text-sm font-semibold text-gray-900">
                    CHF {document.amount.toLocaleString()}
                  </span>
                </div>
              )}

              {document.aiSummary && (
                <div>
                  <span className="text-sm font-medium text-gray-700 block mb-2">AI Summary</span>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">{document.aiSummary}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Expert Notes */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Expert Notes</h2>
              <button
                onClick={handleSaveNotes}
                disabled={saving}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Notes
              </button>
            </div>

            <textarea
              value={expertNotes}
              onChange={(e) => setExpertNotes(e.target.value)}
              className="w-full h-32 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Add your review notes here..."
            />
          </div>

          {/* Action Buttons */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>

            <div className="space-y-3">
              <button
                onClick={() => setShowConfirmDialog({ action: 'approved', show: true })}
                disabled={saving || document.status === 'approved'}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Approve Document
              </button>

              <button
                onClick={() => setShowConfirmDialog({ action: 'rejected', show: true })}
                disabled={saving || document.status === 'rejected'}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
              >
                <XCircle className="h-5 w-5 mr-2" />
                Reject Document
              </button>

              <button
                onClick={() => navigate(`/admin/messages?customerId=${document.customerId}`)}
                className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Request More Information
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog.show && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm {showConfirmDialog.action === 'approved' ? 'Approval' : 'Rejection'}
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to {showConfirmDialog.action === 'approved' ? 'approve' : 'reject'} this document?
              This action will update the document status and notify the customer.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmDialog({ ...showConfirmDialog, show: false })}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(showConfirmDialog.action)}
                className={`px-4 py-2 text-sm font-medium rounded-md text-white ${
                  showConfirmDialog.action === 'approved'
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Confirm'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentDetail;