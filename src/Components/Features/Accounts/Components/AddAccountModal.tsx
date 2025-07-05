"use client";

import { useState, useEffect, useId } from "react";
import { X, Landmark, PiggyBank, Wallet, CreditCard, TrendingUp, Building } from "lucide-react";
import { Account } from "../Accounts";

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (item: Account) => void;
  type?: string;
  initialData?: Account | null;
}

export default function AddAccountModal({ open, onClose, onAdd, type = "Cuentas", initialData = null }: Props) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [itemType, setItemType] = useState<string | null>(initialData?.type || "corriente");
  const [bank, setBank] = useState(initialData?.bank || "");
  const [number, setNumber] = useState(initialData?.number || "");
  const [amount, setAmount] = useState<number | "">(initialData?.amount || "");
  const [creditLimit, setCreditLimit] = useState<number | "">(initialData?.creditLimit || "");
  const [platform, setPlatform] = useState(initialData?.platform || "");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState({
    title: false,
    type: false,
    bank: false,
    number: false,
    amount: false,
    creditLimit: false,
    platform: false,
  });

  const nameInputId = useId();

  const getConfig = () => {
    switch (type) {
      case "Tarjetas":
        return {
          title: initialData ? "Editar Tarjeta" : "Añadir Nueva Tarjeta",
          description: initialData
            ? "Edita los detalles de tu tarjeta."
            : "Añade una nueva tarjeta de crédito o débito a tu perfil financiero.",
          buttonText: initialData ? "Actualizar tarjeta" : "Crear tarjeta",
          types: [
            { key: "credito", label: "Crédito", icon: CreditCard },
            { key: "debito", label: "Débito", icon: CreditCard },
          ],
        };
      case "Inversiones":
        return {
          title: initialData ? "Editar Inversión" : "Añadir Nueva Inversión",
          description: initialData
            ? "Edita los detalles de tu inversión."
            : "Añade una nueva inversión o cuenta de inversión a tu portafolio.",
          buttonText: initialData ? "Actualizar inversión" : "Crear inversión",
          types: [
            { key: "acciones", label: "Acciones", icon: TrendingUp },
            { key: "fondos", label: "Fondos", icon: Building },
            { key: "crypto", label: "Crypto", icon: TrendingUp },
          ],
        };
      default:
        return {
          title: initialData ? "Editar Cuenta" : "Añadir Nueva Cuenta",
          description: initialData
            ? "Edita los detalles de tu cuenta."
            : "Añade una nueva cuenta bancaria o de efectivo a tu perfil financiero.",
          buttonText: initialData ? "Actualizar cuenta" : "Crear cuenta",
          types: [
            { key: "corriente", label: "Corriente", icon: Landmark },
            { key: "ahorros", label: "Ahorros", icon: PiggyBank },
            { key: "efectivo", label: "Efectivo", icon: Wallet },
          ],
        };
    }
  };

  const config = getConfig();

  useEffect(() => {
    if (open) {
      setTitle(initialData?.title || "");
      setItemType(initialData?.type || "corriente");
      setBank(initialData?.bank || "");
      setNumber(initialData?.number || "");
      setAmount(initialData?.amount || "");
      setCreditLimit(initialData?.creditLimit || "");
      setPlatform(initialData?.platform || "");
      setErrorMessage(null);
      setErrors({
        title: false,
        type: false,
        bank: false,
        number: false,
        amount: false,
        creditLimit: false,
        platform: false,
      });
    }
  }, [open, initialData]);

  const validate = () => {
    const newErrors = {
      title: title.trim() === "",
      type: itemType === null,
      bank: ((type === "Cuentas" && itemType !== "efectivo") || type === "Tarjetas")
            ? bank.trim() === ""
            : false,
      number: ((type === "Cuentas" && itemType !== "efectivo") || type === "Tarjetas")
              ? number.trim().length !== 4 || !/^\d{4}$/.test(number)
              : false,
      amount: amount === "" || typeof amount !== "number" || amount < 0,
      creditLimit:
        type === "Tarjetas" && itemType === "credito"
          ? creditLimit === "" || typeof creditLimit !== "number" || creditLimit <= 0
          : false,
      platform: type === "Inversiones" ? platform.trim() === "" : false,
    };
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleAdd = async () => {
    if (!validate()) {
      setErrorMessage("Por favor, completa todos los campos correctamente.");
      return;
    }

    try {
      const finalItem: Account = {
        id: initialData?.id || Date.now(),
        uniqueId: initialData?.uniqueId || `${type.toLowerCase()}-${Date.now()}`,
        title,
        type: itemType!,
        amount: typeof amount === "number" ? amount : 0,
        bank: itemType !== "efectivo" && (type === "Cuentas" || type === "Tarjetas") ? bank : undefined,
        number: itemType !== "efectivo" && (type === "Cuentas" || type === "Tarjetas") ? number : undefined,
        creditLimit: type === "Tarjetas" && itemType === "credito" ? (typeof creditLimit === "number" ? creditLimit : 0) : undefined,
        platform: type === "Inversiones" ? platform : undefined,
        investmentType: type === "Inversiones" ? itemType ?? undefined : undefined,
        movements: initialData?.movements || [],
        freeAmount: initialData?.freeAmount,
        occupiedAmount: initialData?.occupiedAmount,
        currentValue: initialData?.currentValue,
        startDate: initialData?.startDate,
        originalType: initialData?.originalType || (
          type === "Tarjetas" ? 'tarjeta' :
          type === "Inversiones" ? 'inversion' : 'cuenta'
        ),
      };

      console.log("Guardando item:", finalItem);
      await onAdd(finalItem);
      setErrorMessage(null);
      onClose();
    } catch (error) {
      setErrorMessage("Error al guardar el item. Por favor, intenta de nuevo.");
      console.error("Error en handleAdd:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/20 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold">{config.title}</h2>
        <p className="text-sm text-gray-400 mt-1">{config.description}</p>

        <div className="space-y-4 mt-6">
          <div>
            <label htmlFor={nameInputId} className="block text-sm mb-1">
              {type === "Tarjetas"
                ? "Nombre de la tarjeta"
                : type === "Inversiones"
                ? "Nombre de la inversión"
                : "Nombre de la cuenta"}
            </label>
            <input
              id={nameInputId}
              type="text"
              placeholder={
                type === "Tarjetas"
                  ? "Ej: Tarjeta Visa Principal"
                  : type === "Inversiones"
                  ? "Ej: Portafolio Diversificado"
                  : "Ej: Cuenta Corriente Principal"
              }
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#020817] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.title ? "border-red-500" : "border-white/40"
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
          </div>

          <div>
            <label className="block text-sm mb-2">
              {type === "Tarjetas"
                ? "Tipo de tarjeta"
                : type === "Inversiones"
                ? "Tipo de inversión"
                : "Tipo de cuenta"}
            </label>
            <div className="flex gap-2">
              {config.types.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setItemType(key)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm border transition ${
                    itemType === key
                      ? "bg-[#1e293b] border-blue-600 text-white"
                      : "bg-[#1e293b] border-[#334155] text-gray-400 hover:border-blue-600"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {label}
                </button>
              ))}
            </div>
            {errors.type && <p className="text-red-500 text-sm mt-1">Selecciona un tipo.</p>}
          </div>

          {(type === "Cuentas" || type === "Tarjetas") && itemType !== "efectivo" && (
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
          )}

          {type === "Inversiones" && (
            <div>
              <label className="block text-sm mb-1">Plataforma</label>
              <input
                type="text"
                placeholder="Ej: eToro, Binance, GBM+"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg bg-[#020817] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.platform ? "border-red-500" : "border-white/40"
                }`}
              />
              {errors.platform && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
            </div>
          )}

          {(type === "Cuentas" || type === "Tarjetas") && itemType !== "efectivo" && (
            <div>
              <label className="block text-sm mb-1">
                {type === "Tarjetas" ? "Número de tarjeta (últimos 4 dígitos)" : "Número de cuenta (últimos 4 dígitos)"}
              </label>
              <input
                type="text"
                placeholder="Ej: 7392"
                value={number}
                maxLength={4}
                onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
                className={`w-full px-4 py-2 rounded-lg bg-[#020817] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                  errors.number ? "border-red-500" : "border-white/40"
                }`}
              />
              {errors.number && <p className="text-red-500 text-sm mt-1">Ingresa los 4 dígitos.</p>}
            </div>
          )}

          {type === "Tarjetas" && itemType === "credito" && (
            <div>
              <label className="block text-sm mb-1">Límite de crédito</label>
              <div
                className={`flex items-center bg-[#020817] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-600 ${
                  errors.creditLimit ? "border-red-500" : "border-white/40 border"
                }`}
              >
                <span className="text-gray-400 mr-2">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={creditLimit}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCreditLimit(value === "" ? "" : Number.parseFloat(value));
                  }}
                  className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                />
              </div>
              {errors.creditLimit && <p className="text-red-500 text-sm mt-1">Ingresa un límite válido.</p>}
            </div>
          )}

          <div>
            <label className="block text-sm mb-1">
              {type === "Inversiones" ? "Valor inicial" : type === "Tarjetas" ? "Saldo actual" : "Saldo inicial"}
            </label>
            <div
              className={`flex items-center bg-[#020817] rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-600 ${
                errors.amount ? "border-red-500" : "border-white/40 border"
              }`}
            >
              <span className="text-gray-400 mr-2">$</span>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  const value = e.target.value;
                  setAmount(value === "" ? "" : Number.parseFloat(value));
                }}
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              />
            </div>
            {errors.amount && <p className="text-red-500 text-sm mt-1">Ingresa un monto válido.</p>}
          </div>

          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

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
              {config.buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}