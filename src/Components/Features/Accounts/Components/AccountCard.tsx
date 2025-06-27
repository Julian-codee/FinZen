"use client";

import { useState } from "react";
import { MoreVertical, Edit2, Trash2, AlertTriangle } from "lucide-react";
import { Account } from "../Accounts";

interface AccountCardProps {
  account: Account;
  visible: boolean;
  onViewMovements: (account: Account) => void;
  onEditAccount: (account: Account) => void;
  onDeleteAccount: (id: number) => void;
}

const AccountCard = ({
  account,
  visible,
  onViewMovements,
  onEditAccount,
  onDeleteAccount,
}: AccountCardProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleEdit = () => {
    onEditAccount(account);
    setDropdownOpen(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
    setDropdownOpen(false);
  };

  const confirmDelete = () => {
    // Verificar que el ID existe antes de proceder
    if (account.id) {
      onDeleteAccount(account.id);
      setShowDeleteConfirm(false);
    } else {
      console.error('No se puede eliminar: ID de cuenta no válido');
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="bg-[#111827] p-4 rounded-lg text-white shadow border border-gray-700 relative">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-1">{account.title}</h4>
            <p className="text-sm text-gray-400">
              {account.bank || account.platform || "Sin especificar"}
            </p>
            {account.number && (
              <p className="text-xs text-gray-500">
                •••• {account.number}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">Saldo disponible</p>
            <p className="text-2xl font-bold mt-1">
              {visible
                ? `$${account.amount.toLocaleString("es-CO")}`
                : "......."}
            </p>
            {account.creditLimit && (
              <p className="text-xs text-gray-400 mt-1">
                Límite: ${account.creditLimit.toLocaleString("es-CO")}
              </p>
            )}
            <div
              className="mt-4 text-center border-t border-gray-700 pt-2 text-sm text-blue-400 cursor-pointer hover:underline"
              onClick={() => onViewMovements(account)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onViewMovements(account);
                }
              }}
            >
              Ver Movimientos
            </div>
          </div>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="p-2 rounded-full hover:bg-gray-600 transition-colors"
            >
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-[#1f2937] border border-gray-600 rounded-lg shadow-lg z-20">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-600 transition-colors"
                    onClick={handleEdit}
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Editar
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-600 transition-colors"
                    onClick={handleDeleteClick}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#020817] border border-white/20 text-white rounded-xl shadow-lg w-full max-w-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500 mr-3" />
              <h3 className="text-lg font-semibold">Confirmar Eliminación</h3>
            </div>
            
            <p className="text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar la cuenta{" "}
              <span className="font-semibold text-white">"{account.title}"</span>?
              Esta acción no se puede deshacer.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-md bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AccountCard;