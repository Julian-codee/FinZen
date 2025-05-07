interface TabSwitcherProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
  }
  
  const TabSwitcher = ({ activeTab, setActiveTab }: TabSwitcherProps) => {
    const tabs = ['Resumen', 'Ingresos/Gastos', 'Categorías', 'Tendencias'];
  
    return (
      <div className="flex bg-[#0F1525] rounded-lg p-1 mb-6 w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
              ${activeTab === tab
                ? 'bg-[#1D283A] text-white shadow-sm'
                : 'text-gray-400 hover:text-white hover:bg-[#1A2235]'}`}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default TabSwitcher;
  