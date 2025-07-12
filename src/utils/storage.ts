import { APP_CONFIG } from './constants';

export class SecureStorage {
  private static encrypt(data: string): string {
    // Simple base64 encoding for demo - use proper encryption in production
    return btoa(data);
  }

  private static decrypt(data: string): string {
    try {
      return atob(data);
    } catch {
      return data; // Return as-is if not encrypted
    }
  }

  static setItem(key: string, value: any, encrypt: boolean = false): void {
    try {
      const serialized = JSON.stringify(value);
      const data = encrypt ? this.encrypt(serialized) : serialized;
      localStorage.setItem(key, data);
    } catch (error) {
      console.error('Failed to save to storage:', error);
    }
  }

  static getItem<T>(key: string, defaultValue: T, encrypted: boolean = false): T {
    try {
      const data = localStorage.getItem(key);
      if (!data) return defaultValue;

      const decrypted = encrypted ? this.decrypt(data) : data;
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to read from storage:', error);
      return defaultValue;
    }
  }

  static removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from storage:', error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  // Specific methods for app data
  static getAirtableConfig() {
    return this.getItem(APP_CONFIG.storage.airtableConfig, {
      baseId: '',
      apiKey: '',
      tables: {
        agents: 'tblAgents',
        orders: 'tblOrders',
        suppliers: 'tblSuppliers',
        products: 'tblProducts',
        feedback: 'tblFeedback'
      }
    }, true);
  }

  static setAirtableConfig(config: any) {
    this.setItem(APP_CONFIG.storage.airtableConfig, config, true);
  }

  static getApiConfigs() {
    return this.getItem(APP_CONFIG.storage.apiConfigs, [], true);
  }

  static setApiConfigs(configs: any[]) {
    this.setItem(APP_CONFIG.storage.apiConfigs, configs, true);
  }
}