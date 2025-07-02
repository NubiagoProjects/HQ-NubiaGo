import { Agent, Order, Supplier, FeedbackTicket, ReferralLog, Product, Commission, Campaign } from '../types';

// All 54 African countries
const africanCountries = [
  'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon',
  'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Democratic Republic of the Congo', 'Djibouti',
  'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana',
  'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar',
  'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger',
  'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia',
  'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
];

// Sales data for analytics
export const salesData = {
  weekly: [
    { week: 'Week 1', sales: 45200, orders: 89, avgOrderValue: 508 },
    { week: 'Week 2', sales: 52800, orders: 102, avgOrderValue: 518 },
    { week: 'Week 3', sales: 48600, orders: 94, avgOrderValue: 517 },
    { week: 'Week 4', sales: 56400, orders: 108, avgOrderValue: 522 },
  ],
  monthly: [
    { month: 'Jan 2024', sales: 203000, orders: 393, avgOrderValue: 517, growth: 12.5 },
    { month: 'Dec 2023', sales: 180500, orders: 356, avgOrderValue: 507, growth: 8.2 },
    { month: 'Nov 2023', sales: 166800, orders: 334, avgOrderValue: 499, growth: 15.3 },
    { month: 'Oct 2023', sales: 144600, orders: 298, avgOrderValue: 485, growth: 6.7 },
    { month: 'Sep 2023', sales: 135400, orders: 285, avgOrderValue: 475, growth: 9.1 },
    { month: 'Aug 2023', sales: 124100, orders: 267, avgOrderValue: 465, growth: 11.8 },
  ],
  yearly: [
    { year: '2024', sales: 203000, orders: 393, avgOrderValue: 517, growth: 18.5 },
    { year: '2023', sales: 1714000, orders: 3542, avgOrderValue: 484, growth: 24.2 },
    { year: '2022', sales: 1380000, orders: 2987, avgOrderValue: 462, growth: 31.5 },
    { year: '2021', sales: 1049000, orders: 2341, avgOrderValue: 448, growth: 28.7 },
  ],
  topCountries: [
    { country: 'Nigeria', sales: 68400, percentage: 33.7, orders: 132 },
    { country: 'South Africa', sales: 42600, percentage: 21.0, orders: 89 },
    { country: 'Ghana', sales: 28900, percentage: 14.2, orders: 67 },
    { country: 'Kenya', sales: 24100, percentage: 11.9, orders: 54 },
    { country: 'Egypt', sales: 18200, percentage: 9.0, orders: 38 },
    { country: 'Morocco', sales: 12800, percentage: 6.3, orders: 28 },
    { country: 'Tunisia', sales: 8000, percentage: 3.9, orders: 15 },
  ],
  topProducts: [
    { product: 'Wireless Bluetooth Headphones', sales: 24680, units: 278, revenue: 24680 },
    { product: 'Smartphone Case', sales: 18750, units: 750, revenue: 18750 },
    { product: 'Fitness Tracker', sales: 16890, units: 214, revenue: 16890 },
    { product: 'Cotton Summer Dress', sales: 14300, units: 220, revenue: 14300 },
    { product: 'Kitchen Blender', sales: 12480, units: 104, revenue: 12480 },
  ]
};

export const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'Amara Okafor',
    country: 'Nigeria',
    status: 'Active',
    xp: 2450,
    totalOrders: 127,
    recruitedClients: 15,
    referredAgents: 3,
    joinDate: '2023-08-15',
    commissionRate: 8.5,
    totalEarned: 12450,
    monthlyEarned: 2850,
    pendingPayouts: 450,
    bonusXP: 150,
    campaignProgress: 75
  },
  {
    id: '2',
    name: 'Kofi Asante',
    country: 'Ghana',
    status: 'Active',
    xp: 2280,
    totalOrders: 94,
    recruitedClients: 12,
    referredAgents: 2,
    joinDate: '2023-09-22',
    commissionRate: 7.5,
    totalEarned: 9800,
    monthlyEarned: 2200,
    pendingPayouts: 320,
    bonusXP: 120,
    campaignProgress: 60
  },
  {
    id: '3',
    name: 'Fatima Al-Rashid',
    country: 'Egypt',
    status: 'Interviewing',
    xp: 1850,
    totalOrders: 73,
    recruitedClients: 8,
    referredAgents: 1,
    joinDate: '2023-10-10',
    commissionRate: 6.5,
    totalEarned: 7200,
    monthlyEarned: 1800,
    pendingPayouts: 280,
    bonusXP: 80,
    campaignProgress: 45
  },
  {
    id: '4',
    name: 'Jabari Mwangi',
    country: 'Kenya',
    status: 'Active',
    xp: 2100,
    totalOrders: 89,
    recruitedClients: 10,
    referredAgents: 4,
    joinDate: '2023-07-28',
    commissionRate: 8.0,
    totalEarned: 10500,
    monthlyEarned: 2400,
    pendingPayouts: 380,
    bonusXP: 200,
    campaignProgress: 80
  },
  {
    id: '5',
    name: 'Zara Boutros',
    country: 'Morocco',
    status: 'Active',
    xp: 1920,
    totalOrders: 76,
    recruitedClients: 6,
    referredAgents: 1,
    joinDate: '2023-11-05',
    commissionRate: 7.0,
    totalEarned: 8200,
    monthlyEarned: 1950,
    pendingPayouts: 250,
    bonusXP: 90,
    campaignProgress: 50
  },
  {
    id: '6',
    name: 'Omar Hassan',
    country: 'Sudan',
    status: 'Applied',
    xp: 450,
    totalOrders: 12,
    recruitedClients: 2,
    referredAgents: 0,
    joinDate: '2024-01-15',
    commissionRate: 5.0,
    totalEarned: 600,
    monthlyEarned: 300,
    pendingPayouts: 150,
    bonusXP: 25,
    campaignProgress: 15
  },
  {
    id: '7',
    name: 'Aisha Kone',
    country: 'Mali',
    status: 'Active',
    xp: 1750,
    totalOrders: 68,
    recruitedClients: 9,
    referredAgents: 2,
    joinDate: '2023-12-03',
    commissionRate: 7.2,
    totalEarned: 7800,
    monthlyEarned: 1650,
    pendingPayouts: 220,
    bonusXP: 95,
    campaignProgress: 55
  },
  {
    id: '8',
    name: 'Thabo Molefe',
    country: 'South Africa',
    status: 'Active',
    xp: 2650,
    totalOrders: 145,
    recruitedClients: 18,
    referredAgents: 5,
    joinDate: '2023-06-12',
    commissionRate: 9.0,
    totalEarned: 15200,
    monthlyEarned: 3100,
    pendingPayouts: 520,
    bonusXP: 180,
    campaignProgress: 85
  },
  {
    id: '9',
    name: 'Mariam Traore',
    country: 'Senegal',
    status: 'Interviewing',
    xp: 1200,
    totalOrders: 45,
    recruitedClients: 5,
    referredAgents: 1,
    joinDate: '2024-01-08',
    commissionRate: 6.0,
    totalEarned: 4200,
    monthlyEarned: 950,
    pendingPayouts: 180,
    bonusXP: 60,
    campaignProgress: 30
  },
  {
    id: '10',
    name: 'Kwame Nkrumah',
    country: 'Ghana',
    status: 'Active',
    xp: 1980,
    totalOrders: 82,
    recruitedClients: 11,
    referredAgents: 3,
    joinDate: '2023-09-15',
    commissionRate: 7.8,
    totalEarned: 9200,
    monthlyEarned: 2050,
    pendingPayouts: 310,
    bonusXP: 110,
    campaignProgress: 65
  },
  {
    id: '11',
    name: 'Amina Diallo',
    country: 'Guinea',
    status: 'Applied',
    xp: 320,
    totalOrders: 8,
    recruitedClients: 1,
    referredAgents: 0,
    joinDate: '2024-01-20',
    commissionRate: 5.0,
    totalEarned: 400,
    monthlyEarned: 200,
    pendingPayouts: 100,
    bonusXP: 15,
    campaignProgress: 10
  },
  {
    id: '12',
    name: 'Youssef Ben Ali',
    country: 'Tunisia',
    status: 'Active',
    xp: 2180,
    totalOrders: 96,
    recruitedClients: 13,
    referredAgents: 4,
    joinDate: '2023-08-28',
    commissionRate: 8.2,
    totalEarned: 11200,
    monthlyEarned: 2350,
    pendingPayouts: 390,
    bonusXP: 140,
    campaignProgress: 70
  },
  {
    id: '13',
    name: 'Grace Wanjiku',
    country: 'Kenya',
    status: 'Interviewing',
    xp: 890,
    totalOrders: 32,
    recruitedClients: 4,
    referredAgents: 1,
    joinDate: '2024-01-05',
    commissionRate: 5.5,
    totalEarned: 2800,
    monthlyEarned: 650,
    pendingPayouts: 120,
    bonusXP: 45,
    campaignProgress: 25
  },
  {
    id: '14',
    name: 'Adama Ouedraogo',
    country: 'Burkina Faso',
    status: 'Active',
    xp: 1650,
    totalOrders: 61,
    recruitedClients: 7,
    referredAgents: 2,
    joinDate: '2023-11-18',
    commissionRate: 6.8,
    totalEarned: 6800,
    monthlyEarned: 1450,
    pendingPayouts: 195,
    bonusXP: 85,
    campaignProgress: 45
  },
  {
    id: '15',
    name: 'Leila Benali',
    country: 'Algeria',
    status: 'Active',
    xp: 2320,
    totalOrders: 108,
    recruitedClients: 14,
    referredAgents: 3,
    joinDate: '2023-07-22',
    commissionRate: 8.3,
    totalEarned: 12800,
    monthlyEarned: 2650,
    pendingPayouts: 420,
    bonusXP: 155,
    campaignProgress: 75
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    agentName: 'Amara Okafor',
    product: 'Electronics Bundle',
    country: 'Nigeria',
    status: 'In Transit',
    assignedCarrier: 'DHL Express',
    lastUpdate: '2024-01-10T14:30:00Z',
    value: 1250,
    costOfGoods: 850,
    salePrice: 1250,
    margin: 400,
    agentCommission: 106.25
  },
  {
    id: 'ORD-002',
    agentName: 'Kofi Asante',
    product: 'Fashion Accessories',
    country: 'Ghana',
    status: 'Pending',
    lastUpdate: '2024-01-11T09:15:00Z',
    value: 890,
    costOfGoods: 620,
    salePrice: 890,
    margin: 270,
    agentCommission: 66.75
  },
  {
    id: 'ORD-003',
    agentName: 'Jabari Mwangi',
    product: 'Home Appliances',
    country: 'Kenya',
    status: 'Delayed',
    assignedCarrier: 'FedEx',
    lastUpdate: '2024-01-09T16:45:00Z',
    delayReason: 'Customs clearance pending',
    value: 2100,
    costOfGoods: 1400,
    salePrice: 2100,
    margin: 700,
    agentCommission: 168
  },
  {
    id: 'ORD-004',
    agentName: 'Zara Boutros',
    product: 'Textiles',
    country: 'Morocco',
    status: 'Delivered',
    assignedCarrier: 'UPS',
    lastUpdate: '2024-01-08T11:20:00Z',
    value: 750,
    costOfGoods: 500,
    salePrice: 750,
    margin: 250,
    agentCommission: 52.5
  },
  {
    id: 'ORD-005',
    agentName: 'Fatima Al-Rashid',
    product: 'Medical Supplies',
    country: 'Egypt',
    status: 'Assigned to Supplier',
    lastUpdate: '2024-01-11T13:00:00Z',
    value: 3200,
    costOfGoods: 2200,
    salePrice: 3200,
    margin: 1000,
    agentCommission: 208
  },
  {
    id: 'ORD-006',
    agentName: 'Thabo Molefe',
    product: 'Technology Equipment',
    country: 'South Africa',
    status: 'In Transit',
    assignedCarrier: 'Aramex',
    lastUpdate: '2024-01-12T10:15:00Z',
    value: 1850,
    costOfGoods: 1200,
    salePrice: 1850,
    margin: 650,
    agentCommission: 166.5
  },
  {
    id: 'ORD-007',
    agentName: 'Aisha Kone',
    product: 'Agricultural Tools',
    country: 'Mali',
    status: 'Pending',
    lastUpdate: '2024-01-12T14:30:00Z',
    value: 680,
    costOfGoods: 450,
    salePrice: 680,
    margin: 230,
    agentCommission: 49
  },
  {
    id: 'ORD-008',
    agentName: 'Youssef Ben Ali',
    product: 'Automotive Parts',
    country: 'Tunisia',
    status: 'Delivered',
    assignedCarrier: 'DHL Express',
    lastUpdate: '2024-01-10T16:45:00Z',
    value: 1420,
    costOfGoods: 950,
    salePrice: 1420,
    margin: 470,
    agentCommission: 116.4
  }
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Shanghai Trading Co.',
    country: 'China',
    totalProducts: 245,
    onTimePercentage: 94,
    defectRate: 2.1,
    marginCategory: 'High',
    trustScore: 92,
    avgPrice: 1200,
    margin: 35
  },
  {
    id: '2',
    name: 'Istanbul Exports Ltd.',
    country: 'Turkey',
    totalProducts: 178,
    onTimePercentage: 89,
    defectRate: 3.5,
    marginCategory: 'Medium',
    trustScore: 87,
    avgPrice: 850,
    margin: 28
  },
  {
    id: '3',
    name: 'Guangzhou Electronics',
    country: 'China',
    totalProducts: 312,
    onTimePercentage: 91,
    defectRate: 2.8,
    marginCategory: 'High',
    trustScore: 89,
    avgPrice: 1400,
    margin: 42
  },
  {
    id: '4',
    name: 'Ankara Textiles',
    country: 'Turkey',
    totalProducts: 156,
    onTimePercentage: 86,
    defectRate: 4.2,
    marginCategory: 'Low',
    trustScore: 83,
    avgPrice: 650,
    margin: 18
  },
  {
    id: '5',
    name: 'Shenzhen Tech Hub',
    country: 'China',
    totalProducts: 287,
    onTimePercentage: 96,
    defectRate: 1.5,
    marginCategory: 'High',
    trustScore: 95,
    avgPrice: 1600,
    margin: 38
  },
  {
    id: '6',
    name: 'Mumbai Manufacturing',
    country: 'India',
    totalProducts: 198,
    onTimePercentage: 88,
    defectRate: 3.2,
    marginCategory: 'Medium',
    trustScore: 85,
    avgPrice: 750,
    margin: 25
  },
  {
    id: '7',
    name: 'Bangkok Industries',
    country: 'Thailand',
    totalProducts: 134,
    onTimePercentage: 92,
    defectRate: 2.5,
    marginCategory: 'High',
    trustScore: 90,
    avgPrice: 980,
    margin: 32
  }
];

export const mockFeedbackTickets: FeedbackTicket[] = [
  {
    id: 'TKT-001',
    issueCategory: 'Late Delivery',
    submittedBy: 'Customer ABC',
    assignedAgent: 'Amara Okafor',
    resolutionTime: 24,
    status: 'Resolved',
    satisfaction: 4,
    createdAt: '2024-01-08T10:30:00Z'
  },
  {
    id: 'TKT-002',
    issueCategory: 'Damaged Product',
    submittedBy: 'Customer XYZ',
    assignedAgent: 'Kofi Asante',
    resolutionTime: 48,
    status: 'In Progress',
    satisfaction: 3,
    createdAt: '2024-01-10T14:15:00Z'
  },
  {
    id: 'TKT-003',
    issueCategory: 'Wrong Item',
    submittedBy: 'Customer DEF',
    assignedAgent: 'Jabari Mwangi',
    resolutionTime: 12,
    status: 'Resolved',
    satisfaction: 5,
    createdAt: '2024-01-09T09:45:00Z'
  },
  {
    id: 'TKT-004',
    issueCategory: 'Payment Issue',
    submittedBy: 'Customer GHI',
    assignedAgent: 'Zara Boutros',
    resolutionTime: 36,
    status: 'Open',
    satisfaction: 2,
    createdAt: '2024-01-11T16:20:00Z'
  },
  {
    id: 'TKT-005',
    issueCategory: 'Communication',
    submittedBy: 'Customer JKL',
    assignedAgent: 'Fatima Al-Rashid',
    resolutionTime: 18,
    status: 'Closed',
    satisfaction: 4,
    createdAt: '2024-01-07T11:10:00Z'
  },
  {
    id: 'TKT-006',
    issueCategory: 'Late Delivery',
    submittedBy: 'Customer MNO',
    assignedAgent: 'Thabo Molefe',
    resolutionTime: 30,
    status: 'Resolved',
    satisfaction: 4,
    createdAt: '2024-01-09T12:20:00Z'
  },
  {
    id: 'TKT-007',
    issueCategory: 'Wrong Item',
    submittedBy: 'Customer PQR',
    assignedAgent: 'Aisha Kone',
    resolutionTime: 15,
    status: 'In Progress',
    satisfaction: 3,
    createdAt: '2024-01-11T08:45:00Z'
  }
];

export const mockReferralLogs: ReferralLog[] = [
  {
    id: '1',
    referrerName: 'Amara Okafor',
    refereeName: 'Chioma Nwankwo',
    date: '2024-01-05',
    status: 'Active'
  },
  {
    id: '2',
    referrerName: 'Jabari Mwangi',
    refereeName: 'Grace Wanjiku',
    date: '2024-01-08',
    status: 'Interviewed'
  },
  {
    id: '3',
    referrerName: 'Kofi Asante',
    refereeName: 'Kwame Ofori',
    date: '2024-01-10',
    status: 'Applied'
  },
  {
    id: '4',
    referrerName: 'Jabari Mwangi',
    refereeName: 'Omar Hassan',
    date: '2024-01-12',
    status: 'Applied'
  },
  {
    id: '5',
    referrerName: 'Thabo Molefe',
    refereeName: 'Nomsa Dlamini',
    date: '2024-01-06',
    status: 'Active'
  },
  {
    id: '6',
    referrerName: 'Youssef Ben Ali',
    refereeName: 'Amina Diallo',
    date: '2024-01-09',
    status: 'Applied'
  }
];

export const responseTemplates = [
  {
    id: '1',
    category: 'Late Delivery',
    template: 'We sincerely apologize for the delay in your order delivery. We are working closely with our logistics partners to expedite the process and will provide you with updated tracking information shortly.'
  },
  {
    id: '2',
    category: 'Damaged Product',
    template: 'We are sorry to hear that your product arrived damaged. Please provide photos of the damaged item, and we will arrange for an immediate replacement at no additional cost.'
  },
  {
    id: '3',
    category: 'Wrong Item',
    template: 'We apologize for sending the incorrect item. We will arrange for the return of the wrong product and expedite the delivery of your correct order immediately.'
  },
  {
    id: '4',
    category: 'Payment Issue',
    template: 'We understand your concern regarding the payment issue. Our finance team is reviewing your case and will resolve this matter within 24 hours. You will receive a confirmation email once processed.'
  },
  {
    id: '5',
    category: 'Communication',
    template: 'Thank you for your feedback regarding communication. We value your input and are implementing improvements to ensure better clarity in our future interactions.'
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    category: 'Electronics',
    costOfGoods: 45,
    salePrice: 89,
    margin: 44,
    marginPercentage: 49.4,
    supplier: 'Shenzhen Tech Hub',
    stock: 156,
    monthlySales: 89
  },
  {
    id: '2',
    name: 'Cotton Summer Dress',
    category: 'Fashion',
    costOfGoods: 25,
    salePrice: 65,
    margin: 40,
    marginPercentage: 61.5,
    supplier: 'Istanbul Exports Ltd.',
    stock: 8,
    monthlySales: 45
  },
  {
    id: '3',
    name: 'Smartphone Case',
    category: 'Electronics',
    costOfGoods: 8,
    salePrice: 25,
    margin: 17,
    marginPercentage: 68.0,
    supplier: 'Guangzhou Electronics',
    stock: 234,
    monthlySales: 156
  },
  {
    id: '4',
    name: 'Kitchen Blender',
    category: 'Home Appliances',
    costOfGoods: 85,
    salePrice: 120,
    margin: 35,
    marginPercentage: 29.2,
    supplier: 'Shanghai Trading Co.',
    stock: 67,
    monthlySales: 34
  },
  {
    id: '5',
    name: 'Leather Handbag',
    category: 'Fashion',
    costOfGoods: 120,
    salePrice: 180,
    margin: 60,
    marginPercentage: 33.3,
    supplier: 'Ankara Textiles',
    stock: 23,
    monthlySales: 28
  },
  {
    id: '6',
    name: 'USB Cable Set',
    category: 'Electronics',
    costOfGoods: 12,
    salePrice: 18,
    margin: 6,
    marginPercentage: 33.3,
    supplier: 'Shenzhen Tech Hub',
    stock: 5,
    monthlySales: 78
  },
  {
    id: '7',
    name: 'Ceramic Dinnerware Set',
    category: 'Home & Garden',
    costOfGoods: 65,
    salePrice: 95,
    margin: 30,
    marginPercentage: 31.6,
    supplier: 'Shanghai Trading Co.',
    stock: 45,
    monthlySales: 22
  },
  {
    id: '8',
    name: 'Fitness Tracker',
    category: 'Electronics',
    costOfGoods: 35,
    salePrice: 79,
    margin: 44,
    marginPercentage: 55.7,
    supplier: 'Guangzhou Electronics',
    stock: 89,
    monthlySales: 67
  },
  {
    id: '9',
    name: 'Silk Scarf',
    category: 'Fashion',
    costOfGoods: 18,
    salePrice: 45,
    margin: 27,
    marginPercentage: 60.0,
    supplier: 'Istanbul Exports Ltd.',
    stock: 12,
    monthlySales: 35
  },
  {
    id: '10',
    name: 'Coffee Maker',
    category: 'Home Appliances',
    costOfGoods: 95,
    salePrice: 110,
    margin: 15,
    marginPercentage: 13.6,
    supplier: 'Shanghai Trading Co.',
    stock: 34,
    monthlySales: 18
  },
  {
    id: '11',
    name: 'Solar Power Bank',
    category: 'Electronics',
    costOfGoods: 28,
    salePrice: 55,
    margin: 27,
    marginPercentage: 49.1,
    supplier: 'Shenzhen Tech Hub',
    stock: 78,
    monthlySales: 92
  },
  {
    id: '12',
    name: 'Organic Face Cream',
    category: 'Beauty & Health',
    costOfGoods: 15,
    salePrice: 35,
    margin: 20,
    marginPercentage: 57.1,
    supplier: 'Mumbai Manufacturing',
    stock: 145,
    monthlySales: 68
  },
  {
    id: '13',
    name: 'Bamboo Cutting Board',
    category: 'Home & Garden',
    costOfGoods: 22,
    salePrice: 40,
    margin: 18,
    marginPercentage: 45.0,
    supplier: 'Bangkok Industries',
    stock: 56,
    monthlySales: 41
  },
  {
    id: '14',
    name: 'Wireless Mouse',
    category: 'Electronics',
    costOfGoods: 18,
    salePrice: 32,
    margin: 14,
    marginPercentage: 43.8,
    supplier: 'Guangzhou Electronics',
    stock: 198,
    monthlySales: 125
  },
  {
    id: '15',
    name: 'Yoga Mat',
    category: 'Sports & Fitness',
    costOfGoods: 25,
    salePrice: 45,
    margin: 20,
    marginPercentage: 44.4,
    supplier: 'Mumbai Manufacturing',
    stock: 87,
    monthlySales: 53
  }
];

export const mockCommissions: Commission[] = [
  {
    id: '1',
    agentId: '1',
    agentName: 'Amara Okafor',
    orderId: 'ORD-001',
    orderValue: 1250,
    commissionRate: 8.5,
    commissionAmount: 106.25,
    status: 'Paid',
    date: '2024-01-10',
    payoutDate: '2024-01-15'
  },
  {
    id: '2',
    agentId: '2',
    agentName: 'Kofi Asante',
    orderId: 'ORD-002',
    orderValue: 890,
    commissionRate: 7.5,
    commissionAmount: 66.75,
    status: 'Pending',
    date: '2024-01-11'
  },
  {
    id: '3',
    agentId: '4',
    agentName: 'Jabari Mwangi',
    orderId: 'ORD-003',
    orderValue: 2100,
    commissionRate: 8.0,
    commissionAmount: 168,
    status: 'Processing',
    date: '2024-01-09'
  },
  {
    id: '4',
    agentId: '5',
    agentName: 'Zara Boutros',
    orderId: 'ORD-004',
    orderValue: 750,
    commissionRate: 7.0,
    commissionAmount: 52.5,
    status: 'Paid',
    date: '2024-01-08',
    payoutDate: '2024-01-12'
  },
  {
    id: '5',
    agentId: '3',
    agentName: 'Fatima Al-Rashid',
    orderId: 'ORD-005',
    orderValue: 3200,
    commissionRate: 6.5,
    commissionAmount: 208,
    status: 'Pending',
    date: '2024-01-11'
  },
  {
    id: '6',
    agentId: '1',
    agentName: 'Amara Okafor',
    orderId: 'ORD-006',
    orderValue: 1850,
    commissionRate: 8.5,
    commissionAmount: 157.25,
    status: 'Processing',
    date: '2024-01-12'
  },
  {
    id: '7',
    agentId: '8',
    agentName: 'Thabo Molefe',
    orderId: 'ORD-006',
    orderValue: 1850,
    commissionRate: 9.0,
    commissionAmount: 166.5,
    status: 'Paid',
    date: '2024-01-12',
    payoutDate: '2024-01-16'
  },
  {
    id: '8',
    agentId: '7',
    agentName: 'Aisha Kone',
    orderId: 'ORD-007',
    orderValue: 680,
    commissionRate: 7.2,
    commissionAmount: 49,
    status: 'Pending',
    date: '2024-01-12'
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Q1 Growth Challenge',
    description: 'Reach 3000 XP to earn a $500 bonus',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    targetXP: 3000,
    bonusAmount: 500,
    participants: 12,
    status: 'Active'
  },
  {
    id: '2',
    name: 'New Agent Referral Bonus',
    description: 'Refer 3 new agents and earn $300',
    startDate: '2024-01-15',
    endDate: '2024-04-15',
    targetXP: 0,
    bonusAmount: 300,
    participants: 8,
    status: 'Active'
  },
  {
    id: '3',
    name: 'Holiday Sales Sprint',
    description: 'Top performer gets $1000 bonus',
    startDate: '2023-11-01',
    endDate: '2023-12-31',
    targetXP: 2500,
    bonusAmount: 1000,
    participants: 15,
    status: 'Completed'
  },
  {
    id: '4',
    name: 'Summer Excellence Program',
    description: 'Achieve 4000 XP for exclusive rewards',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    targetXP: 4000,
    bonusAmount: 750,
    participants: 0,
    status: 'Upcoming'
  },
  {
    id: '5',
    name: 'African Expansion Initiative',
    description: 'Special bonus for agents in new African markets',
    startDate: '2024-02-01',
    endDate: '2024-05-31',
    targetXP: 2000,
    bonusAmount: 400,
    participants: 6,
    status: 'Active'
  }
];

// Export the African countries for use in other components
export { africanCountries };