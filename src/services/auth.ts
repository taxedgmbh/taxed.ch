/**
 * Authentication Service
 * Handles user authentication, authorization, and session management
 */

import { apiService } from './api';
import type {
  AuthState,
  User,
  LoginCredentials,
  RegisterData,
  PasswordResetRequest,
  PasswordResetConfirm,
  AuthResponse,
  TwoFactorSetup,
  TwoFactorVerification,
  OAuthConfig,
  SecurityEvent,
  Session
} from '@/types/auth';

class AuthService {
  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    token: null,
    refreshToken: null,
    expiresAt: null
  };

  private listeners: Array<(state: AuthState) => void> = [];

  constructor() {
    this.initializeAuth();
  }

  /**
   * Initialize authentication state from localStorage
   */
  private initializeAuth(): void {
    try {
      const stored = localStorage.getItem('auth_state');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.authState = { ...this.authState, ...parsed };
      }
    } catch (error) {
      console.error('Failed to initialize auth state:', error);
      this.clearAuth();
    }
  }

  /**
   * Persist authentication state to localStorage
   */
  private persistAuth(): void {
    try {
      localStorage.setItem('auth_state', JSON.stringify(this.authState));
    } catch (error) {
      console.error('Failed to persist auth state:', error);
    }
  }

  /**
   * Notify listeners of auth state changes
   */
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.authState));
  }

  /**
   * Subscribe to auth state changes
   */
  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Get current authentication state
   */
  public getAuthState(): AuthState {
    return { ...this.authState };
  }

  /**
   * Check if user is authenticated
   */
  public isAuthenticated(): boolean {
    return this.authState.isAuthenticated && this.isTokenValid();
  }

  /**
   * Check if token is valid and not expired
   */
  private isTokenValid(): boolean {
    if (!this.authState.token || !this.authState.expiresAt) {
      return false;
    }
    return Date.now() < this.authState.expiresAt;
  }

  /**
   * Login user with credentials
   */
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/login', credentials);
      
      if (response.success && response.data) {
        this.authState = {
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          expiresAt: Date.now() + (response.data.expiresIn * 1000)
        };
        
        this.persistAuth();
        this.notifyListeners();
        
        return response.data;
      }
      
      throw new Error(response.error || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Register new user
   */
  public async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/register', data);
      
      if (response.success && response.data) {
        this.authState = {
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          expiresAt: Date.now() + (response.data.expiresIn * 1000)
        };
        
        this.persistAuth();
        this.notifyListeners();
        
        return response.data;
      }
      
      throw new Error(response.error || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  public async logout(): Promise<void> {
    try {
      if (this.authState.token) {
        await apiService.post('/auth/logout', {
          refreshToken: this.authState.refreshToken
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuth();
    }
  }

  /**
   * Clear authentication state
   */
  public clearAuth(): void {
    this.authState = {
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,
      expiresAt: null
    };
    
    localStorage.removeItem('auth_state');
    this.notifyListeners();
  }

  /**
   * Refresh authentication token
   */
  public async refreshToken(): Promise<boolean> {
    try {
      if (!this.authState.refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await apiService.post<AuthResponse>('/auth/refresh', {
        refreshToken: this.authState.refreshToken
      });

      if (response.success && response.data) {
        this.authState = {
          ...this.authState,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          expiresAt: Date.now() + (response.data.expiresIn * 1000)
        };
        
        this.persistAuth();
        this.notifyListeners();
        
        return true;
      }
      
      throw new Error(response.error || 'Token refresh failed');
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearAuth();
      return false;
    }
  }

  /**
   * Get current user
   */
  public getCurrentUser(): User | null {
    return this.authState.user;
  }

  /**
   * Get authentication token
   */
  public getToken(): string | null {
    return this.authState.token;
  }

  /**
   * Update user profile
   */
  public async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiService.put<User>('/auth/profile', data);
      
      if (response.success && response.data) {
        this.authState.user = response.data;
        this.persistAuth();
        this.notifyListeners();
        return response.data;
      }
      
      throw new Error(response.error || 'Profile update failed');
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  /**
   * Change password
   */
  public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      const response = await apiService.post('/auth/change-password', {
        currentPassword,
        newPassword
      });
      
      if (!response.success) {
        throw new Error(response.error || 'Password change failed');
      }
    } catch (error) {
      console.error('Password change error:', error);
      throw error;
    }
  }

  /**
   * Request password reset
   */
  public async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    try {
      const response = await apiService.post('/auth/forgot-password', data);
      
      if (!response.success) {
        throw new Error(response.error || 'Password reset request failed');
      }
    } catch (error) {
      console.error('Password reset request error:', error);
      throw error;
    }
  }

  /**
   * Confirm password reset
   */
  public async confirmPasswordReset(data: PasswordResetConfirm): Promise<void> {
    try {
      const response = await apiService.post('/auth/reset-password', data);
      
      if (!response.success) {
        throw new Error(response.error || 'Password reset confirmation failed');
      }
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      throw error;
    }
  }

  /**
   * Setup two-factor authentication
   */
  public async setupTwoFactor(): Promise<TwoFactorSetup> {
    try {
      const response = await apiService.post<TwoFactorSetup>('/auth/2fa/setup');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || '2FA setup failed');
    } catch (error) {
      console.error('2FA setup error:', error);
      throw error;
    }
  }

  /**
   * Verify two-factor authentication
   */
  public async verifyTwoFactor(data: TwoFactorVerification): Promise<void> {
    try {
      const response = await apiService.post('/auth/2fa/verify', data);
      
      if (!response.success) {
        throw new Error(response.error || '2FA verification failed');
      }
    } catch (error) {
      console.error('2FA verification error:', error);
      throw error;
    }
  }

  /**
   * OAuth login
   */
  public async oauthLogin(provider: string, code: string): Promise<AuthResponse> {
    try {
      const response = await apiService.post<AuthResponse>('/auth/oauth', {
        provider,
        code
      });
      
      if (response.success && response.data) {
        this.authState = {
          isAuthenticated: true,
          user: response.data.user,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
          expiresAt: Date.now() + (response.data.expiresIn * 1000)
        };
        
        this.persistAuth();
        this.notifyListeners();
        
        return response.data;
      }
      
      throw new Error(response.error || 'OAuth login failed');
    } catch (error) {
      console.error('OAuth login error:', error);
      throw error;
    }
  }

  /**
   * Get OAuth configuration
   */
  public async getOAuthConfig(provider: string): Promise<OAuthConfig> {
    try {
      const response = await apiService.get<OAuthConfig>(`/auth/oauth/${provider}/config`);
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'OAuth config failed');
    } catch (error) {
      console.error('OAuth config error:', error);
      throw error;
    }
  }

  /**
   * Get security events
   */
  public async getSecurityEvents(): Promise<SecurityEvent[]> {
    try {
      const response = await apiService.get<SecurityEvent[]>('/auth/security-events');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch security events');
    } catch (error) {
      console.error('Security events error:', error);
      throw error;
    }
  }

  /**
   * Get active sessions
   */
  public async getActiveSessions(): Promise<Session[]> {
    try {
      const response = await apiService.get<Session[]>('/auth/sessions');
      
      if (response.success && response.data) {
        return response.data;
      }
      
      throw new Error(response.error || 'Failed to fetch sessions');
    } catch (error) {
      console.error('Sessions error:', error);
      throw error;
    }
  }

  /**
   * Revoke session
   */
  public async revokeSession(sessionId: string): Promise<void> {
    try {
      const response = await apiService.delete(`/auth/sessions/${sessionId}`);
      
      if (!response.success) {
        throw new Error(response.error || 'Session revocation failed');
      }
    } catch (error) {
      console.error('Session revocation error:', error);
      throw error;
    }
  }

  /**
   * Check if user has permission
   */
  public hasPermission(permission: string): boolean {
    if (!this.authState.user) {
      return false;
    }
    
    return this.authState.user.permissions?.includes(permission as any) || false;
  }

  /**
   * Check if user has role
   */
  public hasRole(role: string): boolean {
    if (!this.authState.user) {
      return false;
    }
    
    return this.authState.user.role === role;
  }
}

// Create singleton instance
export const authService = new AuthService();

// Export the class for custom instances
export { AuthService };
