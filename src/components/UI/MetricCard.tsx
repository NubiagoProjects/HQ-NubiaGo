import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'indigo';
  loading?: boolean;
}

const colorClasses = {
  blue: 'text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/20',
  green: 'text-success-600 dark:text-success-400 bg-success-100 dark:bg-success-900/20',
  yellow: 'text-warning-600 dark:text-warning-400 bg-warning-100 dark:bg-warning-900/20',
  red: 'text-error-600 dark:text-error-400 bg-error-100 dark:bg-error-900/20',
  purple: 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/20',
  indigo: 'text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/20',
};

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon, 
  color = 'blue',
  loading = false 
}: MetricCardProps) {
  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
          <div className="w-14 h-14 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {change && (
            <div className="flex items-center gap-1">
              <span className={`text-sm font-semibold ${
                change.type === 'increase' 
                  ? 'text-success-600 dark:text-success-400' 
                  : 'text-error-600 dark:text-error-400'
              }`}>
                {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                vs {change.period}
              </span>
            </div>
          )}
        </div>
        <div className={`
          w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300
          group-hover:scale-110 ${colorClasses[color]}
        `}>
          {icon}
        </div>
      </div>
    </div>
  );
}