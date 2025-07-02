// Airtable field mappings for NubiaGo entities

export interface AirtableAgent {
  'Name': string;
  'Country': string;
  'Status': 'Active' | 'Interviewing' | 'Applied';
  'XP': number;
  'Total Orders': number;
  'Recruited Clients': number;
  'Referred Agents': number;
  'Join Date': string;
  'Commission Rate': number;
  'Total Earned': number;
  'Monthly Earned': number;
  'Pending Payouts': number;
  'Bonus XP': number;
  'Campaign Progress': number;
  'Avatar URL'?: string;
  'Email'?: string;
  'Phone'?: string;
  'Notes'?: string;
}

export interface AirtableOrder {
  'Order ID': string;
  'Agent Name': string;
  'Product': string;
  'Country': string;
  'Status': 'Pending' | 'Assigned to Supplier' | 'In Transit' | 'Delivered' | 'Delayed';
  'Assigned Carrier'?: string;
  'Last Update': string;
  'Delay Reason'?: string;
  'Value': number;
  'Cost of Goods': number;
  'Sale Price': number;
  'Margin': number;
  'Agent Commission': number;
  'Customer Name'?: string;
  'Customer Email'?: string;
  'Tracking Number'?: string;
  'Delivery Address'?: string;
  'Notes'?: string;
}

export interface AirtableSupplier {
  'Name': string;
  'Country': string;
  'Total Products': number;
  'On Time Percentage': number;
  'Defect Rate': number;
  'Margin Category': 'High' | 'Medium' | 'Low';
  'Trust Score': number;
  'Average Price': number;
  'Margin': number;
  'Contact Email'?: string;
  'Contact Phone'?: string;
  'Address'?: string;
  'Payment Terms'?: string;
  'Lead Time'?: number;
  'Minimum Order'?: number;
  'Notes'?: string;
}

export interface AirtableFeedback {
  'Ticket ID': string;
  'Issue Category': 'Late Delivery' | 'Damaged Product' | 'Wrong Item' | 'Payment Issue' | 'Communication';
  'Submitted By': string;
  'Assigned Agent': string;
  'Resolution Time': number;
  'Status': 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  'Satisfaction': number;
  'Created At': string;
  'Customer Email'?: string;
  'Order ID'?: string;
  'Description'?: string;
  'Resolution Notes'?: string;
  'Priority'?: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface AirtableProduct {
  'Name': string;
  'Category': string;
  'Cost of Goods': number;
  'Sale Price': number;
  'Margin': number;
  'Margin Percentage': number;
  'Supplier': string;
  'Stock': number;
  'Monthly Sales': number;
  'SKU'?: string;
  'Description'?: string;
  'Image URL'?: string;
  'Weight'?: number;
  'Dimensions'?: string;
  'Minimum Stock'?: number;
  'Reorder Point'?: number;
  'Notes'?: string;
}

export interface AirtableCommission {
  'Commission ID': string;
  'Agent ID': string;
  'Agent Name': string;
  'Order ID': string;
  'Order Value': number;
  'Commission Rate': number;
  'Commission Amount': number;
  'Status': 'Pending' | 'Paid' | 'Processing';
  'Date': string;
  'Payout Date'?: string;
  'Payment Method'?: string;
  'Transaction ID'?: string;
  'Notes'?: string;
}

export interface AirtableCampaign {
  'Name': string;
  'Description': string;
  'Start Date': string;
  'End Date': string;
  'Target XP': number;
  'Bonus Amount': number;
  'Participants': number;
  'Status': 'Active' | 'Completed' | 'Upcoming';
  'Campaign Type'?: string;
  'Eligibility Criteria'?: string;
  'Terms and Conditions'?: string;
  'Created By'?: string;
  'Notes'?: string;
}

export interface AirtableCategory {
  'Name': string;
  'Type': 'Product' | 'Issue' | 'Agent Status' | 'Order Status' | 'Campaign';
  'Description'?: string;
  'Color'?: string;
  'Icon'?: string;
  'Sort Order'?: number;
  'Active': boolean;
  'Parent Category'?: string;
  'Created At': string;
  'Updated At': string;
}

// Mapping functions to convert between internal types and Airtable fields
export function mapAgentToAirtable(agent: import('../types').Agent): Partial<AirtableAgent> {
  return {
    'Name': agent.name,
    'Country': agent.country,
    'Status': agent.status,
    'XP': agent.xp,
    'Total Orders': agent.totalOrders,
    'Recruited Clients': agent.recruitedClients,
    'Referred Agents': agent.referredAgents,
    'Join Date': agent.joinDate,
    'Commission Rate': agent.commissionRate,
    'Total Earned': agent.totalEarned,
    'Monthly Earned': agent.monthlyEarned,
    'Pending Payouts': agent.pendingPayouts,
    'Bonus XP': agent.bonusXP,
    'Campaign Progress': agent.campaignProgress,
  };
}

export function mapAirtableToAgent(record: { id: string; fields: AirtableAgent }): import('../types').Agent {
  return {
    id: record.id,
    name: record.fields['Name'],
    country: record.fields['Country'],
    status: record.fields['Status'],
    xp: record.fields['XP'],
    totalOrders: record.fields['Total Orders'],
    recruitedClients: record.fields['Recruited Clients'],
    referredAgents: record.fields['Referred Agents'],
    joinDate: record.fields['Join Date'],
    commissionRate: record.fields['Commission Rate'],
    totalEarned: record.fields['Total Earned'],
    monthlyEarned: record.fields['Monthly Earned'],
    pendingPayouts: record.fields['Pending Payouts'],
    bonusXP: record.fields['Bonus XP'],
    campaignProgress: record.fields['Campaign Progress'],
  };
}

export function mapOrderToAirtable(order: import('../types').Order): Partial<AirtableOrder> {
  return {
    'Order ID': order.id,
    'Agent Name': order.agentName,
    'Product': order.product,
    'Country': order.country,
    'Status': order.status,
    'Assigned Carrier': order.assignedCarrier,
    'Last Update': order.lastUpdate,
    'Delay Reason': order.delayReason,
    'Value': order.value,
    'Cost of Goods': order.costOfGoods,
    'Sale Price': order.salePrice,
    'Margin': order.margin,
    'Agent Commission': order.agentCommission,
  };
}

export function mapAirtableToOrder(record: { id: string; fields: AirtableOrder }): import('../types').Order {
  return {
    id: record.fields['Order ID'],
    agentName: record.fields['Agent Name'],
    product: record.fields['Product'],
    country: record.fields['Country'],
    status: record.fields['Status'],
    assignedCarrier: record.fields['Assigned Carrier'],
    lastUpdate: record.fields['Last Update'],
    delayReason: record.fields['Delay Reason'],
    value: record.fields['Value'],
    costOfGoods: record.fields['Cost of Goods'],
    salePrice: record.fields['Sale Price'],
    margin: record.fields['Margin'],
    agentCommission: record.fields['Agent Commission'],
  };
}

export function mapSupplierToAirtable(supplier: import('../types').Supplier): Partial<AirtableSupplier> {
  return {
    'Name': supplier.name,
    'Country': supplier.country,
    'Total Products': supplier.totalProducts,
    'On Time Percentage': supplier.onTimePercentage,
    'Defect Rate': supplier.defectRate,
    'Margin Category': supplier.marginCategory,
    'Trust Score': supplier.trustScore,
    'Average Price': supplier.avgPrice,
    'Margin': supplier.margin,
  };
}

export function mapAirtableToSupplier(record: { id: string; fields: AirtableSupplier }): import('../types').Supplier {
  return {
    id: record.id,
    name: record.fields['Name'],
    country: record.fields['Country'],
    totalProducts: record.fields['Total Products'],
    onTimePercentage: record.fields['On Time Percentage'],
    defectRate: record.fields['Defect Rate'],
    marginCategory: record.fields['Margin Category'],
    trustScore: record.fields['Trust Score'],
    avgPrice: record.fields['Average Price'],
    margin: record.fields['Margin'],
  };
}

export function mapFeedbackToAirtable(feedback: import('../types').FeedbackTicket): Partial<AirtableFeedback> {
  return {
    'Ticket ID': feedback.id,
    'Issue Category': feedback.issueCategory,
    'Submitted By': feedback.submittedBy,
    'Assigned Agent': feedback.assignedAgent,
    'Resolution Time': feedback.resolutionTime,
    'Status': feedback.status,
    'Satisfaction': feedback.satisfaction,
    'Created At': feedback.createdAt,
  };
}

export function mapAirtableToFeedback(record: { id: string; fields: AirtableFeedback }): import('../types').FeedbackTicket {
  return {
    id: record.fields['Ticket ID'],
    issueCategory: record.fields['Issue Category'],
    submittedBy: record.fields['Submitted By'],
    assignedAgent: record.fields['Assigned Agent'],
    resolutionTime: record.fields['Resolution Time'],
    status: record.fields['Status'],
    satisfaction: record.fields['Satisfaction'],
    createdAt: record.fields['Created At'],
  };
}

export function mapProductToAirtable(product: import('../types').Product): Partial<AirtableProduct> {
  return {
    'Name': product.name,
    'Category': product.category,
    'Cost of Goods': product.costOfGoods,
    'Sale Price': product.salePrice,
    'Margin': product.margin,
    'Margin Percentage': product.marginPercentage,
    'Supplier': product.supplier,
    'Stock': product.stock,
    'Monthly Sales': product.monthlySales,
  };
}

export function mapAirtableToProduct(record: { id: string; fields: AirtableProduct }): import('../types').Product {
  return {
    id: record.id,
    name: record.fields['Name'],
    category: record.fields['Category'],
    costOfGoods: record.fields['Cost of Goods'],
    salePrice: record.fields['Sale Price'],
    margin: record.fields['Margin'],
    marginPercentage: record.fields['Margin Percentage'],
    supplier: record.fields['Supplier'],
    stock: record.fields['Stock'],
    monthlySales: record.fields['Monthly Sales'],
  };
}

export function mapCommissionToAirtable(commission: import('../types').Commission): Partial<AirtableCommission> {
  return {
    'Commission ID': commission.id,
    'Agent ID': commission.agentId,
    'Agent Name': commission.agentName,
    'Order ID': commission.orderId,
    'Order Value': commission.orderValue,
    'Commission Rate': commission.commissionRate,
    'Commission Amount': commission.commissionAmount,
    'Status': commission.status,
    'Date': commission.date,
    'Payout Date': commission.payoutDate,
  };
}

export function mapAirtableToCommission(record: { id: string; fields: AirtableCommission }): import('../types').Commission {
  return {
    id: record.fields['Commission ID'],
    agentId: record.fields['Agent ID'],
    agentName: record.fields['Agent Name'],
    orderId: record.fields['Order ID'],
    orderValue: record.fields['Order Value'],
    commissionRate: record.fields['Commission Rate'],
    commissionAmount: record.fields['Commission Amount'],
    status: record.fields['Status'],
    date: record.fields['Date'],
    payoutDate: record.fields['Payout Date'],
  };
}

export function mapCampaignToAirtable(campaign: import('../types').Campaign): Partial<AirtableCampaign> {
  return {
    'Name': campaign.name,
    'Description': campaign.description,
    'Start Date': campaign.startDate,
    'End Date': campaign.endDate,
    'Target XP': campaign.targetXP,
    'Bonus Amount': campaign.bonusAmount,
    'Participants': campaign.participants,
    'Status': campaign.status,
  };
}

export function mapAirtableToCampaign(record: { id: string; fields: AirtableCampaign }): import('../types').Campaign {
  return {
    id: record.id,
    name: record.fields['Name'],
    description: record.fields['Description'],
    startDate: record.fields['Start Date'],
    endDate: record.fields['End Date'],
    targetXP: record.fields['Target XP'],
    bonusAmount: record.fields['Bonus Amount'],
    participants: record.fields['Participants'],
    status: record.fields['Status'],
  };
}