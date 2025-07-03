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

// Define iconos y colores según el tipo
const getAccountCardProps = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes('corriente')) return { icon: <CreditCard className="w-5 h-5 text-blue-400" />, color: 'text-blue-400', gradientFrom: 'from-blue-900/20' };
  if (t.includes('ahorros')) return { icon: <LineChart className="w-5 h-5 text-green-400" />, color: 'text-green-400', gradientFrom: 'from-green-900/20' };
  if (t.includes('efectivo')) return { icon: <PiggyBank className="w-5 h-5 text-yellow-400" />, color: 'text-yellow-400', gradientFrom: 'from-yellow-900/20' };
  if (t.includes('tarjeta')) return { icon: <CreditCard className="w-5 h-5 text-purple-400" />, color: 'text-purple-400', gradientFrom: 'from-purple-900/20' };
  return { icon: <Banknote className="w-5 h-5 text-white" />, color: 'text-white', gradientFrom: 'from-slate-800/60' };
};

const AccountCategoryCard = ({ title, account }: AccountCategoryCardProps) => {
  const total = account.reduce((sum, acc) => sum + acc.amount, 0);
  const { icon, color, gradientFrom } = getAccountCardProps(title);

  // Descripción
  let description = `${account.length} ${account.length === 1 ? 'cuenta' : 'cuentas'}`;
  if (title.toLowerCase().includes('tarjetas')) {
    description = `${account.length} ${account.length === 1 ? 'tarjeta' : 'tarjetas'}`;
  } else if (title.toLowerCase().includes('inversiones')) {
    description = `${account.length} ${account.length === 1 ? 'inversión' : 'inversiones'}`;
  }

  return (
    <div className="group relative overflow-hidden w-full max-w-xs">
      {/* Fondo degradado dinámico */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} to-slate-900/80 rounded-2xl transition-all duration-300 group-hover:scale-[1.02]`} />

      {/* Borde con degradado */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-700/50 via-transparent to-slate-600/30 p-[1px]">
        <div className="h-full w-full rounded-2xl bg-slate-900/90 backdrop-blur-sm" />
      </div>

      {/* Contenido */}
      <div className="relative p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-400">{title}</h3>
          </div>
          <div className="p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 group-hover:border-slate-600/50 transition-colors">
            {icon}
          </div>
        </div>

        <div className={`text-white text-2xl lg:text-3xl font-bold mb-3 ${color} tracking-tight`}>
          ${total.toLocaleString('es-CO')}
        </div>

        <p className="text-sm font-medium text-gray-400">
          {description}
        </p>

        {/* Elemento decorativo */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

export default AccountCategoryCard;
