import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Upload, 
  Download, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  PieChart,
  TrendingUp,
  Users,
  Building,
  Mail,
  Phone,
  MapPin,
  Lock,
  Shield,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const ClientPortal = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [client, setClient] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [cases, setCases] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // Check for existing session on component mount
  useEffect(() => {
    const token = localStorage.getItem('clientSessionToken');
    if (token) {
      verifySession(token);
    }
  }, []);

  const verifySession = async (token) => {
    try {
      const response = await fetch('/api/auth.php?action=verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionToken: token })
      });

      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setClient(data.client);
        setSessionToken(token);
        loadDashboardData();
      } else {
        localStorage.removeItem('clientSessionToken');
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      localStorage.removeItem('clientSessionToken');
    }
  };

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth.php?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setClient(data.client);
        setSessionToken(data.sessionToken);
        localStorage.setItem('clientSessionToken', data.sessionToken);
        loadDashboardData();
        toast({
          title: "Welcome back!",
          description: `Hello ${data.client.firstName}, you're successfully logged in.`,
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.error || "Invalid credentials",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login Error",
        description: "Unable to connect to the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdminBypass = async () => {
    setLoading(true);
    try {
      // Frontend-only bypass for development (no backend required)
      const mockClient = {
        id: 1,
        email: 'bypass@taxed.ch',
        firstName: 'Bypass',
        lastName: 'Client',
        company: 'Taxed GmbH'
      };
      
      const mockSessionToken = 'bypass_session_' + Date.now();
      
      setIsAuthenticated(true);
      setClient(mockClient);
      setSessionToken(mockSessionToken);
      localStorage.setItem('clientSessionToken', mockSessionToken);
      
      // Load mock dashboard data
      loadMockDashboardData();
      
      toast({
        title: "Admin Bypass Successful",
        description: "Development bypass activated. This is a frontend-only session.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Bypass Error",
        description: "Unable to activate bypass. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth.php?action=register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Registration Successful",
          description: "Your account has been created and is pending approval. You'll receive an email once it's activated.",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: data.error || "Unable to create account",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Registration Error",
        description: "Unable to connect to the server. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth.php?action=logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionToken })
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsAuthenticated(false);
      setClient(null);
      setSessionToken(null);
      localStorage.removeItem('clientSessionToken');
      setActiveTab('dashboard');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };

  const loadDashboardData = async () => {
    try {
      const response = await fetch('/api/client-portal.php?action=dashboard', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Fallback to mock data if backend is not available
      loadMockDashboardData();
    }
  };

  const loadMockDashboardData = () => {
    const mockData = {
      totalCases: 3,
      pendingCases: 1,
      completedCases: 2,
      totalDocuments: 12,
      unreadMessages: 2,
      upcomingAppointments: 1
    };
    
    const mockCases = [
      {
        id: 1,
        caseNumber: 'TC-2024-001',
        taxYear: 2024,
        caseType: 'individual',
        status: 'in_progress',
        priority: 'high',
        description: 'Individual tax return for 2024',
        assignedTo: 'Tax Advisor',
        dueDate: '2025-03-31',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        caseNumber: 'TC-2024-002',
        taxYear: 2024,
        caseType: 'expat',
        status: 'completed',
        priority: 'medium',
        description: 'Expatriate tax return',
        assignedTo: 'Senior Advisor',
        dueDate: '2025-03-31',
        createdAt: '2024-01-10'
      }
    ];
    
    const mockDocuments = [
      {
        id: 1,
        filename: 'tax_return_2024.pdf',
        documentType: 'tax_return',
        uploadedBy: 'client',
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        filename: 'salary_certificate.pdf',
        documentType: 'receipt',
        uploadedBy: 'client',
        createdAt: '2024-01-14'
      }
    ];
    
    const mockMessages = [
      {
        id: 1,
        subject: 'Tax Return Status Update',
        senderType: 'admin',
        isRead: false,
        createdAt: '2024-01-15'
      },
      {
        id: 2,
        subject: 'Document Request',
        senderType: 'admin',
        isRead: false,
        createdAt: '2024-01-14'
      }
    ];
    
    const mockAppointments = [
      {
        id: 1,
        title: 'Tax Consultation',
        appointmentDate: '2024-01-20T10:00:00',
        status: 'scheduled',
        meetingType: 'phone'
      }
    ];
    
    setDashboardData(mockData);
    setCases(mockCases);
    setDocuments(mockDocuments);
    setMessages(mockMessages);
    setAppointments(mockAppointments);
  };

  const loadCases = async () => {
    try {
      const response = await fetch('/api/client-portal.php?action=cases', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setCases(data.data);
      }
    } catch (error) {
      console.error('Failed to load cases:', error);
    }
  };

  const loadDocuments = async () => {
    try {
      const response = await fetch('/api/client-portal.php?action=documents', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setDocuments(data.data);
      }
    } catch (error) {
      console.error('Failed to load documents:', error);
    }
  };

  const loadMessages = async () => {
    try {
      const response = await fetch('/api/client-portal.php?action=messages', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const loadAppointments = async () => {
    try {
      const response = await fetch('/api/client-portal.php?action=appointments', {
        headers: {
          'Authorization': `Bearer ${sessionToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error('Failed to load appointments:', error);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (isAuthenticated && sessionToken) {
      switch (activeTab) {
        case 'cases':
          loadCases();
          break;
        case 'documents':
          loadDocuments();
          break;
        case 'messages':
          loadMessages();
          break;
        case 'appointments':
          loadAppointments();
          break;
        default:
          loadDashboardData();
      }
    }
  }, [activeTab, isAuthenticated, sessionToken]);

  if (!isAuthenticated) {
    return <LoginRegisterForm onLogin={handleLogin} onRegister={handleRegister} onAdminBypass={handleAdminBypass} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-steel-blue to-blue-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Client Portal</h1>
                <p className="text-sm text-gray-500">Taxed GmbH</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {client?.firstName} {client?.lastName}
                </p>
                <p className="text-xs text-gray-500">{client?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <nav className="w-64 space-y-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
              { id: 'cases', label: 'Tax Cases', icon: FileText },
              { id: 'documents', label: 'Documents', icon: Upload },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'appointments', label: 'Appointments', icon: Calendar },
              { id: 'profile', label: 'Profile', icon: User },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-steel-blue text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'dashboard' && <DashboardTab data={dashboardData} />}
                {activeTab === 'cases' && <CasesTab cases={cases} />}
                {activeTab === 'documents' && <DocumentsTab documents={documents} />}
                {activeTab === 'messages' && <MessagesTab messages={messages} />}
                {activeTab === 'appointments' && <AppointmentsTab appointments={appointments} />}
                {activeTab === 'profile' && <ProfileTab client={client} />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

// Login/Register Form Component
const LoginRegisterForm = ({ onLogin, onRegister, onAdminBypass, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    company: '',
    phone: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      onLogin({ email: formData.email, password: formData.password });
    } else {
      onRegister(formData);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-steel-blue to-blue-600 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-steel-blue" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="mt-2 text-blue-100">
            {isLogin ? 'Sign in to your client portal' : 'Join our secure client portal'}
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required={!isLogin}
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required={!isLogin}
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-steel-blue hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-steel-blue hover:text-blue-700 text-sm font-medium"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Admin Access</p>
                <Button
                  type="button"
                  onClick={onAdminBypass}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  {loading ? 'Processing...' : 'Admin Bypass (Dev)'}
                </Button>
                <p className="text-xs text-gray-500 mt-2">
                  Use bypass for development and testing
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Dashboard Tab Component
const DashboardTab = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-steel-blue mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
        <p className="text-gray-600">Overview of your tax cases and activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {data.caseStats?.map((stat) => (
          <Card key={stat.status}>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-steel-blue/10 rounded-lg">
                  <FileText className="w-6 h-6 text-steel-blue" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 capitalize">
                    {stat.status.replace('_', ' ')} Cases
                  </p>
                  <p className="text-2xl font-bold text-gray-900">{stat.count}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Cases */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Tax Cases</CardTitle>
          <CardDescription>Your latest tax case updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentCases?.map((case_) => (
              <div key={case_.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{case_.case_number}</h4>
                  <p className="text-sm text-gray-600">
                    {case_.tax_year} • {case_.case_type} • {case_.priority}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    case_.status === 'completed' ? 'bg-green-100 text-green-800' :
                    case_.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                    case_.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {case_.status.replace('_', ' ')}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(case_.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      {data.upcomingAppointments?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled meetings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{appointment.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(appointment.appointment_date).toLocaleString()}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Cases Tab Component
const CasesTab = ({ cases }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tax Cases</h2>
          <p className="text-gray-600">Manage your tax cases and track progress</p>
        </div>
        <Button className="bg-steel-blue hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Case
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {cases.map((case_) => (
              <div key={case_.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{case_.case_number}</h3>
                    <p className="text-gray-600">{case_.tax_year} • {case_.case_type}</p>
                    {case_.description && (
                      <p className="text-sm text-gray-500 mt-2">{case_.description}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      case_.status === 'completed' ? 'bg-green-100 text-green-800' :
                      case_.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      case_.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {case_.status.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Priority: {case_.priority}
                    </p>
                  </div>
                </div>
                {case_.assigned_to && (
                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    Assigned to: {case_.assigned_to}
                  </div>
                )}
                {case_.due_date && (
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    Due: {new Date(case_.due_date).toLocaleDateString()}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Documents Tab Component
const DocumentsTab = ({ documents }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Documents</h2>
          <p className="text-gray-600">Upload and manage your tax documents</p>
        </div>
        <Button className="bg-steel-blue hover:bg-blue-700 text-white">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <FileText className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{doc.original_filename}</h4>
                    <p className="text-sm text-gray-600">
                      {doc.document_type} • {(doc.file_size / 1024).toFixed(1)} KB
                    </p>
                    {doc.case_number && (
                      <p className="text-xs text-gray-500">
                        Case: {doc.case_number} ({doc.tax_year})
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Messages Tab Component
const MessagesTab = ({ messages }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
          <p className="text-gray-600">Communicate with your tax advisor</p>
        </div>
        <Button className="bg-steel-blue hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`p-4 border rounded-lg ${
                message.sender_type === 'admin' && !message.is_read ? 'bg-blue-50 border-blue-200' : ''
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{message.subject}</h4>
                      {message.sender_type === 'admin' && !message.is_read && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                    {message.case_number && (
                      <p className="text-xs text-gray-500 mt-2">
                        Related to: {message.case_number} ({message.tax_year})
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      {new Date(message.created_at).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.sender_type === 'admin' ? 'From Advisor' : 'From You'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Appointments Tab Component
const AppointmentsTab = ({ appointments }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointments</h2>
          <p className="text-gray-600">Schedule and manage your meetings</p>
        </div>
        <Button className="bg-steel-blue hover:bg-blue-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{appointment.title}</h3>
                    <p className="text-gray-600">
                      {new Date(appointment.appointment_date).toLocaleString()}
                    </p>
                    {appointment.description && (
                      <p className="text-sm text-gray-500 mt-2">{appointment.description}</p>
                    )}
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {appointment.duration_minutes} minutes
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-1" />
                        {appointment.meeting_type.replace('_', ' ')}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                      appointment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                    {appointment.meeting_link && (
                      <Button variant="outline" size="sm" className="mt-2">
                        Join Meeting
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ client }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your contact details and preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue={client?.firstName} />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue={client?.lastName} />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={client?.email} disabled />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" defaultValue={client?.company} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" defaultValue={client?.phone} />
            </div>
            <div>
              <Label htmlFor="taxId">Tax ID</Label>
              <Input id="taxId" defaultValue={client?.tax_id} />
            </div>
          </div>
          
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" defaultValue={client?.address} />
          </div>
          
          <div className="flex justify-end">
            <Button className="bg-steel-blue hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientPortal;
