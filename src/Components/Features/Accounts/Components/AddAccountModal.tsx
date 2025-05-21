import { useState, useEffect, useId } from "react";
import { X, Landmark, PiggyBank, Wallet } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (account: {
    id: number;
    name: string;
    type: string;
    bank: string;
    number: string;
    balance: number;
  }) => void;
}

export default function AddAccountModal({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState<"corriente" | "ahorros" | "efectivo" | null>(null);
  const [bank, setBank] = useState("");
  const [number, setNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [errors, setErrors] = useState({
    name: false,
    type: false,
    bank: false,
    number: false,
    balance: false,
  });

  const nameInputId = useId();

  useEffect(() => {
    if (!open) {
      setName("");
      setAccountType(null);
      setBank("");
      setNumber("");
      setBalance("");
      setErrors({
        name: false,
        type: false,
        bank: false,
        number: false,
        balance: false,
      });
    }
  }, [open]);

  const validate = () => {
    const newErrors = {
      name: name.trim() === "",
      type: accountType === null,
      bank: bank.trim() === "",
      number: number.trim() === "" || number.length !== 4,
      balance: balance.trim() === "" || isNaN(Number(balance)),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleAdd = () => {
    if (!validate()) return;

    onAdd({
      id: Date.now(),
      name,
      type: accountType!,
      bank,
      number,
      balance: parseFloat(balance),
    });

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/20 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold">Añadir Nueva Cuenta</h2>
        <p className="text-sm text-gray-400 mt-1">Añade una nueva cuenta bancaria o de efectivo a tu perfil financiero.</p>

        <div className="space-y-4 mt-6">
          <div>
            <label htmlFor={nameInputId} className="block text-sm mb-1">Nombre de la cuenta</label>
            <input
              id={nameInputId}
              type="text"
              placeholder="Ej: Cuenta Corriente Principal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#020817] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.name ? "border-red-500" : "border-white/40"
              }`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">Tipo de cuenta</label>
            <div className="flex gap-2">
              <button
                onClick={() => setAccountType("corriente")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border transition 
                  ${
                    accountType === "corriente"
                      ? "bg-[#020817] border-white/40 text-white"
                      : "bg-[#1e293b] border-[#334155] text-gray-400 hover:border-blue-600"
                  }`}
              >
                <Landmark className="w-4 h-4" /> Corriente
              </button>
              <button
                onClick={() => setAccountType("ahorros")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border transition 
                  ${
                    accountType === "ahorros"
                      ? "bg-[#1e293b] border-blue-600 text-white"
                      : "bg-[#1e293b] border-[#334155] text-gray-400 hover:border-blue-600"
                  }`}
              >
                <PiggyBank className="w-4 h-4" /> Ahorros
              </button>
              <button
                onClick={() => setAccountType("efectivo")}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border transition 
                  ${
                    accountType === "efectivo"
                      ? "bg-[#1e293b] border-yellow-500 text-white"
                      : "bg-[#1e293b] border-[#334155] text-gray-400 hover:border-yellow-500"
                  }`}
              >
                <Wallet className="w-4 h-4" /> Efectivo
              </button>
            </div>
            {errors.type && <p className="text-red-500 text-sm mt-1">Selecciona un tipo de cuenta.</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Banco</label>
            <input
              type="text"
              placeholder="Ej: Banco Santander"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#020817] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.bank ? "border-red-500" : "border-white/40"
              }`}
            />
            {errors.bank && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Número de cuenta (últimos 4 dígitos)</label>
            <input
              type="text"
              placeholder="Ej: 1234"
              value={number}
              maxLength={4}
              onChange={(e) => setNumber(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#020817] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.number ? "border-red-500" : "border-white/40"
              }`}
            />
            {errors.number && <p className="text-red-500 text-sm mt-1">Ingresa los 4 dígitos.</p>}
          </div>

          <div>
            <label className="block text-sm mb-1">Saldo inicial</label>
            <div
              className={`flex items-center bg-[#020817] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-600 ${
                errors.balance ? "border-red-500" : "border-white/40 border"
              }`}
            >
              <span className="text-gray-400 mr-2">$</span>
              <input
                type="text"
                placeholder="0.00"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              />
            </div>
            {errors.balance && <p className="text-red-500 text-sm mt-1">Ingresa un monto válido.</p>}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-transparent border border-gray-600 text-gray-300 hover:text-white hover:border-white transition"
            >
              Cancelar
            </button>
            <button
              onClick={handleAdd}
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
