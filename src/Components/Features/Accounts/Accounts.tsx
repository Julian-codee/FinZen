import { Banknote, CreditCard, LineChart, PiggyBank } from 'lucide-react';
import { useState } from 'react';

import AccountCard from './Components/AccountCard';
import BalanceToggle from './Components/BalanceToggle';
import AccountTabs from './Components/AccountTabs';
import TotalBalance from './Components/TotalBalance';
import AccountList from './Components/AccountList';

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
        <AccountCard
          account={{
            id: 101,
            title: 'Cuentas Bancarias',
            bank: '3 cuentas activas',
            amount: 20200.45,
          }}
          icon={<Banknote className="text-blue-400" />}
          visible={visible}
        />
        <AccountCard
          account={{
            id: 102,
            title: 'Tarjetas de Crédito',
            bank: '3 tarjetas',
            amount: 2450.3,
          }}
          textColor="text-red-400"
          icon={<CreditCard className="text-red-400" />}
          visible={visible}
        />
        <AccountCard
          account={{
            id: 103,
            title: 'Inversiones',
            bank: '2 inversiones',
            amount: 20200.0,
          }}
          icon={<LineChart className="text-blue-300" />}
          visible={visible}
        />
        <AccountCard
          account={{
            id: 104,
            title: 'Efectivo',
            bank: 'Dinero en efectivo',
            amount: 3550.5,
          }}
          icon={<PiggyBank className="text-yellow-300" />}
          visible={visible}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus Cuentas</h2>
      <AccountList visible={visible} accounts={accounts} />
    </div>
  );
};

export default Accounts;
