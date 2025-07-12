import React, { useState, useEffect } from 'react';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { 
  Database, 
  Key, 
  Globe, 
  CheckCircle, 
  AlertCircle, 
  Eye, 
  EyeOff, 
  TestTube, 
  Save, 
  RefreshCw,
  ExternalLink,
  Shield,
  Zap,
  Settings as SettingsIcon,
  Bell,
  Download,
  Upload,
  Trash2
} from 'lucide-react';

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

interface APIConfig {
  name: string;
  endpoint: string;
  apiKey: string;
  headers: Record<string, string>;
  enabled: boolean;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  lowStock: boolean;
  newOrders: boolean;
  agentUpdates: boolean;
  systemAlerts: boolean;
}

export function SettingsView() {
  const [activeSection, setActiveSection] = useState('airtable');
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSaving, setIsSaving] = useState(false);

  // Airtable Configuration
  const [airtableConfig, setAirtableConfig] = useState<AirtableConfig>({
    baseId: '',
    apiKey: '',
    tables: {
      agents: 'tblAgents',
      orders: 'tblOrders',
      suppliers: 'tblSuppliers',
      products: 'tblProducts',
      feedback: 'tblFeedback'
    }
  });

  // API Configurations
  const [apiConfigs, setApiConfigs] = useState<APIConfig[]>([
    {
      name: 'Stripe API',
      endpoint: 'https://api.stripe.com/v1',
      apiKey: '',
      headers: { 'Content-Type': 'application/json' },
      enabled: false
    },
    {
      name: 'Shipping API',
      endpoint: 'https://api.shipstation.com/shipments',
      apiKey: '',
      headers: { 'Content-Type': 'application/json' },
      enabled: false
    },
    {
      name: 'Analytics API',
      endpoint: 'https://api.analytics.com/v2',
      apiKey: '',
      headers: { 'Content-Type': 'application/json' },
      enabled: false
    }
  ]);

  // Notification Settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    email: true,
    push: false,
    lowStock: true,
    newOrders: true,
    agentUpdates: false,
    systemAlerts: true
  });

  // Load saved settings on component mount
  useEffect(() => {
    const savedAirtable = localStorage.getItem('airtable-config');
    const savedAPIs = localStorage.getItem('api-configs');
    const savedNotifications = localStorage.getItem('notification-settings');

    if (savedAirtable) {
      setAirtableConfig(JSON.parse(savedAirtable));
    }
    if (savedAPIs) {
      setApiConfigs(JSON.parse(savedAPIs));
    }
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  const testAirtableConnection = async () => {
    if (!airtableConfig.baseId || !airtableConfig.apiKey) {
      alert('Please enter both Base ID and API Key');
      return;
    }

    setIsConnecting(true);
    setConnectionStatus('idle');

    try {
      // Simulate API call to Airtable
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would make an actual API call:
      // const response = await fetch(`https://api.airtable.com/v0/${airtableConfig.baseId}/${airtableConfig.tables.agents}`, {
      //   headers: { 'Authorization': `Bearer ${airtableConfig.apiKey}` }
      // });
      
      setConnectionStatus('success');
    } catch (error) {
      setConnectionStatus('error');
    } finally {
      setIsConnecting(false);
    }
  };

  const saveSettings = async () => {
    setIsSaving(true);
    
    try {
      // Save to localStorage (in production, this would be saved to your backend)
      localStorage.setItem('airtable-config', JSON.stringify(airtableConfig));
      localStorage.setItem('api-configs', JSON.stringify(apiConfigs));
      localStorage.setItem('notification-settings', JSON.stringify(notifications));
      
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Settings saved successfully!');
    } catch (error) {
      alert('Error saving settings. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateAPIConfig = (index: number, field: keyof APIConfig, value: any) => {
    const updated = [...apiConfigs];
    updated[index] = { ...updated[index], [field]: value };
    setApiConfigs(updated);
  };

  const addNewAPI = () => {
    setApiConfigs([...apiConfigs, {
      name: 'New API',
      endpoint: '',
      apiKey: '',
      headers: { 'Content-Type': 'application/json' },
      enabled: false
    }]);
  };

  const removeAPI = (index: number) => {
    setApiConfigs(apiConfigs.filter((_, i) => i !== index));
  };

  const exportSettings = () => {
    const settings = {
      airtable: airtableConfig,
      apis: apiConfigs,
      notifications
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'nubiago-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        if (settings.airtable) setAirtableConfig(settings.airtable);
        if (settings.apis) setApiConfigs(settings.apis);
        if (settings.notifications) setNotifications(settings.notifications);
        alert('Settings imported successfully!');
      } catch (error) {
        alert('Invalid settings file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const sections = [
    { id: 'airtable', label: 'Airtable Integration', icon: Database },
    { id: 'apis', label: 'API Configurations', icon: Globe },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'advanced', label: 'Advanced Settings', icon: SettingsIcon }
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Settings & Integrations
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Configure Airtable, APIs, and system preferences for real-time data
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".json"
            onChange={importSettings}
            className="hidden"
            id="import-settings"
          />
          <label htmlFor="import-settings">
            <Button variant="outline" icon={<Upload className="w-5 h-5" />} size="lg">
              Import Settings
            </Button>
          </label>
          <Button variant="outline" icon={<Download className="w-5 h-5" />} size="lg" onClick={exportSettings}>
            Export Settings
          </Button>
          <Button variant="primary" icon={<Save className="w-5 h-5" />} size="lg" onClick={saveSettings} loading={isSaving}>
            Save All Settings
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Sidebar Navigation */}
        <div className="xl:col-span-1">
          <Card title="Configuration Sections" variant="gradient">
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="xl:col-span-3 space-y-8">
          {/* Airtable Integration */}
          {activeSection === 'airtable' && (
            <div className="space-y-6">
              <Card title="Airtable Integration" subtitle="Connect your Airtable base for real-time data sync" variant="gradient">
                <div className="space-y-6">
                  {/* Connection Status */}
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <Database className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">Connection Status</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {connectionStatus === 'success' ? 'Connected and syncing' : 
                           connectionStatus === 'error' ? 'Connection failed' : 'Not connected'}
                        </div>
                      </div>
                    </div>
                    {connectionStatus === 'success' && (
                      <Badge variant="success" icon={<CheckCircle className="w-3 h-3" />}>Connected</Badge>
                    )}
                    {connectionStatus === 'error' && (
                      <Badge variant="error" icon={<AlertCircle className="w-3 h-3" />}>Failed</Badge>
                    )}
                  </div>

                  {/* Base Configuration */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Airtable Base ID
                      </label>
                      <input
                        type="text"
                        value={airtableConfig.baseId}
                        onChange={(e) => setAirtableConfig({...airtableConfig, baseId: e.target.value})}
                        placeholder="appXXXXXXXXXXXXXX"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Found in your Airtable base URL
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        API Key
                      </label>
                      <div className="relative">
                        <input
                          type={showApiKeys ? "text" : "password"}
                          value={airtableConfig.apiKey}
                          onChange={(e) => setAirtableConfig({...airtableConfig, apiKey: e.target.value})}
                          placeholder="keyXXXXXXXXXXXXXX"
                          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKeys(!showApiKeys)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {showApiKeys ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Generate from your Airtable account settings
                      </p>
                    </div>
                  </div>

                  {/* Table Mappings */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Table Mappings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(airtableConfig.tables).map(([key, value]) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                            {key} Table
                          </label>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => setAirtableConfig({
                              ...airtableConfig,
                              tables: { ...airtableConfig.tables, [key]: e.target.value }
                            })}
                            placeholder={`tbl${key.charAt(0).toUpperCase() + key.slice(1)}`}
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Test Connection */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button 
                      variant="primary" 
                      icon={<TestTube className="w-5 h-5" />}
                      onClick={testAirtableConnection}
                      loading={isConnecting}
                    >
                      Test Connection
                    </Button>
                    <Button 
                      variant="outline" 
                      icon={<ExternalLink className="w-5 h-5" />}
                      onClick={() => window.open('https://airtable.com/api', '_blank')}
                    >
                      Airtable API Docs
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* API Configurations */}
          {activeSection === 'apis' && (
            <div className="space-y-6">
              <Card title="API Configurations" subtitle="Manage external API integrations" variant="gradient">
                <div className="space-y-6">
                  {apiConfigs.map((api, index) => (
                    <div key={index} className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/30">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          <input
                            type="text"
                            value={api.name}
                            onChange={(e) => updateAPIConfig(index, 'name', e.target.value)}
                            className="font-semibold text-lg bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={api.enabled}
                              onChange={(e) => updateAPIConfig(index, 'enabled', e.target.checked)}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Enabled</span>
                          </label>
                          <Button
                            variant="ghost"
                            size="sm"
                            icon={<Trash2 className="w-4 h-4" />}
                            onClick={() => removeAPI(index)}
                            className="text-error-600 hover:text-error-700"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            API Endpoint
                          </label>
                          <input
                            type="url"
                            value={api.endpoint}
                            onChange={(e) => updateAPIConfig(index, 'endpoint', e.target.value)}
                            placeholder="https://api.example.com/v1"
                            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            API Key
                          </label>
                          <div className="relative">
                            <input
                              type={showApiKeys ? "text" : "password"}
                              value={api.apiKey}
                              onChange={(e) => updateAPIConfig(index, 'apiKey', e.target.value)}
                              placeholder="Enter API key"
                              className="w-full px-3 py-2 pr-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
                            />
                            <button
                              type="button"
                              onClick={() => setShowApiKeys(!showApiKeys)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                              {showApiKeys ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <Button variant="outline" icon={<Zap className="w-5 h-5" />} onClick={addNewAPI}>
                    Add New API Integration
                  </Button>
                </div>
              </Card>
            </div>
          )}

          {/* Notifications */}
          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <Card title="Notification Preferences" subtitle="Configure how you receive updates" variant="gradient">
                <div className="space-y-6">
                  {/* Notification Channels */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Channels</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                        <input
                          type="checkbox"
                          checked={notifications.email}
                          onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Email Notifications</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</div>
                        </div>
                      </label>
                      
                      <label className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                        <input
                          type="checkbox"
                          checked={notifications.push}
                          onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Push Notifications</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">Browser push notifications</div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Notification Types */}
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Types</h4>
                    <div className="space-y-3">
                      {[
                        { key: 'lowStock', label: 'Low Stock Alerts', description: 'When product inventory is running low' },
                        { key: 'newOrders', label: 'New Orders', description: 'When new orders are placed' },
                        { key: 'agentUpdates', label: 'Agent Updates', description: 'Agent status changes and achievements' },
                        { key: 'systemAlerts', label: 'System Alerts', description: 'Important system notifications' }
                      ].map((item) => (
                        <label key={item.key} className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200">
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof NotificationSettings]}
                            onChange={(e) => setNotifications({...notifications, [item.key]: e.target.checked})}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 dark:text-white">{item.label}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Security & Privacy */}
          {activeSection === 'security' && (
            <div className="space-y-6">
              <Card title="Security & Privacy" subtitle="Manage data security and privacy settings" variant="gradient">
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-warning-600 dark:text-warning-400 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-warning-800 dark:text-warning-300 mb-2">Data Security Notice</h4>
                        <p className="text-sm text-warning-700 dark:text-warning-400 leading-relaxed">
                          All API keys and sensitive data are encrypted and stored securely. We recommend using environment variables 
                          for production deployments and regularly rotating your API keys.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Data Retention</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Auto-delete logs after 30 days</span>
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Encrypt stored API keys</span>
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        </label>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Access Control</h4>
                      <div className="space-y-3">
                        <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Require 2FA for settings</span>
                          <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        </label>
                        <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Session timeout (30 min)</span>
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Advanced Settings */}
          {activeSection === 'advanced' && (
            <div className="space-y-6">
              <Card title="Advanced Settings" subtitle="System configuration and developer options" variant="gradient">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Data Sync Interval
                      </label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200">
                        <option value="5">Every 5 minutes</option>
                        <option value="15" selected>Every 15 minutes</option>
                        <option value="30">Every 30 minutes</option>
                        <option value="60">Every hour</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Cache Duration
                      </label>
                      <select className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200">
                        <option value="300">5 minutes</option>
                        <option value="900" selected>15 minutes</option>
                        <option value="1800">30 minutes</option>
                        <option value="3600">1 hour</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Developer Options</h4>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Enable Debug Mode</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Show detailed logs and API responses</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      </label>
                      <label className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">API Rate Limiting</span>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Prevent API quota exhaustion</p>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <Button variant="outline" icon={<RefreshCw className="w-5 h-5" />}>
                        Reset to Defaults
                      </Button>
                      <Button variant="outline" icon={<Download className="w-5 h-5" />}>
                        Download Logs
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}