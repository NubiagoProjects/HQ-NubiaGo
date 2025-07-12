import { Agent, Order, Supplier, FeedbackTicket, ReferralLog, Product, Commission, Campaign } from '../types';

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
  }
];