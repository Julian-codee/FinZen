import {
  Banknote,
  CreditCard,
  LineChart,
  PiggyBank,
} from 'lucide-react';
import { useState } from 'react';

import AccountTabs from './Components/AccountTabs';
import TotalBalance from './Components/TotalBalance';
import BalanceToggle from './Components/BalanceToggle';
import AccountList from './Components/AccountList';
import AccountCategoryCard from './Components/AccountCategoryCard';

// Función que determina ícono y color según el título
const getAccountCardProps = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('corriente')) return { icon: <CreditCard className="text-red-400" />, color: 'text-red-400' };
  if (t.includes('ahorros')) return { icon: <LineChart className="text-blue-300" />, color: 'text-blue-300' };
  if (t.includes('efectivo')) return { icon: <PiggyBank className="text-yellow-300" />, color: 'text-yellow-300' };
  if (t.includes('banco') || t.includes('corriente') || t.includes('ahorros')) return { icon: <Banknote className="text-blue-400" />, color: 'text-blue-400' };
  return { icon: <Banknote className="text-green-400" />, color: 'text-green-400' };
};

// Agrupa cuentas por tipo (según keyword detectado en el título)
const groupAccountsByCategory = (accounts: { title: string; amount: number }[]) => {
  const categories: { [key: string]: typeof accounts } = {};

  accounts.forEach((account) => {
    const t = account.title.toLowerCase();
    let category = 'Otros';

    if (t.includes('corriente')) category = 'Corriente';
    else if (t.includes('ahorros')) category = 'Ahorros';
    else if (t.includes('efectivo')) category = 'Efectivo';
    else if (t.includes('banco') || t.includes('corriente') || t.includes('ahorros')) category = 'Banco';

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(account);
  });

  return categories;
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
    {
      id: 3,
      title: 'Tarjeta de Crédito',
      bank: 'Banco Popular',
      amount: 3000.0,
    },
    {
      id: 4,
      title: 'Efectivo Principal',
      bank: 'Caja',
      amount: 1500.0,
    },
  ]);

  const grouped = groupAccountsByCategory(accounts);

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

      {/* Tarjetas por categoría */}
      <div className="flex flex-wrap gap-4 mb-6">
        {Object.entries(grouped).map(([title, group]) => (
          <AccountCategoryCard key={title} title={title} accounts={group} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus Cuentas</h2>
      <AccountList visible={visible} accounts={accounts} />
    </div>
  );
};

export default Accounts