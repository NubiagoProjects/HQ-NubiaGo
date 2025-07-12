export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email) {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateApiKey = (apiKey: string, type: 'airtable' | 'stripe' | 'general' = 'general'): ValidationResult => {
  const errors: string[] = [];
  
  if (!apiKey) {
    errors.push('API key is required');
    return { isValid: false, errors };
  }
  
  switch (type) {
    case 'airtable':
      if (!apiKey.startsWith('key') || apiKey.length < 17) {
        errors.push('Airtable API key must start with "key" and be at least 17 characters');
      }
      break;
    case 'stripe':
      if (!apiKey.startsWith('sk_') && !apiKey.startsWith('pk_')) {
        errors.push('Stripe API key must start with "sk_" or "pk_"');
      }
      break;
    default:
      if (apiKey.length < 8) {
        errors.push('API key must be at least 8 characters long');
      }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUrl = (url: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!url) {
    errors.push('URL is required');
    return { isValid: false, errors };
  }
  
  try {
    new URL(url);
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      errors.push('URL must start with http:// or https://');
    }
  } catch {
    errors.push('Please enter a valid URL');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateAirtableBaseId = (baseId: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!baseId) {
    errors.push('Base ID is required');
  } else if (!baseId.startsWith('app') || baseId.length !== 17) {
    errors.push('Airtable Base ID must start with "app" and be exactly 17 characters');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};