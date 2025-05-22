import {
  Banknote,
  CreditCard,
  LineChart,
  PiggyBank,
} from 'lucide-react';
import { useState } from 'react';

import AccountCard from './Components/AccountCard';
import BalanceToggle from './Components/BalanceToggle';
import AccountTabs from './Components/AccountTabs';
import TotalBalance from './Components/TotalBalance';
import AccountList from './Components/AccountList';

// Mapeo dinámico de tipos de cuenta → ícono y color
const accountTypeMap = [
  { keyword: 'crédito', icon: <CreditCard className="text-red-400" />, color: 'text-red-400' },
  { keyword: 'inversión', icon: <LineChart className="text-blue-300" />, color: 'text-blue-300' },
  { keyword: 'efectivo', icon: <PiggyBank className="text-yellow-300" />, color: 'text-yellow-300' },
  { keyword: 'banco', icon: <Banknote className="text-blue-400" />, color: 'text-blue-400' },
  { keyword: '', icon: <Banknote className="text-green-400" />, color: 'text-green-400' }, // default
];

// Función dinámica para determinar ícono y color basado en el título
const getAccountCardProps = (title: string) => {
  const t = title.toLowerCase();
  const match = accountTypeMap.find((entry) => t.includes(entry.keyword));
  return match || accountTypeMap[accountTypeMap.length - 1]; // fallback
};

const Accounts = () => {
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState('Cuentas');
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      title: 'Cuenta Corriente',
      bank: 'Banco Santander',
      amount: 8250.45,
    },
    {
      id: 2,
      title: 'Inversión Fondo Mutuo',
      bank: 'Bancolombia',
      amount: 5200.0,
    },
  ]);

  return (
    <div className="bg-[#020817] min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Cuentas</h1>
      <p className="text-gray-400 mb-4">
        Gestiona tus cuentas bancarias, tarjetas y otros activos financieros.
      </p>

      <TotalBalance visible={visible} amount="41.500,65" />

      <div className="flex justify-between items-center mt-4 mb-6">
        <AccountTabs
          selectedTab={tab}
          onSelectTab={setTab}
          onAddAccount={(newAccount) =>
            setAccounts((prev) => [...prev, newAccount])
          }
        />
        <BalanceToggle visible={visible} toggle={() => setVisible(!visible)} />
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        {accounts.map((acc) => {
          const { icon, color } = getAccountCardProps(acc.title);
          return (
            <AccountCard
              key={acc.id}
              account={acc}
              icon={icon}
              textColor={color}
              visible={visible}
            />
          );
        })}
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus Cuentas</h2>
      <AccountList visible={visible} accounts={accounts} />
    </div>
  );
};

export default Accounts;
