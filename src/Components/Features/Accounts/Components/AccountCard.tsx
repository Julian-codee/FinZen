import { ReactNode } from 'react';

interface AccountCardProps {
  account: {
    id: number;
    title: string;
    bank: string;
    amount: number;
  };
  icon: ReactNode;
  visible?: boolean;
  textColor?: string;
}

const AccountCard = ({
  account,
  icon,
  visible = true,
  textColor = 'text-white',
}: AccountCardProps) => (
  <div className="border border-white/20 p-4 rounded-lg w-60 text-white shadow flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm font-medium">{account.title}</h3>
        <div className={`text-2xl font-bold ${textColor}`}>
          {visible
            ? `$${(account.amount ?? 0).toLocaleString('es-CO')}`
            : '•••••••'}
        </div>
        <p className="text-gray-400 text-sm">{account.bank}</p>
      </div>
      <div className="bg-[#1f2937] p-2 rounded-full">
        {icon}
      </div>
    </div>
  </div>
);

export default AccountCard;
