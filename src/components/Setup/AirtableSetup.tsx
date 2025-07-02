import React, { useState } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { Database, Key, CheckCircle, AlertCircle, ExternalLink, Copy, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { initializeAirtable, AirtableConfig } from '../../services/airtable';
import { useAirtableContext } from '../../contexts/AirtableContext';

interface AirtableSetupProps {
  onConfigured: (config: AirtableConfig) => void;
  existingConfig?: AirtableConfig;
}

export function AirtableSetup({ onConfigured, existingConfig }: AirtableSetupProps) {
  const { isConfigured } = useAirtableContext();
  const [config, setConfig] = useState<Partial<AirtableConfig>>(existingConfig || {
    baseId: '',
    apiKey: '',
    tables: {
      agents: 'Agents',
      orders: 'Orders',
      suppliers: 'Suppliers',
      feedback: 'Feedback',
      products: 'Products',
      commissions: 'Commissions',
      campaigns: 'Campaigns',
      categories: 'Categories',
    }
  });
  
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleInputChange = (field: keyof AirtableConfig, value: string) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleTableChange = (table: keyof AirtableConfig['tables'], value: string) => {
    setConfig(prev => ({
      ...prev,
      tables: { ...prev.tables, [table]: value }
    }));
  };

  const testConnection = async () => {
    if (!config.baseId || !config.apiKey) {
      setTestResult({ success: false, message: 'Please provide both Base ID and API Key' });
      return;
    }

    setTesting(true);
    setTestResult(null);

    try {
      const airtableService = initializeAirtable(config as AirtableConfig);
      
      // Test connection by trying to fetch categories (usually the smallest table)
      await airtableService.getCategories();
      
      setTestResult({ success: true, message: 'Connection successful!' });
    } catch (error) {
      setTestResult({ 
        success: false, 
        message: error instanceof Error ? error.message : 'Connection failed' 
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    if (!config.baseId || !config.apiKey || !config.tables) {
      setTestResult({ success: false, message: 'Please fill in all required fields' });
      return;
    }

    onConfigured(config as AirtableConfig);
  };

  const handleBackToDashboard = () => {
    // This will trigger the context to show the main dashboard
    if (existingConfig) {
      onConfigured(existingConfig);
    }
  };

  const copyBaseStructure = () => {
    const structure = `
# NubiaGo Airtable Base Structure

## Tables and Fields:

### 1. Agents
- Name (Single line text)
- Country (Single select)
- Status (Single select: Active, Interviewing, Applied)
- XP (Number)
- Total Orders (Number)
- Recruited Clients (Number)
- Referred Agents (Number)
- Join Date (Date)
- Commission Rate (Number)
- Total Earned (Currency)
- Monthly Earned (Currency)
- Pending Payouts (Currency)
- Bonus XP (Number)
- Campaign Progress (Number)
- Avatar URL (URL)
- Email (Email)
- Phone (Phone number)
- Notes (Long text)

### 2. Orders
- Order ID (Single line text)
- Agent Name (Link to Agents)
- Product (Link to Products)
- Country (Single select)
- Status (Single select: Pending, Assigned to Supplier, In Transit, Delivered, Delayed)
- Assigned Carrier (Single select)
- Last Update (Date & time)
- Delay Reason (Long text)
- Value (Currency)
- Cost of Goods (Currency)
- Sale Price (Currency)
- Margin (Formula: {Sale Price} - {Cost of Goods})
- Agent Commission (Formula: {Value} * {Commission Rate} / 100)
- Customer Name (Single line text)
- Customer Email (Email)
- Tracking Number (Single line text)
- Delivery Address (Long text)
- Notes (Long text)

### 3. Suppliers
- Name (Single line text)
- Country (Single select)
- Total Products (Number)
- On Time Percentage (Number)
- Defect Rate (Number)
- Margin Category (Single select: High, Medium, Low)
- Trust Score (Number)
- Average Price (Currency)
- Margin (Number)
- Contact Email (Email)
- Contact Phone (Phone number)
- Address (Long text)
- Payment Terms (Single line text)
- Lead Time (Number)
- Minimum Order (Number)
- Notes (Long text)

### 4. Feedback
- Ticket ID (Single line text)
- Issue Category (Single select: Late Delivery, Damaged Product, Wrong Item, Payment Issue, Communication)
- Submitted By (Single line text)
- Assigned Agent (Link to Agents)
- Resolution Time (Number)
- Status (Single select: Open, In Progress, Resolved, Closed)
- Satisfaction (Rating)
- Created At (Date & time)
- Customer Email (Email)
- Order ID (Link to Orders)
- Description (Long text)
- Resolution Notes (Long text)
- Priority (Single select: Low, Medium, High, Critical)

### 5. Products
- Name (Single line text)
- Category (Link to Categories)
- Cost of Goods (Currency)
- Sale Price (Currency)
- Margin (Formula: {Sale Price} - {Cost of Goods})
- Margin Percentage (Formula: {Margin} / {Sale Price} * 100)
- Supplier (Link to Suppliers)
- Stock (Number)
- Monthly Sales (Number)
- SKU (Single line text)
- Description (Long text)
- Image URL (URL)
- Weight (Number)
- Dimensions (Single line text)
- Minimum Stock (Number)
- Reorder Point (Number)
- Notes (Long text)

### 6. Commissions
- Commission ID (Single line text)
- Agent ID (Link to Agents)
- Agent Name (Lookup from Agents)
- Order ID (Link to Orders)
- Order Value (Lookup from Orders)
- Commission Rate (Lookup from Agents)
- Commission Amount (Formula: {Order Value} * {Commission Rate} / 100)
- Status (Single select: Pending, Paid, Processing)
- Date (Date)
- Payout Date (Date)
- Payment Method (Single select)
- Transaction ID (Single line text)
- Notes (Long text)

### 7. Campaigns
- Name (Single line text)
- Description (Long text)
- Start Date (Date)
- End Date (Date)
- Target XP (Number)
- Bonus Amount (Currency)
- Participants (Number)
- Status (Single select: Active, Completed, Upcoming)
- Campaign Type (Single line text)
- Eligibility Criteria (Long text)
- Terms and Conditions (Long text)
- Created By (Single line text)
- Notes (Long text)

### 8. Categories
- Name (Single line text)
- Type (Single select: Product, Issue, Agent Status, Order Status, Campaign)
- Description (Long text)
- Color (Single line text)
- Icon (Single line text)
- Sort Order (Number)
- Active (Checkbox)
- Parent Category (Link to Categories)
- Created At (Date & time)
- Updated At (Date & time)
    `;

    navigator.clipboard.writeText(structure.trim());
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        {isConfigured && existingConfig && (
          <Button
            variant="ghost"
            onClick={handleBackToDashboard}
            icon={<ArrowLeft className="w-4 h-4" />}
            className="flex-shrink-0"
          >
            Back to Dashboard
          </Button>
        )}
        
        <div className="text-center flex-1">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Database className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Airtable Integration Setup
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect your NubiaGo dashboard to Airtable for real-time data management
          </p>
        </div>
      </div>

      {/* Current Status */}
      {isConfigured && (
        <Card title="Current Status" variant="gradient">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-success-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-900 dark:text-white">
                Connected to Airtable
              </span>
            </div>
            <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>
              Active
            </Badge>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
            Your dashboard is successfully connected to Airtable. You can reconfigure the connection below if needed.
          </p>
        </Card>
      )}

      {/* Setup Instructions */}
      <Card title="Setup Instructions" variant="gradient">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Create Airtable Base</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Create a new base in Airtable with the required table structure
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Get API Credentials</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Generate an API key and copy your base ID from Airtable
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <span className="text-xl font-bold text-primary-600 dark:text-primary-400">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Configure Dashboard</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enter your credentials below to connect the dashboard
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              variant="outline" 
              icon={<ExternalLink className="w-4 h-4" />}
              onClick={() => window.open('https://airtable.com/create', '_blank')}
            >
              Create Airtable Base
            </Button>
            <Button 
              variant="outline" 
              icon={<Copy className="w-4 h-4" />}
              onClick={copyBaseStructure}
            >
              Copy Base Structure
            </Button>
            <Button 
              variant="outline" 
              icon={<ExternalLink className="w-4 h-4" />}
              onClick={() => window.open('https://airtable.com/create/tokens', '_blank')}
            >
              Generate API Key
            </Button>
          </div>
        </div>
      </Card>

      {/* Configuration Form */}
      <Card title="Configuration" variant="gradient">
        <div className="space-y-6">
          {/* API Credentials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Base ID *
              </label>
              <input
                type="text"
                value={config.baseId || ''}
                onChange={(e) => handleInputChange('baseId', e.target.value)}
                placeholder="appXXXXXXXXXXXXXX"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Found in your Airtable base URL
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                API Key *
              </label>
              <div className="relative">
                <input
                  type={showApiKey ? 'text' : 'password'}
                  value={config.apiKey || ''}
                  onChange={(e) => handleInputChange('apiKey', e.target.value)}
                  placeholder="patXXXXXXXXXXXXXX"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showApiKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Generate from Airtable account settings
              </p>
            </div>
          </div>

          {/* Table Names */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table Names</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(config.tables || {}).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                    {key}
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleTableChange(key as keyof AirtableConfig['tables'], e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Test Connection */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Test Connection</span>
            </div>
            <Button
              onClick={testConnection}
              loading={testing}
              disabled={!config.baseId || !config.apiKey}
              variant="outline"
            >
              Test
            </Button>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`flex items-center gap-3 p-4 rounded-xl ${
              testResult.success 
                ? 'bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800' 
                : 'bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800'
            }`}>
              {testResult.success ? (
                <CheckCircle className="w-5 h-5 text-success-600 dark:text-success-400" />
              ) : (
                <AlertCircle className="w-5 h-5 text-error-600 dark:text-error-400" />
              )}
              <span className={`font-medium ${
                testResult.success 
                  ? 'text-success-800 dark:text-success-300' 
                  : 'text-error-800 dark:text-error-300'
              }`}>
                {testResult.message}
              </span>
            </div>
          )}

          {/* Save Configuration */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              onClick={handleSave}
              disabled={!config.baseId || !config.apiKey || !testResult?.success}
              variant="primary"
              icon={<CheckCircle className="w-4 h-4" />}
            >
              {isConfigured ? 'Update Configuration' : 'Save Configuration'}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}