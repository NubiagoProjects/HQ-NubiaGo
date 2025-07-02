import React from 'react';
import { Card } from '../UI/Card';
import { MetricCard } from '../UI/MetricCard';
import { BarChart3, TrendingUp, DollarSign, Users, Target, Zap, Globe, Award } from 'lucide-react';

export function AnalyticsView() {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Advanced insights and business intelligence coming soon
          </p>
        </div>
      </div>

      {/* Preview Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue Analytics"
          value="Coming Soon"
          icon={<DollarSign className="w-6 h-6" />}
          color="green"
        />
        <MetricCard
          title="Performance Metrics"
          value="Coming Soon"
          icon={<TrendingUp className="w-6 h-6" />}
          color="blue"
        />
        <MetricCard
          title="Campaign Results"
          value="Coming Soon"
          icon={<Target className="w-6 h-6" />}
          color="purple"
        />
        <MetricCard
          title="Customer Insights"
          value="Coming Soon"
          icon={<Users className="w-6 h-6" />}
          color="indigo"
        />
      </div>

      {/* Feature Preview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card variant="gradient" hover={false}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Revenue Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Comprehensive revenue tracking with monthly and quarterly views, country breakdowns, and trend analysis.
            </p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Real-time revenue tracking</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Geographic revenue breakdown</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <span>Predictive revenue modeling</span>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="gradient" hover={false}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Award className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Agent Performance</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Advanced agent analytics including XP progression charts, recruitment metrics, and performance rankings.
            </p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>XP progression tracking</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>Performance benchmarking</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-success-500 rounded-full"></div>
                <span>Recruitment effectiveness</span>
              </div>
            </div>
          </div>
        </Card>

        <Card variant="gradient" hover={false}>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Market Insights</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              Deep market analysis with product demand trends, regional insights, and seasonal pattern recognition.
            </p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Product demand forecasting</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Regional market analysis</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Seasonal trend detection</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Preview Card */}
      <Card title="Advanced Analytics Platform" subtitle="Comprehensive business intelligence suite" variant="gradient">
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-large">
            <Zap className="h-12 w-12 text-white" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Analytics Coming Soon
          </h3>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8 text-lg leading-relaxed">
            We're building a comprehensive analytics platform that will provide deep insights into your business performance, 
            agent productivity, market trends, and customer behavior patterns.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Revenue Dashboard</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  Monthly/Quarterly revenue views
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  Country and region breakdown
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  Revenue trend analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                  Profit margin insights
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <div className="w-12 h-12 bg-success-100 dark:bg-success-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-success-600 dark:text-success-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Performance Analytics</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                  Agent XP progression charts
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                  Recruitment success metrics
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                  Performance benchmarking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-success-500 rounded-full"></div>
                  Team productivity insights
                </li>
              </ul>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-3">Market Intelligence</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 text-left">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Product demand forecasting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Regional market analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Seasonal pattern detection
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                  Competitive intelligence
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}