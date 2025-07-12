export const APP_CONFIG = {
  name: 'NubiaGo Command Center',
  version: '1.0.0',
  description: 'Agent network management and business intelligence platform',
  author: 'NubiaGo Team',
  repository: 'https://github.com/nubiago/command-center',
  
  // API Configuration
  api: {
    timeout: 30000, // 30 seconds
    retryAttempts: 3,
    retryDelay: 1000, // 1 second
  },
  
  // Data sync configuration
  sync: {
    defaultInterval: 900000, // 15 minutes
    minInterval: 300000, // 5 minutes
    maxInterval: 3600000, // 1 hour
  },
  
  // UI Configuration
  ui: {
    animationDuration: 300,
    toastDuration: 5000,
    debounceDelay: 300,
  },
  
  // Storage keys
  storage: {
    theme: 'theme',
    airtableConfig: 'airtable-config',
    apiConfigs: 'api-configs',
    notificationSettings: 'notification-settings',
    userPreferences: 'user-preferences',
  },
  
  // Feature flags
  features: {
    airtableIntegration: true,
    realTimeSync: true,
    advancedAnalytics: true,
    exportData: true,
    notifications: true,
  },
  
  // External links
  links: {
    airtableApi: 'https://airtable.com/api',
    documentation: 'https://docs.nubiago.com',
    support: 'https://support.nubiago.com',
    github: 'https://github.com/nubiago/command-center',
  }
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  UNAUTHORIZED: 'Unauthorized access. Please check your API credentials.',
  NOT_FOUND: 'Resource not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
  AIRTABLE_CONNECTION_FAILED: 'Failed to connect to Airtable. Please verify your credentials.',
  API_RATE_LIMIT: 'API rate limit exceeded. Please try again later.',
} as const;

export const SUCCESS_MESSAGES = {
  SETTINGS_SAVED: 'Settings saved successfully!',
  CONNECTION_SUCCESSFUL: 'Connection established successfully!',
  DATA_EXPORTED: 'Data exported successfully!',
  DATA_IMPORTED: 'Data imported successfully!',
  SYNC_COMPLETED: 'Data synchronization completed!',
} as const;