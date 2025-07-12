import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient' | 'metric';
  hover?: boolean;
}

export function Card({ 
  children, 
  className = '', 
  title, 
  subtitle,
  action,
  variant = 'default',
  hover = true
}: CardProps) {
  const baseClasses = "rounded-2xl border transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-soft",
    glass: "glass-effect shadow-medium",
    gradient: "bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-800 dark:to-gray-900/50 border-gray-200/60 dark:border-gray-700/60 shadow-soft",
    metric: "metric-card"
  };

  const hoverClasses = hover ? "hover:shadow-medium hover:-translate-y-0.5" : "";

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}>
      {(title || subtitle || action) && (
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="min-w-0 flex-1">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-balance">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <div className="ml-4 flex-shrink-0">
              {action}
            </div>
          )}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}