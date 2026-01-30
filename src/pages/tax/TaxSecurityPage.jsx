import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  EyeOff,
  Target,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  Users,
  Building,
  CreditCard,
  FileText,
  PieChart,
  BarChart3,
  Lightbulb,
  BookOpen,
  PlayCircle,
  TrendingUp,
  DollarSign,
  Briefcase,
  Home,
  GraduationCap,
  Heart,
  Award,
  Globe,
  Search,
  Filter,
  Calendar,
  Info,
  Download,
  Bell,
  Star,
  Share2,
  ExternalLink,
  Video,
  Headphones,
  Mic,
  Camera,
  Wifi,
  WifiOff,
  Database,
  Cloud,
  Smartphone,
  Laptop,
  Monitor,
  Server,
  Cpu,
  HardDrive,
  Network,
  Settings,
  Code,
  Terminal,
  GitBranch,
  Layers,
  Workflow,
  Key,
  Fingerprint,
  Smartphone as Phone,
  Wifi as WifiIcon,
  Shield as SecurityShield,
  Lock as SecurityLock,
  Eye as SecurityEye,
  AlertTriangle as SecurityAlert,
  CheckCircle as SecurityCheck,
  Zap,
  Clock,
  Globe as SecurityGlobe,
  Building as SecurityBuilding,
  Users as SecurityUsers,
  FileText as SecurityFile,
  CreditCard as SecurityCard,
  Calculator as SecurityCalc,
  PieChart as SecurityChart,
  BarChart3 as SecurityBarChart,
  TrendingUp as SecurityTrend,
  DollarSign as SecurityDollar,
  Briefcase as SecurityBriefcase,
  Home as SecurityHome,
  GraduationCap as SecurityGrad,
  Heart as SecurityHeart,
  Award as SecurityAward,
  Globe as SecurityGlobeIcon,
  Search as SecuritySearch,
  Filter as SecurityFilter,
  Calendar as SecurityCalendar,
  Info as SecurityInfo,
  Download as SecurityDownload,
  Bell as SecurityBell,
  Star as SecurityStar,
  Share2 as SecurityShare,
  ExternalLink as SecurityExternal,
  Video as SecurityVideo,
  Headphones as SecurityHeadphones,
  Mic as SecurityMic,
  Camera as SecurityCamera,
  Wifi as SecurityWifi,
  WifiOff as SecurityWifiOff,
  Database as SecurityDatabase,
  Cloud as SecurityCloud,
  Smartphone as SecurityPhone,
  Laptop as SecurityLaptop,
  Monitor as SecurityMonitor,
  Server as SecurityServer,
  Cpu as SecurityCpu,
  HardDrive as SecurityHardDrive,
  Network as SecurityNetwork,
  Settings as SecuritySettings,
  Code as SecurityCode,
  Terminal as SecurityTerminal,
  GitBranch as SecurityGitBranch,
  Layers as SecurityLayers,
  Workflow as SecurityWorkflow,
  Fish,
  Bug
} from 'lucide-react';

const TaxSecurityPage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedThreat, setSelectedThreat] = useState('all');

  const sections = [
    { id: 'overview', name: 'Overview', icon: Shield },
    { id: 'threats', name: 'Threats', icon: AlertTriangle },
    { id: 'protection', name: 'Protection', icon: Lock },
    { id: 'compliance', name: 'Compliance', icon: CheckCircle },
    { id: 'incident', name: 'Incident Response', icon: Zap },
    { id: 'training', name: 'Training', icon: GraduationCap }
  ];

  const threatTypes = [
    { id: 'all', name: 'All Threats', icon: AlertTriangle },
    { id: 'cyber', name: 'Cyber Attacks', icon: Shield },
    { id: 'data', name: 'Data Breaches', icon: Database },
    { id: 'phishing', name: 'Phishing', icon: Fish },
    { id: 'malware', name: 'Malware', icon: Shield },
    { id: 'insider', name: 'Insider Threats', icon: Users }
  ];

  const securityThreats = [
    {
      id: 'threat-001',
      title: 'Phishing Attacks',
      description: 'Fraudulent attempts to obtain sensitive tax information through deceptive emails',
      type: 'phishing',
      severity: 'high',
      frequency: 'Very Common',
      impact: 'High',
      examples: [
        'Fake tax authority emails',
        'Fraudulent refund notifications',
        'Phony audit notifications',
        'Fake tax software updates'
      ],
      prevention: [
        'Verify sender authenticity',
        'Never click suspicious links',
        'Use official communication channels',
        'Enable email filtering'
      ],
      icon: Fish,
      affected: 'All users',
      cost: 'CHF 10,000-100,000'
    },
    {
      id: 'threat-002',
      title: 'Data Breaches',
      description: 'Unauthorized access to sensitive tax data and personal information',
      type: 'data',
      severity: 'critical',
      frequency: 'Common',
      impact: 'Very High',
      examples: [
        'Hacked tax databases',
        'Stolen client information',
        'Compromised tax returns',
        'Exposed financial data'
      ],
      prevention: [
        'Encrypt all sensitive data',
        'Implement access controls',
        'Regular security audits',
        'Monitor data access'
      ],
      icon: Database,
      affected: 'All clients',
      cost: 'CHF 50,000-500,000'
    },
    {
      id: 'threat-003',
      title: 'Malware Infections',
      description: 'Malicious software designed to steal tax information or disrupt operations',
      type: 'malware',
      severity: 'high',
      frequency: 'Common',
      impact: 'High',
      examples: [
        'Keyloggers capturing passwords',
        'Ransomware encrypting files',
        'Spyware monitoring activities',
        'Trojans stealing data'
      ],
      prevention: [
        'Install antivirus software',
        'Keep systems updated',
        'Avoid suspicious downloads',
        'Use secure networks'
      ],
      icon: Bug,
      affected: 'All systems',
      cost: 'CHF 5,000-50,000'
    },
    {
      id: 'threat-004',
      title: 'Insider Threats',
      description: 'Malicious or negligent actions by employees or contractors',
      type: 'insider',
      severity: 'high',
      frequency: 'Moderate',
      impact: 'High',
      examples: [
        'Unauthorized data access',
        'Intentional data theft',
        'Negligent data handling',
        'Unauthorized system access'
      ],
      prevention: [
        'Implement access controls',
        'Monitor user activities',
        'Conduct background checks',
        'Provide security training'
      ],
      icon: Users,
      affected: 'Internal staff',
      cost: 'CHF 20,000-200,000'
    }
  ];

  const securityMeasures = [
    {
      title: 'Data Encryption',
      description: 'Advanced encryption for all sensitive tax data',
      features: [
        'End-to-end encryption',
        'AES-256 encryption standard',
        'Encrypted data transmission',
        'Encrypted data storage',
        'Key management system'
      ],
      benefits: [
        'Protect data in transit',
        'Secure data at rest',
        'Meet compliance requirements',
        'Prevent unauthorized access',
        'Maintain data integrity'
      ],
      icon: Lock,
      implementation: 'Immediate',
      cost: 'CHF 2,000-10,000'
    },
    {
      title: 'Multi-Factor Authentication',
      description: 'Enhanced authentication for secure access to tax systems',
      features: [
        'Two-factor authentication',
        'Biometric authentication',
        'Hardware tokens',
        'SMS verification',
        'App-based authentication'
      ],
      benefits: [
        'Prevent unauthorized access',
        'Add extra security layer',
        'Comply with regulations',
        'Reduce breach risk',
        'Improve user confidence'
      ],
      icon: Fingerprint,
      implementation: '1-2 weeks',
      cost: 'CHF 1,000-5,000'
    },
    {
      title: 'Access Control Management',
      description: 'Comprehensive access control for tax data and systems',
      features: [
        'Role-based access control',
        'User permission management',
        'Access logging and monitoring',
        'Session management',
        'Privilege escalation controls'
      ],
      benefits: [
        'Control data access',
        'Monitor user activities',
        'Prevent unauthorized access',
        'Comply with regulations',
        'Maintain audit trails'
      ],
      icon: Key,
      implementation: '2-4 weeks',
      cost: 'CHF 3,000-15,000'
    },
    {
      title: 'Security Monitoring',
      description: 'Continuous monitoring and threat detection',
      features: [
        'Real-time threat detection',
        'Automated security alerts',
        'Incident response automation',
        'Security analytics',
        'Threat intelligence'
      ],
      benefits: [
        'Detect threats early',
        'Respond quickly to incidents',
        'Prevent data breaches',
        'Comply with regulations',
        'Maintain security posture'
      ],
      icon: Monitor,
      implementation: '2-6 weeks',
      cost: 'CHF 5,000-25,000'
    }
  ];

  const complianceRequirements = [
    {
      title: 'GDPR Compliance',
      description: 'General Data Protection Regulation compliance for tax data',
      requirements: [
        'Data protection impact assessment',
        'Privacy by design implementation',
        'Data subject rights management',
        'Consent management system',
        'Data breach notification procedures'
      ],
      benefits: [
        'Protect personal data',
        'Comply with EU regulations',
        'Avoid hefty fines',
        'Build customer trust',
        'Maintain business operations'
      ],
      penalties: 'Up to 4% of annual revenue',
      icon: Shield
    },
    {
      title: 'Swiss Data Protection Act',
      description: 'Swiss Federal Data Protection Act compliance',
      requirements: [
        'Data processing transparency',
        'Purpose limitation compliance',
        'Data minimization practices',
        'Storage limitation compliance',
        'Data accuracy maintenance'
      ],
      benefits: [
        'Comply with Swiss law',
        'Protect client data',
        'Avoid legal penalties',
        'Maintain business license',
        'Build client confidence'
      ],
      penalties: 'CHF 10,000-250,000',
      icon: Building
    },
    {
      title: 'ISO 27001 Certification',
      description: 'Information security management system certification',
      requirements: [
        'Information security policy',
        'Risk assessment procedures',
        'Security control implementation',
        'Continuous monitoring',
        'Regular audits and reviews'
      ],
      benefits: [
        'Demonstrate security commitment',
        'Improve security posture',
        'Gain client confidence',
        'Meet regulatory requirements',
        'Reduce security risks'
      ],
      penalties: 'Loss of certification',
      icon: Award
    }
  ];

  const incidentResponse = [
    {
      phase: 'Detection',
      description: 'Identify and detect security incidents',
      activities: [
        'Monitor security systems',
        'Analyze security alerts',
        'Investigate suspicious activities',
        'Assess incident severity',
        'Document initial findings'
      ],
      timeline: '0-2 hours',
      icon: Eye
    },
    {
      phase: 'Containment',
      description: 'Contain and isolate the security incident',
      activities: [
        'Isolate affected systems',
        'Prevent further damage',
        'Preserve evidence',
        'Notify relevant parties',
        'Implement containment measures'
      ],
      timeline: '2-24 hours',
      icon: Lock
    },
    {
      phase: 'Eradication',
      description: 'Remove the threat and restore systems',
      activities: [
        'Remove malicious code',
        'Patch vulnerabilities',
        'Clean infected systems',
        'Restore from backups',
        'Verify system integrity'
      ],
      timeline: '24-72 hours',
      icon: Shield
    },
    {
      phase: 'Recovery',
      description: 'Restore normal operations and monitor',
      activities: [
        'Restore full operations',
        'Monitor for recurrence',
        'Update security measures',
        'Conduct post-incident review',
        'Implement improvements'
      ],
      timeline: '72+ hours',
      icon: CheckCircle
    }
  ];

  const filteredThreats = securityThreats.filter(threat => {
    if (selectedThreat !== 'all' && threat.type !== selectedThreat) {
      return false;
    }
    return true;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-steel-blue/10 to-blue-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Tax Security Overview</h3>
              <p className="text-lg text-gray-700 mb-6">
                Protecting sensitive tax data is crucial for maintaining client trust and regulatory compliance. 
                Our comprehensive security measures ensure your tax information remains secure.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Shield className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Data Protection</h4>
                  <p className="text-sm text-gray-600">Advanced encryption and access controls</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Lock className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Access Control</h4>
                  <p className="text-sm text-gray-600">Multi-factor authentication and role-based access</p>
                </div>
                <div className="text-center">
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4">
                    <Monitor className="h-8 w-8 text-steel-blue mx-auto" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Monitoring</h4>
                  <p className="text-sm text-gray-600">Continuous security monitoring and threat detection</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'threats':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Threats</h3>
              <p className="text-lg text-gray-700">
                Understanding the various security threats that can affect tax data and systems.
              </p>
            </div>
            <div className="grid gap-8">
              {filteredThreats.map((threat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <threat.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(threat.severity)}`}>
                          {threat.severity.toUpperCase()}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {threat.frequency}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{threat.title}</h4>
                      <p className="text-gray-700 mb-4">{threat.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Impact: {threat.impact}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Affected: {threat.affected}
                        </span>
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                          Cost: {threat.cost}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Examples</h5>
                      <ul className="space-y-2">
                        {threat.examples.map((example, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{example}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Prevention</h5>
                      <ul className="space-y-2">
                        {threat.prevention.map((prevention, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{prevention}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      case 'protection':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Protection Measures</h3>
              <p className="text-lg text-gray-700">
                Comprehensive security measures to protect your tax data and systems.
              </p>
            </div>
            <div className="grid gap-8">
              {securityMeasures.map((measure, index) => {
                const Icon = measure.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="bg-steel-blue/10 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-steel-blue" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{measure.title}</h4>
                        <p className="text-gray-700 mb-4">{measure.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Implementation: {measure.implementation}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Cost: {measure.cost}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Features</h5>
                        <ul className="space-y-2">
                          {measure.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Benefits</h5>
                        <ul className="space-y-2">
                          {measure.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Compliance Requirements</h3>
              <p className="text-lg text-gray-700">
                Meeting regulatory compliance requirements for tax data protection.
              </p>
            </div>
            <div className="grid gap-8">
              {complianceRequirements.map((compliance, index) => {
                const Icon = compliance.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="bg-steel-blue/10 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-steel-blue" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{compliance.title}</h4>
                        <p className="text-gray-700 mb-4">{compliance.description}</p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                          <p className="text-sm text-red-800 font-semibold">
                            <AlertTriangle className="inline-block h-4 w-4 mr-1" />
                            Penalties: {compliance.penalties}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Requirements</h5>
                        <ul className="space-y-2">
                          {compliance.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Benefits</h5>
                        <ul className="space-y-2">
                          {compliance.benefits.map((benefit, idx) => (
                            <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                              <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'incident':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Incident Response Plan</h3>
              <p className="text-lg text-gray-700">
                Structured approach to handling security incidents and data breaches.
              </p>
            </div>
            <div className="grid gap-8">
              {incidentResponse.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg"
                  >
                    <div className="flex items-start space-x-4 mb-6">
                      <div className="bg-steel-blue/10 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-steel-blue" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">{phase.phase}</h4>
                        <p className="text-gray-700 mb-4">{phase.description}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Timeline: {phase.timeline}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-3">Activities</h5>
                      <ul className="space-y-2">
                        {phase.activities.map((activity, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Security Training</h3>
              <p className="text-lg text-gray-700">
                Comprehensive security training for staff and clients.
              </p>
            </div>
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
              <h4 className="text-xl font-bold text-gray-900 mb-6">Security Training Programs</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Staff Training</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Security awareness training</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Phishing simulation exercises</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Data handling procedures</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Incident response training</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">Client Education</h5>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Security best practices</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Password security guidelines</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Phishing awareness</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Secure communication methods</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Tax Security & Data Protection | Taxed GmbH</title>
        <meta name="description" content="Comprehensive tax security solutions for data protection, compliance, and threat prevention. Secure your tax data with advanced security measures." />
        <meta property="og:title" content="Tax Security & Data Protection | Taxed GmbH" />
        <meta property="og:description" content="Comprehensive tax security solutions for data protection, compliance, and threat prevention. Secure your tax data with advanced security measures." />
        <link rel="canonical" href="https://taxed.ch/security" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-steel-blue to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Tax Security & Data Protection
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Protect your sensitive tax data with comprehensive security measures. 
              Ensure compliance, prevent breaches, and maintain client trust with our advanced security solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Shield className="inline-block mr-2 h-5 w-5" />
                Security Assessment
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Security Guide
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Threat Type Filter */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {threatTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedThreat(type.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    selectedThreat === type.id
                      ? 'bg-steel-blue text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{type.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                    activeSection === section.id
                      ? 'bg-steel-blue text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{section.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {renderContent()}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-steel-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Secure Your Tax Data Today
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Don't wait for a security breach. Implement comprehensive security measures 
              to protect your sensitive tax data and maintain regulatory compliance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Security Assessment
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Schedule Security Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxSecurityPage;
