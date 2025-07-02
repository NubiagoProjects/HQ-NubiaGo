import React, { useState } from 'react';
import { mockOrders } from '../../data/mockData';
import { Order } from '../../types';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { MetricCard } from '../UI/MetricCard';
import { Package, Clock, Truck, CheckCircle, AlertTriangle, Search, Plus, MapPin, User, DollarSign, TrendingUp } from 'lucide-react';

export function OrdersView() {
  const [countryFilter, setCountryFilter] = useState('');
  const [agentFilter, setAgentFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState(mockOrders);

  const filteredOrders = orders.filter(order => {
    const matchesCountry = countryFilter === '' || order.country === countryFilter;
    const matchesAgent = agentFilter === '' || order.agentName === agentFilter;
    const matchesSearch = searchTerm === '' || 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.agentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCountry && matchesAgent && matchesSearch;
  });

  const countries = [...new Set(orders.map(order => order.country))];
  const agents = [...new Set(orders.map(order => order.agentName))];

  const ordersByStatus = {
    'Pending': filteredOrders.filter(o => o.status === 'Pending'),
    'Assigned to Supplier': filteredOrders.filter(o => o.status === 'Assigned to Supplier'),
    'In Transit': filteredOrders.filter(o => o.status === 'In Transit'),
    'Delivered': filteredOrders.filter(o => o.status === 'Delivered'),
    'Delayed': filteredOrders.filter(o => o.status === 'Delayed'),
  };

  const totalValue = filteredOrders.reduce((sum, order) => sum + order.value, 0);
  const avgOrderValue = totalValue / filteredOrders.length || 0;

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Assigned to Supplier':
        return <Package className="h-4 w-4" />;
      case 'In Transit':
        return <Truck className="h-4 w-4" />;
      case 'Delivered':
        return <CheckCircle className="h-4 w-4" />;
      case 'Delayed':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return <Badge variant="warning" icon={getStatusIcon(status)}>{status}</Badge>;
      case 'Assigned to Supplier':
        return <Badge variant="info" icon={getStatusIcon(status)}>Assigned</Badge>;
      case 'In Transit':
        return <Badge variant="primary" icon={getStatusIcon(status)}>In Transit</Badge>;
      case 'Delivered':
        return <Badge variant="success" icon={getStatusIcon(status)}>{status}</Badge>;
      case 'Delayed':
        return <Badge variant="error" icon={getStatusIcon(status)}>{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'Pending':
        return 'border-warning-200 bg-warning-50 dark:border-warning-800 dark:bg-warning-900/10';
      case 'Assigned to Supplier':
        return 'border-primary-200 bg-primary-50 dark:border-primary-800 dark:bg-primary-900/10';
      case 'In Transit':
        return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/10';
      case 'Delivered':
        return 'border-success-200 bg-success-50 dark:border-success-800 dark:bg-success-900/10';
      case 'Delayed':
        return 'border-error-200 bg-error-50 dark:border-error-800 dark:bg-error-900/10';
      default:
        return 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800';
    }
  };

  const assignCarrier = (orderId: string) => {
    const carriers = ['DHL Express', 'FedEx', 'UPS', 'Aramex'];
    const randomCarrier = carriers[Math.floor(Math.random() * carriers.length)];
    
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, assignedCarrier: randomCarrier, status: 'In Transit' as Order['status'] }
        : order
    ));
  };

  const updateDelayReason = (orderId: string, reason: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, delayReason: reason }
        : order
    ));
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Order Management
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Track and manage orders across the supply chain
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3 w-full sm:w-72 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            
            <select
              value={agentFilter}
              onChange={(e) => setAgentFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 shadow-sm"
            >
              <option value="">All Agents</option>
              {agents.map(agent => (
                <option key={agent} value={agent}>{agent}</option>
              ))}
            </select>
          </div>
          
          <Button variant="primary" icon={<Plus className="w-5 h-5" />} size="lg">
            New Order
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Orders"
          value={filteredOrders.length}
          change={{ value: 15, type: 'increase', period: 'last week' }}
          icon={<Package className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="In Transit"
          value={ordersByStatus['In Transit'].length}
          change={{ value: 8, type: 'increase', period: 'yesterday' }}
          icon={<Truck className="w-6 h-6" />}
          color="purple"
        />
        <MetricCard
          title="Total Value"
          value={`$${totalValue.toLocaleString()}`}
          change={{ value: 22, type: 'increase', period: 'last month' }}
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${Math.round(avgOrderValue).toLocaleString()}`}
          change={{ value: 5, type: 'increase', period: 'last month' }}
          icon={<TrendingUp className="w-6 h-6" />}
          color="indigo"
        />
      </div>

      {/* Kanban Board */}
      <Card title="Order Pipeline" subtitle="Manage orders through their lifecycle" variant="gradient">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {Object.entries(ordersByStatus).map(([status, statusOrders]) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white dark:bg-gray-700 shadow-sm">
                    {getStatusIcon(status as Order['status'])}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                    {status}
                  </h3>
                </div>
                <Badge variant="default" size="sm">{statusOrders.length}</Badge>
              </div>
              
              <div className="space-y-4 min-h-[500px]">
                {statusOrders.map((order) => (
                  <div 
                    key={order.id} 
                    className={`p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${getStatusColor(order.status)}`}
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                          {order.id}
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Package className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-gray-900 dark:text-white truncate">
                            {order.product}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <User className="w-4 h-4" />
                          <span className="truncate">{order.agentName}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{order.country}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm font-bold text-success-600 dark:text-success-400">
                            <DollarSign className="w-4 h-4" />
                            {order.value.toLocaleString()}
                          </div>
                          {order.assignedCarrier && (
                            <Badge variant="info" size="sm">{order.assignedCarrier}</Badge>
                          )}
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-3">
                        Updated: {new Date(order.lastUpdate).toLocaleDateString()}
                      </div>

                      {order.status === 'Delayed' && (
                        <div className="mt-3">
                          <textarea
                            placeholder="Delay reason..."
                            value={order.delayReason || ''}
                            onChange={(e) => updateDelayReason(order.id, e.target.value)}
                            className="w-full text-xs p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            rows={2}
                          />
                        </div>
                      )}

                      {order.status === 'Pending' && (
                        <Button 
                          size="sm" 
                          variant="primary"
                          className="w-full mt-3"
                          onClick={() => assignCarrier(order.id)}
                          icon={<Truck className="w-4 h-4" />}
                        >
                          Assign Carrier
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Orders Table */}
      <Card title="Order History" subtitle="Complete order details and tracking" variant="gradient">
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order Details</th>
                <th>Agent & Location</th>
                <th>Product</th>
                <th>Status</th>
                <th>Value</th>
                <th>Carrier</th>
                <th>Last Update</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <div className="font-mono text-sm font-bold text-gray-900 dark:text-white">
                      {order.id}
                    </div>
                  </td>
                  <td>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-900 dark:text-white">{order.agentName}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {order.country}
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="font-medium text-gray-900 dark:text-white">{order.product}</div>
                  </td>
                  <td>{getStatusBadge(order.status)}</td>
                  <td>
                    <div className="font-bold text-success-600 dark:text-success-400">
                      ${order.value.toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div className="text-gray-900 dark:text-gray-300">
                      {order.assignedCarrier || (
                        <span className="text-gray-400 italic">Not assigned</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="text-gray-600 dark:text-gray-400">
                      {new Date(order.lastUpdate).toLocaleDateString()}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}