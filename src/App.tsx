import React, { useState } from 'react';
import { Navigation } from './components/Layout/Navigation';
import { AgentsView } from './components/Agents/AgentsView';
import { OrdersView } from './components/Orders/OrdersView';
import { SuppliersView } from './components/Suppliers/SuppliersView';
import { FeedbackView } from './components/Feedback/FeedbackView';
import { FinancialsView } from './components/Financials/FinancialsView';
import { MarginsView } from './components/Margins/MarginsView';
import { SettingsView } from './components/Settings/SettingsView';
import { LoadingProvider } from './contexts/LoadingContext';
import { ErrorBoundary } from './components/UI/ErrorBoundary';
import { SkipLink } from './components/UI/SkipLink';
import { ToastContainer } from './components/UI/ToastContainer';
import { useToast } from './hooks/useToast';
import { TabKey } from './types';

function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('margins');
  const { toasts } = useToast();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'agents':
        return <AgentsView />;
      case 'orders':
        return <OrdersView />;
      case 'suppliers':
        return <SuppliersView />;
      case 'feedback':
        return <FeedbackView />;
      case 'financials':
        return <FinancialsView />;
      case 'margins':
        return <MarginsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <MarginsView />;
    }
  };

  return (
    <ErrorBoundary>
      <LoadingProvider>
        <SkipLink />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
          <div className="flex h-screen">
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            
            <main 
              id="main-content"
              className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950"
              role="main"
              aria-label="Main content"
            >
              <div className="animate-in">
                {renderActiveView()}
              </div>
            </main>
          </div>
        </div>
        <ToastContainer toasts={toasts} />
      </LoadingProvider>
    </ErrorBoundary>
  );
}

export default App;