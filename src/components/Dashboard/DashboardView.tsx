import React from 'react';
import { Card } from '../UI/Card';
import { MetricCard } from '../UI/MetricCard';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { Logo } from '../Layout/Logo';
import { 
  Users, 
  Package, 
  Building2, 
  MessageSquare, 
  DollarSign, 
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Star,
  Globe,
  Zap,
  ArrowRight,
  Activity,
  Target,
  Award
} from 'lucide-react';
import { mockAgents, mockOrders, mockSuppliers, mockFeedbackTickets, mockCommissions } from '../../data/mockData';

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
  // Calculate dashboard metrics
  const totalAgents = mockAgents.length;
  const activeAgents = mockAgents.filter(a => a.status === 'Active').length;
  const totalOrders = mockOrders.length;
  const ordersInTransit = mockOrders.filter(o => o.status === 'In Transit').length;
  const totalSuppliers = mockSuppliers.length;
  const highTrustSuppliers = mockSuppliers.filter(s => s.trustScore >= 90).length;
  const openTickets = mockFeedbackTickets.filter(t => t.status === 'Open').length;
  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const pendingPayouts = mockCommissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.commissionAmount, 0);

  // Recent activity data
  const recentOrders = mockOrders.slice(0, 5);
  const topAgents = [...mockAgents].sort((a, b) => b.xp - a.xp).slice(0, 4);
  const recentTickets = mockFeedbackTickets.slice(0, 4);

  const quickActions = [
    { label: 'Add New Agent', icon: Users, action: () => onNavigate('agents'), color: 'blue' },
    { label: 'Create Order', icon: Package, action: () => onNavigate('orders'), color: 'green' },
    { label: 'Add Supplier', icon: Building2, action: () => onNavigate('suppliers'), color: 'purple' },
    { label: 'Process Payouts', icon: DollarSign, action: () => onNavigate('financials'), color: 'yellow' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success" size="sm">{status}</Badge>;
      case 'In Transit':
        return <Badge variant="primary" size="sm">{status}</Badge>;
      case 'Delivered':
        return <Badge variant="success" size="sm">{status}</Badge>;
      case 'Pending':
        return <Badge variant="warning" size="sm">{status}</Badge>;
      case 'Open':
        return <Badge variant="error" size="sm">{status}</Badge>;
      case 'Resolved':
        return <Badge variant="success" size="sm">{status}</Badge>;
      default:
        return <Badge size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="text-center py-12">
        <Logo size="lg" className="justify-center mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to NubiaGo Command Center
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Your comprehensive dashboard for managing agents, orders, suppliers, and business operations across Africa
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Agents"
          value={totalAgents}
          change={{ value: 12, type: 'increase', period: 'last month' }}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Active Orders"
          value={totalOrders}
          change={{ value: 18, type: 'increase', period: 'last week' }}
          icon={<Package className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Total Commissions"
          value={`$${totalCommissions.toLocaleString()}`}
          change={{ value: 25, type: 'increase', period: 'last month' }}
          icon={<DollarSign className="w-6 h-6" />}
          color="yellow"
        />
        <MetricCard
          title="Supplier Network"
          value={totalSuppliers}
          change={{ value: 8, type: 'increase', period: 'last quarter' }}
          icon={<Building2 className="w-6 h-6" />}
          color="purple"
        />
      </div>

      {/* Quick Actions */}
      <Card title="Quick Actions" subtitle="Common tasks and shortcuts" variant="gradient">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={index}
                onClick={action.action}
                className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group text-left"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                  action.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  action.color === 'green' ? 'bg-green-100 dark:bg-green-900/20' :
                  action.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900/20' :
                  'bg-yellow-100 dark:bg-yellow-900/20'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    action.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                    action.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    action.color === 'purple' ? 'text-purple-600 dark:text-purple-400' :
                    'text-yellow-600 dark:text-yellow-400'
                  }`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {action.label}
                </h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400">
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="xl:col-span-2 space-y-8">
          {/* Recent Orders */}
          <Card 
            title="Recent Orders" 
            subtitle="Latest order activity"
            variant="gradient"
            action={
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onNavigate('orders')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View All
              </Button>
            }
          >
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                      <Package className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {order.id}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {order.agentName} • {order.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="font-bold text-success-600 dark:text-success-400">
                        ${order.value.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(order.lastUpdate).toLocaleDateString()}
                      </div>
                    </div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Performance Overview */}
          <Card title="Performance Overview" subtitle="Key business metrics" variant="gradient">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-16 h-16 bg-success-100 dark:bg-success-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-success-600 dark:text-success-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {activeAgents}/{totalAgents}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Active Agents</div>
              </div>
              
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {ordersInTransit}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Orders in Transit</div>
              </div>
              
              <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="w-16 h-16 bg-warning-100 dark:bg-warning-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-warning-600 dark:text-warning-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  ${pendingPayouts.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Pending Payouts</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Top Agents */}
          <Card 
            title="Top Performers" 
            subtitle="Highest XP agents"
            variant="gradient"
            action={
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onNavigate('agents')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View All
              </Button>
            }
          >
            <div className="space-y-4">
              {topAgents.map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                    index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                    index === 2 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                    'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
                  }`}>
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {agent.name}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {agent.country} • {agent.xp.toLocaleString()} XP
                    </div>
                  </div>
                  {getStatusBadge(agent.status)}
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Support Tickets */}
          <Card 
            title="Recent Tickets" 
            subtitle="Latest customer feedback"
            variant="gradient"
            action={
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onNavigate('feedback')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                View All
              </Button>
            }
          >
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-mono text-xs font-semibold text-gray-900 dark:text-white">
                      {ticket.id}
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {ticket.issueCategory}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {ticket.assignedAgent}
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < ticket.satisfaction 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* System Status */}
          <Card title="System Status" variant="gradient">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-success-50 dark:bg-success-900/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Airtable</span>
                </div>
                <Badge variant="success" size="sm">Connected</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-success-50 dark:bg-success-900/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Dashboard</span>
                </div>
                <Badge variant="success" size="sm">Online</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-success-50 dark:bg-success-900/20">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
                  <span className="font-medium text-gray-900 dark:text-white">Data Sync</span>
                </div>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Module Navigation */}
      <Card title="Explore Modules" subtitle="Navigate to different sections of the dashboard" variant="gradient">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => onNavigate('agents')}
            className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group text-left"
          >
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Agent Network</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Manage your global agent network, track performance, and handle recruitment.
            </p>
            <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
              <span>Manage Agents</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group text-left"
          >
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Pipeline</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Track orders through the entire supply chain with real-time status updates.
            </p>
            <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
              <span>Track Orders</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('financials')}
            className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 group text-left"
          >
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Financial Management</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Manage commissions, track margins, and analyze financial performance.
            </p>
            <div className="flex items-center text-sm text-primary-600 dark:text-primary-400 group-hover:translate-x-1 transition-transform">
              <span>View Financials</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
}