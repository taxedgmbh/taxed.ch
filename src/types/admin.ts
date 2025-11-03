// Type definitions for the admin portal

export type UserRole = 'customer' | 'expert' | 'admin';
export type DocumentStatus = 'pending' | 'reviewed' | 'approved' | 'rejected';
export type DocumentCategory = 'income' | 'expense' | 'investment' | 'property' | 'insurance' | 'other';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  assignedExpertId?: string;
  assignedCustomers?: string[];
  expertise?: string[];
  canton?: string;
  municipality?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  customerId: string;
  expertId?: string;
  fileName: string;
  fileUrl: string;
  category: DocumentCategory;
  subcategory?: string;
  status: DocumentStatus;
  aiSummary?: string;
  aiConfidence?: number;
  expertNotes?: string;
  amount?: number;
  taxYear: number;
  uploadedAt: Date;
  reviewedAt?: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  customerId: string;
  expertId: string;
  customerName?: string;
  unreadCountExpert: number;
  unreadCountCustomer: number;
  lastMessage?: string;
  lastMessageTime?: Date;
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: UserRole;
  senderName?: string;
  content: string;
  imageUrl?: string;
  isRead: boolean;
  readAt?: Date;
  sentAt: Date;
}

export interface TaxCase {
  id: string;
  customerId: string;
  expertId?: string;
  taxYear: number;
  status: 'draft' | 'in_progress' | 'review' | 'submitted' | 'completed';
  totalIncome?: number;
  totalDeductions?: number;
  estimatedRefund?: number;
  documentsRequired: string[];
  documentsSubmitted: string[];
  completionPercentage: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  submittedAt?: Date;
}

export interface ExpertStats {
  totalCustomers: number;
  pendingDocuments: number;
  reviewedToday: number;
  reviewedThisWeek: number;
  reviewedThisMonth: number;
  unreadMessages: number;
  avgReviewTime?: number;
}