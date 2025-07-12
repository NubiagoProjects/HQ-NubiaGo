interface AirtableConfig {
  baseId: string;
  apiKey: string;
  tables: {
    agents: string;
    orders: string;
    suppliers: string;
    products: string;
    feedback: string;
  };
}

interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

interface AirtableResponse {
  records: AirtableRecord[];
  offset?: string;
}

class AirtableService {
  private config: AirtableConfig | null = null;
  private baseUrl = 'https://api.airtable.com/v0';

  constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    const savedConfig = localStorage.getItem('airtable-config');
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
    }
  }

  public updateConfig(config: AirtableConfig) {
    this.config = config;
    localStorage.setItem('airtable-config', JSON.stringify(config));
  }

  public isConfigured(): boolean {
    return !!(this.config?.baseId && this.config?.apiKey);
  }

  private getHeaders() {
    if (!this.config?.apiKey) {
      throw new Error('Airtable API key not configured');
    }

    return {
      'Authorization': `Bearer ${this.config.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    if (!this.config?.baseId) {
      throw new Error('Airtable base ID not configured');
    }

    const url = `${this.baseUrl}/${this.config.baseId}/${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        ...this.getHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(`Airtable API error: ${error.error?.message || response.statusText}`);
    }

    return response.json();
  }

  // Test connection to Airtable
  public async testConnection(): Promise<boolean> {
    try {
      if (!this.config?.tables.agents) {
        throw new Error('Agents table not configured');
      }

      await this.makeRequest(`${this.config.tables.agents}?maxRecords=1`);
      return true;
    } catch (error) {
      console.error('Airtable connection test failed:', error);
      return false;
    }
  }

  // Fetch agents from Airtable
  public async fetchAgents(): Promise<any[]> {
    if (!this.config?.tables.agents) {
      throw new Error('Agents table not configured');
    }

    const response: AirtableResponse = await this.makeRequest(this.config.tables.agents);
    return response.records.map(record => ({
      id: record.id,
      ...record.fields,
      airtableId: record.id,
      createdTime: record.createdTime,
    }));
  }

  // Fetch orders from Airtable
  public async fetchOrders(): Promise<any[]> {
    if (!this.config?.tables.orders) {
      throw new Error('Orders table not configured');
    }

    const response: AirtableResponse = await this.makeRequest(this.config.tables.orders);
    return response.records.map(record => ({
      id: record.id,
      ...record.fields,
      airtableId: record.id,
      createdTime: record.createdTime,
    }));
  }

  // Fetch suppliers from Airtable
  public async fetchSuppliers(): Promise<any[]> {
    if (!this.config?.tables.suppliers) {
      throw new Error('Suppliers table not configured');
    }

    const response: AirtableResponse = await this.makeRequest(this.config.tables.suppliers);
    return response.records.map(record => ({
      id: record.id,
      ...record.fields,
      airtableId: record.id,
      createdTime: record.createdTime,
    }));
  }

  // Fetch products from Airtable
  public async fetchProducts(): Promise<any[]> {
    if (!this.config?.tables.products) {
      throw new Error('Products table not configured');
    }

    const response: AirtableResponse = await this.makeRequest(this.config.tables.products);
    return response.records.map(record => ({
      id: record.id,
      ...record.fields,
      airtableId: record.id,
      createdTime: record.createdTime,
    }));
  }

  // Fetch feedback from Airtable
  public async fetchFeedback(): Promise<any[]> {
    if (!this.config?.tables.feedback) {
      throw new Error('Feedback table not configured');
    }

    const response: AirtableResponse = await this.makeRequest(this.config.tables.feedback);
    return response.records.map(record => ({
      id: record.id,
      ...record.fields,
      airtableId: record.id,
      createdTime: record.createdTime,
    }));
  }

  // Create a new record
  public async createRecord(tableName: string, fields: Record<string, any>): Promise<any> {
    const response = await this.makeRequest(tableName, {
      method: 'POST',
      body: JSON.stringify({
        fields,
      }),
    });

    return {
      id: response.id,
      ...response.fields,
      airtableId: response.id,
      createdTime: response.createdTime,
    };
  }

  // Update a record
  public async updateRecord(tableName: string, recordId: string, fields: Record<string, any>): Promise<any> {
    const response = await this.makeRequest(`${tableName}/${recordId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        fields,
      }),
    });

    return {
      id: response.id,
      ...response.fields,
      airtableId: response.id,
      createdTime: response.createdTime,
    };
  }

  // Delete a record
  public async deleteRecord(tableName: string, recordId: string): Promise<boolean> {
    await this.makeRequest(`${tableName}/${recordId}`, {
      method: 'DELETE',
    });

    return true;
  }

  // Sync all data from Airtable
  public async syncAllData(): Promise<{
    agents: any[];
    orders: any[];
    suppliers: any[];
    products: any[];
    feedback: any[];
  }> {
    const [agents, orders, suppliers, products, feedback] = await Promise.all([
      this.fetchAgents().catch(() => []),
      this.fetchOrders().catch(() => []),
      this.fetchSuppliers().catch(() => []),
      this.fetchProducts().catch(() => []),
      this.fetchFeedback().catch(() => []),
    ]);

    return {
      agents,
      orders,
      suppliers,
      products,
      feedback,
    };
  }
}

export const airtableService = new AirtableService();
export default AirtableService;