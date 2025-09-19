/**
 * Email Service
 * Handles email sending, templates, and email management
 */

import { apiService } from './api';

// Email types
export type EmailStatus = 'pending' | 'sent' | 'delivered' | 'opened' | 'clicked' | 'bounced' | 'failed';
export type EmailPriority = 'low' | 'normal' | 'high';
export type EmailType = 'transactional' | 'marketing' | 'notification' | 'system';

// Email recipient interface
export interface EmailRecipient {
  email: string;
  name?: string;
  type: 'to' | 'cc' | 'bcc';
}

// Email attachment interface
export interface EmailAttachment {
  filename: string;
  content: string; // Base64 encoded
  contentType: string;
  disposition?: 'attachment' | 'inline';
  cid?: string; // Content ID for inline attachments
}

// Email template interface
export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  variables: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Email interface
export interface Email {
  id: string;
  to: EmailRecipient[];
  from: {
    email: string;
    name?: string;
  };
  subject: string;
  htmlContent?: string;
  textContent?: string;
  templateId?: string;
  templateVariables?: Record<string, any>;
  attachments?: EmailAttachment[];
  priority: EmailPriority;
  type: EmailType;
  status: EmailStatus;
  scheduledAt?: string;
  sentAt?: string;
  deliveredAt?: string;
  openedAt?: string;
  clickedAt?: string;
  bouncedAt?: string;
  errorMessage?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

// Email campaign interface
export interface EmailCampaign {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  templateId?: string;
  recipientList: string[];
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused' | 'cancelled';
  scheduledAt?: string;
  sentAt?: string;
  totalRecipients: number;
  sentCount: number;
  deliveredCount: number;
  openedCount: number;
  clickedCount: number;
  bouncedCount: number;
  unsubscribedCount: number;
  createdAt: string;
  updatedAt: string;
}

// Email list interface
export interface EmailList {
  id: string;
  name: string;
  description?: string;
  subscriberCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Email subscriber interface
export interface EmailSubscriber {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  status: 'subscribed' | 'unsubscribed' | 'bounced' | 'complained';
  tags: string[];
  customFields: Record<string, any>;
  subscribedAt: string;
  unsubscribedAt?: string;
  lastActivityAt?: string;
}

// Email analytics interface
export interface EmailAnalytics {
  totalSent: number;
  totalDelivered: number;
  totalOpened: number;
  totalClicked: number;
  totalBounced: number;
  totalUnsubscribed: number;
  openRate: number;
  clickRate: number;
  bounceRate: number;
  unsubscribeRate: number;
  deliveryRate: number;
}

class EmailService {
  private listeners: Array<(email: Email) => void> = [];

  /**
   * Subscribe to email events
   */
  public subscribe(listener: (email: Email) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Send email
   */
  public async sendEmail(email: Omit<Email, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<Email> {
    try {
      const response = await apiService.post<Email>('/emails', email);

      if (response.success && response.data) {
        // Notify listeners
        this.listeners.forEach(listener => listener(response.data!));
        return response.data;
      }

      throw new Error(response.error || 'Failed to send email');
    } catch (error) {
      console.error('Send email error:', error);
      throw error;
    }
  }

  /**
   * Send email using template
   */
  public async sendTemplateEmail(
    templateId: string,
    to: EmailRecipient[],
    variables: Record<string, any>,
    options?: {
      from?: { email: string; name?: string };
      priority?: EmailPriority;
      type?: EmailType;
      attachments?: EmailAttachment[];
      scheduledAt?: string;
    }
  ): Promise<Email> {
    try {
      const response = await apiService.post<Email>('/emails/template', {
        templateId,
        to,
        variables,
        ...options
      });

      if (response.success && response.data) {
        this.listeners.forEach(listener => listener(response.data!));
        return response.data;
      }

      throw new Error(response.error || 'Failed to send template email');
    } catch (error) {
      console.error('Send template email error:', error);
      throw error;
    }
  }

  /**
   * Send bulk email
   */
  public async sendBulkEmail(
    recipients: EmailRecipient[],
    subject: string,
    htmlContent: string,
    textContent?: string,
    options?: {
      from?: { email: string; name?: string };
      priority?: EmailPriority;
      type?: EmailType;
      attachments?: EmailAttachment[];
      scheduledAt?: string;
    }
  ): Promise<Email[]> {
    try {
      const response = await apiService.post<Email[]>('/emails/bulk', {
        recipients,
        subject,
        htmlContent,
        textContent,
        ...options
      });

      if (response.success && response.data) {
        response.data.forEach(email => {
          this.listeners.forEach(listener => listener(email));
        });
        return response.data;
      }

      throw new Error(response.error || 'Failed to send bulk email');
    } catch (error) {
      console.error('Send bulk email error:', error);
      throw error;
    }
  }

  /**
   * Get email by ID
   */
  public async getEmail(emailId: string): Promise<Email> {
    try {
      const response = await apiService.get<Email>(`/emails/${emailId}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Email not found');
    } catch (error) {
      console.error('Get email error:', error);
      throw error;
    }
  }

  /**
   * Get emails with filters
   */
  public async getEmails(
    filters?: {
      status?: EmailStatus;
      type?: EmailType;
      to?: string;
      from?: string;
      dateFrom?: string;
      dateTo?: string;
      page?: number;
      limit?: number;
    }
  ): Promise<{
    emails: Email[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters?.status) queryParams.append('status', filters.status);
      if (filters?.type) queryParams.append('type', filters.type);
      if (filters?.to) queryParams.append('to', filters.to);
      if (filters?.from) queryParams.append('from', filters.from);
      if (filters?.dateFrom) queryParams.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) queryParams.append('dateTo', filters.dateTo);
      if (filters?.page) queryParams.append('page', filters.page.toString());
      if (filters?.limit) queryParams.append('limit', filters.limit.toString());

      const response = await apiService.get<{
        emails: Email[];
        total: number;
        page: number;
        limit: number;
      }>(`/emails?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch emails');
    } catch (error) {
      console.error('Get emails error:', error);
      throw error;
    }
  }

  /**
   * Cancel scheduled email
   */
  public async cancelEmail(emailId: string): Promise<Email> {
    try {
      const response = await apiService.post<Email>(`/emails/${emailId}/cancel`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to cancel email');
    } catch (error) {
      console.error('Cancel email error:', error);
      throw error;
    }
  }

  /**
   * Get email templates
   */
  public async getTemplates(): Promise<EmailTemplate[]> {
    try {
      const response = await apiService.get<EmailTemplate[]>('/emails/templates');

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch email templates');
    } catch (error) {
      console.error('Get templates error:', error);
      throw error;
    }
  }

  /**
   * Get email template by ID
   */
  public async getTemplate(templateId: string): Promise<EmailTemplate> {
    try {
      const response = await apiService.get<EmailTemplate>(`/emails/templates/${templateId}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Email template not found');
    } catch (error) {
      console.error('Get template error:', error);
      throw error;
    }
  }

  /**
   * Create email template
   */
  public async createTemplate(template: Omit<EmailTemplate, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmailTemplate> {
    try {
      const response = await apiService.post<EmailTemplate>('/emails/templates', template);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to create email template');
    } catch (error) {
      console.error('Create template error:', error);
      throw error;
    }
  }

  /**
   * Update email template
   */
  public async updateTemplate(templateId: string, updates: Partial<EmailTemplate>): Promise<EmailTemplate> {
    try {
      const response = await apiService.put<EmailTemplate>(`/emails/templates/${templateId}`, updates);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to update email template');
    } catch (error) {
      console.error('Update template error:', error);
      throw error;
    }
  }

  /**
   * Delete email template
   */
  public async deleteTemplate(templateId: string): Promise<void> {
    try {
      const response = await apiService.delete(`/emails/templates/${templateId}`);

      if (!response.success) {
        throw new Error(response.error || 'Failed to delete email template');
      }
    } catch (error) {
      console.error('Delete template error:', error);
      throw error;
    }
  }

  /**
   * Get email campaigns
   */
  public async getCampaigns(
    page: number = 1,
    limit: number = 20
  ): Promise<{
    campaigns: EmailCampaign[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const queryParams = new URLSearchParams();
      queryParams.append('page', page.toString());
      queryParams.append('limit', limit.toString());

      const response = await apiService.get<{
        campaigns: EmailCampaign[];
        total: number;
        page: number;
        limit: number;
      }>(`/emails/campaigns?${queryParams.toString()}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch email campaigns');
    } catch (error) {
      console.error('Get campaigns error:', error);
      throw error;
    }
  }

  /**
   * Create email campaign
   */
  public async createCampaign(campaign: Omit<EmailCampaign, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmailCampaign> {
    try {
      const response = await apiService.post<EmailCampaign>('/emails/campaigns', campaign);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to create email campaign');
    } catch (error) {
      console.error('Create campaign error:', error);
      throw error;
    }
  }

  /**
   * Send email campaign
   */
  public async sendCampaign(campaignId: string): Promise<EmailCampaign> {
    try {
      const response = await apiService.post<EmailCampaign>(`/emails/campaigns/${campaignId}/send`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to send email campaign');
    } catch (error) {
      console.error('Send campaign error:', error);
      throw error;
    }
  }

  /**
   * Get email lists
   */
  public async getLists(): Promise<EmailList[]> {
    try {
      const response = await apiService.get<EmailList[]>('/emails/lists');

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch email lists');
    } catch (error) {
      console.error('Get lists error:', error);
      throw error;
    }
  }

  /**
   * Create email list
   */
  public async createList(list: Omit<EmailList, 'id' | 'subscriberCount' | 'createdAt' | 'updatedAt'>): Promise<EmailList> {
    try {
      const response = await apiService.post<EmailList>('/emails/lists', list);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to create email list');
    } catch (error) {
      console.error('Create list error:', error);
      throw error;
    }
  }

  /**
   * Subscribe to email list
   */
  public async subscribeToList(
    listId: string,
    subscriber: Omit<EmailSubscriber, 'id' | 'subscribedAt' | 'lastActivityAt'>
  ): Promise<EmailSubscriber> {
    try {
      const response = await apiService.post<EmailSubscriber>(`/emails/lists/${listId}/subscribe`, subscriber);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to subscribe to email list');
    } catch (error) {
      console.error('Subscribe to list error:', error);
      throw error;
    }
  }

  /**
   * Unsubscribe from email list
   */
  public async unsubscribeFromList(listId: string, email: string): Promise<void> {
    try {
      const response = await apiService.post(`/emails/lists/${listId}/unsubscribe`, { email });

      if (!response.success) {
        throw new Error(response.error || 'Failed to unsubscribe from email list');
      }
    } catch (error) {
      console.error('Unsubscribe from list error:', error);
      throw error;
    }
  }

  /**
   * Get email analytics
   */
  public async getAnalytics(
    period: 'day' | 'week' | 'month' | 'year' = 'month'
  ): Promise<EmailAnalytics> {
    try {
      const response = await apiService.get<EmailAnalytics>(`/emails/analytics?period=${period}`);

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to fetch email analytics');
    } catch (error) {
      console.error('Get analytics error:', error);
      throw error;
    }
  }

  /**
   * Validate email address
   */
  public async validateEmail(email: string): Promise<{ valid: boolean; reason?: string }> {
    try {
      const response = await apiService.post<{ valid: boolean; reason?: string }>('/emails/validate', { email });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to validate email');
    } catch (error) {
      console.error('Validate email error:', error);
      throw error;
    }
  }

  /**
   * Send test email
   */
  public async sendTestEmail(
    to: string,
    subject: string,
    htmlContent: string,
    textContent?: string
  ): Promise<Email> {
    try {
      const response = await apiService.post<Email>('/emails/test', {
        to,
        subject,
        htmlContent,
        textContent
      });

      if (response.success && response.data) {
        return response.data;
      }

      throw new Error(response.error || 'Failed to send test email');
    } catch (error) {
      console.error('Send test email error:', error);
      throw error;
    }
  }
}

// Create singleton instance
export const emailService = new EmailService();

// Export the class for custom instances
export { EmailService };
