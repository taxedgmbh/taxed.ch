import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Search, 
  Filter,
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
  PlayCircle,
  TrendingUp,
  DollarSign,
  Briefcase,
  Home,
  GraduationCap,
  Heart,
  Lock,
  Award,
  Globe,
  Calendar,
  Info,
  Download,
  Bell,
  Star,
  Eye,
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
  Zap,
  Shield,
  Key,
  Fingerprint,
  Phone,
  Calculator,
  Clock
} from 'lucide-react';

const TaxGlossaryPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLetter, setSelectedLetter] = useState('all');

  const categories = [
    { id: 'all', name: 'All Terms', icon: BookOpen },
    { id: 'individual', name: 'Individual Tax', icon: Users },
    { id: 'corporate', name: 'Corporate Tax', icon: Building },
    { id: 'vat', name: 'VAT', icon: Calculator },
    { id: 'international', name: 'International', icon: Globe },
    { id: 'compliance', name: 'Compliance', icon: Shield }
  ];

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  const taxTerms = [
    {
      id: 'term-001',
      term: 'AHV (Alters- und Hinterlassenenversicherung)',
      definition: 'Swiss old-age and survivors insurance, the first pillar of the Swiss three-pillar pension system',
      category: 'individual',
      letter: 'A',
      details: [
        'Mandatory social insurance for all Swiss residents (Art. 1 AHVG)',
        'Financed through payroll contributions (Art. 33 AHVG)',
        'Provides retirement and survivor benefits (Art. 14-32 AHVG)',
        'Contribution rate: 8.7% of salary (split between employee and employer)',
        'Minimum contribution: CHF 525 per year (Art. 33a AHVG)',
        'Tax-deductible contributions up to CHF 6,768 per year',
        'Voluntary contributions possible for self-employed persons'
      ],
      relatedTerms: ['IV', 'EO', 'BVG', 'Pension', 'Social Insurance'],
      icon: Heart,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG)',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de',
          description: 'Official Swiss federal law governing AHV'
        },
        {
          name: 'Swiss Federal Social Insurance Office (BSV)',
          url: 'https://www.bsv.admin.ch/bsv/de/home/sozialversicherungen/ahv.html',
          description: 'Official information about AHV from BSV'
        }
      ]
    },
    {
      id: 'term-002',
      term: 'Bundessteuer (Federal Tax)',
      definition: 'Taxes levied by the Swiss federal government on income and wealth according to DBG',
      category: 'individual',
      letter: 'B',
      details: [
        'Direct federal tax on income and wealth (Art. 1 DBG)',
        'Progressive tax rates for individuals (Art. 14 DBG)',
        'Flat rate for corporations: 8.5% (Art. 21 DBG)',
        'Collected by cantonal tax authorities (Art. 2 DBG)',
        'Taxable income includes worldwide income (Art. 3 DBG)',
        'Wealth tax on net assets above CHF 100,000 (Art. 14 DBG)',
        'Tax rates range from 0.77% to 11.5% for individuals'
      ],
      relatedTerms: ['Kantonssteuer', 'Gemeindesteuer', 'Einkommenssteuer', 'Vermögenssteuer', 'DBG'],
      icon: Building,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG)',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de',
          description: 'Official Swiss federal tax law (DBG)'
        },
        {
          name: 'Swiss Federal Tax Administration (FTA)',
          url: 'https://www.estv.admin.ch/estv/de/home/steuern/steuerarten/bundessteuer.html',
          description: 'Official information about federal taxes from FTA'
        }
      ]
    },
    {
      id: 'term-003',
      term: 'BVG (Berufliche Vorsorge)',
      definition: 'Occupational pension provision, the second pillar of the Swiss three-pillar pension system',
      category: 'individual',
      letter: 'B',
      details: [
        'Mandatory occupational pension for employees earning above CHF 21,510',
        'Financed through employer and employee contributions',
        'Provides retirement, disability, and survivor benefits',
        'Managed by pension funds (Pensionskassen)',
        'Portable between employers'
      ],
      relatedTerms: ['AHV', '3. Säule', 'Pension', 'Pensionskasse'],
      icon: Building,
      importance: 'High'
    },
    {
      id: 'term-004',
      term: 'Corporate Tax (Gewinnsteuer)',
      definition: 'Tax levied on the profits of Swiss corporations and other legal entities according to DBG',
      category: 'corporate',
      letter: 'C',
      details: [
        'Federal corporate tax rate: 8.5% (Art. 21 DBG)',
        'Cantonal and municipal taxes vary by location (Art. 2 DBG)',
        'Total effective rate typically 12-25% depending on canton',
        'Taxable income includes worldwide profits (Art. 3 DBG)',
        'Various deductions and exemptions available (Art. 58-60 DBG)',
        'Special rates for holding companies and mixed companies',
        'Tax consolidation possible for corporate groups'
      ],
      relatedTerms: ['VAT', 'Withholding Tax', 'Tax Return', 'Canton', 'DBG', 'Holding Company'],
      icon: Building,
      importance: 'High'
    },
    {
      id: 'term-005',
      term: 'Double Taxation (Doppelbesteuerung)',
      definition: 'Taxation of the same income by two or more countries',
      category: 'international',
      letter: 'D',
      details: [
        'Can occur when income is taxed in source country and residence country',
        'Switzerland has tax treaties with 100+ countries to prevent double taxation',
        'Relief provided through tax credits or exemptions',
        'Important for international businesses and expatriates',
        'Documentation required to claim relief'
      ],
      relatedTerms: ['Tax Treaty', 'Tax Credit', 'Expatriate', 'International Tax'],
      icon: Globe,
      importance: 'High'
    },
    {
      id: 'term-006',
      term: 'EO (Erwerbsersatzordnung)',
      definition: 'Swiss compensation for loss of earnings during military service',
      category: 'individual',
      letter: 'E',
      details: [
        'Compensates for loss of earnings during military service',
        'Financed through payroll contributions',
        'Rate: 0.5% of salary',
        'Paid by employer and employee',
        'Provides income replacement during service'
      ],
      relatedTerms: ['AHV', 'IV', 'Military Service', 'Social Insurance'],
      icon: Shield,
      importance: 'Medium'
    },
    {
      id: 'term-007',
      term: 'Federal Tax (Bundessteuer)',
      definition: 'Taxes levied by the Swiss federal government',
      category: 'individual',
      letter: 'F',
      details: [
        'Direct federal tax on income and wealth',
        'Progressive tax rates',
        'Applies to all Swiss residents',
        'Collected by cantonal tax authorities',
        'Used to finance federal government operations'
      ],
      relatedTerms: ['Cantonal Tax', 'Municipal Tax', 'Income Tax', 'Wealth Tax'],
      icon: Building,
      importance: 'High'
    },
    {
      id: 'term-008',
      term: 'Gemeinde (Municipality)',
      definition: 'Swiss municipality or commune, the smallest administrative unit',
      category: 'compliance',
      letter: 'G',
      details: [
        'Smallest administrative unit in Switzerland',
        'Can levy municipal taxes',
        'Responsible for local services',
        'Tax rates vary by municipality',
        'Important for tax planning and compliance'
      ],
      relatedTerms: ['Canton', 'Federal Tax', 'Local Tax', 'Administration'],
      icon: Home,
      importance: 'Medium'
    },
    {
      id: 'term-009',
      term: 'Holding Company (Holdinggesellschaft)',
      definition: 'Company that owns shares in other companies and receives dividend income',
      category: 'corporate',
      letter: 'H',
      details: [
        'Special tax treatment for holding companies',
        'Reduced tax rates on dividend income',
        'Must meet certain criteria',
        'Used for tax planning and investment structures',
        'Subject to specific regulations'
      ],
      relatedTerms: ['Dividend', 'Tax Planning', 'Investment', 'Corporate Structure'],
      icon: Building,
      importance: 'High'
    },
    {
      id: 'term-010',
      term: 'IV (Invalidenversicherung)',
      definition: 'Swiss disability insurance, part of the social insurance system',
      category: 'individual',
      letter: 'I',
      details: [
        'Provides benefits for disabled persons',
        'Financed through payroll contributions',
        'Rate: 8.7% of salary (combined with AHV)',
        'Covers medical and rehabilitation costs',
        'Provides disability pensions'
      ],
      relatedTerms: ['AHV', 'EO', 'Disability', 'Social Insurance'],
      icon: Heart,
      importance: 'Medium'
    },
    {
      id: 'term-011',
      term: 'Jahresabschluss (Annual Financial Statements)',
      definition: 'Annual financial statements required for Swiss companies',
      category: 'corporate',
      letter: 'J',
      details: [
        'Required for all Swiss companies',
        'Must be prepared according to Swiss GAAP',
        'Audited by certified auditors',
        'Filed with commercial register',
        'Used for tax return preparation'
      ],
      relatedTerms: ['Audit', 'Commercial Register', 'GAAP', 'Financial Reporting'],
      icon: FileText,
      importance: 'High'
    },
    {
      id: 'term-012',
      term: 'Kanton (Canton)',
      definition: 'Swiss canton, one of the 26 federal states',
      category: 'compliance',
      letter: 'K',
      details: [
        'One of 26 federal states in Switzerland',
        'Can levy cantonal taxes',
        'Tax rates vary significantly by canton',
        'Important for tax planning and business location',
        'Responsible for tax administration'
      ],
      relatedTerms: ['Federal Tax', 'Municipal Tax', 'Tax Planning', 'Business Location'],
      icon: Building,
      importance: 'High'
    },
    {
      id: 'term-013',
      term: 'Lohnsteuer (Payroll Tax)',
      definition: 'Tax withheld from employee salaries by employers',
      category: 'individual',
      letter: 'L',
      details: [
        'Withheld from employee salaries',
        'Calculated based on tax tables',
        'Paid to tax authorities monthly',
        'Credited against annual tax liability',
        'Important for cash flow planning'
      ],
      relatedTerms: ['Salary', 'Tax Withholding', 'Tax Return', 'Employee Tax'],
      icon: CreditCard,
      importance: 'High'
    },
    {
      id: 'term-014',
      term: 'Mehrwertsteuer (VAT)',
      definition: 'Value-added tax levied on goods and services',
      category: 'vat',
      letter: 'M',
      details: [
        'Standard rate: 7.7%',
        'Reduced rate: 2.5% for essential goods',
        'Special rate: 3.7% for accommodation',
        'Registration required above CHF 100,000 turnover',
        'Monthly or quarterly returns required'
      ],
      relatedTerms: ['VAT Return', 'Turnover', 'Registration', 'Tax Rate'],
      icon: Calculator,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Value Added Tax (MWSTG)',
          url: 'https://www.fedlex.admin.ch/eli/cc/2009/783/de',
          description: 'Official Swiss VAT law (MWSTG)'
        },
        {
          name: 'Swiss Federal Tax Administration - VAT Guide',
          url: 'https://www.estv.admin.ch/estv/de/home/steuern/steuerarten/mehrwertsteuer.html',
          description: 'Official VAT information and rates from FTA'
        }
      ]
    },
    {
      id: 'term-015',
      term: 'Nettolohn (Net Salary)',
      definition: 'Salary after deduction of taxes and social insurance',
      category: 'individual',
      letter: 'N',
      details: [
        'Salary after all deductions',
        'Includes tax, social insurance, and other deductions',
        'Amount received by employee',
        'Important for budgeting and financial planning',
        'Varies by canton and municipality'
      ],
      relatedTerms: ['Gross Salary', 'Deductions', 'Take-home Pay', 'Salary'],
      icon: DollarSign,
      importance: 'Medium'
    },
    {
      id: 'term-016',
      term: 'Ortsbürger (Local Citizen)',
      definition: 'Person with local citizenship in a Swiss municipality',
      category: 'compliance',
      letter: 'O',
      details: [
        'Person with local citizenship rights',
        'May have different tax treatment',
        'Important for tax residency determination',
        'Affects tax rates and deductions',
        'Historical concept in Swiss law'
      ],
      relatedTerms: ['Citizenship', 'Tax Residency', 'Local Rights', 'Municipality'],
      icon: Users,
      importance: 'Low'
    },
    {
      id: 'term-017',
      term: 'Pensionskasse (Pension Fund)',
      definition: 'Institution managing occupational pension benefits',
      category: 'individual',
      letter: 'P',
      details: [
        'Manages BVG occupational pension benefits',
        'Can be company-specific or multi-employer',
        'Invests pension contributions',
        'Pays retirement and disability benefits',
        'Subject to federal supervision'
      ],
      relatedTerms: ['BVG', 'Pension', 'Retirement', 'Occupational Benefits'],
      icon: Building,
      importance: 'High'
    },
    {
      id: 'term-018',
      term: 'Quellensteuer (Withholding Tax)',
      definition: 'Tax withheld at source from certain types of income',
      category: 'individual',
      letter: 'Q',
      details: [
        'Withheld from dividends, interest, and royalties',
        'Rate: 35% for Swiss residents',
        'Can be reduced through tax treaties',
        'Credited against annual tax liability',
        'Important for investment income'
      ],
      relatedTerms: ['Dividend', 'Interest', 'Tax Treaty', 'Investment Income'],
      icon: CreditCard,
      importance: 'High'
    },
    {
      id: 'term-019',
      term: 'Rückstellung (Provision)',
      definition: 'Accounting provision for future tax liabilities',
      category: 'corporate',
      letter: 'R',
      details: [
        'Accounting provision for future tax payments',
        'Required for certain tax situations',
        'Affects financial statements',
        'Important for tax planning',
        'Subject to specific rules'
      ],
      relatedTerms: ['Accounting', 'Tax Liability', 'Financial Statements', 'Provision'],
      icon: FileText,
      importance: 'Medium'
    },
    {
      id: 'term-020',
      term: 'Steuererklärung (Tax Return)',
      definition: 'Annual tax return filed by individuals and companies according to DBG',
      category: 'individual',
      letter: 'S',
      details: [
        'Annual tax return form (Art. 75 DBG)',
        'Due by March 31 of following year (Art. 75 DBG)',
        'Reports income, deductions, and taxes (Art. 3-13 DBG)',
        'Can be filed electronically (Art. 75a DBG)',
        'Penalties for late filing: CHF 100-1,000 (Art. 76 DBG)',
        'Interest on overdue taxes: 5% per year (Art. 77 DBG)',
        'Extension possible with valid reasons'
      ],
      relatedTerms: ['Tax Form', 'Income', 'Deductions', 'Tax Compliance', 'DBG', 'Penalties'],
      icon: FileText,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 75-77',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_75',
          description: 'Official Swiss federal law on tax returns and deadlines'
        },
        {
          name: 'Swiss Federal Tax Administration - Tax Return Guide',
          url: 'https://www.estv.admin.ch/estv/de/home/steuern/steuerarten/bundessteuer/steuererklarung.html',
          description: 'Official guide for filing tax returns in Switzerland'
        }
      ]
    },
    {
      id: 'term-021',
      term: 'Transfer Pricing (Verrechnungspreise)',
      definition: 'Pricing of transactions between related companies',
      category: 'international',
      letter: 'T',
      details: [
        'Pricing of intercompany transactions',
        'Must be at arm\'s length',
        'Subject to documentation requirements',
        'Important for international businesses',
        'Can trigger tax audits'
      ],
      relatedTerms: ['Arm\'s Length', 'Intercompany', 'Documentation', 'Tax Audit'],
      icon: Globe,
      importance: 'High'
    },
    {
      id: 'term-022',
      term: 'Umsatzsteuer (Turnover Tax)',
      definition: 'Alternative term for VAT in Switzerland',
      category: 'vat',
      letter: 'U',
      details: [
        'Alternative term for VAT',
        'Same as Mehrwertsteuer',
        'Tax on goods and services',
        'Registration and return requirements',
        'Important for business compliance'
      ],
      relatedTerms: ['VAT', 'Mehrwertsteuer', 'Turnover', 'Business Tax'],
      icon: Calculator,
      importance: 'Medium'
    },
    {
      id: 'term-023',
      term: 'Verrechnungssteuer (Withholding Tax)',
      definition: 'Alternative term for withholding tax in Switzerland',
      category: 'individual',
      letter: 'V',
      details: [
        'Alternative term for withholding tax',
        'Same as Quellensteuer',
        'Withheld from certain income types',
        'Can be reduced through tax treaties',
        'Important for investment income'
      ],
      relatedTerms: ['Withholding Tax', 'Quellensteuer', 'Investment Income', 'Tax Treaty'],
      icon: CreditCard,
      importance: 'Medium'
    },
    {
      id: 'term-024',
      term: 'Wohnsitz (Domicile)',
      definition: 'Tax domicile or residence for tax purposes',
      category: 'individual',
      letter: 'W',
      details: [
        'Tax domicile or residence',
        'Determines tax liability',
        'Based on physical presence and ties',
        'Important for tax planning',
        'Affects tax rates and deductions'
      ],
      relatedTerms: ['Tax Residency', 'Domicile', 'Tax Liability', 'Tax Planning'],
      icon: Home,
      importance: 'High'
    },
    {
      id: 'term-025',
      term: 'Xenon (Foreigner)',
      definition: 'Foreign person for tax purposes',
      category: 'individual',
      letter: 'X',
      details: [
        'Foreign person for tax purposes',
        'May have different tax treatment',
        'Important for tax residency',
        'Affects tax rates and deductions',
        'Subject to specific rules'
      ],
      relatedTerms: ['Foreigner', 'Tax Residency', 'International Tax', 'Expatriate'],
      icon: Globe,
      importance: 'Low'
    },
    {
      id: 'term-026',
      term: 'Yacht Tax (Yachtsteuer)',
      definition: 'Tax on luxury yachts and boats',
      category: 'individual',
      letter: 'Y',
      details: [
        'Tax on luxury yachts and boats',
        'Varies by canton',
        'Based on value or length',
        'Important for luxury goods',
        'Subject to specific rules'
      ],
      relatedTerms: ['Luxury Tax', 'Boat Tax', 'Canton Tax', 'Luxury Goods'],
      icon: Award,
      importance: 'Low'
    },
    {
      id: 'term-027',
      term: 'Zinsabschlag (Interest Withholding)',
      definition: 'Withholding tax on interest income',
      category: 'individual',
      letter: 'Z',
      details: [
        'Withholding tax on interest income',
        'Rate: 35% for Swiss residents',
        'Can be reduced through tax treaties',
        'Credited against annual tax liability',
        'Important for investment income'
      ],
      relatedTerms: ['Interest Tax', 'Withholding Tax', 'Investment Income', 'Tax Treaty'],
      icon: CreditCard,
      importance: 'Medium'
    },
    {
      id: 'term-028',
      term: 'DBG (Direkte Bundessteuer)',
      definition: 'Swiss Federal Act on Direct Federal Taxation',
      category: 'compliance',
      letter: 'D',
      details: [
        'Federal law governing direct federal taxation (SR 642.11)',
        'Regulates income and wealth taxation (Art. 1 DBG)',
        'Defines taxable persons and entities (Art. 2 DBG)',
        'Establishes tax rates and brackets (Art. 14-21 DBG)',
        'Sets filing deadlines and penalties (Art. 75-77 DBG)',
        'Provides for tax treaties and international cooperation',
        'Updated regularly by Federal Council'
      ],
      relatedTerms: ['Federal Tax', 'Tax Law', 'Tax Code', 'Legislation'],
      icon: FileText,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Full Text',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de',
          description: 'Complete official text of the Swiss Federal Tax Law'
        },
        {
          name: 'Swiss Federal Tax Administration - Legal Basis',
          url: 'https://www.estv.admin.ch/estv/de/home/steuern/steuerarten/bundessteuer/rechtsgrundlagen.html',
          description: 'Official legal basis and implementation of DBG'
        }
      ]
    },
    {
      id: 'term-029',
      term: 'Steuerpflicht (Tax Liability)',
      definition: 'Legal obligation to pay taxes according to Swiss law',
      category: 'compliance',
      letter: 'S',
      details: [
        'Unlimited tax liability for Swiss residents (Art. 2 DBG)',
        'Limited tax liability for non-residents (Art. 2 DBG)',
        'Based on domicile, residence, or economic ties',
        'Applies to individuals and legal entities',
        'Worldwide income subject to Swiss taxation',
        'Tax liability ends with emigration (Art. 2a DBG)',
        'Special rules for cross-border workers'
      ],
      relatedTerms: ['Tax Residency', 'Domicile', 'Residence', 'Emigration'],
      icon: Shield,
      importance: 'High'
    },
    {
      id: 'term-030',
      term: 'Steuerabzug (Tax Deduction)',
      definition: 'Allowable deductions from taxable income according to DBG',
      category: 'individual',
      letter: 'S',
      details: [
        'Professional expenses up to CHF 2,000 (Art. 33 DBG)',
        'Social security contributions (Art. 33 DBG)',
        'Insurance premiums for health and accident (Art. 33 DBG)',
        'Interest on loans for business purposes (Art. 33 DBG)',
        'Donations to charitable organizations (Art. 33 DBG)',
        'Childcare expenses up to CHF 10,000 per child',
        'Special deductions for self-employed persons'
      ],
      relatedTerms: ['Deductions', 'Professional Expenses', 'Insurance', 'Charitable Donations'],
      icon: Calculator,
      importance: 'High'
    },
    {
      id: 'term-031',
      term: 'Steuerstrafen (Tax Penalties)',
      definition: 'Penalties for tax violations according to Swiss law',
      category: 'compliance',
      letter: 'S',
      details: [
        'Late filing penalty: CHF 100-1,000 (Art. 76 DBG)',
        'Interest on overdue taxes: 5% per year (Art. 77 DBG)',
        'Tax evasion: up to 3 years imprisonment (Art. 175 StGB)',
        'Negligent tax fraud: fine up to CHF 100,000',
        'Intentional tax fraud: fine up to CHF 1,000,000',
        'Voluntary disclosure reduces penalties significantly',
        'Statute of limitations: 5 years for tax fraud'
      ],
      relatedTerms: ['Penalties', 'Tax Fraud', 'Interest', 'Criminal Law'],
      icon: AlertTriangle,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 76-77',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_76',
          description: 'Official Swiss federal law on tax penalties and interest'
        }
      ]
    },
    {
      id: 'term-032',
      term: 'AHV-Beitragspflicht (AHV Contribution Obligation)',
      definition: 'Legal obligation to pay AHV contributions according to Art. 1 AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'All persons gainfully employed in Switzerland (Art. 1 AHVG)',
        'Persons with Swiss residence (Art. 1 AHVG)',
        'Self-employed persons (Art. 1 AHVG)',
        'Contribution period: from age 20 to retirement age',
        'Minimum contribution: CHF 525 per year (Art. 33a AHVG)',
        'Maximum contribution: CHF 6,768 per year (Art. 33 AHVG)',
        'Voluntary contributions possible for gaps in coverage'
      ],
      relatedTerms: ['AHV', 'Contribution', 'Social Insurance', 'Pension'],
      icon: Heart,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 1',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_1',
          description: 'Official Swiss federal law on AHV contribution obligations'
        }
      ]
    },
    {
      id: 'term-033',
      term: 'AHV-Rente (AHV Pension)',
      definition: 'Old-age pension paid by the Swiss AHV system according to Art. 14-32 AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'Full pension: CHF 1,195 per month (Art. 14 AHVG)',
        'Minimum pension: CHF 1,195 per month (Art. 14 AHVG)',
        'Maximum pension: CHF 2,390 per month (Art. 14 AHVG)',
        'Retirement age: 65 for men, 64 for women (Art. 15 AHVG)',
        'Early retirement possible from age 58 (Art. 16 AHVG)',
        'Late retirement increases pension (Art. 17 AHVG)',
        'Pension calculated based on average income (Art. 18 AHVG)'
      ],
      relatedTerms: ['AHV', 'Pension', 'Retirement', 'Social Insurance'],
      icon: Heart,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 14-32',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_14',
          description: 'Official Swiss federal law on AHV pension benefits'
        }
      ]
    },
    {
      id: 'term-034',
      term: 'Hinterlassenenrente (Survivor Pension)',
      definition: 'Pension paid to surviving family members according to Art. 19-32 AHVG',
      category: 'individual',
      letter: 'H',
      details: [
        'Widow/widower pension: 60% of deceased spouse\'s pension (Art. 19 AHVG)',
        'Orphan pension: 20% of deceased parent\'s pension (Art. 20 AHVG)',
        'Parent pension: 20% of deceased child\'s pension (Art. 21 AHVG)',
        'Minimum survivor pension: CHF 717 per month (Art. 22 AHVG)',
        'Maximum survivor pension: CHF 1,434 per month (Art. 22 AHVG)',
        'Survivor pension paid for life or until remarriage (Art. 23 AHVG)',
        'Orphan pension paid until age 18 or 25 if studying (Art. 24 AHVG)'
      ],
      relatedTerms: ['AHV', 'Survivor', 'Pension', 'Family Benefits'],
      icon: Heart,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 19-32',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_19',
          description: 'Official Swiss federal law on survivor pensions'
        }
      ]
    },
    {
      id: 'term-035',
      term: 'AHV-Beitragssatz (AHV Contribution Rate)',
      definition: 'Contribution rate for AHV insurance according to Art. 33 AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'Current rate: 8.7% of gross salary (Art. 33 AHVG)',
        'Split between employee and employer: 4.35% each (Art. 33 AHVG)',
        'Self-employed pay full 8.7% (Art. 33 AHVG)',
        'Rate can be adjusted by Federal Council (Art. 33 AHVG)',
        'Minimum contribution: CHF 525 per year (Art. 33a AHVG)',
        'Maximum contribution: CHF 6,768 per year (Art. 33 AHVG)',
        'Contribution calculated on salary up to CHF 88,200 (Art. 33 AHVG)'
      ],
      relatedTerms: ['AHV', 'Contribution Rate', 'Social Insurance', 'Salary'],
      icon: Calculator,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 33',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_33',
          description: 'Official Swiss federal law on AHV contribution rates'
        }
      ]
    },
    {
      id: 'term-036',
      term: 'AHV-Mindestbeitrag (AHV Minimum Contribution)',
      definition: 'Minimum annual contribution to AHV according to Art. 33a AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'Minimum contribution: CHF 525 per year (Art. 33a AHVG)',
        'Applies to persons with low income (Art. 33a AHVG)',
        'Ensures basic AHV coverage (Art. 33a AHVG)',
        'Paid by self-employed persons (Art. 33a AHVG)',
        'Paid by persons with gaps in employment (Art. 33a AHVG)',
        'Voluntary contribution to maintain coverage (Art. 33a AHVG)',
        'Tax-deductible contribution (Art. 33a AHVG)'
      ],
      relatedTerms: ['AHV', 'Minimum Contribution', 'Self-Employed', 'Coverage'],
      icon: Calculator,
      importance: 'Medium',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 33a',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_33a',
          description: 'Official Swiss federal law on AHV minimum contributions'
        }
      ]
    },
    {
      id: 'term-037',
      term: 'AHV-Maximalbeitrag (AHV Maximum Contribution)',
      definition: 'Maximum annual contribution to AHV according to Art. 33 AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'Maximum contribution: CHF 6,768 per year (Art. 33 AHVG)',
        'Based on maximum insurable salary (Art. 33 AHVG)',
        'Salary ceiling: CHF 88,200 per year (Art. 33 AHVG)',
        'Contribution rate: 8.7% of salary (Art. 33 AHVG)',
        'Split between employee and employer (Art. 33 AHVG)',
        'No additional contributions above ceiling (Art. 33 AHVG)',
        'Tax-deductible contribution (Art. 33 AHVG)'
      ],
      relatedTerms: ['AHV', 'Maximum Contribution', 'Salary Ceiling', 'Tax Deduction'],
      icon: Calculator,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 33',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_33',
          description: 'Official Swiss federal law on AHV maximum contributions'
        }
      ]
    },
    {
      id: 'term-038',
      term: 'AHV-Freiwillige Beiträge (AHV Voluntary Contributions)',
      definition: 'Voluntary contributions to AHV to fill gaps in coverage according to Art. 33a AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'Voluntary contributions to fill coverage gaps (Art. 33a AHVG)',
        'Minimum contribution: CHF 525 per year (Art. 33a AHVG)',
        'Maximum contribution: CHF 6,768 per year (Art. 33a AHVG)',
        'Tax-deductible contribution (Art. 33a AHVG)',
        'Improves pension calculation (Art. 33a AHVG)',
        'Must be paid within 5 years (Art. 33a AHVG)',
        'Can be paid retroactively (Art. 33a AHVG)'
      ],
      relatedTerms: ['AHV', 'Voluntary Contribution', 'Coverage Gap', 'Pension'],
      icon: Heart,
      importance: 'Medium',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 33a',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_33a',
          description: 'Official Swiss federal law on AHV voluntary contributions'
        }
      ]
    },
    {
      id: 'term-039',
      term: 'AHV-Beitragsjahr (AHV Contribution Year)',
      definition: 'Calendar year for AHV contribution calculation according to Art. 33 AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'Contribution year: January 1 to December 31 (Art. 33 AHVG)',
        'Contributions calculated annually (Art. 33 AHVG)',
        'Minimum contribution: CHF 525 per year (Art. 33a AHVG)',
        'Maximum contribution: CHF 6,768 per year (Art. 33 AHVG)',
        'Contribution rate: 8.7% of salary (Art. 33 AHVG)',
        'Split between employee and employer (Art. 33 AHVG)',
        'Tax-deductible in contribution year (Art. 33 AHVG)'
      ],
      relatedTerms: ['AHV', 'Contribution Year', 'Calendar Year', 'Tax Deduction'],
      icon: Calendar,
      importance: 'Medium',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 33',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_33',
          description: 'Official Swiss federal law on AHV contribution years'
        }
      ]
    },
    {
      id: 'term-040',
      term: 'AHV-Beitragspflichtige (AHV Contributors)',
      definition: 'Persons obligated to pay AHV contributions according to Art. 1 AHVG',
      category: 'individual',
      letter: 'A',
      details: [
        'All employed persons in Switzerland (Art. 1 AHVG)',
        'All persons with Swiss residence (Art. 1 AHVG)',
        'Self-employed persons (Art. 1 AHVG)',
        'Persons with gaps in employment (Art. 1 AHVG)',
        'Persons with low income (Art. 1 AHVG)',
        'Persons with voluntary coverage (Art. 1 AHVG)',
        'Persons with foreign coverage (Art. 1 AHVG)'
      ],
      relatedTerms: ['AHV', 'Contributors', 'Obligation', 'Social Insurance'],
      icon: Users,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Law on Old-Age and Survivors Insurance (AHVG) - Art. 1',
          url: 'https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_1',
          description: 'Official Swiss federal law on AHV contributors'
        }
      ]
    },
    {
      id: 'term-041',
      term: 'DBG-Steuersatz (DBG Tax Rate)',
      definition: 'Tax rates under the Federal Act on Direct Federal Taxation according to Art. 14-21 DBG',
      category: 'individual',
      letter: 'D',
      details: [
        'Progressive tax rates for individuals (Art. 14 DBG)',
        'Tax rates range from 0.77% to 11.5% (Art. 14 DBG)',
        'Tax brackets adjusted annually (Art. 14 DBG)',
        'Flat rate for corporations: 8.5% (Art. 21 DBG)',
        'Tax rates vary by income level (Art. 14 DBG)',
        'Minimum tax rate: 0.77% (Art. 14 DBG)',
        'Maximum tax rate: 11.5% (Art. 14 DBG)'
      ],
      relatedTerms: ['DBG', 'Tax Rate', 'Progressive Tax', 'Tax Brackets'],
      icon: Calculator,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 14-21',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_14',
          description: 'Official Swiss federal law on tax rates'
        }
      ]
    },
    {
      id: 'term-042',
      term: 'MWSTG-Steuersatz (MWSTG Tax Rate)',
      definition: 'VAT rates under the Federal Act on Value Added Tax according to Art. 10 MWSTG',
      category: 'vat',
      letter: 'M',
      details: [
        'Standard rate: 7.7% (Art. 10 MWSTG)',
        'Reduced rate: 2.5% for essential goods (Art. 10 MWSTG)',
        'Special rate: 3.7% for accommodation (Art. 10 MWSTG)',
        'Rates can be adjusted by Federal Council (Art. 10 MWSTG)',
        'Rates apply to all taxable supplies (Art. 10 MWSTG)',
        'Rates published in Federal Gazette (Art. 10 MWSTG)',
        'Rates effective from January 1 (Art. 10 MWSTG)'
      ],
      relatedTerms: ['MWSTG', 'VAT Rate', 'Tax Rate', 'Value Added Tax'],
      icon: Calculator,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Value Added Tax (MWSTG) - Art. 10',
          url: 'https://www.fedlex.admin.ch/eli/cc/2009/783/de#art_10',
          description: 'Official Swiss federal law on VAT rates'
        }
      ]
    },
    {
      id: 'term-043',
      term: 'Steuerpflichtiger (Taxable Person)',
      definition: 'Person subject to Swiss taxation according to Art. 2 DBG',
      category: 'compliance',
      letter: 'S',
      details: [
        'Unlimited tax liability for Swiss residents (Art. 2 DBG)',
        'Limited tax liability for non-residents (Art. 2 DBG)',
        'Based on domicile or residence (Art. 2 DBG)',
        'Applies to individuals and legal entities (Art. 2 DBG)',
        'Worldwide income subject to taxation (Art. 2 DBG)',
        'Tax liability ends with emigration (Art. 2a DBG)',
        'Special rules for cross-border workers (Art. 2 DBG)'
      ],
      relatedTerms: ['Tax Liability', 'Residence', 'Domicile', 'Taxpayer'],
      icon: Users,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 2',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_2',
          description: 'Official Swiss federal law on taxable persons'
        }
      ]
    },
    {
      id: 'term-044',
      term: 'Steuerpflichtiges Einkommen (Taxable Income)',
      definition: 'Income subject to Swiss taxation according to Art. 3-13 DBG',
      category: 'individual',
      letter: 'S',
      details: [
        'Worldwide income for residents (Art. 3 DBG)',
        'Swiss-source income for non-residents (Art. 3 DBG)',
        'Employment income (Art. 4 DBG)',
        'Business income (Art. 5 DBG)',
        'Investment income (Art. 6 DBG)',
        'Capital gains (Art. 7 DBG)',
        'Various deductions allowed (Art. 8-13 DBG)'
      ],
      relatedTerms: ['Income', 'Taxable Income', 'Deductions', 'Tax Base'],
      icon: DollarSign,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 3-13',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_3',
          description: 'Official Swiss federal law on taxable income'
        }
      ]
    },
    {
      id: 'term-045',
      term: 'Steuerabzug (Tax Deduction)',
      definition: 'Allowable deductions from taxable income according to Art. 8-13 DBG',
      category: 'individual',
      letter: 'S',
      details: [
        'Professional expenses up to CHF 2,000 (Art. 8 DBG)',
        'Social security contributions (Art. 9 DBG)',
        'Insurance premiums (Art. 10 DBG)',
        'Interest on loans (Art. 11 DBG)',
        'Charitable donations (Art. 12 DBG)',
        'Childcare expenses (Art. 13 DBG)',
        'Special deductions for self-employed (Art. 8-13 DBG)'
      ],
      relatedTerms: ['Deductions', 'Professional Expenses', 'Insurance', 'Charitable Donations'],
      icon: Calculator,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 8-13',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_8',
          description: 'Official Swiss federal law on tax deductions'
        }
      ]
    },
    {
      id: 'term-046',
      term: 'Steuererklärungspflicht (Tax Return Obligation)',
      definition: 'Legal obligation to file tax returns according to Art. 75 DBG',
      category: 'compliance',
      letter: 'S',
      details: [
        'Annual tax return required (Art. 75 DBG)',
        'Due by March 31 of following year (Art. 75 DBG)',
        'Electronic filing possible (Art. 75a DBG)',
        'Penalties for late filing (Art. 76 DBG)',
        'Interest on overdue taxes (Art. 77 DBG)',
        'Extension possible with valid reasons (Art. 75 DBG)',
        'Special rules for certain taxpayers (Art. 75 DBG)'
      ],
      relatedTerms: ['Tax Return', 'Filing Obligation', 'Deadlines', 'Penalties'],
      icon: FileText,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 75-77',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_75',
          description: 'Official Swiss federal law on tax return obligations'
        }
      ]
    },
    {
      id: 'term-047',
      term: 'Steuerstrafen (Tax Penalties)',
      definition: 'Penalties for tax violations according to Art. 76-77 DBG',
      category: 'compliance',
      letter: 'S',
      details: [
        'Late filing penalty: CHF 100-1,000 (Art. 76 DBG)',
        'Interest on overdue taxes: 5% per year (Art. 77 DBG)',
        'Tax evasion: up to 3 years imprisonment (Art. 175 StGB)',
        'Negligent tax fraud: fine up to CHF 100,000',
        'Intentional tax fraud: fine up to CHF 1,000,000',
        'Voluntary disclosure reduces penalties significantly',
        'Statute of limitations: 5 years for tax fraud'
      ],
      relatedTerms: ['Penalties', 'Tax Fraud', 'Interest', 'Criminal Law'],
      icon: AlertTriangle,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 76-77',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_76',
          description: 'Official Swiss federal law on tax penalties'
        }
      ]
    },
    {
      id: 'term-048',
      term: 'Steuerbefreiung (Tax Exemption)',
      definition: 'Exemptions from Swiss taxation according to Art. 14-21 DBG',
      category: 'individual',
      letter: 'S',
      details: [
        'Certain income types exempt (Art. 14 DBG)',
        'Charitable organizations exempt (Art. 15 DBG)',
        'Religious organizations exempt (Art. 16 DBG)',
        'Educational institutions exempt (Art. 17 DBG)',
        'Cultural organizations exempt (Art. 18 DBG)',
        'Sports organizations exempt (Art. 19 DBG)',
        'Special exemptions for certain activities (Art. 20-21 DBG)'
      ],
      relatedTerms: ['Exemption', 'Tax-Free', 'Charitable', 'Non-Profit'],
      icon: Shield,
      importance: 'Medium',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 14-21',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_14',
          description: 'Official Swiss federal law on tax exemptions'
        }
      ]
    },
    {
      id: 'term-049',
      term: 'Steuerermäßigung (Tax Reduction)',
      definition: 'Reductions in Swiss tax liability according to Art. 22-30 DBG',
      category: 'individual',
      letter: 'S',
      details: [
        'Reductions for certain circumstances (Art. 22 DBG)',
        'Reductions for families (Art. 23 DBG)',
        'Reductions for elderly (Art. 24 DBG)',
        'Reductions for disabled (Art. 25 DBG)',
        'Reductions for students (Art. 26 DBG)',
        'Reductions for military service (Art. 27 DBG)',
        'Special reductions for certain groups (Art. 28-30 DBG)'
      ],
      relatedTerms: ['Tax Reduction', 'Family Benefits', 'Elderly', 'Disabled'],
      icon: Calculator,
      importance: 'Medium',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 22-30',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_22',
          description: 'Official Swiss federal law on tax reductions'
        }
      ]
    },
    {
      id: 'term-050',
      term: 'Steuererhebung (Tax Collection)',
      definition: 'Collection of Swiss taxes according to Art. 31-40 DBG',
      category: 'compliance',
      letter: 'S',
      details: [
        'Tax collection by cantonal authorities (Art. 31 DBG)',
        'Collection procedures (Art. 32 DBG)',
        'Payment deadlines (Art. 33 DBG)',
        'Interest on overdue payments (Art. 34 DBG)',
        'Penalties for non-payment (Art. 35 DBG)',
        'Collection enforcement (Art. 36 DBG)',
        'Special collection procedures (Art. 37-40 DBG)'
      ],
      relatedTerms: ['Tax Collection', 'Payment', 'Deadlines', 'Enforcement'],
      icon: CreditCard,
      importance: 'High',
      officialSources: [
        {
          name: 'Federal Act on Direct Federal Taxation (DBG) - Art. 31-40',
          url: 'https://www.fedlex.admin.ch/eli/cc/1990/1990_1990_1990/de#art_31',
          description: 'Official Swiss federal law on tax collection'
        }
      ]
    }
  ];

  const filteredTerms = taxTerms.filter(term => {
    if (activeCategory !== 'all' && term.category !== activeCategory) {
      return false;
    }
    if (selectedLetter !== 'all' && term.letter !== selectedLetter) {
      return false;
    }
    if (searchTerm && !term.term.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !term.definition.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const getImportanceColor = (importance) => {
    switch (importance) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <>
      <Helmet>
        <title>Swiss Tax Glossary - Tax Terms & Definitions | Taxed GmbH</title>
        <meta name="description" content="Comprehensive Swiss tax glossary with definitions, explanations, and details for all tax terms. Learn about Swiss tax terminology and concepts." />
        <meta property="og:title" content="Swiss Tax Glossary - Tax Terms & Definitions | Taxed GmbH" />
        <meta property="og:description" content="Comprehensive Swiss tax glossary with definitions, explanations, and details for all tax terms. Learn about Swiss tax terminology and concepts." />
        <link rel="canonical" href="https://taxed.ch/tax-glossary" />
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
              Swiss Tax Glossary
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Comprehensive glossary of Swiss tax terms and definitions. 
              Understand tax terminology and concepts with detailed explanations and examples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                <Download className="inline-block mr-2 h-5 w-5" />
                Download Glossary
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-steel-blue transition-colors">
                <BookOpen className="inline-block mr-2 h-5 w-5" />
                Browse Terms
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tax terms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-blue focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                      activeCategory === category.id
                        ? 'bg-steel-blue text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Letter Filter */}
      <section className="py-4 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedLetter('all')}
              className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                selectedLetter === 'all'
                  ? 'bg-steel-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {letters.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                className={`px-3 py-2 rounded-lg font-semibold transition-colors ${
                  selectedLetter === letter
                    ? 'bg-steel-blue text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Terms Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {filteredTerms.map((term, index) => (
              <motion.div
                key={term.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
                  {/* Term Info */}
                  <div className="flex items-start space-x-4 mb-6 lg:mb-0 lg:w-1/3">
                    <div className="bg-steel-blue/10 p-3 rounded-xl">
                      <term.icon className="h-6 w-6 text-steel-blue" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getImportanceColor(term.importance)}`}>
                          {term.importance}
                        </span>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {term.letter}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{term.term}</h3>
                      <p className="text-gray-700 mb-4">{term.definition}</p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Details</h4>
                    <ul className="space-y-2">
                      {term.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Terms */}
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold text-gray-900 mb-3">Related Terms</h4>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {term.relatedTerms.map((related, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {related}
                        </span>
                      ))}
                    </div>
                    {term.officialSources && term.officialSources.length > 0 ? (
                      <div className="space-y-2">
                        <h5 className="font-semibold text-gray-900 text-sm">Official Sources:</h5>
                        {term.officialSources.map((source, sourceIdx) => (
                          <a
                            key={sourceIdx}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full bg-steel-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors text-sm"
                          >
                            <ExternalLink className="h-4 w-4 mr-2 inline-block" />
                            {source.name}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <button 
                        className="w-full bg-steel-blue text-white px-6 py-3 rounded-lg font-semibold hover:bg-steel-blue/90 transition-colors"
                        onClick={() => window.open('https://www.estv.admin.ch/estv/de/home.html', '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2 inline-block" />
                        Swiss Tax Administration
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Quick Reference Guide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential tax terms and concepts for quick reference.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Individual Tax', terms: ['AHV', 'BVG', 'Steuererklärung', 'Lohnsteuer'], icon: Users },
              { title: 'Corporate Tax', terms: ['Bundessteuer', 'Holding Company', 'Jahresabschluss', 'Rückstellung'], icon: Building },
              { title: 'VAT', terms: ['Mehrwertsteuer', 'Umsatzsteuer', 'VAT Return', 'Registration'], icon: Calculator },
              { title: 'International', terms: ['Double Taxation', 'Transfer Pricing', 'Tax Treaty', 'Expatriate'], icon: Globe }
            ].map((section, index) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="bg-steel-blue/10 p-4 rounded-xl mb-4 w-fit">
                    <Icon className="h-8 w-8 text-steel-blue" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                  <div className="space-y-2">
                    {section.terms.map((term, idx) => (
                      <div key={idx} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        {term}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
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
              Need Help Understanding Tax Terms?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Our tax experts can help you understand complex tax terminology and concepts. 
              Get personalized explanations and guidance for your specific tax situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-steel-blue px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors">
                Get Tax Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-steel-blue transition-colors">
                Download Complete Glossary
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TaxGlossaryPage;