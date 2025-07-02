// Airtable service for NubiaGo Command Center
export interface AirtableConfig {
  baseId: string;
  apiKey: string;
  tables: {
    agents: string;
    orders: string;
    suppliers: string;
    feedback: string;
    products: string;
    commissions: string;
    campaigns: string;
    categories: string;
  };
}

export interface AirtableRecord<T = any> {
  id: string;
  fields: T;
  createdTime: string;
}

export interface AirtableResponse<T = any> {
  records: AirtableRecord<T>[];
  offset?: string;
}

export class AirtableService {
  private config: AirtableConfig;
  private baseUrl: string;

  constructor(config: AirtableConfig) {
    this.config = config;
    this.baseUrl = `https://api.airtable.com/v0/${config.baseId}`;
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<AirtableResponse<T>> {
    const url = `${this.baseUrl}/${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Generic CRUD operations
  async getRecords<T>(tableName: string, params?: {
    filterByFormula?: string;
    sort?: Array<{ field: string; direction: 'asc' | 'desc' }>;
    maxRecords?: number;
    view?: string;
  }): Promise<AirtableRecord<T>[]> {
    const searchParams = new URLSearchParams();
    
    if (params?.filterByFormula) {
      searchParams.append('filterByFormula', params.filterByFormula);
    }
    
    if (params?.sort) {
      params.sort.forEach((sortItem, index) => {
        searchParams.append(`sort[${index}][field]`, sortItem.field);
        searchParams.append(`sort[${index}][direction]`, sortItem.direction);
      });
    }
    
    if (params?.maxRecords) {
      searchParams.append('maxRecords', params.maxRecords.toString());
    }
    
    if (params?.view) {
      searchParams.append('view', params.view);
    }

    const endpoint = `${tableName}?${searchParams.toString()}`;
    const response = await this.makeRequest<T>(endpoint);
    return response.records;
  }

  async createRecord<T>(tableName: string, fields: Partial<T>): Promise<AirtableRecord<T>> {
    const response = await this.makeRequest<T>(tableName, {
      method: 'POST',
      body: JSON.stringify({ fields }),
    });
    
    return response.records[0];
  }

  async updateRecord<T>(
    tableName: string, 
    recordId: string, 
    fields: Partial<T>
  ): Promise<AirtableRecord<T>> {
    const response = await this.makeRequest<T>(`${tableName}/${recordId}`, {
      method: 'PATCH',
      body: JSON.stringify({ fields }),
    });
    
    return response.records[0];
  }

  async deleteRecord(tableName: string, recordId: string): Promise<void> {
    await this.makeRequest(`${tableName}/${recordId}`, {
      method: 'DELETE',
    });
  }

  // Batch operations
  async createRecords<T>(tableName: string, records: Array<{ fields: Partial<T> }>): Promise<AirtableRecord<T>[]> {
    const response = await this.makeRequest<T>(tableName, {
      method: 'POST',
      body: JSON.stringify({ records }),
    });
    
    return response.records;
  }

  async updateRecords<T>(
    tableName: string, 
    records: Array<{ id: string; fields: Partial<T> }>
  ): Promise<AirtableRecord<T>[]> {
    const response = await this.makeRequest<T>(tableName, {
      method: 'PATCH',
      body: JSON.stringify({ records }),
    });
    
    return response.records;
  }

  // Specific methods for NubiaGo entities
  async getAgents(filters?: { country?: string; status?: string }) {
    let filterFormula = '';
    
    if (filters?.country) {
      filterFormula += `{Country} = "${filters.country}"`;
    }
    
    if (filters?.status) {
      if (filterFormula) filterFormula += ' AND ';
      filterFormula += `{Status} = "${filters.status}"`;
    }

    return this.getRecords(this.config.tables.agents, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'XP', direction: 'desc' }],
    });
  }

  async getOrders(filters?: { country?: string; agent?: string; status?: string }) {
    let filterFormula = '';
    
    if (filters?.country) {
      filterFormula += `{Country} = "${filters.country}"`;
    }
    
    if (filters?.agent) {
      if (filterFormula) filterFormula += ' AND ';
      filterFormula += `{Agent Name} = "${filters.agent}"`;
    }
    
    if (filters?.status) {
      if (filterFormula) filterFormula += ' AND ';
      filterFormula += `{Status} = "${filters.status}"`;
    }

    return this.getRecords(this.config.tables.orders, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'Last Update', direction: 'desc' }],
    });
  }

  async getSuppliers(filters?: { country?: string }) {
    let filterFormula = '';
    
    if (filters?.country) {
      filterFormula += `{Country} = "${filters.country}"`;
    }

    return this.getRecords(this.config.tables.suppliers, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'Trust Score', direction: 'desc' }],
    });
  }

  async getFeedbackTickets(filters?: { category?: string; status?: string; agent?: string }) {
    let filterFormula = '';
    
    if (filters?.category) {
      filterFormula += `{Issue Category} = "${filters.category}"`;
    }
    
    if (filters?.status) {
      if (filterFormula) filterFormula += ' AND ';
      filterFormula += `{Status} = "${filters.status}"`;
    }
    
    if (filters?.agent) {
      if (filterFormula) filterFormula += ' AND ';
      filterFormula += `{Assigned Agent} = "${filters.agent}"`;
    }

    return this.getRecords(this.config.tables.feedback, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'Created At', direction: 'desc' }],
    });
  }

  async getProducts(filters?: { category?: string; supplier?: string }) {
    let filterFormula = '';
    
    if (filters?.category) {
      filterFormula += `{Category} = "${filters.category}"`;
    }
    
    if (filters?.supplier) {
      if (filterFormula) filterFormula += ' AND ';
      filterFormula += `{Supplier} = "${filters.supplier}"`;
    }

    return this.getRecords(this.config.tables.products, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'Margin Percentage', direction: 'desc' }],
    });
  }

  async getCommissions(filters?: { agent?: string; status?: string }) {
    let filterFormula = '';
    
    if (filters?.agent) {
      filterFormula += `{Agent Name} = "${filters.agent}"`;
    }
    
    if (filters?.status) {
      if (filterFormula) filterFormula += ' AND ';
      filterFormula += `{Status} = "${filters.status}"`;
    }

    return this.getRecords(this.config.tables.commissions, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'Date', direction: 'desc' }],
    });
  }

  async getCampaigns(filters?: { status?: string }) {
    let filterFormula = '';
    
    if (filters?.status) {
      filterFormula += `{Status} = "${filters.status}"`;
    }

    return this.getRecords(this.config.tables.campaigns, {
      filterByFormula: filterFormula || undefined,
      sort: [{ field: 'Start Date', direction: 'desc' }],
    });
  }

  async getCategories() {
    return this.getRecords(this.config.tables.categories, {
      sort: [{ field: 'Name', direction: 'asc' }],
    });
  }
}

// Singleton instance
let airtableService: AirtableService | null = null;

export function initializeAirtable(config: AirtableConfig): AirtableService {
  airtableService = new AirtableService(config);
  return airtableService;
}

export function getAirtableService(): AirtableService {
  if (!airtableService) {
    throw new Error('Airtable service not initialized. Call initializeAirtable() first.');
  }
  return airtableService;
}