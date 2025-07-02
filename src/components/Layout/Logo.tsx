import React from 'react';
import { Sparkles } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ 
  onClick, 
  size = 'md', 
  showText = true, 
  className = '' 
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const subtextSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const Component = onClick ? 'button' : 'div';

  return (
    <Component
      onClick={onClick}
      className={`
        flex items-center gap-3 group
        ${onClick ? 'cursor-pointer hover:scale-105 transition-all duration-200' : ''}
        ${className}
      `}
    >
      <div className={`
        ${sizeClasses[size]} 
        bg-gradient-to-br from-primary-500 to-primary-600 
        rounded-2xl flex items-center justify-center shadow-lg
        ${onClick ? 'group-hover:shadow-xl group-hover:from-primary-400 group-hover:to-primary-500' : ''}
        transition-all duration-200
      `}>
        <Sparkles className={`${iconSizes[size]} text-white`} />
      </div>
      {showText && (
        <div className="text-left">
          <h1 className={`${textSizes[size]} font-bold text-gray-900 dark:text-white`}>
            NubiaGo
          </h1>
          <p className={`${subtextSizes[size]} text-gray-500 dark:text-gray-400`}>
            Command Center
          </p>
        </div>
      )}
    </Component>
  );
}