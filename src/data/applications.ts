export interface LedgerSampleRow {
  id: string;
  date: string;
  reference: string;
  description: string;
  fundOrCategory: string;
  type: 'inflow' | 'outflow' | 'allocation';
  amount: string;
}

export interface ApplicationItem {
  id: 'gracebooks' | 'capitalflow' | 'clanefund';
  index: string;
  shortKey: '1' | '2' | '3';
  name: string;
  subtitle: string;
  fullTitle: string;
  category: 'Ministry Finance' | 'Personal Cashflow' | 'Family Reserve';
  liveUrl: string;
  repoUrl: string;
  privacyUrl?: string;
  termsUrl?: string;
  storageEngine: string;
  cadence: string;
  primaryAudience: string;
  summary: string;
  detailedDescription: string;
  modules: string[];
  highlights: {
    label: string;
    value: string;
    detail: string;
  }[];
  workflowSteps: {
    step: string;
    title: string;
    description: string;
  }[];
  sampleMetrics: {
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
    tertiaryLabel: string;
    tertiaryValue: string;
  };
  sampleRows: LedgerSampleRow[];
}

export interface TaskScenario {
  id: string;
  prompt: string;
  context: string;
  recommendedAppId: ApplicationItem['id'];
  reason: string;
}

export const APPLICATIONS: ApplicationItem[] = [
  {
    id: 'gracebooks',
    index: '01',
    shortKey: '1',
    name: 'GraceBooks',
    subtitle: 'Church Financial Tracker',
    fullTitle: 'GraceBooks — Church Financial Tracker',
    category: 'Ministry Finance',
    liveUrl: 'https://jrjacob2000.github.io/Grace-Book/',
    repoUrl: 'https://github.com/jrjacob2000/Grace-Book',
    privacyUrl: 'https://jrjacob2000.github.io/Grace-Book/privacy.html',
    termsUrl: 'https://jrjacob2000.github.io/Grace-Book/terms.html',
    storageEngine: 'Google Drive JSON Storage',
    cadence: 'Weekly Collections & Monthly Board Cycles',
    primaryAudience: 'Church Treasurers, Finance Committees & Ministry Boards',
    summary:
      'Comprehensive church financial tracking with Google Drive JSON storage, tithes and collections tracking, funds and accounts management, budget dashboard, and board monthly reports.',
    detailedDescription:
      'Designed specifically for local church stewardship and transparent ministry accounting. GraceBooks separates general tithes from restricted ministry funds, tracks annual budget utilization, and generates audit-ready monthly financial statements for church board meetings.',
    modules: [
      'Tithes & Offerings Ledger',
      'Multi-Fund Accounting',
      'Annual Budget Dashboard',
      'Board Monthly Reports',
      'Google Drive JSON Sync',
    ],
    highlights: [
      {
        label: 'Fund Segregation',
        value: 'General & Restricted',
        detail: 'Track General Fund, Building Fund, Missions, and Benevolence balances independently.',
      },
      {
        label: 'Board Reporting',
        value: 'Monthly Packets',
        detail: 'Generate structured monthly income, expense, and fund balance summaries.',
      },
      {
        label: 'Data Ownership',
        value: 'Personal Google Drive',
        detail: 'Synchronizes structured JSON ledger backups directly to your church Google Drive.',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Log Weekly Collections & Tithes',
        description: 'Record Sunday tithes, loose offerings, and designated ministry gifts with batch verification.',
      },
      {
        step: '02',
        title: 'Allocate Ministry Disbursements',
        description: 'Assign operational expenses and outreach costs against approved annual budget categories.',
      },
      {
        step: '03',
        title: 'Publish Monthly Board Statement',
        description: 'Review fund balances and export clean monthly reports for church leadership review.',
      },
    ],
    sampleMetrics: {
      primaryLabel: 'General & Designated Funds',
      primaryValue: '₱482,650.00',
      secondaryLabel: 'Monthly Collections',
      secondaryValue: '+₱94,200.00',
      tertiaryLabel: 'Budget Utilization',
      tertiaryValue: '68.4%',
    },
    sampleRows: [
      {
        id: 'gb-1',
        date: '2026-10-25',
        reference: 'COL-1025',
        description: 'Sunday Morning Tithes & General Offerings',
        fundOrCategory: 'General Ministry Fund',
        type: 'inflow',
        amount: '+₱42,850.00',
      },
      {
        id: 'gb-2',
        date: '2026-10-25',
        reference: 'MIS-0412',
        description: 'Regional Outreach & Missions Designation',
        fundOrCategory: 'Missions Restricted Fund',
        type: 'inflow',
        amount: '+₱14,500.00',
      },
      {
        id: 'gb-3',
        date: '2026-10-27',
        reference: 'EXP-0891',
        description: 'Sanctuary Utilities & Sound Maintenance',
        fundOrCategory: 'Facilities Budget',
        type: 'outflow',
        amount: '-₱8,420.00',
      },
      {
        id: 'gb-4',
        date: '2026-10-28',
        reference: 'BEN-0119',
        description: 'Congregational Benevolence Assistance',
        fundOrCategory: 'Benevolence Fund',
        type: 'outflow',
        amount: '-₱5,000.00',
      },
    ],
  },
  {
    id: 'capitalflow',
    index: '02',
    shortKey: '2',
    name: 'CapitalFlow',
    subtitle: 'Income, Expense & Savings Ledger',
    fullTitle: 'CapitalFlow — Income, Expense & Savings Ledger',
    category: 'Personal Cashflow',
    liveUrl: 'https://jrjacob2000.github.io/Capital-Flow/',
    repoUrl: 'https://github.com/jrjacob2000/Capital-Flow',
    privacyUrl: 'https://jrjacob2000.github.io/Capital-Flow/privacy.html',
    termsUrl: 'https://jrjacob2000.github.io/Capital-Flow/terms.html',
    storageEngine: 'Yearly Google Drive JSON Sync (/CapitalFlow/)',
    cadence: 'Bi-Weekly Paycycles & Monthly Budgets',
    primaryAudience: 'Individuals, Households & Personal Budget Planners',
    summary:
      'Record monthly and bi-weekly income, expenses, and savings with yearly Google Drive JSON storage, cumulative savings ledger, and interactive visual analytics.',
    detailedDescription:
      'Built for disciplined personal cashflow management across 15th/30th bi-weekly paycycles and monthly billing schedules. CapitalFlow tracks net savings rate, maintains a multi-year cumulative savings ledger, and stores annual JSON files in your own Google Drive.',
    modules: [
      'Bi-Weekly & Monthly Income',
      'Categorized Expense Ledger',
      'Cumulative Savings Tracker',
      'Interactive Visual Analytics',
      'Yearly Google Drive Backup',
    ],
    highlights: [
      {
        label: 'Payroll Cadence',
        value: 'Bi-Weekly & Monthly',
        detail: 'Handles split 1st-half and 2nd-half payroll periods alongside recurring monthly obligations.',
      },
      {
        label: 'Savings Horizon',
        value: 'Cumulative Ledger',
        detail: 'Tracks running savings transfers and long-term net worth accumulation across years.',
      },
      {
        label: 'Cloud Archive',
        value: 'Yearly JSON Files',
        detail: 'Saves clean yearly data files inside your personal Google Drive /CapitalFlow/ directory.',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Enter Bi-Weekly or Monthly Income',
        description: 'Record salary payouts, bonuses, and secondary income streams by pay period.',
      },
      {
        step: '02',
        title: 'Track Expenses & Savings Transfers',
        description: 'Categorize fixed bills, discretionary spending, and dedicated savings allocations.',
      },
      {
        step: '03',
        title: 'Analyze Cashflow & Sync to Drive',
        description: 'Inspect monthly savings rates and back up your annual ledger to Google Drive.',
      },
    ],
    sampleMetrics: {
      primaryLabel: 'Cumulative Savings Balance',
      primaryValue: '₱318,400.00',
      secondaryLabel: 'October Net Cashflow',
      secondaryValue: '+₱26,750.00',
      tertiaryLabel: 'Savings Rate',
      tertiaryValue: '34.2%',
    },
    sampleRows: [
      {
        id: 'cf-1',
        date: '2026-10-15',
        reference: 'PAY-1015',
        description: 'First-Half Bi-Weekly Payroll Deposit',
        fundOrCategory: 'Primary Income',
        type: 'inflow',
        amount: '+₱39,500.00',
      },
      {
        id: 'cf-2',
        date: '2026-10-16',
        reference: 'SAV-1016',
        description: 'Automated Transfer to High-Yield Reserve',
        fundOrCategory: 'Cumulative Savings',
        type: 'allocation',
        amount: '+₱12,000.00',
      },
      {
        id: 'cf-3',
        date: '2026-10-20',
        reference: 'EXP-1020',
        description: 'Household Utilities, Fiber & Groceries',
        fundOrCategory: 'Essential Living',
        type: 'outflow',
        amount: '-₱14,280.00',
      },
      {
        id: 'cf-4',
        date: '2026-10-29',
        reference: 'PAY-1030',
        description: 'Second-Half Bi-Weekly Payroll Deposit',
        fundOrCategory: 'Primary Income',
        type: 'inflow',
        amount: '+₱39,500.00',
      },
    ],
  },
  {
    id: 'clanefund',
    index: '03',
    shortKey: '3',
    name: 'Clan E-Fund Ledger',
    subtitle: 'Collaborative Emergency & Investment Fund',
    fullTitle: 'Clan E-Fund Ledger — Emergency & BPI Investment Tracker',
    category: 'Family Reserve',
    liveUrl: 'https://jrjacob2000.github.io/Clan-eFund/',
    repoUrl: 'https://github.com/jrjacob2000/Clan-eFund',
    storageEngine: 'Real-Time Cloud Firestore & Role-Based Ledger',
    cadence: 'Monthly Member Contributions & On-Demand Claims',
    primaryAudience: 'Extended Family Clans, Mutual Aid Pools & Fund Stewards',
    summary:
      'Collaborative emergency fund ledger and investment tracker for clan contributions, medical disbursements, and BPI fund allocations.',
    detailedDescription:
      'Built for multi-household family solidarity and transparent emergency reserve governance. Clan E-Fund Ledger tracks individual member contribution histories, documents medical and emergency disbursements, and monitors liquid cash versus BPI investment fund allocations.',
    modules: [
      'Clan Member Contributions',
      'Medical Disbursement Log',
      'BPI Investment Allocations',
      'Member Standing Directory',
      'Transparent Audit History',
    ],
    highlights: [
      {
        label: 'Mutual Aid Pool',
        value: 'Member Ledger',
        detail: 'Monitors each family branch and member contribution status with complete transparency.',
      },
      {
        label: 'Asset Allocation',
        value: 'Liquid + BPI Funds',
        detail: 'Balances immediate emergency cash reserves with yield-bearing BPI fund placements.',
      },
      {
        label: 'Disbursement Audit',
        value: 'Medical & Emergency',
        detail: 'Records approved hospitalization and emergency assistance payouts with clear documentation.',
      },
    ],
    workflowSteps: [
      {
        step: '01',
        title: 'Record Member Contributions',
        description: 'Log monthly or quarterly family member deposits and update cumulative member equity.',
      },
      {
        step: '02',
        title: 'Manage BPI Fund Placements',
        description: 'Track capital allocated to BPI investment vehicles alongside liquid emergency reserves.',
      },
      {
        step: '03',
        title: 'Process Medical Disbursements',
        description: 'Document emergency medical assistance claims while maintaining real-time reserve visibility.',
      },
    ],
    sampleMetrics: {
      primaryLabel: 'Total Clan Reserve Pool',
      primaryValue: '₱645,000.00',
      secondaryLabel: 'BPI Investment Allocation',
      secondaryValue: '₱450,000.00',
      tertiaryLabel: 'Liquid Emergency Cash',
      tertiaryValue: '₱195,000.00',
    },
    sampleRows: [
      {
        id: 'ce-1',
        date: '2026-10-18',
        reference: 'MBR-2041',
        description: 'October Family Branch Monthly Contributions',
        fundOrCategory: 'Member Contributions',
        type: 'inflow',
        amount: '+₱28,000.00',
      },
      {
        id: 'ce-2',
        date: '2026-10-21',
        reference: 'BPI-0309',
        description: 'BPI Short-Term Fund Tranche Placement',
        fundOrCategory: 'BPI Investment Fund',
        type: 'allocation',
        amount: '₱50,000.00',
      },
      {
        id: 'ce-3',
        date: '2026-10-24',
        reference: 'MED-0084',
        description: 'Approved Hospitalization Assistance Grant',
        fundOrCategory: 'Medical Disbursement',
        type: 'outflow',
        amount: '-₱15,000.00',
      },
      {
        id: 'ce-4',
        date: '2026-10-27',
        reference: 'DIV-0112',
        description: 'BPI Fund Accrued Yield Valuation Update',
        fundOrCategory: 'Investment Return',
        type: 'inflow',
        amount: '+₱3,420.00',
      },
    ],
  },
];

export const TASK_SCENARIOS: TaskScenario[] = [
  {
    id: 'scenario-church-tithes',
    prompt: 'Record Sunday tithes, manage restricted church funds, or prepare a monthly board financial report',
    context: 'Church & Ministry Stewardship',
    recommendedAppId: 'gracebooks',
    reason:
      'GraceBooks provides dedicated multi-fund church accounting, tithes and collections batching, annual budget tracking, and board-ready monthly financial statements.',
  },
  {
    id: 'scenario-personal-budget',
    prompt: 'Track 15th/30th bi-weekly paychecks, household bills, and cumulative personal savings',
    context: 'Individual & Household Finance',
    recommendedAppId: 'capitalflow',
    reason:
      'CapitalFlow is purpose-built for bi-weekly and monthly personal cashflow cycles, cumulative savings tracking, and yearly JSON backups in your personal Google Drive.',
  },
  {
    id: 'scenario-clan-emergency',
    prompt: 'Log family clan emergency contributions, medical disbursements, or BPI investment allocations',
    context: 'Extended Family Mutual Aid',
    recommendedAppId: 'clanefund',
    reason:
      'Clan E-Fund Ledger tracks multi-member family contributions, emergency medical assistance payouts, and BPI fund investment placements in a shared ledger.',
  },
];
