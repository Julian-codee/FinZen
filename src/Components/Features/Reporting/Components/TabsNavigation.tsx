import React from 'react';

interface TabsNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = ['Resumen', 'Ingresos/Gastos', 'Categorías', 'Tendencias'];

  return (
    <div className="flex border border-gray-800 rounded-md p-1 bg-[#0F1525] overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-md text-sm whitespace-nowrap ${
            activeTab === tab
              ? 'bg-gray-800 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab === 'Resumen' && (
            <svg className="w-4 h-4 inline mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          )}
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabsNavigation;