import React, { useState } from 'react';
import { mockSuppliers } from '../../data/mockData';
import { Supplier } from '../../types';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { MetricCard } from '../UI/MetricCard';
import { Button } from '../UI/Button';
import { Building2, TrendingUp, AlertCircle, CheckCircle, Search, Plus, Star, MapPin, Package, Clock, DollarSign } from 'lucide-react';

export function SuppliersView() {
  const [countryFilter, setCountryFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSuppliers = mockSuppliers.filter(supplier => {
    const matchesCountry = countryFilter === '' || supplier.country === countryFilter;
    const matchesSearch = searchTerm === '' || 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCountry && matchesSearch;
  });

  const countries = [...new Set(mockSuppliers.map(supplier => supplier.country))];

  const getMarginBadge = (category: Supplier['marginCategory']) => {
    switch (category) {
      case 'High':
        return <Badge variant="success" icon={<TrendingUp className="w-3 h-3" />}>{category} Margin</Badge>;
      case 'Medium':
        return <Badge variant="warning" icon={<TrendingUp className="w-3 h-3" />}>{category} Margin</Badge>;
      case 'Low':
        return <Badge variant="error" icon={<TrendingUp className="w-3 h-3" />}>{category} Margin</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  const getTrustScoreColor = (score: number) => {
    if (score >= 90) return 'text-success-600 dark:text-success-400';
    if (score >= 80) return 'text-warning-600 dark:text-warning-400';
    return 'text-error-600 dark:text-error-400';
  };

  const getTrustScoreBg = (score: number) => {
    if (score >= 90) return 'bg-success-100 dark:bg-success-900/20';
    if (score >= 80) return 'bg-warning-100 dark:bg-warning-900/20';
    return 'bg-error-100 dark:bg-error-900/20';
  };

  const stockAlerts = [
    { supplier: 'Shanghai Trading Co.', product: 'Wireless Headphones', stock: 5, critical: true },
    { supplier: 'Istanbul Exports Ltd.', product: 'Cotton Fabric', stock: 2, critical: true },
    { supplier: 'Guangzhou Electronics', product: 'Smartphone Cases', stock: 8, critical: false },
    { supplier: 'Shenzhen Tech Hub', product: 'USB Cables', stock: 3, critical: true },
  ];

  const avgTrustScore = Math.round(mockSuppliers.reduce((sum, s) => sum + s.trustScore, 0) / mockSuppliers.length);
  const highMarginCount = mockSuppliers.filter(s => s.marginCategory === 'High').length;
  const onTimeAvg = Math.round(mockSuppliers.reduce((sum, s) => sum + s.onTimePercentage, 0) / mockSuppliers.length);
  const avgDefectRate = (mockSuppliers.reduce((sum, s) => sum + s.defectRate, 0) / mockSuppliers.length).toFixed(1);

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Supplier Network
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage supplier relationships and performance metrics
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Countries</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            Add Supplier
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Suppliers"
          value={mockSuppliers.length}
          change={{ value: 8, type: 'increase', period: 'last quarter' }}
          icon={<Building2 className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Avg Trust Score"
          value={avgTrustScore}
          change={{ value: 3, type: 'increase', period: 'last month' }}
          icon={<CheckCircle className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="High Margin"
          value={`${highMarginCount}/${mockSuppliers.length}`}
          change={{ value: 12, type: 'increase', period: 'last quarter' }}
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
        />
        <MetricCard
          title="On-time Delivery"
          value={`${onTimeAvg}%`}
          change={{ value: 2, type: 'increase', period: 'last month' }}
          icon={<Clock className="w-6 h-6" />}
          color="indigo"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Suppliers Table */}
        <div className="xl:col-span-3">
          <Card 
            title="Supplier Directory" 
            subtitle={`${filteredSuppliers.length} suppliers found`}
            variant="gradient"
          >
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Products</th>
                    <th>Performance</th>
                    <th>Quality</th>
                    <th>Pricing</th>
                    <th>Trust Score</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier.id}>
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{supplier.name}</div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                              <MapPin className="w-3 h-3" />
                              {supplier.country}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Package className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900 dark:text-white">
                            {supplier.totalProducts}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">products</span>
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {supplier.onTimePercentage}%
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">on-time</span>
                          </div>
                          <div className="w-20 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 transition-all duration-500"
                              style={{ width: `${supplier.onTimePercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className={`text-sm font-medium ${
                            supplier.defectRate < 2 ? 'text-success-600 dark:text-success-400' :
                            supplier.defectRate < 4 ? 'text-warning-600 dark:text-warning-400' :
                            'text-error-600 dark:text-error-400'
                          }`}>
                            {supplier.defectRate}%
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">defects</span>
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                            <DollarSign className="w-3 h-3" />
                            {supplier.avgPrice}
                          </div>
                          {getMarginBadge(supplier.marginCategory)}
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className={`
                            w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm
                            ${getTrustScoreBg(supplier.trustScore)}
                          `}>
                            <span className={getTrustScoreColor(supplier.trustScore)}>
                              {supplier.trustScore}
                            </span>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < Math.floor(supplier.trustScore / 20) 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Stock Alerts */}
          <Card title="Stock Alerts" subtitle="Low inventory warnings" variant="gradient">
            <div className="space-y-3">
              {stockAlerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-xl border transition-all duration-200 hover:shadow-soft ${
                    alert.critical 
                      ? 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800' 
                      : 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                        {alert.product}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                        {alert.supplier}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={alert.critical ? "error" : "warning"} 
                        size="sm"
                        icon={<AlertCircle className="w-3 h-3" />}
                      >
                        {alert.stock} left
                      </Badge>
                    </div>
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

          {/* Trust Index Summary */}
          <Card title="Trust Index" subtitle="Overall supplier reliability" variant="gradient">
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-white">{avgTrustScore}</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Overall Trust Score</div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">On-time Delivery</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">{onTimeAvg}%</span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-success-100 dark:bg-success-800 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success-600 dark:text-success-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Quality Score</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {(100 - parseFloat(avgDefectRate)).toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-800 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">High Margin</span>
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {highMarginCount}/{mockSuppliers.length}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Price vs Margin Analysis */}
          <Card title="Margin Analysis" subtitle="Price vs profit margins" variant="gradient">
            <div className="space-y-3">
              {filteredSuppliers.slice(0, 4).map((supplier) => (
                <div key={supplier.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900 dark:text-white text-sm truncate">
                      {supplier.name}
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      supplier.marginCategory === 'High' ? 'bg-success-500' : 
                      supplier.marginCategory === 'Medium' ? 'bg-warning-500' : 'bg-error-500'
                    }`} />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Avg Price: ${supplier.avgPrice}</span>
                    <span>Margin: {supplier.margin}%</span>
                  </div>
                  <div className="mt-2 w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        supplier.marginCategory === 'High' ? 'bg-success-500' : 
                        supplier.marginCategory === 'Medium' ? 'bg-warning-500' : 'bg-error-500'
                      }`}
                      style={{ width: `${Math.min(supplier.margin * 2, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}