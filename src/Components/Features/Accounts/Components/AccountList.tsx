interface AccountListProps {
  visible: boolean;
  accounts: Array<{
    id: number;
    title: string;
    bank: string;
    amount: number;
  }>;
}

const AccountList = ({ visible, accounts }: AccountListProps) => (
  <div className="space-y-4">
    {accounts.map((account) => (
      <div key={account.id} className="bg-[#111827] p-4 rounded-lg text-white shadow">
        <h4 className="font-semibold text-lg mb-1">{account.title}</h4>
        <p className="text-sm text-gray-400">{account.bank}</p>
        <p className="text-xs text-gray-500 mt-1">Saldo disponible</p>
        <p className="text-2xl font-bold mt-1">
          {visible ? `$${account.amount.toLocaleString('es-CO')}` : '•••••••'}
        </p>
        <div className="mt-4 text-center border-t border-gray-700 pt-2 text-sm text-blue-400 cursor-pointer hover:underline">
          Ver movimientos
        </div>
      </div>
    ))}
  </div>
);

export default AccountList;
