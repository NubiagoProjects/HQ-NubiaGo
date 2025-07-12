import React, { useState } from 'react';
import { mockFeedbackTickets, responseTemplates } from '../../data/mockData';
import { FeedbackTicket } from '../../types';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { Button } from '../UI/Button';
import { MetricCard } from '../UI/MetricCard';
import { MessageSquare, Clock, Star, Copy, Search, Filter, Plus, User, Calendar, TrendingUp, CheckCircle } from 'lucide-react';

export function FeedbackView() {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedTemplate, setCopiedTemplate] = useState<string | null>(null);

  const filteredTickets = mockFeedbackTickets.filter(ticket => {
    const matchesCategory = categoryFilter === '' || ticket.issueCategory === categoryFilter;
    const matchesStatus = statusFilter === '' || ticket.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.assignedAgent.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const categories = [...new Set(mockFeedbackTickets.map(ticket => ticket.issueCategory))];
  const statuses = [...new Set(mockFeedbackTickets.map(ticket => ticket.status))];

  const getStatusBadge = (status: FeedbackTicket['status']) => {
    switch (status) {
      case 'Open':
        return <Badge variant="error" icon={<div className="w-2 h-2 bg-current rounded-full animate-pulse" />}>Open</Badge>;
      case 'In Progress':
        return <Badge variant="warning" icon={<div className="w-2 h-2 bg-current rounded-full" />}>In Progress</Badge>;
      case 'Resolved':
        return <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Resolved</Badge>;
      case 'Closed':
        return <Badge variant="default" icon={<div className="w-2 h-2 bg-current rounded-full" />}>Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Late Delivery': 'bg-error-100 text-error-800 border-error-200 dark:bg-error-900/20 dark:text-error-400 dark:border-error-800',
      'Damaged Product': 'bg-warning-100 text-warning-800 border-warning-200 dark:bg-warning-900/20 dark:text-warning-400 dark:border-warning-800',
      'Wrong Item': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400 dark:border-yellow-800',
      'Payment Issue': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800',
      'Communication': 'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
      />
    ));
  };

  const issueStats = categories.reduce((acc, category) => {
    acc[category] = mockFeedbackTickets.filter(t => t.issueCategory === category).length;
    return acc;
  }, {} as Record<string, number>);

  const avgResolutionTime = Math.round(
    mockFeedbackTickets.reduce((sum, ticket) => sum + ticket.resolutionTime, 0) / mockFeedbackTickets.length
  );

  const avgSatisfaction = (
    mockFeedbackTickets.reduce((sum, ticket) => sum + ticket.satisfaction, 0) / mockFeedbackTickets.length
  ).toFixed(1);

  const resolvedTickets = mockFeedbackTickets.filter(t => t.status === 'Resolved').length;

  const copyTemplate = async (template: string) => {
    try {
      await navigator.clipboard.writeText(template);
      setCopiedTemplate(template);
      setTimeout(() => setCopiedTemplate(null), 2000);
    } catch (err) {
      console.error('Failed to copy template:', err);
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Customer Feedback
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage customer support tickets and satisfaction
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            New Ticket
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Tickets"
          value={mockFeedbackTickets.length}
          change={{ value: 12, type: 'increase', period: 'last week' }}
          icon={<MessageSquare className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Avg Resolution"
          value={`${avgResolutionTime}h`}
          change={{ value: 8, type: 'decrease', period: 'last month' }}
          icon={<Clock className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Satisfaction"
          value={`${avgSatisfaction}/5`}
          change={{ value: 5, type: 'increase', period: 'last month' }}
          icon={<Star className="w-6 h-6" />}
          color="yellow"
        />
        <MetricCard
          title="Resolved"
          value={`${resolvedTickets}/${mockFeedbackTickets.length}`}
          change={{ value: 15, type: 'increase', period: 'last week' }}
          icon={<CheckCircle className="w-6 h-6" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Tickets Table */}
        <div className="xl:col-span-3">
          <Card 
            title="Support Tickets" 
            subtitle={`${filteredTickets.length} tickets found`}
            variant="gradient"
          >
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Ticket</th>
                    <th>Category</th>
                    <th>Customer & Agent</th>
                    <th>Status</th>
                    <th>Resolution</th>
                    <th>Satisfaction</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>
                        <div className="font-mono text-sm font-semibold text-gray-900 dark:text-white">
                          {ticket.id}
                        </div>
                      </td>
                      <td>
                        <Badge 
                          variant="default" 
                          className={`border ${getCategoryColor(ticket.issueCategory)}`}
                          size="sm"
                        >
                          {ticket.issueCategory}
                        </Badge>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-3 h-3 text-gray-400" />
                            <span className="font-medium text-gray-900 dark:text-white">
                              {ticket.submittedBy}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Agent: {ticket.assignedAgent}
                          </div>
                        </div>
                      </td>
                      <td>{getStatusBadge(ticket.status)}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {ticket.resolutionTime}h
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          {renderStars(ticket.satisfaction)}
                          <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                            {ticket.satisfaction}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {new Date(ticket.createdAt).toLocaleDateString()}
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
          {/* Issues by Category */}
          <Card title="Issue Categories" subtitle="Distribution of support issues" variant="gradient">
            <div className="space-y-4">
              {Object.entries(issueStats).map(([category, count]) => {
                const percentage = Math.round((count / mockFeedbackTickets.length) * 100);
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
                        {category}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                          {count}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ({percentage}%)
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Response Templates */}
          <Card title="Quick Responses" subtitle="Pre-written response templates" variant="gradient">
            <div className="space-y-3">
              {responseTemplates.map((template) => (
                <div key={template.id} className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                      {template.category}
                    </h4>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyTemplate(template.template)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5"
                      icon={<Copy className="w-3 h-3" />}
                    />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {template.template}
                  </p>
                  {copiedTemplate === template.template && (
                    <div className="text-xs text-success-600 dark:text-success-400 mt-2 font-medium">
                      ✓ Copied to clipboard!
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button variant="outline" size="sm" className="w-full">
                Manage Templates
              </Button>
            </div>
          </Card>

          {/* Performance Summary */}
          <Card title="Performance Summary" variant="gradient">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Overall Performance</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Resolution Rate</span>
                  <span className="font-semibold text-success-600 dark:text-success-400">
                    {Math.round((resolvedTickets / mockFeedbackTickets.length) * 100)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Avg Response Time</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {Math.round(avgResolutionTime / 2)}h
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">Customer Satisfaction</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900 dark:text-white">{avgSatisfaction}</span>
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