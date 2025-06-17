"use client";

import AccountCard from "./AccountCard";
import { Account } from "../Accounts";

interface AccountListProps {
  visible: boolean;
  account: Account[];
  onViewMovements: (account: Account) => void;
  onEditAccount: (account: Account) => void;
  onDeleteAccount: (id: number) => void;
}

const AccountList = ({
  visible,
  account,
  onViewMovements,
  onEditAccount,
  onDeleteAccount,
}: AccountListProps) => {
  return (
    <div className="space-y-4">
      {account.length > 0 ? (
        account.map((acc) => (
          <AccountCard
            key={`${acc.originalType || 'unknown'}-${acc.id}`} // Key único compuesto
            account={acc}
            visible={visible}
            onViewMovements={onViewMovements}
            onEditAccount={onEditAccount}
            onDeleteAccount={onDeleteAccount}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">No hay cuentas disponibles</p>
          <p className="text-gray-500 text-sm mt-2">
            Comienza agregando tu primera cuenta
          </p>
        </div>
      )}
    </div>
  );
};

export default AccountList;