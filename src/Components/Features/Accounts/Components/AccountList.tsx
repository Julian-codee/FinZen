interface AccountListProps {
  visible: boolean;
}

const AccountList = ({ visible }: AccountListProps) => (
  <div className="bg-[#111827] p-4 rounded-lg text-white shadow mt-6">
    <h4 className="font-semibold text-lg mb-1">Cuenta Corriente</h4>
    <p className="text-sm text-gray-400">Banco Santander</p>
    <p className="text-xs text-gray-500 mt-1">Saldo disponible</p>31
    <p className="text-2xl font-bold mt-1">
      {visible ? '$8250,45' : '•••••••'}
    </p>
    <div className="mt-4 text-center border-t border-gray-700 pt-2 text-sm text-blue-400 cursor-pointer hover:underline">
      Ver movimientos
    </div>
  </div>
);

export default AccountList;
