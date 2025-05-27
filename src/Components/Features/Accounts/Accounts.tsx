import { useState } from 'react';
import {
  Banknote,
  CreditCard,
  LineChart,
  PiggyBank,
} from 'lucide-react';

import MovementsModal from './Components/MovementsModal';
import AccountTabs from './Components/AccountTabs';
import TotalBalance from './Components/TotalBalance';
import BalanceToggle from './Components/BalanceToggle';
import AccountCategoryCard from './Components/AccountCategoryCard';
import AccountList from './Components/AccountList';

interface Movement {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: 'Ingreso' | 'Gasto' | 'Transferencia';
}


export interface Account {
  id: number;
  title: string;
  bank: string;
  amount: number;
  movements: Movement[];
}

// Función para determinar ícono y color según título
const getAccountCardProps = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('corriente')) return { icon: <CreditCard className="text-red-400" />, color: 'text-red-400' };
  if (t.includes('ahorros')) return { icon: <LineChart className="text-blue-300" />, color: 'text-blue-300' };
  if (t.includes('efectivo')) return { icon: <PiggyBank className="text-yellow-300" />, color: 'text-yellow-300' };
  if (t.includes('banco')) return { icon: <Banknote className="text-blue-400" />, color: 'text-blue-400' };
  return { icon: <Banknote className="text-green-400" />, color: 'text-green-400' };
};

// Agrupa cuentas por categoría
const groupAccountsByCategory = (accounts: Account[]) => {
  const categories: { [key: string]: Account[] } = {};

  accounts.forEach((account) => {
    const t = account.title.toLowerCase();
    let category = 'Otros';

    if (t.includes('corriente')) category = 'Corriente';
    else if (t.includes('ahorros')) category = 'Ahorros';
    else if (t.includes('efectivo')) category = 'Efectivo';
    else if (t.includes('banco')) category = 'Banco';

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(account);
  });

  return categories;
};

const Account = () => {
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState('Cuentas');

  const [account, setAccounts] = useState<Account[]>([
    {
      id: 1,
      title: 'Cuenta Corriente',
      bank: 'Banco Santander',
      amount: 8250.45,
     movements: [
  { id: 1, description: 'Depósito', amount: 5000, date: '2025-05-20', type: 'Ingreso' },
  { id: 2, description: 'Pago tarjeta', amount: -2000, date: '2025-05-22', type: 'Gasto' },
],

    },
    {
      id: 2,
      title: 'Inversión Fondo Mutuo',
      bank: 'Bancolombia',
      amount: 5200.0,
     movements: [
  { id: 1, description: 'Depósito', amount: 5000, date: '2025-05-20', type: 'Ingreso' },
  { id: 2, description: 'Pago tarjeta', amount: -2000, date: '2025-05-22', type: 'Gasto' },
],

    },
    {
      id: 3,
      title: 'Tarjeta de Crédito',
      bank: 'Banco Popular',
      amount: 3000.0,
     movements: [
  { id: 1, description: 'Depósito', amount: 5000, date: '2025-05-20', type: 'Ingreso' },
  { id: 2, description: 'Pago tarjeta', amount: -2000, date: '2025-05-22', type: 'Gasto' },
],

    },
    {
      id: 4,
      title: 'Efectivo Principal',
      bank: 'Caja',
      amount: 1500.0,
      movements: [],
    },
  ]);

  const totalAmount = account.reduce((sum, acc) => sum + acc.amount, 0);
  const grouped = groupAccountsByCategory(account);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleOpenModal = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  return (
    <div className="bg-[#020817] min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-2">Cuentas</h1>
      <p className="text-gray-400 mb-4">
        Gestiona tus cuentas bancarias, tarjetas y otros activos financieros.
      </p>

      <TotalBalance visible={visible} amount={totalAmount} />

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
        {Object.entries(grouped).map(([title, group]) => (
          <AccountCategoryCard key={title} title={title} account={group} />
        ))}
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus Cuentas</h2>

      {account.length === 0 ? (
        <p className="text-gray-500">No tienes cuentas registradas todavía.</p>
      ) : (
        <AccountList
          visible={visible}
          account={account}
          onViewMovements={handleOpenModal}
        />
      )}

      <MovementsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        account={selectedAccount}
      />
    </div>
  );
};

export default Account;
