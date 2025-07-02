import React, { useState } from 'react';
import { Navigation } from './components/Layout/Navigation';
import { DashboardView } from './components/Dashboard/DashboardView';
import { AgentsView } from './components/Agents/AgentsView';
import { OrdersView } from './components/Orders/OrdersView';
import { SuppliersView } from './components/Suppliers/SuppliersView';
import { FeedbackView } from './components/Feedback/FeedbackView';
import { AnalyticsView } from './components/Analytics/AnalyticsView';
import { FinancialsView } from './components/Financials/FinancialsView';
import { AirtableSetup } from './components/Setup/AirtableSetup';
import { AirtableProvider, useAirtableContext } from './contexts/AirtableContext';
import { LoadingState } from './components/UI/LoadingState';
import { ErrorState } from './components/UI/ErrorState';
import { TabKey } from './types';

function AppContent() {
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const { isConfigured, isLoading, error, configure, reconnect } = useAirtableContext();

  // Show loading state while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <LoadingState message="Initializing NubiaGo Dashboard..." size="lg" />
      </div>
    );
  }

  // Show setup if not configured
  if (!isConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <AirtableSetup 
          onConfigured={configure}
        />
      </div>
    );
  }

  // Show error state if there's a configuration error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <ErrorState
          title="Configuration Error"
          message={error}
          type="data"
          onRetry={reconnect}
        />
      </div>
    );
  }

  const handleNavigateToHome = () => {
    setActiveTab('dashboard');
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView onNavigate={setActiveTab} />;
      case 'agents':
        return <AgentsView onNavigateHome={handleNavigateToHome} />;
      case 'orders':
        return <OrdersView onNavigateHome={handleNavigateToHome} />;
      case 'suppliers':
        return <SuppliersView onNavigateHome={handleNavigateToHome} />;
      case 'feedback':
        return <FeedbackView onNavigateHome={handleNavigateToHome} />;
      case 'financials':
        return <FinancialsView onNavigateHome={handleNavigateToHome} />;
      case 'analytics':
        return <AnalyticsView onNavigateHome={handleNavigateToHome} />;
      default:
        return <DashboardView onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="flex h-screen">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
          <div className="animate-in">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AirtableProvider>
      <AppContent />
    </AirtableProvider>
  );
}

export default App;