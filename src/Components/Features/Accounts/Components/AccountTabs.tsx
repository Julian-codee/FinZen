interface TabProps {
    selectedTab: string;
    onSelectTab: (tab: string) => void;
}

const tabs = ['Cuentas', 'Tarjetas', 'Inversiones'];

const AccountTabs = ({ selectedTab, onSelectTab }: TabProps) => (
    <div className="flex bg-[#0f1525] rounded-lg p-1 w-fit">
        {tabs.map(tab => (
            <button
                key={tab}
                onClick={() => onSelectTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                    ${selectedTab === tab
                        ? 'bg-[#1d283a] text-white shadow-sm'
                        : 'text-gray-400 hover:text-white hover:bg-[#1a2235]'}`}
                >
                        {tab}
                        </button>
                   
        ))}
    </div>
);

export default AccountTabs;