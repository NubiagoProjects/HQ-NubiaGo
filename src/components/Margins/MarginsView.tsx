import React, { useState } from 'react';
import { mockProducts, mockOrders, mockSuppliers, mockAgents } from '../../data/mockData';
import { Product } from '../../types';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { MetricCard } from '../UI/MetricCard';
import { LoadingSpinner } from '../UI/LoadingSpinner';
import { useLoading } from '../../contexts/LoadingContext';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Percent, 
  AlertTriangle, 
  Search, 
  Filter,
  Download,
  Package,
  Target,
  BarChart3,
  Zap,
  ShoppingCart,
  Users,
  Building2,
  Activity,
  Eye,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

export function MarginsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [marginFilter, setMarginFilter] = useState('');
  const { isLoading, setLoading } = useLoading();

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
    const matchesMargin = marginFilter === '' || 
      (marginFilter === 'high' && product.marginPercentage >= 50) ||
      (marginFilter === 'medium' && product.marginPercentage >= 30 && product.marginPercentage < 50) ||
      (marginFilter === 'low' && product.marginPercentage < 30);
    
    return matchesSearch && matchesCategory && matchesMargin;
  });

  const categories = [...new Set(mockProducts.map(product => product.category))];
  
  // Calculate comprehensive metrics
  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.value, 0);
  const totalCOGS = mockOrders.reduce((sum, order) => sum + order.costOfGoods, 0);
  const totalMargin = totalRevenue - totalCOGS;
  const avgMarginPercentage = ((totalMargin / totalRevenue) * 100).toFixed(1);
  
  const totalProducts = mockProducts.length;
  const totalOrders = mockOrders.length;
  const totalAgents = mockAgents.length;
  const totalSuppliers = mockSuppliers.length;
  
  const lowMarginProducts = mockProducts.filter(p => p.marginPercentage < 30);
  const highMarginProducts = mockProducts.filter(p => p.marginPercentage >= 50);
  
  const totalStock = mockProducts.reduce((sum, product) => sum + product.stock, 0);
  const totalMonthlySales = mockProducts.reduce((sum, product) => sum + product.monthlySales, 0);
  
  // Calculate growth metrics (simulated)
  const revenueGrowth = 18.5;
  const profitGrowth = 22.3;
  const orderGrowth = 15.2;
  const agentGrowth = 12.4;
  const marginGrowth = 12.8;

  const getMarginBadge = (marginPercentage: number) => {
    if (marginPercentage >= 50) {
      return <Badge variant="success" icon={<TrendingUp className="w-3 h-3" />}>High</Badge>;
    } else if (marginPercentage >= 30) {
      return <Badge variant="warning" icon={<Target className="w-3 h-3" />}>Medium</Badge>;
    } else {
      return <Badge variant="error" icon={<TrendingDown className="w-3 h-3" />}>Low</Badge>;
    }
  };

  const exportData = async () => {
    setLoading(true);
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const csvContent = [
      ['Product', 'Category', 'Cost of Goods', 'Sale Price', 'Margin', 'Margin %', 'Supplier', 'Stock'],
      ...filteredProducts.map(product => [
        product.name,
        product.category,
        product.costOfGoods,
        product.salePrice,
        product.margin,
        product.marginPercentage + '%',
        product.supplier,
        product.stock
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'margins-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    setLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Business Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Complete overview of margins, orders, agents, and business performance
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" icon={<Eye className="w-5 h-5" />} size="lg">
            View Reports
          </Button>
          <Button variant="primary" icon={<Download className="w-5 h-5" />} size="lg" onClick={exportData}>
            Export Data
          </Button>
        </div>
      </div>

      {/* Primary Dashboard Metrics - Ordered: Margins, Orders, Agents, Others */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. MARGINS - First Priority */}
        <div className="bg-gradient-to-br from-success-500 to-success-600 rounded-2xl p-6 text-white shadow-large hover:shadow-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Percent className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-1 text-success-100">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-semibold">+{marginGrowth}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-success-100 text-sm font-medium">Average Margin</p>
            <p className="text-3xl font-bold">{avgMarginPercentage}%</p>
            <p className="text-success-200 text-xs">profit margin</p>
          </div>
        </div>

        {/* 2. ORDERS - Second Priority */}
        <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white shadow-large hover:shadow-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-1 text-primary-100">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-semibold">+{orderGrowth}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-primary-100 text-sm font-medium">Total Orders</p>
            <p className="text-3xl font-bold">{totalOrders}</p>
            <p className="text-primary-200 text-xs">active orders</p>
          </div>
        </div>

        {/* 3. AGENTS - Third Priority */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-large hover:shadow-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Users className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-1 text-purple-100">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-semibold">+{agentGrowth}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-purple-100 text-sm font-medium">Active Agents</p>
            <p className="text-3xl font-bold">{totalAgents}</p>
            <p className="text-purple-200 text-xs">network agents</p>
          </div>
        </div>

        {/* 4. OTHERS - Fourth Priority (Total Sales) */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-6 text-white shadow-large hover:shadow-glow transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <DollarSign className="w-8 h-8" />
            </div>
            <div className="flex items-center gap-1 text-indigo-100">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-semibold">+{revenueGrowth}%</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-indigo-100 text-sm font-medium">Total Sales</p>
            <p className="text-3xl font-bold">${totalRevenue.toLocaleString()}</p>
            <p className="text-indigo-200 text-xs">total revenue</p>
          </div>
        </div>
      </div>

      {/* Secondary Business Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Profits"
          value={`$${totalMargin.toLocaleString()}`}
          change={{ value: 22, type: 'increase', period: 'last month' }}
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Total Products"
          value={totalProducts}
          change={{ value: 8, type: 'increase', period: 'last quarter' }}
          icon={<Package className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="High Margin Products"
          value={`${highMarginProducts.length}/${totalProducts}`}
          change={{ value: 15, type: 'increase', period: 'last month' }}
          icon={<Target className="w-6 h-6" />}
          color="purple"
        />
        <MetricCard
          title="Low Margin Alerts"
          value={lowMarginProducts.length}
          change={{ value: 20, type: 'decrease', period: 'last month' }}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="yellow"
        />
      </div>

      {/* Margin Performance Overview */}
      <Card title="Margin Performance Overview" subtitle="Key profitability indicators at a glance" variant="gradient">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Percent className="w-6 h-6 text-success-600 dark:text-success-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {avgMarginPercentage}%
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Average Margin</div>
          </div>

          <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Activity className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              ${((totalRevenue / totalOrders) || 0).toFixed(0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Avg Order Value</div>
          </div>

          <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="w-12 h-12 bg-warning-100 dark:bg-warning-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Package className="w-6 h-6 text-warning-600 dark:text-warning-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {(totalStock / totalProducts).toFixed(0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Avg Stock/Product</div>
          </div>

          <div className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {(totalMonthlySales / totalProducts).toFixed(0)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Sales/Product/Month</div>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Margin Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed breakdown of product profitability and performance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full sm:w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
          
          <div className="flex gap-3">
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
            
            <select
              value={marginFilter}
              onChange={(e) => setMarginFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            >
              <option value="">All Margins</option>
              <option value="high">High (50%+)</option>
              <option value="medium">Medium (30-50%)</option>
              <option value="low">{"Low (<30%)"}</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Product Margins Table */}
        <div className="xl:col-span-3">
          <Card title="Product Margin Analysis" subtitle={`${filteredProducts.length} products analyzed`} variant="gradient">
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Cost vs Price</th>
                    <th>Margin</th>
                    <th>Performance</th>
                    <th>Supplier</th>
                    <th>Stock Status</th>
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
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              ID: {product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <Badge variant="info" size="sm">{product.category}</Badge>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Cost:</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                              ${product.costOfGoods}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Price:</span>
                            <span className="font-medium text-success-600 dark:text-success-400">
                              ${product.salePrice}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-gray-900 dark:text-white">
                              ${product.margin}
                            </span>
                            <span className={`text-sm font-semibold ${
                              product.marginPercentage >= 50 ? 'text-success-600 dark:text-success-400' :
                              product.marginPercentage >= 30 ? 'text-warning-600 dark:text-warning-400' :
                              'text-error-600 dark:text-error-400'
                            }`}>
                              ({product.marginPercentage}%)
                            </span>
                          </div>
                          {getMarginBadge(product.marginPercentage)}
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.monthlySales} sales/month
                          </div>
                          <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 transition-all duration-500"
                              style={{ width: `${Math.min((product.monthlySales / 200) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="text-sm text-gray-900 dark:text-white">{product.supplier}</div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            product.stock > 50 ? 'bg-success-500' :
                            product.stock > 20 ? 'bg-warning-500' :
                            'bg-error-500'
                          }`} />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.stock}
                          </span>
                          {product.stock < 20 && (
                            <AlertTriangle className="w-4 h-4 text-error-500" />
                          )}
                        </div>
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
          {/* Low Margin Alerts */}
          <Card title="Low Margin Alerts" subtitle="Products requiring attention" variant="gradient">
            <div className="space-y-3">
              {lowMarginProducts.slice(0, 5).map((product) => (
                <div 
                  key={product.id} 
                  className="p-3 rounded-xl border border-error-200 dark:border-error-800 bg-error-50 dark:bg-error-900/20 hover:bg-error-100 dark:hover:bg-error-900/30 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {product.name}
                    </div>
                    <Badge variant="error" size="sm">
                      {product.marginPercentage}%
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Cost: ${product.costOfGoods}</span>
                    <span>Price: ${product.salePrice}</span>
                  </div>
                  <div className="mt-2">
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Optimize Pricing
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" size="sm" className="w-full">
                View All Alerts
              </Button>
            </div>
          </Card>

          {/* Supplier Margin Comparison */}
          <Card title="Supplier Margins" subtitle="Average margins by supplier" variant="gradient">
            <div className="space-y-4">
              {mockSuppliers.map((supplier) => (
                <div key={supplier.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {supplier.name}
                    </div>
                    <div className={`text-sm font-bold ${
                      supplier.margin >= 35 ? 'text-success-600 dark:text-success-400' :
                      supplier.margin >= 25 ? 'text-warning-600 dark:text-warning-400' :
                      'text-error-600 dark:text-error-400'
                    }`}>
                      {supplier.margin}%
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>{supplier.country}</span>
                    <span>{supplier.totalProducts} products</span>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        supplier.margin >= 35 ? 'bg-success-500' :
                        supplier.margin >= 25 ? 'bg-warning-500' :
                        'bg-error-500'
                      }`}
                      style={{ width: `${Math.min(supplier.margin * 2, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Margin Trends */}
          <Card title="Margin Trends" subtitle="Performance over time" variant="gradient">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-3">
                  <Percent className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Margin Trend Analysis</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">This Month</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{avgMarginPercentage}%</span>
                    <TrendingUp className="w-4 h-4 text-success-500" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Last Month</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {(parseFloat(avgMarginPercentage) - 3.2).toFixed(1)}%
                    </span>
                    <TrendingDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Quarter Avg</span>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {(parseFloat(avgMarginPercentage) - 1.8).toFixed(1)}%
                    </span>
                    <Zap className="w-4 h-4 text-primary-500" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}