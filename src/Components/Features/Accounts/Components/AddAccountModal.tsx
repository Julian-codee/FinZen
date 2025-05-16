import { useState } from "react";
import { X, Landmark, PiggyBank, Wallet } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AddAccountModal({ open, onClose }: Props) {
  const [accountType, setAccountType] = useState<"corriente" | "ahorros" | "efectivo" | null>(null);

  if (!open) return null;

  return (
   <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-[#020817] text-white rounded-xl shadow-lg w-full max-w-md p-6 relative">

        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold">Añadir Nueva Cuenta</h2>
        <p className="text-sm text-gray-400 mt-1">Añade una nueva cuenta bancaria o de efectivo a tu perfil financiero.</p>

        {/* Form */}
        <div className="space-y-4 mt-6">

          {/* Nombre */}
          <div>
            <label className="block text-sm mb-1">Nombre de la cuenta</label>
            <input
              type="text"
              placeholder="Ej: Cuenta Corriente Principal"
              className="w-full px-4 py-2 rounded-lg bg-[#020817] text-white placeholder-gray-500 border-white/700  focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Tipo de cuenta */}
          <div>
            <label className="block text-sm mb-2">Tipo de cuenta</label>
            <div className="flex gap-2">
              <button
                onClick={() => setAccountType("corriente")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border transition 
                  ${accountType === "corriente" ? "bg-[#1e293b] border-blue-600 text-white" : "bg-[#1e293b] border-[#334155] text-gray-400 hover:border-blue-600"}`}
              >
                <Landmark className="w-4 h-4" /> Corriente
              </button>
              <button
                onClick={() => setAccountType("ahorros")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border transition 
                  ${accountType === "ahorros" ? "bg-[#1e293b] border-blue-600 text-white" : "bg-[#1e293b] border-[#334155] text-gray-400 hover:border-blue-600"}`}
              >
                <PiggyBank className="w-4 h-4" /> Ahorros
              </button>
              <button
                onClick={() => setAccountType("efectivo")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border transition 
                  ${accountType === "efectivo" ? "bg-[#1e293b] border-yellow-500 text-white" : "bg-[#1e293b] border-[#334155] text-gray-400 hover:border-yellow-500"}`}
              >
                <Wallet className="w-4 h-4" /> Efectivo
              </button>
            </div>
          </div>

          {/* Banco */}
          <div>
            <label className="block text-sm mb-1">Banco</label>
            <input
              type="text"
              placeholder="Ej: Banco Santander"
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Número de cuenta */}
          <div>
            <label className="block text-sm mb-1">Número de cuenta (últimos 4 dígitos)</label>
            <input
              type="text"
              placeholder="Ej: 1234"
              className="w-full px-4 py-2 rounded-lg bg-[#1e293b] text-white placeholder-gray-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Saldo inicial */}
          <div>
            <label className="block text-sm mb-1">Saldo inicial</label>
            <div className="flex items-center bg-[#1e293b] rounded-lg px-3 py-2 border border-transparent focus-within:ring-2 focus-within:ring-blue-600">
              <span className="text-gray-400 mr-2">$</span>
              <input
                type="text"
                placeholder="0.00"
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white transition"
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition"
            >
              Crear cuenta
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
