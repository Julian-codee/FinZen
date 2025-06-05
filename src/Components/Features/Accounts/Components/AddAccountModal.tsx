"use client"

import { useState, useEffect, useId } from "react"
import { X, Landmark, PiggyBank, Wallet, CreditCard, TrendingUp, Building } from "lucide-react"

interface Props {
  open: boolean
  onClose: () => void
  onAdd: (item: {
    id: number
    title: string
    type: string
    amount: number
    bank?: string
    number?: string
    creditLimit?: number
    platform?: string
    investmentType?: string
  }) => void
  type?: string // Nuevo prop para determinar el tipo
}

export default function AddAccountModal({ open, onClose, onAdd, type = "Cuentas" }: Props) {
  const [title, setName] = useState("")
  const [itemType, setItemType] = useState<string | null>(null)
  const [bank, setBank] = useState("")
  const [number, setNumber] = useState("")
  const [amount, setBalance] = useState<number | "">("")
  const [creditLimit, setCreditLimit] = useState<number | "">("")
  const [platform, setPlatform] = useState("")
  const [errors, setErrors] = useState({
    title: false,
    type: false,
    bank: false,
    number: false,
    amount: false,
    creditLimit: false,
    platform: false,
  })

  const nameInputId = useId()

  // Configuración según el tipo
  const getConfig = () => {
    switch (type) {
      case "Tarjetas":
        return {
          title: "Añadir Nueva Tarjeta",
          description: "Añade una nueva tarjeta de crédito o débito a tu perfil financiero.",
          buttonText: "Crear tarjeta",
          types: [
            { key: "credito", label: "Crédito", icon: CreditCard },
            { key: "debito", label: "Débito", icon: CreditCard },
          ],
        }
      case "Inversiones":
        return {
          title: "Añadir Nueva Inversión",
          description: "Añade una nueva inversión o cuenta de inversión a tu portafolio.",
          buttonText: "Crear inversión",
          types: [
            { key: "acciones", label: "Acciones", icon: TrendingUp },
            { key: "fondos", label: "Fondos", icon: Building },
            { key: "crypto", label: "Crypto", icon: TrendingUp },
          ],
        }
      default:
        return {
          title: "Añadir Nueva Cuenta",
          description: "Añade una nueva cuenta bancaria o de efectivo a tu perfil financiero.",
          buttonText: "Crear cuenta",
          types: [
            { key: "corriente", label: "Corriente", icon: Landmark },
            { key: "ahorros", label: "Ahorros", icon: PiggyBank },
            { key: "efectivo", label: "Efectivo", icon: Wallet },
          ],
        }
    }
  }

  const config = getConfig()

  useEffect(() => {
    if (!open) {
      setName("")
      setItemType(null)
      setBank("")
      setNumber("")
      setBalance("")
      setCreditLimit("")
      setPlatform("")
      setErrors({
        title: false,
        type: false,
        bank: false,
        number: false,
        amount: false,
        creditLimit: false,
        platform: false,
      })
    }
  }, [open])

  const validate = () => {
    const newErrors = {
      title: title.trim() === "",
      type: itemType === null,
      bank: type === "Cuentas" || type === "Tarjetas" ? bank.trim() === "" : false,
      number: type === "Cuentas" || type === "Tarjetas" ? number.trim().length !== 4 || !/^\d{4}$/.test(number) : false,
      amount: amount === "" || typeof amount !== "number" || amount < 0,
      creditLimit:
        type === "Tarjetas" && itemType === "credito"
          ? creditLimit === "" || typeof creditLimit !== "number" || creditLimit <= 0
          : false,
      platform: type === "Inversiones" ? platform.trim() === "" : false,
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some(Boolean)
  }

  const handleAdd = () => {
    if (!validate()) return

    const finalItem = {
      id: Date.now(),
      title,
      type: itemType!,
      amount: typeof amount === "number" ? amount : 0,
      ...(type === "Cuentas" || type === "Tarjetas" ? { bank, number } : {}),
      ...(type === "Tarjetas" && itemType === "credito"
        ? { creditLimit: typeof creditLimit === "number" ? creditLimit : 0 }
        : {}),
      ...(type === "Inversiones" ? { platform, investmentType: itemType ?? undefined } : {}),
    }
    
    onAdd(finalItem)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#020817] border border-white/20 text-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-semibold">{config.title}</h2>
        <p className="text-sm text-gray-400 mt-1">{config.description}</p>

        <div className="space-y-4 mt-6">
          {/* Nombre */}
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
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg bg-[#020817] border text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 ${
                errors.title ? "border-red-500" : "border-white/40"
              }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
          </div>

          {/* Tipo */}
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

          {/* Banco/Plataforma */}
          {(type === "Cuentas" || type === "Tarjetas") && (
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

          {/* Número de cuenta/tarjeta */}
          {(type === "Cuentas" || type === "Tarjetas") && (
            <div>
              <label className="block text-sm mb-1">
                {type === "Tarjetas" ? "Número de tarjeta (últimos 4 dígitos)" : "Número de cuenta (últimos 4 dígitos)"}
              </label>
              <input
                type="text"
                placeholder="Ej: 1234"
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

          {/* Límite de crédito para tarjetas de crédito */}
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
                    const value = e.target.value
                    setCreditLimit(value === "" ? "" : Number.parseFloat(value))
                  }}
                  className="bg-transparent outline-none w-full text-white placeholder-gray-500"
                />
              </div>
              {errors.creditLimit && <p className="text-red-500 text-sm mt-1">Ingresa un límite válido.</p>}
            </div>
          )}

          {/* Saldo/Valor inicial */}
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
                  const value = e.target.value
                  setBalance(value === "" ? "" : Number.parseFloat(value))
                }}
                className="bg-transparent outline-none w-full text-white placeholder-gray-500"
              />
            </div>
            {errors.amount && <p className="text-red-500 text-sm mt-1">Ingresa un monto válido.</p>}
          </div>

          {/* Botones */}
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
  )
}
