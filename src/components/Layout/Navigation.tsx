import React from 'react';
import { Users, Package, Building2, MessageSquare, Sun, Moon, Monitor, Sparkles, DollarSign, TrendingUp, Settings } from 'lucide-react';
import { TabKey } from '../../types';
import { useTheme } from '../../hooks/useTheme';

interface NavigationProps {
  activeTab: TabKey;
  setActiveTab: (tab: TabKey) => void;
}

const tabs = [
  { key: 'margins' as TabKey, label: 'Margins', icon: TrendingUp, description: 'Profitability center' },
  { key: 'agents' as TabKey, label: 'Agents', icon: Users, description: 'Manage agent network' },
  { key: 'orders' as TabKey, label: 'Orders', icon: Package, description: 'Track order pipeline' },
  { key: 'suppliers' as TabKey, label: 'Suppliers', icon: Building2, description: 'Supplier relationships' },
  { key: 'feedback' as TabKey, label: 'Feedback', icon: MessageSquare, description: 'Customer support' },
  { key: 'financials' as TabKey, label: 'Financials', icon: DollarSign, description: 'Agent commissions' },
  { key: 'settings' as TabKey, label: 'Settings', icon: Settings, description: 'System configuration' },
];

const themeIcons = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const { theme, setTheme } = useTheme();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'system'> = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="p-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">NubiaGo</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Command Center</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-6 space-y-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`group w-full flex items-center gap-4 px-5 py-4 text-left rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 shadow-sm border border-primary-200 dark:border-primary-800'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-primary-100 dark:bg-primary-800/50' 
                  : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
              }`}>
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                }`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-base ${
                  isActive ? 'text-primary-700 dark:text-primary-300' : ''
                }`}>
                  {tab.label}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {tab.description}
                </div>
              </div>
              {isActive && (
                <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-subtle" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-800">
        <button
          onClick={cycleTheme}
          className="w-full flex items-center gap-4 px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 group"
          title={`Current theme: ${theme}`}
        >
          <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
            <ThemeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </div>
          <div className="flex-1 text-left">
            <div className="font-semibold text-base text-gray-700 dark:text-gray-300">Theme</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">{theme}</div>
          </div>
        </button>
      </div>
    </aside>
  );
}