import { useState, useEffect, useCallback } from 'react';
import { getAirtableService } from '../services/airtable';
import { 
  mapAirtableToAgent, 
  mapAirtableToOrder, 
  mapAirtableToSupplier, 
  mapAirtableToFeedback,
  mapAirtableToProduct,
  mapAirtableToCommission,
  mapAirtableToCampaign,
  AirtableAgent,
  AirtableOrder,
  AirtableSupplier,
  AirtableFeedback,
  AirtableProduct,
  AirtableCommission,
  AirtableCampaign
} from '../types/airtable';
import { Agent, Order, Supplier, FeedbackTicket, Product, Commission, Campaign } from '../types';

export interface UseAirtableOptions {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

export function useAirtableAgents(
  filters?: { country?: string; status?: string },
  options: UseAirtableOptions = {}
) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const airtable = getAirtableService();
      const records = await airtable.getAgents(filters);
      const mappedAgents = records.map(record => 
        mapAirtableToAgent(record as { id: string; fields: AirtableAgent })
      );
      setAgents(mappedAgents);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchAgents, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchAgents, options.autoRefresh, options.refreshInterval]);

  return { agents, loading, error, refetch: fetchAgents };
}

export function useAirtableOrders(
  filters?: { country?: string; agent?: string; status?: string },
  options: UseAirtableOptions = {}
) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const airtable = getAirtableService();
      const records = await airtable.getOrders(filters);
      const mappedOrders = records.map(record => 
        mapAirtableToOrder(record as { id: string; fields: AirtableOrder })
      );
      setOrders(mappedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch orders');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchOrders, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchOrders, options.autoRefresh, options.refreshInterval]);

  return { orders, loading, error, refetch: fetchOrders };
}

export function useAirtableSuppliers(
  filters?: { country?: string },
  options: UseAirtableOptions = {}
) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const airtable = getAirtableService();
      const records = await airtable.getSuppliers(filters);
      const mappedSuppliers = records.map(record => 
        mapAirtableToSupplier(record as { id: string; fields: AirtableSupplier })
      );
      setSuppliers(mappedSuppliers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch suppliers');
      console.error('Error fetching suppliers:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchSuppliers, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchSuppliers, options.autoRefresh, options.refreshInterval]);

  return { suppliers, loading, error, refetch: fetchSuppliers };
}

export function useAirtableFeedback(
  filters?: { category?: string; status?: string; agent?: string },
  options: UseAirtableOptions = {}
) {
  const [feedback, setFeedback] = useState<FeedbackTicket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFeedback = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const airtable = getAirtableService();
      const records = await airtable.getFeedbackTickets(filters);
      const mappedFeedback = records.map(record => 
        mapAirtableToFeedback(record as { id: string; fields: AirtableFeedback })
      );
      setFeedback(mappedFeedback);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch feedback');
      console.error('Error fetching feedback:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchFeedback();
  }, [fetchFeedback]);

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchFeedback, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchFeedback, options.autoRefresh, options.refreshInterval]);

  return { feedback, loading, error, refetch: fetchFeedback };
}

export function useAirtableProducts(
  filters?: { category?: string; supplier?: string },
  options: UseAirtableOptions = {}
) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const airtable = getAirtableService();
      const records = await airtable.getProducts(filters);
      const mappedProducts = records.map(record => 
        mapAirtableToProduct(record as { id: string; fields: AirtableProduct })
      );
      setProducts(mappedProducts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchProducts, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchProducts, options.autoRefresh, options.refreshInterval]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useAirtableCommissions(
  filters?: { agent?: string; status?: string },
  options: UseAirtableOptions = {}
) {
  const [commissions, setCommissions] = useState<Commission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCommissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const airtable = getAirtableService();
      const records = await airtable.getCommissions(filters);
      const mappedCommissions = records.map(record => 
        mapAirtableToCommission(record as { id: string; fields: AirtableCommission })
      );
      setCommissions(mappedCommissions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch commissions');
      console.error('Error fetching commissions:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCommissions();
  }, [fetchCommissions]);

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchCommissions, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchCommissions, options.autoRefresh, options.refreshInterval]);

  return { commissions, loading, error, refetch: fetchCommissions };
}

export function useAirtableCampaigns(
  filters?: { status?: string },
  options: UseAirtableOptions = {}
) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const airtable = getAirtableService();
      const records = await airtable.getCampaigns(filters);
      const mappedCampaigns = records.map(record => 
        mapAirtableToCampaign(record as { id: string; fields: AirtableCampaign })
      );
      setCampaigns(mappedCampaigns);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch campaigns');
      console.error('Error fetching campaigns:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  useEffect(() => {
    if (options.autoRefresh && options.refreshInterval) {
      const interval = setInterval(fetchCampaigns, options.refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchCampaigns, options.autoRefresh, options.refreshInterval]);

  return { campaigns, loading, error, refetch: fetchCampaigns };
}

// Generic hook for any Airtable operations
export function useAirtableOperation<T>() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (operation: () => Promise<T>): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await operation();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Operation failed');
      console.error('Airtable operation error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { execute, loading, error };
}