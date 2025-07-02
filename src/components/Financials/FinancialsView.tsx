import React, { useState } from 'react';
import { mockAgents, mockCommissions, mockCampaigns, mockProducts, salesData } from '../../data/mockData';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { MetricCard } from '../UI/MetricCard';
import { DollarSign, TrendingUp, Clock, Award, Calculator, Users, Search, Filter, Plus, CreditCard, Target, Zap, Package, BarChart3, Percent, AlertCircle, Calendar, Globe, ShoppingCart } from 'lucide-react';

export function FinancialsView() {
  const [activeSection, setActiveSection] = useState<'commissions' | 'margins' | 'sales'>('commissions');
  const [salesPeriod, setSalesPeriod] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [orderValue, setOrderValue] = useState('');
  const [commissionRate, setCommissionRate] = useState('');

  // Commission data
  const filteredCommissions = mockCommissions.filter(commission => {
    const matchesSearch = searchTerm === '' || 
      commission.agentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commission.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === '' || commission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Margin data
  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  const categories = [...new Set(mockProducts.map(product => product.category))];

  // Commission calculations
  const totalCommissions = mockCommissions.reduce((sum, c) => sum + c.commissionAmount, 0);
  const pendingPayouts = mockCommissions.filter(c => c.status === 'Pending').reduce((sum, c) => sum + c.commissionAmount, 0);
  const monthlyCommissions = mockCommissions.filter(c => {
    const commissionDate = new Date(c.date);
    const currentMonth = new Date().getMonth();
    return commissionDate.getMonth() === currentMonth;
  }).reduce((sum, c) => sum + c.commissionAmount, 0);

  // Margin calculations
  const totalRevenue = filteredProducts.reduce((sum, p) => sum + (p.salePrice * p.monthlySales), 0);
  const totalCosts = filteredProducts.reduce((sum, p) => sum + (p.costOfGoods * p.monthlySales), 0);
  const totalMargin = totalRevenue - totalCosts;
  const avgMarginPercentage = totalRevenue > 0 ? (totalMargin / totalRevenue) * 100 : 0;

  // Sales calculations
  const currentSalesData = salesData[salesPeriod];
  const currentPeriodSales = salesPeriod === 'weekly' 
    ? currentSalesData.reduce((sum: number, item: any) => sum + item.sales, 0)
    : salesPeriod === 'monthly' 
    ? currentSalesData[0]?.sales || 0
    : currentSalesData[0]?.sales || 0;

  const currentPeriodOrders = salesPeriod === 'weekly' 
    ? currentSalesData.reduce((sum: number, item: any) => sum + item.orders, 0)
    : salesPeriod === 'monthly' 
    ? currentSalesData[0]?.orders || 0
    : currentSalesData[0]?.orders || 0;

  const avgOrderValue = salesPeriod === 'weekly' 
    ? currentPeriodSales / currentPeriodOrders
    : currentSalesData[0]?.avgOrderValue || 0;

  const salesGrowth = salesPeriod === 'monthly' && currentSalesData[0]?.growth || 
                     salesPeriod === 'yearly' && currentSalesData[0]?.growth || 
                     12.5; // Default for weekly

  const topEarners = [...mockAgents]
    .sort((a, b) => b.monthlyEarned - a.monthlyEarned)
    .slice(0, 5);

  const highMarginProducts = filteredProducts.filter(p => p.marginPercentage > 50).length;
  const lowStockProducts = filteredProducts.filter(p => p.stock < 20).length;

  const calculateCommission = () => {
    if (!orderValue || !commissionRate) return 0;
    return (parseFloat(orderValue) * parseFloat(commissionRate)) / 100;
  };

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

  const getMarginBadge = (percentage: number) => {
    if (percentage >= 50) return <Badge variant="success">High</Badge>;
    if (percentage >= 30) return <Badge variant="warning">Medium</Badge>;
    return <Badge variant="error">Low</Badge>;
  };

  const getStockBadge = (stock: number) => {
    if (stock < 10) return <Badge variant="error" icon={<AlertCircle className="w-3 h-3" />}>Critical</Badge>;
    if (stock < 20) return <Badge variant="warning" icon={<AlertCircle className="w-3 h-3" />}>Low</Badge>;
    return <Badge variant="success">Good</Badge>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Financial Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage agent commissions, product margins, and sales analytics
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          {/* Section Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
            <button
              onClick={() => setActiveSection('commissions')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === 'commissions'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Commissions
            </button>
            <button
              onClick={() => setActiveSection('margins')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === 'margins'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Margins
            </button>
            <button
              onClick={() => setActiveSection('sales')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeSection === 'sales'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Sales
            </button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                activeSection === 'commissions' ? "Search agents or orders..." : 
                activeSection === 'margins' ? "Search products..." : 
                "Search sales data..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full sm:w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
          
          {activeSection === 'commissions' ? (
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
          ) : activeSection === 'margins' ? (
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          ) : (
            <select
              value={salesPeriod}
              onChange={(e) => setSalesPeriod(e.target.value as 'weekly' | 'monthly' | 'yearly')}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          )}
          
          <Button variant="primary" icon={<Plus className="w-5 h-5" />} size="lg">
            {activeSection === 'commissions' ? 'Manual Payout' : 
             activeSection === 'margins' ? 'Add Product' : 
             'Export Report'}
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeSection === 'commissions' ? (
          <>
            <MetricCard
              title="Total Commissions"
              value={formatCurrency(totalCommissions)}
              change={{ value: 18, type: 'increase', period: 'last month' }}
              icon={<DollarSign className="w-6 h-6" />}
              color="green"
            />
            <MetricCard
              title="Monthly Earned"
              value={formatCurrency(monthlyCommissions)}
              change={{ value: 12, type: 'increase', period: 'last month' }}
              icon={<TrendingUp className="w-6 h-6" />}
              color="blue"
            />
            <MetricCard
              title="Pending Payouts"
              value={formatCurrency(pendingPayouts)}
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
          </>
        ) : activeSection === 'margins' ? (
          <>
            <MetricCard
              title="Total Revenue"
              value={formatCurrency(totalRevenue)}
              change={{ value: 15, type: 'increase', period: 'last month' }}
              icon={<DollarSign className="w-6 h-6" />}
              color="green"
            />
            <MetricCard
              title="Avg Margin"
              value={`${avgMarginPercentage.toFixed(1)}%`}
              change={{ value: 3, type: 'increase', period: 'last month' }}
              icon={<Percent className="w-6 h-6" />}
              color="blue"
            />
            <MetricCard
              title="High Margin Products"
              value={`${highMarginProducts}/${filteredProducts.length}`}
              change={{ value: 8, type: 'increase', period: 'last quarter' }}
              icon={<TrendingUp className="w-6 h-6" />}
              color="purple"
            />
            <MetricCard
              title="Low Stock Alerts"
              value={lowStockProducts}
              change={{ value: 2, type: 'decrease', period: 'last week' }}
              icon={<AlertCircle className="w-6 h-6" />}
              color="yellow"
            />
          </>
        ) : (
          <>
            <MetricCard
              title={`${salesPeriod.charAt(0).toUpperCase() + salesPeriod.slice(1)} Sales`}
              value={formatCurrency(currentPeriodSales)}
              change={{ value: salesGrowth, type: 'increase', period: `last ${salesPeriod.slice(0, -2)}` }}
              icon={<DollarSign className="w-6 h-6" />}
              color="green"
            />
            <MetricCard
              title="Total Orders"
              value={currentPeriodOrders.toLocaleString()}
              change={{ value: 8, type: 'increase', period: `last ${salesPeriod.slice(0, -2)}` }}
              icon={<ShoppingCart className="w-6 h-6" />}
              color="blue"
            />
            <MetricCard
              title="Avg Order Value"
              value={formatCurrency(avgOrderValue)}
              change={{ value: 3, type: 'increase', period: `last ${salesPeriod.slice(0, -2)}` }}
              icon={<TrendingUp className="w-6 h-6" />}
              color="purple"
            />
            <MetricCard
              title="Top Countries"
              value={salesData.topCountries.length}
              change={{ value: 2, type: 'increase', period: 'this quarter' }}
              icon={<Globe className="w-6 h-6" />}
              color="indigo"
            />
          </>
        )}
      </div>

      {activeSection === 'sales' ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sales Analytics */}
          <div className="xl:col-span-3 space-y-8">
            {/* Sales Trend Chart */}
            <Card title={`${salesPeriod.charAt(0).toUpperCase() + salesPeriod.slice(1)} Sales Performance`} subtitle="Revenue and order trends" variant="gradient">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(currentPeriodSales)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {currentPeriodOrders.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Total Orders</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {formatCurrency(avgOrderValue)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Avg Order Value</div>
                  </div>
                </div>

                {/* Sales Data Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>{salesPeriod === 'weekly' ? 'Week' : salesPeriod === 'monthly' ? 'Month' : 'Year'}</th>
                        <th>Sales</th>
                        <th>Orders</th>
                        <th>Avg Order Value</th>
                        {salesPeriod !== 'weekly' && <th>Growth</th>}
                      </tr>
                    </thead>
                    <tbody>
                      {currentSalesData.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {salesPeriod === 'weekly' ? item.week : 
                               salesPeriod === 'monthly' ? item.month : 
                               item.year}
                            </div>
                          </td>
                          <td>
                            <div className="font-bold text-success-600 dark:text-success-400">
                              {formatCurrency(item.sales)}
                            </div>
                          </td>
                          <td>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {item.orders.toLocaleString()}
                            </div>
                          </td>
                          <td>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {formatCurrency(item.avgOrderValue)}
                            </div>
                          </td>
                          {salesPeriod !== 'weekly' && (
                            <td>
                              <Badge variant="success" size="sm">
                                +{item.growth}%
                              </Badge>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>

            {/* Top Products */}
            <Card title="Top Selling Products" subtitle="Best performing products by revenue" variant="gradient">
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Units Sold</th>
                      <th>Revenue</th>
                      <th>Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salesData.topProducts.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                              index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                              index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                              index === 2 ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                              'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-400'
                            }`}>
                              #{index + 1}
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {product.product}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {product.units.toLocaleString()}
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-success-600 dark:text-success-400">
                            {formatCurrency(product.revenue)}
                          </div>
                        </td>
                        <td>
                          <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 transition-all duration-500"
                              style={{ width: `${Math.min((product.revenue / salesData.topProducts[0].revenue) * 100, 100)}%` }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Sales Sidebar */}
          <div className="space-y-6">
            {/* Top Countries */}
            <Card title="Sales by Country" subtitle="Geographic revenue breakdown" variant="gradient">
              <div className="space-y-4">
                {salesData.topCountries.map((country, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {country.country}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(country.sales)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({country.percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${country.percentage}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {country.orders} orders
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Sales Insights */}
            <Card title="Sales Insights" variant="gradient">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-3">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Performance Summary</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Growth Rate</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">
                      +{salesGrowth}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Top Market</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {salesData.topCountries[0].country}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Best Product</span>
                    <span className="font-semibold text-gray-900 dark:text-white text-xs">
                      {salesData.topProducts[0].product.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card title="Quick Actions" variant="gradient">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start" icon={<Calendar className="w-4 h-4" />}>
                  Generate Sales Report
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={<Globe className="w-4 h-4" />}>
                  Country Analysis
                </Button>
                <Button variant="outline" className="w-full justify-start" icon={<TrendingUp className="w-4 h-4" />}>
                  Forecast Trends
                </Button>
                <Button variant="primary" className="w-full justify-start" icon={<BarChart3 className="w-4 h-4" />}>
                  Export Analytics
                </Button>
              </div>
            </Card>
          </div>
        </div>
      ) : activeSection === 'commissions' ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Commission Calculator & Main Table */}
          <div className="xl:col-span-3 space-y-8">
            {/* Commission Calculator */}
            <Card title="Commission Calculator" subtitle="Calculate agent commissions for orders" variant="gradient">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Order Value ($)
                  </label>
                  <input
                    type="number"
                    value={orderValue}
                    onChange={(e) => setOrderValue(e.target.value)}
                    placeholder="Enter order value"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Commission Rate (%)
                  </label>
                  <input
                    type="number"
                    value={commissionRate}
                    onChange={(e) => setCommissionRate(e.target.value)}
                    placeholder="Enter commission rate"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Commission Amount
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white font-bold text-lg flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary-500" />
                    {formatCurrency(calculateCommission())}
                  </div>
                </div>
              </div>
            </Card>

            {/* Commissions Table */}
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
                            {formatCurrency(commission.orderValue)}
                          </div>
                        </td>
                        <td>
                          <div className="text-gray-900 dark:text-white">
                            {commission.commissionRate}%
                          </div>
                        </td>
                        <td>
                          <div className="font-bold text-success-600 dark:text-success-400">
                            {formatCurrency(commission.commissionAmount)}
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

          {/* Commission Sidebar */}
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
                        {formatCurrency(agent.monthlyEarned)}
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
                      <Badge variant={campaign.status === 'Active' ? 'success' : campaign.status === 'Completed' ? 'default' : 'info'}>
                        {campaign.status}
                      </Badge>
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
                          {formatCurrency(campaign.bonusAmount)}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">Participants:</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          {campaign.participants}
                        </span>
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
                    {formatCurrency(pendingPayouts)}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">This Week</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(Math.round(pendingPayouts * 0.3))}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Next Week</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(Math.round(pendingPayouts * 0.7))}
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
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Products Table */}
          <div className="xl:col-span-3">
            <Card 
              title="Product Margins" 
              subtitle={`${filteredProducts.length} products analyzed`}
              variant="gradient"
            >
              <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th>Cost/Sale Price</th>
                      <th>Margin</th>
                      <th>Stock</th>
                      <th>Monthly Sales</th>
                      <th>Supplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                              <Package className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900 dark:text-white">{product.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <Badge variant="info" size="sm">{product.category}</Badge>
                        </td>
                        <td>
                          <div className="space-y-1">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Cost: {formatCurrency(product.costOfGoods)}
                            </div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              Sale: {formatCurrency(product.salePrice)}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="space-y-1">
                            <div className="font-bold text-success-600 dark:text-success-400">
                              {formatCurrency(product.margin)}
                            </div>
                            <div className="flex items-center gap-2">
                              {getMarginBadge(product.marginPercentage)}
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {product.marginPercentage.toFixed(1)}%
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="space-y-1">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {product.stock}
                            </div>
                            {getStockBadge(product.stock)}
                          </div>
                        </td>
                        <td>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {product.monthlySales} units
                          </div>
                        </td>
                        <td>
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            {product.supplier}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Margin Sidebar */}
          <div className="space-y-6">
            {/* Margin Distribution */}
            <Card title="Margin Distribution" subtitle="Product profitability breakdown" variant="gradient">
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryProducts = filteredProducts.filter(p => p.category === category);
                  const avgMargin = categoryProducts.length > 0 
                    ? categoryProducts.reduce((sum, p) => sum + p.marginPercentage, 0) / categoryProducts.length 
                    : 0;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {avgMargin.toFixed(1)}%
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            ({categoryProducts.length})
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(avgMargin, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Top Performers */}
            <Card title="Top Performers" subtitle="Highest margin products" variant="gradient">
              <div className="space-y-3">
                {filteredProducts
                  .sort((a, b) => b.marginPercentage - a.marginPercentage)
                  .slice(0, 5)
                  .map((product, index) => (
                    <div key={product.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
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
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {product.category}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-success-600 dark:text-success-400 text-sm">
                          {product.marginPercentage.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {formatCurrency(product.margin)}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Insights */}
            <Card title="Financial Insights" variant="gradient">
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-3">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Performance Summary</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Avg Margin</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">
                      {avgMarginPercentage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Total Profit</span>
                    <span className="font-semibold text-success-600 dark:text-success-400">
                      {formatCurrency(totalMargin)}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Commission Paid</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(totalCommissions)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}