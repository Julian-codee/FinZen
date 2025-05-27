import {
  Banknote,
  CreditCard,
  LineChart,
  PiggyBank,
} from 'lucide-react';

interface Account {
  id: number;
  title: string;
  bank: string;
  amount: number;
}

interface AccountCardProps {
  title: string;
  accounts: Account[];
  visible?: boolean;
}

// Map para identificar íconos y colores según tipo
const accountTypeMap = [
  { keyword: 'crédito', icon: <CreditCard className="text-red-400" />, color: 'text-red-400' },
  { keyword: 'inversión', icon: <LineChart className="text-blue-300" />, color: 'text-blue-300' },
  { keyword: 'efectivo', icon: <PiggyBank className="text-yellow-300" />, color: 'text-yellow-300' },
  { keyword: 'banco', icon: <Banknote className="text-blue-400" />, color: 'text-blue-400' },
  { keyword: '', icon: <Banknote className="text-green-400" />, color: 'text-green-400' }, // por defecto
];

// Función auxiliar para obtener ícono y color según título
const getAccountCardProps = (title: string) => {
  const t = title.toLowerCase();
  const match = accountTypeMap.find((entry) => t.includes(entry.keyword));
  return match || accountTypeMap[accountTypeMap.length - 1];
};

const AccountCard = ({
  title,
  accounts,
  visible = true,
}: AccountCardProps) => {
  const total = accounts.reduce((sum, acc) => sum + acc.amount, 0);
  const { icon, color } = getAccountCardProps(title);
  const description = `${accounts.length} ${accounts.length === 1 ? 'cuenta' : 'cuentas'} ${title.toLowerCase().includes('crédito') ? '' : 'activas'}`;

  return (
    <div className="border border-white/20 p-6 rounded-2xl w-96 text-white shadow-xl flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <div className={`text-2xl font-bold ${color}`}>
            {visible
              ? `$${total.toLocaleString('es-CO')}`
              : '•••••••'}
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

export default AccountCard;
