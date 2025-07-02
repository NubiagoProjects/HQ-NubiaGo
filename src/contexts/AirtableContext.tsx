import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AirtableConfig, initializeAirtable } from '../services/airtable';
import { 
  getStoredAirtableConfig, 
  storeAirtableConfig, 
  isAirtableConfigured,
  validateAirtableConfig 
} from '../utils/airtableHelpers';

interface AirtableContextType {
  isConfigured: boolean;
  config: AirtableConfig | null;
  isLoading: boolean;
  error: string | null;
  configure: (config: AirtableConfig) => Promise<void>;
  disconnect: () => void;
  reconnect: () => Promise<void>;
}

const AirtableContext = createContext<AirtableContextType | undefined>(undefined);

interface AirtableProviderProps {
  children: ReactNode;
}

export function AirtableProvider({ children }: AirtableProviderProps) {
  const [isConfigured, setIsConfigured] = useState(false);
  const [config, setConfig] = useState<AirtableConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initializeFromStorage();
  }, []);

  const initializeFromStorage = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const storedConfig = getStoredAirtableConfig();
      
      if (storedConfig) {
        const validation = validateAirtableConfig(storedConfig);
        
        if (validation.valid) {
          await configure(storedConfig);
        } else {
          setError(`Invalid configuration: ${validation.errors.join(', ')}`);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to initialize Airtable');
    } finally {
      setIsLoading(false);
    }
  };

  const configure = async (newConfig: AirtableConfig) => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate configuration
      const validation = validateAirtableConfig(newConfig);
      if (!validation.valid) {
        throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
      }

      // Test connection by initializing service
      const service = initializeAirtable(newConfig);
      
      // Try to fetch a small amount of data to verify connection
      await service.getCategories();

      // If successful, store configuration
      storeAirtableConfig(newConfig);
      setConfig(newConfig);
      setIsConfigured(true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to configure Airtable';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    localStorage.removeItem('airtable-config');
    setConfig(null);
    setIsConfigured(false);
    setError(null);
  };

  const reconnect = async () => {
    if (config) {
      await configure(config);
    } else {
      await initializeFromStorage();
    }
  };

  const value: AirtableContextType = {
    isConfigured,
    config,
    isLoading,
    error,
    configure,
    disconnect,
    reconnect,
  };

  return (
    <AirtableContext.Provider value={value}>
      {children}
    </AirtableContext.Provider>
  );
}

export function useAirtableContext() {
  const context = useContext(AirtableContext);
  if (context === undefined) {
    throw new Error('useAirtableContext must be used within an AirtableProvider');
  }
  return context;
}