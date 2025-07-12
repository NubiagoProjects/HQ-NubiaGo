import React, { useState } from 'react';
import { mockAgents, mockCommissions, mockCampaigns } from '../../data/mockData';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { MetricCard } from '../UI/MetricCard';
import { DollarSign, TrendingUp, Clock, Award, Users, Search, Filter, Plus, CreditCard, Target, Zap } from 'lucide-react';

export function FinancialsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredCommissions = mockCommissions.filter(commission => {
    const matchesSearch = searchTerm === '' || 
      commission.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commission.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || commission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const pendingPayouts = mockCommissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.commissionAmount, 0);
  const monthlyCommissions = mockCommissions.filter(c => {
    const commissionDate = new Date(c.date);
    const currentMonth = new Date().getMonth();
    return commissionDate.getMonth() === currentMonth;
  }).reduce((sum, c) => sum + c.commissionAmount, 0);

  const topEarners = [...mockAgents]
    .sort((a, b) => b.monthlyEarned - a.monthlyEarned)
    .slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge variant="success" icon={<CreditCard className="w-3 h-3" />}>Paid</Badge>;
      case 'Pending':
        return <Badge variant="warning" icon={<Clock className="w-3 h-3" />}>Pending</Badge>;
      case 'Processing':
        return <Badge variant="info" icon={<TrendingUp className="w-3 h-3" />}>Processing</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCampaignStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success" icon={<Zap className="w-3 h-3" />}>Active</Badge>;
      case 'Completed':
        return <Badge variant="default" icon={<Award className="w-3 h-3" />}>Completed</Badge>;
      case 'Upcoming':
        return <Badge variant="info" icon={<Target className="w-3 h-3" />}>Upcoming</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Agent Financials & Commissions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage agent earnings, commissions, and bonus campaigns
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents or orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full sm:w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Paid">Paid</option>
          </select>
          
          <Button variant="primary" icon={<Plus className="w-5 h-5" />} size="lg">
            Manual Payout
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Commissions"
          value={`$${totalCommissions.toLocaleString()}`}
          change={{ value: 18, type: 'increase', period: 'last month' }}
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Monthly Earned"
          value={`$${monthlyCommissions.toLocaleString()}`}
          change={{ value: 12, type: 'increase', period: 'last month' }}
          icon={<TrendingUp className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Pending Payouts"
          value={`$${pendingPayouts.toLocaleString()}`}
          change={{ value: 5, type: 'decrease', period: 'last week' }}
          icon={<Clock className="w-6 h-6" />}
          color="yellow"
        />
        <MetricCard
          title="Active Campaigns"
          value={mockCampaigns.filter(c => c.status === 'Active').length}
          change={{ value: 2, type: 'increase', period: 'this quarter' }}
          icon={<Award className="w-6 h-6" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Commissions Table */}
        <div className="xl:col-span-3">
          <Card title="Commission Tracking" subtitle={`${filteredCommissions.length} commission records`} variant="gradient">
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Order ID</th>
                    <th>Order Value</th>
                    <th>Rate</th>
                    <th>Commission</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCommissions.map((commission) => (
                    <tr key={commission.id}>
                      <td>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {commission.agentName}
                        </div>
                      </td>
                      <td>
                        <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">
                          {commission.orderId}
                        </div>
                      </td>
                      <td>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          ${commission.orderValue.toLocaleString()}
                        </div>
                      </td>
                      <td>
                        <div className="text-gray-900 dark:text-white">
                          {commission.commissionRate}%
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-success-600 dark:text-success-400">
                          ${commission.commissionAmount.toLocaleString()}
                        </div>
                      </td>
                      <td>{getStatusBadge(commission.status)}</td>
                      <td>
                        <div className="text-gray-600 dark:text-gray-400">
                          {new Date(commission.date).toLocaleDateString()}
                        </div>
                      </td>
                      <td>
                        {commission.status === 'Pending' && (
                          <Button size="sm" variant="primary">
                            Process
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Commission Earners */}
          <Card title="Top Earners" subtitle="This month's highest earners" variant="gradient">
            <div className="space-y-4">
              {topEarners.map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className="flex-shrink-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                      index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                      index === 2 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                      'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
                    }`}>
                      #{index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {agent.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {agent.country}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-success-600 dark:text-success-400 text-sm">
                      ${agent.monthlyEarned.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {agent.commissionRate}% rate
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Bonus Campaigns */}
          <Card title="Bonus Campaigns" subtitle="Active XP and bonus programs" variant="gradient">
            <div className="space-y-4">
              {mockCampaigns.map((campaign) => (
                <div key={campaign.id} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      {campaign.name}
                    </h4>
                    {getCampaignStatusBadge(campaign.status)}
                  </div>
                  
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                    {campaign.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Target XP:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {campaign.targetXP.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Bonus:</span>
                      <span className="font-bold text-success-600 dark:text-success-400">
                        ${campaign.bonusAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500 dark:text-gray-400">Participants:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {campaign.participants}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Payout Summary */}
          <Card title="Payout Summary" variant="gradient">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-3">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Pending</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${pendingPayouts.toLocaleString()}
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">This Week</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${Math.round(pendingPayouts * 0.3).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Next Week</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ${Math.round(pendingPayouts * 0.7).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <Button variant="primary" className="w-full mt-4">
                Process All Payouts
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}