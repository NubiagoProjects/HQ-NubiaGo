export interface Agent {
  id: string;
  name: string;
  country: string;
  status: 'Active' | 'Interviewing' | 'Applied';
  xp: number;
  totalOrders: number;
  recruitedClients: number;
  referredAgents: number;
  joinDate: string;
  avatar?: string;
  // Financial data
  commissionRate: number; // percentage
  totalEarned: number;
  monthlyEarned: number;
  pendingPayouts: number;
  bonusXP: number;
  campaignProgress: number;
}

export interface Order {
  id: string;
  agentName: string;
  product: string;
  country: string;
  status: 'Pending' | 'Assigned to Supplier' | 'In Transit' | 'Delivered' | 'Delayed';
  assignedCarrier?: string;
  lastUpdate: string;
  delayReason?: string;
  value: number;
  // Financial data
  costOfGoods: number;
  salePrice: number;
  margin: number;
  agentCommission: number;
}

export interface Supplier {
  id: string;
  name: string;
  country: string;
  totalProducts: number;
  onTimePercentage: number;
  defectRate: number;
  marginCategory: 'High' | 'Medium' | 'Low';
  trustScore: number;
  avgPrice: number;
  margin: number;
}

export interface FeedbackTicket {
  id: string;
  issueCategory: 'Late Delivery' | 'Damaged Product' | 'Wrong Item' | 'Payment Issue' | 'Communication';
  submittedBy: string;
  assignedAgent: string;
  resolutionTime: number; // hours
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  satisfaction: number; // 1-5
  createdAt: string;
}

export interface ReferralLog {
  id: string;
  referrerName: string;
  refereeName: string;
  date: string;
  status: 'Applied' | 'Interviewed' | 'Active';
}

export interface Product {
  id: string;
  name: string;
  category: string;
  costOfGoods: number;
  salePrice: number;
  margin: number;
  marginPercentage: number;
  supplier: string;
  stock: number;
  monthlySales: number;
}

export interface Commission {
  id: string;
  agentId: string;
  agentName: string;
  orderId: string;
  orderValue: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'Pending' | 'Paid' | 'Processing';
  date: string;
  payoutDate?: string;
}

export interface Campaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  targetXP: number;
  bonusAmount: number;
  participants: number;
  status: 'Active' | 'Completed' | 'Upcoming';
}

export type TabKey = 'agents' | 'orders' | 'suppliers' | 'feedback' | 'financials' | 'margins' | 'settings';