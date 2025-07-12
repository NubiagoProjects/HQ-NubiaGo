import { ERROR_MESSAGES } from './constants';

export interface AppError {
  message: string;
  code?: string;
  status?: number;
  details?: any;
}

export class ApiError extends Error {
  public status: number;
  public code?: string;
  public details?: any;

  constructor(message: string, status: number = 500, code?: string, details?: any) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export const handleApiError = (error: any): AppError => {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
    };
  }

  if (error.name === 'TypeError' && error.message.includes('fetch')) {
    return {
      message: ERROR_MESSAGES.NETWORK_ERROR,
      code: 'NETWORK_ERROR',
      status: 0,
    };
  }

  if (error.status === 401) {
    return {
      message: ERROR_MESSAGES.UNAUTHORIZED,
      code: 'UNAUTHORIZED',
      status: 401,
    };
  }

  if (error.status === 404) {
    return {
      message: ERROR_MESSAGES.NOT_FOUND,
      code: 'NOT_FOUND',
      status: 404,
    };
  }

  if (error.status === 429) {
    return {
      message: ERROR_MESSAGES.API_RATE_LIMIT,
      code: 'RATE_LIMIT',
      status: 429,
    };
  }

  return {
    message: error.message || ERROR_MESSAGES.GENERIC_ERROR,
    code: 'UNKNOWN_ERROR',
    status: error.status || 500,
    details: error,
  };
};

export const logError = (error: AppError, context?: string) => {
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    error: {
      message: error.message,
      code: error.code,
      status: error.status,
      details: error.details,
    },
    userAgent: navigator.userAgent,
    url: window.location.href,
  };

  console.error('Application Error:', errorLog);

  // In production, send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Sentry, LogRocket, etc.
    // errorTrackingService.captureError(errorLog);
  }
};