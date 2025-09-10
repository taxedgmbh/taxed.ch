import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Users, 
  FileText, 
  MessageSquare, 
  Calendar, 
  Settings, 
  LogOut,
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
  Lock,
  Key,
  Database,
  Server,
  Activity,
  AlertTriangle,
  Info,
  UserCheck,
  UserX,
  Mail,
  Phone,
  MapPin,
  Building,
  CreditCard,
  Download,
  Upload,
  RefreshCw,
  Zap,
  Globe,
  Wifi,
  WifiOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const AdminPanel = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [clients, setClients] = useState([]);
  const [cases, setCases] = useState([]);
  const [messages, setMessages] = useState([]);
  const [securityLogs, setSecurityLogs] = useState([]);

  // Check for existing session on component mount
  useEffect(() => {
    const token = localStorage.getItem('adminSessionToken');
    if (token) {
      verifySession(token);
    }
  }, []);

  const verifySession = async (token) => {
    try {
      const response = await fetch('/api/admin-auth.php?action=verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionToken: token })
      });

      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setAdmin(data.admin);
        setSessionToken(token);
        loadDashboardData();
      } else {
        localStorage.removeItem('adminSessionToken');
      }
    } catch (error) {
      console.error('Session verification failed:', error);
      localStorage.removeItem('adminSessionToken');
    }
  };

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin-auth.php?action=login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      
      if (data.success) {
        setIsAuthenticated(true);
        setAdmin(data.admin);
        setSessionToken(data.sessionToken);
        localStorage.setItem('adminSessionToken', data.sessionToken);
        loadDashboardData();
        toast({
          title: "Welcome, Admin!",
          description: `Hello ${data.admin.firstName}, you're successfully logged in.`,
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

  const handleBypass = async () => {
    setLoading(true);
    try {
      // Frontend-only bypass for development (no backend required)
      const mockAdmin = {
        id: 1,
        username: 'admin',
        email: 'admin@taxed.ch',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin'
      };
      
      const mockSessionToken = 'admin_bypass_session_' + Date.now();
      
      setIsAuthenticated(true);
      setAdmin(mockAdmin);
      setSessionToken(mockSessionToken);
      localStorage.setItem('adminSessionToken', mockSessionToken);
      
      // Load mock dashboard data
      loadMockDashboardData();
      
      toast({
        title: "Bypass Successful",
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

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-auth.php?action=logout', {
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
      setAdmin(null);
      setSessionToken(null);
      localStorage.removeItem('adminSessionToken');
      setActiveTab('dashboard');
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
    }
  };

  const loadDashboardData = async () => {
    try {
      // Simulate dashboard data loading
      setDashboardData({
        totalClients: 156,
        activeCases: 89,
        pendingMessages: 23,
        upcomingAppointments: 12,
        recentActivity: [
          { id: 1, action: 'New client registered', user: 'John Doe', time: '2 minutes ago' },
          { id: 2, action: 'Document uploaded', user: 'Jane Smith', time: '5 minutes ago' },
          { id: 3, action: 'Message sent', user: 'Bob Johnson', time: '10 minutes ago' },
        ]
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      // Fallback to mock data
      loadMockDashboardData();
    }
  };

  const loadMockDashboardData = () => {
    setDashboardData({
      totalClients: 156,
      activeCases: 89,
      pendingMessages: 23,
      upcomingAppointments: 12,
      recentActivity: [
        { id: 1, action: 'New client registered', user: 'John Doe', time: '2 minutes ago' },
        { id: 2, action: 'Document uploaded', user: 'Jane Smith', time: '5 minutes ago' },
        { id: 3, action: 'Message sent', user: 'Bob Johnson', time: '10 minutes ago' },
        { id: 4, action: 'Tax return completed', user: 'Alice Brown', time: '15 minutes ago' },
        { id: 5, action: 'Appointment scheduled', user: 'Charlie Wilson', time: '20 minutes ago' },
      ]
    });
  };

  const loadClients = async () => {
    try {
      // Simulate clients data
      setClients([
        { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', cases: 3, lastLogin: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active', cases: 2, lastLogin: '2024-01-14' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'pending', cases: 1, lastLogin: '2024-01-13' },
      ]);
    } catch (error) {
      console.error('Failed to load clients:', error);
    }
  };

  const loadCases = async () => {
    try {
      // Simulate cases data
      setCases([
        { id: 1, client: 'John Doe', caseNumber: 'TC-2024-001', status: 'in_progress', priority: 'high', dueDate: '2024-01-20' },
        { id: 2, client: 'Jane Smith', caseNumber: 'TC-2024-002', status: 'pending', priority: 'medium', dueDate: '2024-01-25' },
        { id: 3, client: 'Bob Johnson', caseNumber: 'TC-2024-003', status: 'completed', priority: 'low', dueDate: '2024-01-10' },
      ]);
    } catch (error) {
      console.error('Failed to load cases:', error);
    }
  };

  const loadMessages = async () => {
    try {
      // Simulate messages data
      setMessages([
        { id: 1, client: 'John Doe', subject: 'Tax question', status: 'unread', time: '2 hours ago' },
        { id: 2, client: 'Jane Smith', subject: 'Document upload', status: 'read', time: '4 hours ago' },
        { id: 3, client: 'Bob Johnson', subject: 'Appointment request', status: 'unread', time: '6 hours ago' },
      ]);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const loadSecurityLogs = async () => {
    try {
      // Simulate security logs
      setSecurityLogs([
        { id: 1, action: 'Login attempt', user: 'admin', ip: '192.168.1.1', status: 'success', time: '2024-01-15 10:30:00' },
        { id: 2, action: 'Failed login', user: 'unknown', ip: '192.168.1.2', status: 'failed', time: '2024-01-15 10:25:00' },
        { id: 3, action: 'Session created', user: 'admin', ip: '192.168.1.1', status: 'success', time: '2024-01-15 10:30:00' },
      ]);
    } catch (error) {
      console.error('Failed to load security logs:', error);
    }
  };

  // Load data when tab changes
  useEffect(() => {
    if (isAuthenticated && sessionToken) {
      switch (activeTab) {
        case 'clients':
          loadClients();
          break;
        case 'cases':
          loadCases();
          break;
        case 'messages':
          loadMessages();
          break;
        case 'security':
          loadSecurityLogs();
          break;
        default:
          loadDashboardData();
      }
    }
  }, [activeTab, isAuthenticated, sessionToken]);

  if (!isAuthenticated) {
    return <AdminLoginForm onLogin={handleLogin} onBypass={handleBypass} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                <p className="text-sm text-gray-500">Taxed GmbH - Secure Administration</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {admin?.firstName} {admin?.lastName}
                </p>
                <p className="text-xs text-gray-500">{admin?.role} • {admin?.username}</p>
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
              { id: 'clients', label: 'Clients', icon: Users },
              { id: 'cases', label: 'Tax Cases', icon: FileText },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'security', label: 'Security', icon: Shield },
              { id: 'settings', label: 'Settings', icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-600 text-white'
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
                {activeTab === 'dashboard' && <AdminDashboard data={dashboardData} />}
                {activeTab === 'clients' && <AdminClients clients={clients} />}
                {activeTab === 'cases' && <AdminCases cases={cases} />}
                {activeTab === 'messages' && <AdminMessages messages={messages} />}
                {activeTab === 'security' && <AdminSecurity logs={securityLogs} />}
                {activeTab === 'settings' && <AdminSettings />}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

// Admin Login Form Component
const AdminLoginForm = ({ onLogin, onBypass, loading }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formData);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-white">
            Admin Access
          </h2>
          <p className="mt-2 text-red-100">
            Secure administrative access to Taxed GmbH systems
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
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

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">Development Access</p>
                <Button
                  type="button"
                  onClick={onBypass}
                  variant="outline"
                  className="w-full"
                  disabled={loading}
                >
                  <Key className="w-4 h-4 mr-2" />
                  {loading ? 'Processing...' : 'Bypass Login (Dev)'}
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

// Admin Dashboard Component
const AdminDashboard = ({ data }) => {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="text-gray-600">System overview and security monitoring</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">{data.totalClients}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Cases</p>
                <p className="text-2xl font-bold text-gray-900">{data.activeCases}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Messages</p>
                <p className="text-2xl font-bold text-gray-900">{data.pendingMessages}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{data.upcomingAppointments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentActivity?.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <Activity className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{activity.action}</h4>
                    <p className="text-sm text-gray-600">by {activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Admin Clients Component
const AdminClients = ({ clients }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Client Management</h2>
          <p className="text-gray-600">Manage client accounts and permissions</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {clients.map((client) => (
              <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-600">{client.email}</p>
                    <p className="text-xs text-gray-500">
                      {client.cases} cases • Last login: {client.lastLogin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    client.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {client.status}
                  </span>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
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

// Admin Cases Component
const AdminCases = ({ cases }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tax Cases</h2>
          <p className="text-gray-600">Manage and track all tax cases</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
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
                    <h3 className="text-lg font-semibold text-gray-900">{case_.caseNumber}</h3>
                    <p className="text-gray-600">Client: {case_.client}</p>
                    <p className="text-sm text-gray-500">Due: {case_.dueDate}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      case_.status === 'completed' ? 'bg-green-100 text-green-800' :
                      case_.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {case_.status.replace('_', ' ')}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      Priority: {case_.priority}
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

// Admin Messages Component
const AdminMessages = ({ messages }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Messages</h2>
          <p className="text-gray-600">Client communications and support</p>
        </div>
        <Button className="bg-red-600 hover:bg-red-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          New Message
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`p-4 border rounded-lg ${
                message.status === 'unread' ? 'bg-blue-50 border-blue-200' : ''
              }`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">{message.subject}</h4>
                      {message.status === 'unread' && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">From: {message.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{message.time}</p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
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

// Admin Security Component
const AdminSecurity = ({ logs }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Security Monitoring</h2>
        <p className="text-gray-600">System security logs and access monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Successful Logins</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Failed Attempts</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Sessions</p>
                <p className="text-2xl font-bold text-gray-900">8</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Logs</CardTitle>
          <CardDescription>Recent security events and access attempts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {logs.map((log) => (
              <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${
                    log.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {log.status === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{log.action}</h4>
                    <p className="text-sm text-gray-600">
                      User: {log.user} • IP: {log.ip}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Admin Settings Component
const AdminSettings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
        <p className="text-gray-600">Configure system preferences and security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Configure security policies and access controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Require 2FA for all admin users</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
              </div>
              <Button variant="outline" size="sm">1 Hour</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>IP Whitelist</Label>
                <p className="text-sm text-gray-500">Restrict access to specific IPs</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
            <CardDescription>General system settings and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Send email alerts for important events</p>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Backup Schedule</Label>
                <p className="text-sm text-gray-500">Automated database backups</p>
              </div>
              <Button variant="outline" size="sm">Daily</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">Temporarily disable client access</p>
              </div>
              <Button variant="outline" size="sm">Disabled</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
