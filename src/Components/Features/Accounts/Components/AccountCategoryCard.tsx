import { Banknote, CreditCard, LineChart, PiggyBank } from 'lucide-react';

interface Account {
  amount: number;
  title?: string;
  bank?: string;
}

interface AccountCategoryCardProps {
  title: string;
  account: Account[];
}

// Función que determina ícono y color según el título de la categoría
const getAccountCardProps = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('corriente')) return { icon: <CreditCard className="text-blue-300" />, color: 'text-blue-300' };
  if (t.includes('ahorros')) return { icon: <LineChart className="text-blue-300" />, color: 'text-blue-300' };
  if (t.includes('efectivo')) return { icon: <PiggyBank className="text-yellow-300" />, color: 'text-yellow-300' };
  if (t.includes('banco') || t.includes('corriente') || t.includes('ahorros')) return { icon: <Banknote className="text-red-400" />, color: 'text-red-400'   };
  return { icon: <Banknote className="text-green-400" />, color: 'text-green-400' };
};

const AccountCategoryCard = ({ title, account }: AccountCategoryCardProps) => {
  const total = account.reduce((sum, acc) => sum + acc.amount, 0);
  const { icon, color } = getAccountCardProps(title);
  
  // Descripción más específica según la categoría
  let description = `${account.length} ${account.length === 1 ? 'cuenta' : 'cuentas'}`;
  
  if (title.toLowerCase().includes('tarjetas')) {
    description = `${account.length} ${account.length === 1 ? 'tarjeta' : 'tarjetas'}`;
  } else if (title.toLowerCase().includes('inversiones')) {
    description = `${account.length} ${account.length === 1 ? 'inversión' : 'inversiones'}`;
  }

  return (
     <div className="border border-white/20 p-4 rounded-lg w-60 text-white shadow flex flex-col gap-2">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className={`text-2xl font-bold ${color}`}>
            ${total.toLocaleString('es-CO')}
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className="bg-[#1f2937] p-2 rounded-full">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AccountCategoryCard;
