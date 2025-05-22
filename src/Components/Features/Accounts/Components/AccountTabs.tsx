import { useState } from "react";
import { PlusCircle } from "lucide-react";
import AddAccountModal from "./AddAccountModal";

interface TabProps {
  selectedTab: string;
  onSelectTab: (tab: string) => void;
  onAddAccount: (account: any) => void;
  tabs?: string[]; // ahora puedes personalizar las pestañas
}

const defaultTabs = ['Cuentas', 'Tarjetas', 'Inversiones'];

const AccountTabs = ({
  selectedTab,
  onSelectTab,
  onAddAccount,
  tabs = defaultTabs,
}: TabProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between bg-[#0f1525] rounded-lg p-1 w-full max-w-fit space-x-4">
        <div className="flex">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={() => onSelectTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${selectedTab === tab
                  ? 'bg-[#1d283a] text-white shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-[#1a2235]'}`}
              aria-pressed={selectedTab === tab}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all"
          aria-label="Añadir cuenta"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Añadir Cuenta
        </button>
      </div>

      <AddAccountModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={onAddAccount}
      />
    </>
  );
};

export default AccountTabs;
