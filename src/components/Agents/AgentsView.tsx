import React, { useState } from 'react';
import { mockAgents, mockReferralLogs } from '../../data/mockData';
import { Agent } from '../../types';
import { Card } from '../UI/Card';
import { Badge } from '../UI/Badge';
import { MetricCard } from '../UI/MetricCard';
import { Button } from '../UI/Button';
import { Trophy, Users, UserPlus, TrendingUp, Star, Award, Target, Filter, Search, Plus } from 'lucide-react';

export function AgentsView() {
  const [countryFilter, setCountryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAgents = mockAgents.filter(agent => {
    const matchesCountry = countryFilter === '' || agent.country === countryFilter;
    const matchesStatus = statusFilter === '' || agent.status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCountry && matchesStatus && matchesSearch;
  });

  const countries = [...new Set(mockAgents.map(agent => agent.country))];
  const statuses = [...new Set(mockAgents.map(agent => agent.status))];

  const topAgents = [...mockAgents]
    .sort((a, b) => b.xp - a.xp)
    .slice(0, 5);

  const recruitmentStats = {
    applied: mockAgents.filter(a => a.status === 'Applied').length,
    interviewing: mockAgents.filter(a => a.status === 'Interviewing').length,
    active: mockAgents.filter(a => a.status === 'Active').length,
    total: mockAgents.length,
  };

  const getStatusBadge = (status: Agent['status']) => {
    switch (status) {
      case 'Active':
        return <Badge variant="success" icon={<div className="w-2 h-2 bg-current rounded-full" />}>{status}</Badge>;
      case 'Interviewing':
        return <Badge variant="warning" icon={<div className="w-2 h-2 bg-current rounded-full" />}>{status}</Badge>;
      case 'Applied':
        return <Badge variant="info" icon={<div className="w-2 h-2 bg-current rounded-full" />}>{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTrophyIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (index === 1) return <Award className="w-5 h-5 text-gray-400" />;
    if (index === 2) return <Star className="w-5 h-5 text-amber-600" />;
    return <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-400">#{index + 1}</div>;
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Agent Network
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your global agent performance
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full sm:w-64 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          
          <div className="flex gap-2">
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
            Add Agent
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Agents"
          value={recruitmentStats.total}
          change={{ value: 12, type: 'increase', period: 'last month' }}
          icon={<Users className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Active Agents"
          value={recruitmentStats.active}
          change={{ value: 8, type: 'increase', period: 'last month' }}
          icon={<TrendingUp className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="In Interview"
          value={recruitmentStats.interviewing}
          change={{ value: 3, type: 'decrease', period: 'last week' }}
          icon={<Target className="w-6 h-6" />}
          color="yellow"
        />
        <MetricCard
          title="New Applications"
          value={recruitmentStats.applied}
          change={{ value: 25, type: 'increase', period: 'last week' }}
          icon={<UserPlus className="w-6 h-6" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Agents Table */}
        <div className="xl:col-span-3">
          <Card 
            title="Agent Directory" 
            subtitle={`${filteredAgents.length} agents found`}
            variant="gradient"
          >
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Agent</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Experience</th>
                    <th>Performance</th>
                    <th>Network</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAgents.map((agent) => (
                    <tr key={agent.id} className="group">
                      <td>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-semibold text-sm">
                            {agent.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{agent.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Joined {new Date(agent.joinDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-4 bg-gray-200 dark:bg-gray-700 rounded-sm flex items-center justify-center text-xs">
                            🌍
                          </div>
                          <span className="text-gray-900 dark:text-gray-300">{agent.country}</span>
                        </div>
                      </td>
                      <td>{getStatusBadge(agent.status)}</td>
                      <td>
                        <div className="flex items-center gap-2">
                          <div className="text-lg font-bold text-primary-600 dark:text-primary-400">
                            {agent.xp.toLocaleString()}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">XP</span>
                        </div>
                      </td>
                      <td>
                        <div className="space-y-1">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-300">
                            {agent.totalOrders} orders
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {agent.recruitedClients} clients recruited
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
                            {agent.referredAgents}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">referred</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Leaderboard */}
        <div className="space-y-6">
          <Card title="Top Performers" subtitle="Ranked by experience points" variant="gradient">
            <div className="space-y-4">
              {topAgents.map((agent, index) => (
                <div key={agent.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">
                  <div className="flex-shrink-0">
                    {getTrophyIcon(index)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                      {agent.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{agent.xp.toLocaleString()} XP</span>
                      <span>•</span>
                      <span>{agent.country}</span>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">
                    #{index + 1}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Recruitment Pipeline" variant="gradient">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-primary-50 dark:bg-primary-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary-100 dark:bg-primary-800 rounded-lg flex items-center justify-center">
                    <UserPlus className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Applied</span>
                </div>
                <Badge variant="primary">{recruitmentStats.applied}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-warning-50 dark:bg-warning-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-warning-100 dark:bg-warning-800 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-warning-600 dark:text-warning-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Interviewing</span>
                </div>
                <Badge variant="warning">{recruitmentStats.interviewing}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-success-50 dark:bg-success-900/20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-success-100 dark:bg-success-800 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-success-600 dark:text-success-400" />
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">Active</span>
                </div>
                <Badge variant="success">{recruitmentStats.active}</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Referral Tracking */}
      <Card 
        title="Referral Network" 
        subtitle="Recent agent referrals and their status"
        variant="gradient"
      >
        <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
          <table className="data-table">
            <thead>
              <tr>
                <th>Referrer</th>
                <th>New Agent</th>
                <th>Date</th>
                <th>Status</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {mockReferralLogs.map((log) => (
                <tr key={log.id}>
                  <td>
                    <div className="font-semibold text-gray-900 dark:text-white">{log.referrerName}</div>
                  </td>
                  <td>
                    <div className="text-gray-900 dark:text-gray-300">{log.refereeName}</div>
                  </td>
                  <td>
                    <div className="text-gray-600 dark:text-gray-400">
                      {new Date(log.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(log.status as Agent['status'])}
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-500 ${
                            log.status === 'Active' ? 'bg-success-500 w-full' :
                            log.status === 'Interviewed' ? 'bg-warning-500 w-2/3' :
                            'bg-primary-500 w-1/3'
                          }`}
                        />
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {log.status === 'Active' ? '100%' :
                         log.status === 'Interviewed' ? '67%' : '33%'}
                      </span>
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