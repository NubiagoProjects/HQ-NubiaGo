import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'primary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  pulse?: boolean;
}

const variants = {
  default: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
  success: 'bg-success-50 text-success-700 border-success-200 dark:bg-success-900/20 dark:text-success-400 dark:border-success-800',
  warning: 'bg-warning-50 text-warning-700 border-warning-200 dark:bg-warning-900/20 dark:text-warning-400 dark:border-warning-800',
  error: 'bg-error-50 text-error-700 border-error-200 dark:bg-error-900/20 dark:text-error-400 dark:border-error-800',
  info: 'bg-primary-50 text-primary-700 border-primary-200 dark:bg-primary-900/20 dark:text-primary-400 dark:border-primary-800',
  primary: 'bg-primary-100 text-primary-800 border-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:border-primary-700',
};

const sizes = {
  sm: 'px-2 py-0.5 text-2xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function Badge({ 
  children, 
  variant = 'default', 
  size = 'md',
  icon,
  pulse = false
}: BadgeProps) {
  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full font-medium border
      ${variants[variant]} 
      ${sizes[size]}
      ${pulse ? 'animate-pulse-subtle' : ''}
      transition-all duration-200
    `}>
      {icon && (
        <span className="flex-shrink-0">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}