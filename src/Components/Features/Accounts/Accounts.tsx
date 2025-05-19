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
          title="Cuentas Bancarias"
          amount={visible ? '$20.200,45' : '•••••••'}
          description="3 cuentas activas"
          icon={<Banknote className="text-blue-400" />}
        />
        <AccountCard
          title="Tarjetas de Crédito"
          amount={visible ? '$2450,30' : '•••••••'}
          description="3 tarjetas"
          textColor="text-red-400"
          icon={<CreditCard className="text-red-400" />}
        />
        <AccountCard
          title="Inversiones"
          amount={visible ? '$20.200,00' : '•••••••'}
          description="2 inversiones"
          icon={<LineChart className="text-blue-300" />}
        />
        <AccountCard
          title="Efectivo"
          amount={visible ? '$3550,50' : '•••••••'}
          description="Dinero en efectivo"
          icon={<PiggyBank className="text-yellow-300" />}
        />
      </div>

      <h2 className="text-xl font-semibold mb-4">Tus Cuentas</h2>
      <AccountList visible={visible} accounts={accounts} />
    </div>
  );
};

export default Accounts;
