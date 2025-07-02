// Utility functions for Airtable integration

export function validateAirtableConfig(config: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!config.baseId) {
    errors.push('Base ID is required');
  } else if (!config.baseId.startsWith('app')) {
    errors.push('Base ID should start with "app"');
  }

  if (!config.apiKey) {
    errors.push('API Key is required');
  } else if (!config.apiKey.startsWith('pat')) {
    errors.push('API Key should start with "pat"');
  }

  if (!config.tables) {
    errors.push('Table configuration is required');
  } else {
    const requiredTables = ['agents', 'orders', 'suppliers', 'feedback', 'products', 'commissions', 'campaigns', 'categories'];
    for (const table of requiredTables) {
      if (!config.tables[table]) {
        errors.push(`Table name for ${table} is required`);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function formatAirtableError(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error?.message) {
    return error.message;
  }

  if (error?.error?.message) {
    return error.error.message;
  }

  return 'An unknown error occurred';
}

export function isAirtableConfigured(): boolean {
  try {
    const config = localStorage.getItem('airtable-config');
    if (!config) return false;
    
    const parsed = JSON.parse(config);
    const validation = validateAirtableConfig(parsed);
    return validation.valid;
  } catch {
    return false;
  }
}

export function getStoredAirtableConfig(): any | null {
  try {
    const config = localStorage.getItem('airtable-config');
    return config ? JSON.parse(config) : null;
  } catch {
    return null;
  }
}

export function storeAirtableConfig(config: any): void {
  localStorage.setItem('airtable-config', JSON.stringify(config));
}

export function clearAirtableConfig(): void {
  localStorage.removeItem('airtable-config');
}

// Data transformation utilities
export function sanitizeForAirtable(data: any): any {
  if (data === null || data === undefined) {
    return '';
  }
  
  if (typeof data === 'object') {
    const sanitized: any = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeForAirtable(value);
    }
    return sanitized;
  }
  
  return data;
}

export function parseAirtableDate(dateString: string): Date {
  return new Date(dateString);
}

export function formatDateForAirtable(date: Date): string {
  return date.toISOString();
}

// Batch operation helpers
export function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Rate limiting helper
export class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests: number;
  private readonly timeWindow: number;

  constructor(maxRequests: number = 5, timeWindowMs: number = 1000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindowMs;
  }

  async waitIfNeeded(): Promise<void> {
    const now = Date.now();
    
    // Remove old requests outside the time window
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    
    // If we're at the limit, wait
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = Math.min(...this.requests);
      const waitTime = this.timeWindow - (now - oldestRequest);
      if (waitTime > 0) {
        await delay(waitTime);
      }
    }
    
    // Record this request
    this.requests.push(now);
  }
}

// Field mapping utilities
export function mapFieldName(internalName: string, fieldMappings: Record<string, string>): string {
  return fieldMappings[internalName] || internalName;
}

export function reverseMapFieldName(airtableName: string, fieldMappings: Record<string, string>): string {
  const reverseMapping = Object.fromEntries(
    Object.entries(fieldMappings).map(([key, value]) => [value, key])
  );
  return reverseMapping[airtableName] || airtableName;
}

// Sync status tracking
export interface SyncStatus {
  lastSync: Date | null;
  status: 'idle' | 'syncing' | 'error' | 'success';
  error?: string;
  recordsProcessed?: number;
  totalRecords?: number;
}

export function getSyncStatus(): SyncStatus {
  try {
    const status = localStorage.getItem('airtable-sync-status');
    if (!status) {
      return { lastSync: null, status: 'idle' };
    }
    
    const parsed = JSON.parse(status);
    return {
      ...parsed,
      lastSync: parsed.lastSync ? new Date(parsed.lastSync) : null
    };
  } catch {
    return { lastSync: null, status: 'idle' };
  }
}

export function setSyncStatus(status: SyncStatus): void {
  localStorage.setItem('airtable-sync-status', JSON.stringify({
    ...status,
    lastSync: status.lastSync?.toISOString()
  }));
}

// Connection testing
export async function testAirtableConnection(baseId: string, apiKey: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${baseId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Connection test failed' 
    };
  }
}