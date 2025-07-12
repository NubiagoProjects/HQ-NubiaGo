import { useState, useEffect, useCallback } from 'react';
import { airtableService } from '../services/airtableService';

interface UseAirtableDataReturn {
  data: any;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isConfigured: boolean;
}

export function useAirtableData(autoFetch: boolean = true): UseAirtableDataReturn {
  const [data, setData] = useState<any>({
    agents: [],
    orders: [],
    suppliers: [],
    products: [],
    feedback: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isConfigured, setIsConfigured] = useState(false);

  const fetchData = useCallback(async () => {
    if (!airtableService.isConfigured()) {
      setIsConfigured(false);
      return;
    }

    setIsConfigured(true);
    setLoading(true);
    setError(null);

    try {
      const syncedData = await airtableService.syncAllData();
      setData(syncedData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data from Airtable';
      setError(errorMessage);
      console.error('Airtable sync error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Check configuration on mount
    setIsConfigured(airtableService.isConfigured());

    if (autoFetch && airtableService.isConfigured()) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  // Set up periodic sync if configured
  useEffect(() => {
    if (!isConfigured) return;

    const syncInterval = parseInt(localStorage.getItem('sync-interval') || '900000'); // 15 minutes default
    const interval = setInterval(fetchData, syncInterval);

    return () => clearInterval(interval);
  }, [isConfigured, fetchData]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    isConfigured,
  };
}