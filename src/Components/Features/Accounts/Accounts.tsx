"use client";

import { useState, useEffect } from "react";

import MovementsModal from "./Components/MovementsModal";
import AccountTabs from "./Components/AccountTabs";
import TotalBalance from "./Components/TotalBalance";
import BalanceToggle from "./Components/BalanceToggle";
import AccountCategoryCard from "./Components/AccountCategoryCard";
import AccountList from "./Components/AccountList";
import AddAccountModal from "./Components/AddAccountModal";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { Menu } from "lucide-react";

interface Movement {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: "Ingreso" | "Gasto" | "Transferencia";
}

export interface Account {
  id: number;
  uniqueId: string;
  title: string;
  bank?: string;
  amount: number;
  type: string;
  movements: Movement[];
  number?: string;
  creditLimit?: number;
  platform?: string;
  investmentType?: string;
  currentValue?: number;
  freeAmount?: number;
  occupiedAmount?: number;
  startDate?: string;
  originalType?: "cuenta" | "tarjeta" | "inversion";
}

// Agrupa cuentas por categoría basada en el tipo
const groupAccountsByCategory = (accounts: Account[]) => {
  const categories: { [key: string]: Account[] } = {
    Corriente: [],
    Ahorros: [],
    Efectivo: [],
    Otros: [],
  };

  accounts.forEach((account) => {
    const normalizedType = account.type?.toLowerCase();
    let category: string;

    switch (normalizedType) {
      case "corriente":
      case "cuenta corriente":
        category = "Corriente";
        break;
      case "ahorros":
      case "ahorro":
      case "savings":
        category = "Ahorros";
        break;
      case "efectivo":
      case "cash":
        category = "Efectivo";
        break;
      default:
        category = "Otros";
        break;
    }

    categories[category].push(account);
  });

  // Filtra categorías vacías
  return Object.fromEntries(
    Object.entries(categories).filter(([_, accounts]) => accounts.length > 0)
  );
};

const Account = () => {
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState("Cuentas");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [editAccount, setEditAccount] = useState<Account | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Función para determinar el tipo de cuenta basado en sus propiedades
  const determineAccountType = (
    account: Account
  ): "cuenta" | "tarjeta" | "inversion" => {
    // Si ya tiene el tipo original guardado, usarlo
    if (account.originalType) {
      return account.originalType;
    }

    // Determinar basándose en las propiedades específicas
    if (account.creditLimit !== undefined || account.number) {
      return "tarjeta";
    }
    if (
      account.platform ||
      account.investmentType ||
      account.currentValue !== undefined
    ) {
      return "inversion";
    }
    return "cuenta";
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token no encontrado");
          return;
        }

        let allAccounts: Account[] = [];

        // Fetch Cuentas
        const cuentasResponse = await fetch(
          "https://finzenbackend-production.up.railway.app/finzen/cuentas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (cuentasResponse.ok) {
          const cuentasData = await cuentasResponse.json();
          const mappedCuentas: Account[] = cuentasData.map((cuenta: any) => ({
            id: cuenta.idCuenta,
            uniqueId: `cuenta-${cuenta.idCuenta}`,
            title: cuenta.nombre,
            bank: cuenta.banco,
            amount: parseFloat(cuenta.monto) || 0,
            type: "cuenta",
            movements: [],
            number: cuenta.numeroUltimosDigitos,
            freeAmount: parseFloat(cuenta.montoLibre) || 0,
            occupiedAmount: parseFloat(cuenta.montoOcupado) || 0,
            originalType: "cuenta",
          }));
          allAccounts = [...allAccounts, ...mappedCuentas];
        } else {
          console.error(
            "Failed to fetch cuentas:",
            cuentasResponse.status,
            await cuentasResponse.text()
          );
        }

        // Fetch Tarjetas
        const tarjetasResponse = await fetch(
          "https://finzenbackend-production.up.railway.app/finzen/tarjetas",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (tarjetasResponse.ok) {
          const tarjetasData = await tarjetasResponse.json();
          const mappedTarjetas: Account[] = tarjetasData.map(
            (tarjeta: any) => ({
              id: tarjeta.idTarjeta,
              uniqueId: `tarjeta-${tarjeta.idTarjeta}`,
              title: tarjeta.nombre,
              bank: tarjeta.banco || "",
              amount: parseFloat(tarjeta.saldoActual) || 0,
              type: tarjeta.tipo?.toLowerCase() || "credito",
              movements: [],
              number: tarjeta.numeroUltimosDigitos || "",
              creditLimit: parseFloat(tarjeta.limiteCredito) || 0,
              originalType: "tarjeta",
            })
          );
          allAccounts = [...allAccounts, ...mappedTarjetas];
        } else {
          console.error(
            "Failed to fetch tarjetas:",
            tarjetasResponse.status,
            await tarjetasResponse.text()
          );
        }

        // Fetch Inversiones
        const inversionesResponse = await fetch(
          "https://finzenbackend-production.up.railway.app/finzen/inversiones",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (inversionesResponse.ok) {
          const inversionesData = await inversionesResponse.json();
          const mappedInversiones: Account[] = inversionesData.map(
            (inversion: any) => ({
              id: inversion.idInversion,
              uniqueId: `inversion-${inversion.idInversion}`,
              title: inversion.nombre,
              bank: "",
              amount: parseFloat(inversion.valorActual) || 0,
              type: inversion.tipoInversion?.toLowerCase() || "acciones",
              movements: [],
              number: "",
              platform: inversion.plataforma,
              investmentType: inversion.tipoInversion,
              currentValue: parseFloat(inversion.valorActual) || 0,
              startDate: inversion.fechaInicio,
              originalType: "inversion",
            })
          );
          allAccounts = [...allAccounts, ...mappedInversiones];
        } else {
          console.error(
            "Failed to fetch inversiones:",
            inversionesResponse.status,
            await inversionesResponse.text()
          );
        }

        const validAccounts = allAccounts.filter((account) => account.id);
        console.log("Mapped accounts:", validAccounts);
        setAccounts(validAccounts);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  const totalAmount = accounts.reduce((sum, acc) => sum + acc.amount, 0);
  const grouped = groupAccountsByCategory(accounts);

  const handleAddAccount = async (newAccount: Account) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token no encontrado");
        return;
      }

      let endpoint = "";
      let payload: any = {};

      const normalizedType = newAccount.type?.toLowerCase();
      const validType = ["corriente", "ahorros", "efectivo"].includes(
        normalizedType
      )
        ? normalizedType
        : "corriente";

      if (tab === "Tarjetas") {
        endpoint = "https://finzenbackend-production.up.railway.app/finzen/tarjetas";
        payload = {
          nombre: newAccount.title || "",
          tipo:
            newAccount.type?.toUpperCase() === "DEBITO" ||
            newAccount.type?.toUpperCase() === "CREDITO"
              ? newAccount.type.toUpperCase()
              : "CREDITO",
          banco: newAccount.bank || "",
          numeroUltimosDigitos: newAccount.number || "",
          saldoActual: parseFloat(newAccount.amount?.toString() || "0") || 0,
          limiteCredito:
            parseFloat(newAccount.creditLimit?.toString() || "0") || 0,
        };
      } else if (tab === "Inversiones") {
        endpoint = "https://finzenbackend-production.up.railway.app/finzen/inversiones";
        payload = {
          nombre: newAccount.title || "",
          tipoInversion: newAccount.investmentType?.toUpperCase() || "ACCIONES",
          plataforma: newAccount.platform || "",
          valorInicial: parseFloat(newAccount.amount?.toString() || "0") || 0,
          valorActual: parseFloat(newAccount.amount?.toString() || "0") || 0,
          fechaInicio: new Date().toISOString().split("T")[0],
        };
      } else {
        endpoint = "https://finzenbackend-production.up.railway.app/finzen/cuentas";
        payload = {
          nombre: newAccount.title || "",
          banco: newAccount.bank || "",
          monto: parseFloat(newAccount.amount?.toString() || "0") || 0,
          numeroUltimosDigitos: newAccount.number || "",
          montoLibre: parseFloat(newAccount.amount?.toString() || "0") || 0,
          montoOcupado: 0,
          tipo: validType.toUpperCase(),
        };
      }

      console.log("Creating account with payload:", payload);

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const createdAccount = await response.json();

        let mappedAccount: Account;

        if (tab === "Tarjetas") {
          mappedAccount = {
            id: createdAccount.idTarjeta || Date.now(),
            uniqueId: `tarjeta-${createdAccount.idTarjeta || Date.now()}`,
            title: createdAccount.nombre || newAccount.title,
            bank: createdAccount.banco || newAccount.bank || "",
            amount:
              parseFloat(createdAccount.saldoActual) ||
              parseFloat(newAccount.amount?.toString() || "0") ||
              0,
            type:
              createdAccount.tipo?.toLowerCase() ||
              newAccount.type ||
              "credito",
            movements: [],
            number:
              createdAccount.numeroUltimosDigitos || newAccount.number || "",
            creditLimit:
              parseFloat(createdAccount.limiteCredito) ||
              parseFloat(newAccount.creditLimit?.toString() || "0") ||
              0,
            originalType: "tarjeta",
          };
        } else if (tab === "Inversiones") {
          mappedAccount = {
            id: createdAccount.idInversion || Date.now(),
            uniqueId: `inversion-${createdAccount.idInversion || Date.now()}`,
            title: createdAccount.nombre || newAccount.title,
            bank: "",
            amount:
              parseFloat(createdAccount.valorActual) ||
              parseFloat(newAccount.amount?.toString() || "0") ||
              0,
            type:
              createdAccount.tipoInversion?.toLowerCase() ||
              newAccount.investmentType?.toLowerCase() ||
              "acciones",
            movements: [],
            number: "",
            platform: createdAccount.plataforma || newAccount.platform,
            investmentType:
              createdAccount.tipoInversion || newAccount.investmentType,
            currentValue:
              parseFloat(createdAccount.valorActual) ||
              parseFloat(newAccount.amount?.toString() || "0") ||
              0,
            startDate: createdAccount.fechaInicio,
            originalType: "inversion",
          };
        } else {
          mappedAccount = {
            id: createdAccount.idCuenta || Date.now(),
            uniqueId: `cuenta-${createdAccount.idCuenta || Date.now()}`,
            title: createdAccount.nombre || newAccount.title,
            bank: "",
            amount:
              parseFloat(createdAccount.monto) ||
              parseFloat(newAccount.amount?.toString() || "0") ||
              0,
            type: "cuenta",
            movements: [],
            number: "",
            freeAmount:
              parseFloat(createdAccount.montoLibre) ||
              parseFloat(newAccount.amount?.toString() || "0") ||
              0,
            occupiedAmount: parseFloat(createdAccount.montoOcupado) || 0,
            originalType: "cuenta",
          };
        }

        setAccounts((prev) => [...prev, mappedAccount]);
      } else {
        const errorText = await response.text();
        console.error("Failed to create account:", response.status, errorText);
        throw new Error(
          `Failed to create account: ${response.status} - ${errorText}`
        );
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const handleEditAccount = async (updatedAccount: Account) => {
    if (!editAccount) return;

    try {
      const token = localStorage.getItem("token");
      let endpoint = "";
      let payload: any = {};

      const accountType = determineAccountType(editAccount);
      const normalizedType = updatedAccount.type?.toLowerCase();
      const validType = ["corriente", "ahorros", "efectivo"].includes(
        normalizedType
      )
        ? normalizedType
        : "corriente";

      if (accountType === "tarjeta") {
        endpoint = `https://finzenbackend-production.up.railway.app/finzen/tarjetas/${editAccount.id}`;
        payload = {
          nombre: updatedAccount.title,
          tipo: validType.toUpperCase() ||
            updatedAccount.type?.toUpperCase() === "DEBITO" ||
            updatedAccount.type?.toUpperCase() === "CREDITO"
              ? updatedAccount.type.toUpperCase()
              : "CREDITO",
          banco: updatedAccount.bank || "",
          numeroUltimosDigitos: updatedAccount.number || "",
          saldoActual:
            parseFloat(updatedAccount.amount?.toString() || "0") || 0,
          limiteCredito:
            parseFloat(updatedAccount.creditLimit?.toString() || "0") || 0,
        };
      } else if (accountType === "inversion") {
        endpoint = `https://finzenbackend-production.up.railway.app/finzen/inversiones/${editAccount.id}`;
        payload = {
          nombre: updatedAccount.title,
          tipoInversion:
            updatedAccount.investmentType?.toUpperCase() || "ACCIONES",
          plataforma: updatedAccount.platform || "",
          valorActual:
            parseFloat(updatedAccount.amount?.toString() || "0") || 0,
        };
      } else {
        // cuenta
        endpoint = `https://finzenbackend-production.up.railway.app/finzen/cuentas/${editAccount.id}`;

        const normalizedType = updatedAccount.type?.toLowerCase();
        const validType = ["corriente", "ahorros", "efectivo"].includes(normalizedType)
          ? normalizedType
          : "corriente";

        payload = {
          nombre: updatedAccount.title,
          banco: updatedAccount.bank || "",
          numeroUltimosDigitos: updatedAccount.number || "",
          monto: parseFloat(updatedAccount.amount?.toString() || "0") || 0,
          montoLibre:
            parseFloat(
              updatedAccount.freeAmount?.toString() ||
                updatedAccount.amount?.toString() ||
                "0"
            ) || 0,
          montoOcupado:
            parseFloat(updatedAccount.occupiedAmount?.toString() || "0") || 0,
            tipo: validType.toUpperCase(),
        };
      }

      console.log("Updating account with payload:", payload);

      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setAccounts((prev) =>
          prev.map((acc) =>
            acc.id === editAccount.id
              ? { ...acc, ...updatedAccount, originalType: acc.originalType }
              : acc
          )
        );
        setEditModalOpen(false);
        setEditAccount(null);
      } else {
        console.error(
          "Failed to update account:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    if (!id) {
      console.error("ID de cuenta no válido:", id);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token de autorización no encontrado");
        return;
      }

      // Encontrar la cuenta para determinar su tipo real
      const accountToDelete = accounts.find((acc) => acc.id === id);
      if (!accountToDelete) {
        console.error("Cuenta no encontrada en el estado local");
        return;
      }

      const accountType = determineAccountType(accountToDelete);

      const endpoint =
        accountType === "tarjeta"
          ? `https://finzenbackend-production.up.railway.app/finzen/tarjetas/${id}`
          : accountType === "inversion"
          ? `https://finzenbackend-production.up.railway.app/finzen/inversiones/${id}`
          : `https://finzenbackend-production.up.railway.app/finzen/cuentas/${id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAccounts((prev) => prev.filter((acc) => acc.id !== id));
        console.log("Cuenta eliminada exitosamente");
      } else {
        if (response.status === 401) {
          console.error("Error de autorización - Token inválido o expirado");
          window.location.href = "/login";
        } else if (response.status === 404) {
          console.error("Cuenta no encontrada");
        } else {
          console.error(
            "Error al eliminar cuenta:",
            response.status,
            response.statusText
          );
        }
      }
    } catch (error) {
      console.error("Error en la petición de eliminación:", error);
    }
  };

  const handleViewMovements = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  const getEditModalType = (account: Account): string => {
    const accountType = determineAccountType(account);
    switch (accountType) {
      case "tarjeta":
        return "Tarjetas";
      case "inversion":
        return "Inversiones";
      default:
        return "Cuentas";
    }
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
          flex-1 sm:p-6 lg:p-8 transition-all duration-300 ease-in-out text-white bg-[#020817] min-h-screen
          ${isSidebarOpen ? "lg:ml-64" : "lg:ml-20"}
        `}
      >
        <div className="flex items-center gap-4 px-4 pt-8 mb-6">
          <div className="flex justify-between items-center mb-21 lg:hidden">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md border border-gray-600 hover:bg-gray-800"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2">Cuentas</h1>
            <p className="mb-12 text-white/70 text-sm md:text-lg">
              Gestiona tus cuentas bancarias, tarjetas y otros activos
              financieros.
            </p>
          </div>
        </div>

        <TotalBalance visible={visible} amount={totalAmount} />

        <div className="flex justify-between items-center mt-4 mb-6">
          <AccountTabs
            selectedTab={tab}
            onSelectTab={setTab}
            onAddAccount={handleAddAccount}
          />
          <BalanceToggle
            visible={visible}
            toggle={() => setVisible(!visible)}
          />
        </div>

        <div className="flex flex-wrap gap-4 mb-6">
          {Object.entries(grouped).map(([title, group]) => (
            <AccountCategoryCard key={title} title={title} account={group} />
          ))}
          {grouped["Otros"] && grouped["Otros"].length > 0 && (
            <p className="text-yellow-500"></p>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Tus Cuentas</h2>

        {accounts.length === 0 ? (
          <p className="text-gray-500">
            No tienes cuentas registradas todavía.
          </p>
        ) : (
          <AccountList
            visible={visible}
            account={accounts}
            onViewMovements={handleViewMovements}
            onEditAccount={(account) => {
              setEditAccount(account);
              setEditModalOpen(true);
            }}
            onDeleteAccount={handleDeleteAccount}
          />
        )}

        <MovementsModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedAccount(null);
          }}
          account={selectedAccount}
        />

        <AddAccountModal
          open={editModalOpen}
          onClose={() => {
            setEditModalOpen(false);
            setEditAccount(null);
          }}
          onAdd={handleEditAccount}
          type={editAccount ? getEditModalType(editAccount) : tab}
          initialData={editAccount}
        />
      </div>
    </>
  );
};

export default Account;
