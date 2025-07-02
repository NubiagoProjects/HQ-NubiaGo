import React from 'react';
import { Logo } from './Logo';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  onLogoClick?: () => void;
}

export function PageHeader({ title, subtitle, children, onLogoClick }: PageHeaderProps) {
  return (
    <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo 
            onClick={onLogoClick}
            size="sm"
            showText={false}
            className="flex-shrink-0"
          />
          <div className="border-l border-gray-200 dark:border-gray-700 pl-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {subtitle && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {children && (
          <div className="flex items-center gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}