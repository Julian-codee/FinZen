// Define the Accounts type if not already imported
import { Account } from '../Accounts'; // Asegúrate de que la ruta sea correcta
interface AccountListProps {
  visible: boolean;
  account: Account[];
  onViewMovements: (account: Account) => void; // función que abre modal con cuenta
}

const AccountList = ({ visible, account, onViewMovements }: AccountListProps) => (
  <div className="space-y-4">
    {account.length > 0 ? (
      account.map((account) => (
        <div
          key={account.id}
          className="bg-[#111827] p-4 rounded-lg text-white shadow border border-gray-700"
        >
          <h4 className="font-semibold text-lg mb-1">{account.title}</h4>
          <p className="text-sm text-gray-400">{account.bank}</p>
          <p className="text-xs text-gray-500 mt-1">Saldo disponible</p>
          <p className="text-2xl font-bold mt-1">
            {visible ? `$${account.amount.toLocaleString('es-CO')}` : '.......'}
          </p>
          <div
            className="mt-4 text-center border-t border-gray-700 pt-2 text-sm text-blue-400 cursor-pointer hover:underline"
            onClick={() => onViewMovements(account)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onViewMovements(account);
              }
            }}
          >
            Ver Movimientos
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-400">No hay cuentas disponibles.</p>
    )}
  </div>
);

export default AccountList;
