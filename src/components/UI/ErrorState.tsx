import React from 'react';
import { AlertTriangle, RefreshCw, Wifi, Database } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  type?: 'network' | 'data' | 'permission' | 'generic';
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ 
  title,
  message,
  type = 'generic',
  onRetry,
  className = ''
}: ErrorStateProps) {
  const getErrorConfig = () => {
    switch (type) {
      case 'network':
        return {
          icon: <Wifi className="w-12 h-12 text-error-500" />,
          defaultTitle: 'Connection Error',
          defaultMessage: 'Unable to connect to the server. Please check your internet connection and try again.',
          color: 'error'
        };
      case 'data':
        return {
          icon: <Database className="w-12 h-12 text-warning-500" />,
          defaultTitle: 'Data Error',
          defaultMessage: 'There was a problem loading the data. This might be a temporary issue.',
          color: 'warning'
        };
      case 'permission':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-error-500" />,
          defaultTitle: 'Access Denied',
          defaultMessage: 'You don\'t have permission to access this resource. Please contact your administrator.',
          color: 'error'
        };
      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-error-500" />,
          defaultTitle: 'Something went wrong',
          defaultMessage: 'An unexpected error occurred. Please try again or contact support if the problem persists.',
          color: 'error'
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className="mb-6">
        {config.icon}
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title || config.defaultTitle}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md leading-relaxed">
        {message || config.defaultMessage}
      </p>
      
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          icon={<RefreshCw className="w-4 h-4" />}
        >
          Try Again
        </Button>
      )}
    </div>
  );
}

interface AirtableErrorProps {
  error: string;
  onRetry?: () => void;
  onReconfigure?: () => void;
}

export function AirtableError({ error, onRetry, onReconfigure }: AirtableErrorProps) {
  const isConfigError = error.includes('401') || error.includes('403') || error.includes('API key');
  const isNetworkError = error.includes('fetch') || error.includes('network');

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="w-16 h-16 bg-error-100 dark:bg-error-900/20 rounded-2xl flex items-center justify-center mb-6">
        <Database className="w-8 h-8 text-error-600 dark:text-error-400" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        Airtable Connection Error
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 mb-2 max-w-md">
        {isConfigError 
          ? 'There\'s an issue with your Airtable configuration. Please check your API key and base ID.'
          : isNetworkError
          ? 'Unable to connect to Airtable. Please check your internet connection.'
          : 'An error occurred while communicating with Airtable.'
        }
      </p>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-mono bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-lg">
        {error}
      </p>
      
      <div className="flex gap-3">
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Retry
          </Button>
        )}
        {onReconfigure && isConfigError && (
          <Button
            onClick={onReconfigure}
            variant="primary"
            icon={<Database className="w-4 h-4" />}
          >
            Reconfigure
          </Button>
        )}
      </div>
    </div>
  );
}