"use client";

import { useState, useEffect, ReactElement } from "react";
import toast, { Toaster } from 'react-hot-toast'; // Import toast and Toaster
import { CheckCircle, XCircle } from 'lucide-react'; // Import icons for custom toasts

import MovementsModal from "./Components/MovementsModal";
import AccountTabs from "./Components/AccountTabs";
import TotalBalance from "./Components/TotalBalance";
import BalanceToggle from "./Components/BalanceToggle";
import AccountCategoryCard from "./Components/AccountCategoryCard";
import AccountList from "./Components/AccountList";
import AddAccountModal from "./Components/AddAccountModal";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";

// Custom Toast Components (Copied for local use or you can centralize them)
const CustomSuccessToast: React.FC<{ t: any; message: string }> = ({ t, message }) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
        <div className="flex-1 w-0 p-4"><div className="flex items-start"><div className="flex-shrink-0 pt-0.5"><CheckCircle className="h-6 w-6 text-green-500" /></div><div className="ml-3 flex-1"><p className="text-sm font-semibold text-white">¡Éxito!</p><p className="mt-1 text-sm text-gray-300">{message}</p></div></div></div>
        <div className="flex border-l border-green-600/30"><button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-green-400 hover:text-green-200 focus:outline-none focus:ring-2 focus:ring-green-500">Cerrar</button></div>
    </div>
);

const CustomErrorToast: React.FC<{ t: any; message: string }> = ({ t, message }) => (
    <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-neutral-800 shadow-xl rounded-xl pointer-events-auto flex`}>
        <div className="flex-1 w-0 p-4"><div className="flex items-start"><div className="flex-shrink-0 pt-0.5"><XCircle className="h-6 w-6 text-red-500" /></div><div className="ml-3 flex-1"><p className="text-sm font-semibold text-white">Error</p><p className="mt-1 text-sm text-gray-300">{message}</p></div></div></div>
        <div className="flex border-l border-red-600/30"><button onClick={() => toast.dismiss(t.id)} className="w-full border border-transparent rounded-none rounded-r-xl p-4 flex items-center justify-center text-sm font-medium text-red-400 hover:text-red-200 focus:outline-none focus:ring-2 focus:ring-red-500">Cerrar</button></div>
    </div>
);

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
  originalType?: 'cuenta' | 'tarjeta' | 'inversion';
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
  const determineAccountType = (account: Account): 'cuenta' | 'tarjeta' | 'inversion' => {
    if (account.originalType) {
      return account.originalType;
    }
    if (account.creditLimit !== undefined || account.number) {
      return 'tarjeta';
    }
    if (account.platform || account.investmentType || account.currentValue !== undefined) {
      return 'inversion';
    }
    return 'cuenta';
  };

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.custom((t) => <CustomErrorToast t={t} message="Token de autenticación no encontrado. Por favor, inicia sesión." />);
          return;
        }

        let allAccounts: Account[] = [];

        // Fetch Cuentas
        const cuentasResponse = await fetch("http://localhost:8080/finzen/cuentas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (cuentasResponse.ok) {
          const cuentasData = await cuentasResponse.json();
          console.log("Fetched cuentas:", cuentasData);
          const typeMap: { [key: string]: string } = {
            savings: "ahorros",
            cash: "efectivo",
            corriente: "corriente",
            ahorros: "ahorros",
            efectivo: "efectivo",
          };
          const mappedCuentas: Account[] = cuentasData.map((cuenta: any) => {
            const tipo = cuenta.tipo?.toLowerCase().trim();
            const validType = typeMap[tipo] || "corriente";
            console.log(`Cuenta ID: ${cuenta.idCuenta}, tipo: ${cuenta.tipo}, mapped to: ${validType}`);
            return {
              id: cuenta.idCuenta,
              uniqueId: `cuenta-${cuenta.idCuenta}`,
              title: cuenta.nombre,
              bank: cuenta.banco || "",
              amount: parseFloat(cuenta.monto) || 0,
              type: validType,
              movements: [],
              number: cuenta.numeroUltimosDigitos || "",
              freeAmount: parseFloat(cuenta.montoLibre) || 0,
              occupiedAmount: parseFloat(cuenta.montoOcupado) || 0,
              originalType: 'cuenta',
            };
          });
          allAccounts = [...allAccounts, ...mappedCuentas];
        } else if (cuentasResponse.status !== 404 && cuentasResponse.status !== 204) {
            const errorText = await cuentasResponse.text();
          toast.custom((t) => <CustomErrorToast t={t} message={`Error al cargar cuentas: ${cuentasResponse.status} - ${errorText}`} />);
        }

        // Fetch Tarjetas
        const tarjetasResponse = await fetch("http://localhost:8080/finzen/tarjetas", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (tarjetasResponse.ok) {
          const tarjetasData = await tarjetasResponse.json();
          console.log("Fetched tarjetas:", tarjetasData);
          const mappedTarjetas: Account[] = tarjetasData.map((tarjeta: any) => ({
            id: tarjeta.idTarjeta,
            uniqueId: `tarjeta-${tarjeta.idTarjeta}`,
            title: tarjeta.nombre,
            bank: tarjeta.banco || "",
            amount: parseFloat(tarjeta.saldoActual) || 0,
            type: tarjeta.tipo?.toLowerCase() || "credito",
            movements: [],
            number: tarjeta.numeroUltimosDigitos || "",
            creditLimit: parseFloat(tarjeta.limiteCredito) || 0,
            originalType: 'tarjeta',
          }));
          allAccounts = [...allAccounts, ...mappedTarjetas];
        } else if (tarjetasResponse.status !== 404 && tarjetasResponse.status !== 204) {
            const errorText = await tarjetasResponse.text();
          toast.custom((t) => <CustomErrorToast t={t} message={`Error al cargar tarjetas: ${tarjetasResponse.status} - ${errorText}`} />);
        }

        // Fetch Inversiones
        const inversionesResponse = await fetch("http://localhost:8080/finzen/inversiones", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (inversionesResponse.ok) {
          const inversionesData = await inversionesResponse.json();
          console.log("Fetched inversiones:", inversionesData);
          const mappedInversiones: Account[] = inversionesData.map((inversion: any) => ({
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
            originalType: 'inversion',
          }));
          allAccounts = [...allAccounts, ...mappedInversiones];
        } else if (inversionesResponse.status !== 404 && inversionesResponse.status !== 204) {
            const errorText = await inversionesResponse.text();
          toast.custom((t) => <CustomErrorToast t={t} message={`Error al cargar inversiones: ${inversionesResponse.status} - ${errorText}`} />);
        }

        const validAccounts = allAccounts.filter((account) => account.id);
        console.log("Mapped accounts:", validAccounts);
        setAccounts(validAccounts);
      } catch (error: any) {
        console.error("Error fetching accounts:", error);
        toast.custom((t) => <CustomErrorToast t={t} message={`Error al obtener cuentas: ${error.message || "Error desconocido"}`} />);
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
        toast.custom((t) => <CustomErrorToast t={t} message="Token no encontrado. Por favor, inicia sesión." />);
        return;
      }

      let endpoint = "";
      let payload: any = {};

      const normalizedType = newAccount.type?.toLowerCase();
      const validType = ["corriente", "ahorros", "efectivo"].includes(normalizedType)
        ? normalizedType
        : "corriente"

      if (tab === "Tarjetas") {
        endpoint = "http://localhost:8080/finzen/tarjetas";
        payload = {
          nombre: newAccount.title || "",
          tipo: (newAccount.type?.toUpperCase() === "DEBITO" || newAccount.type?.toUpperCase() === "CREDITO")
                ? newAccount.type.toUpperCase()
                : "CREDITO",
          banco: newAccount.bank || "",
          numeroUltimosDigitos: newAccount.number || "",
          saldoActual: parseFloat(newAccount.amount?.toString() || "0") || 0,
          limiteCredito: parseFloat(newAccount.creditLimit?.toString() || "0") || 0,
        };
      } else if (tab === "Inversiones") {
        endpoint = "http://localhost:8080/finzen/inversiones";
        payload = {
          nombre: newAccount.title || "",
          tipoInversion: newAccount.investmentType?.toUpperCase() || "ACCIONES",
          plataforma: newAccount.platform || "",
          valorInicial: parseFloat(newAccount.amount?.toString() || "0") || 0,
          valorActual: parseFloat(newAccount.amount?.toString() || "0") || 0,
          fechaInicio: new Date().toISOString().split('T')[0],
        };
      } else {
        endpoint = "http://localhost:8080/finzen/cuentas";
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
        console.log("Backend response:", createdAccount);

        let mappedAccount: Account;

        if (tab === "Tarjetas") {
          mappedAccount = {
            id: createdAccount.idTarjeta || Date.now(),
            uniqueId: `tarjeta-${createdAccount.idTarjeta || Date.now()}`,
            title: createdAccount.nombre || newAccount.title,
            bank: createdAccount.banco || newAccount.bank || "",
            amount: parseFloat(createdAccount.saldoActual) || parseFloat(newAccount.amount?.toString() || "0") || 0,
            type: createdAccount.tipo?.toLowerCase() || newAccount.type || "credito",
            movements: [],
            number: createdAccount.numeroUltimosDigitos || newAccount.number || "",
            creditLimit: parseFloat(createdAccount.limiteCredito) || parseFloat(newAccount.creditLimit?.toString() || "0") || 0,
            originalType: 'tarjeta',
          };
        } else if (tab === "Inversiones") {
          mappedAccount = {
            id: createdAccount.idInversion || Date.now(),
            uniqueId: `inversion-${createdAccount.idInversion || Date.now()}`,
            title: createdAccount.nombre || newAccount.title,
            bank: "",
            amount: parseFloat(createdAccount.valorActual) || parseFloat(newAccount.amount?.toString() || "0") || 0,
            type: createdAccount.tipoInversion?.toLowerCase() || newAccount.investmentType?.toLowerCase() || "acciones",
            movements: [],
            number: "",
            platform: createdAccount.plataforma || newAccount.platform,
            investmentType: createdAccount.tipoInversion || newAccount.investmentType,
            currentValue: parseFloat(createdAccount.valorActual) || parseFloat(newAccount.amount?.toString() || "0") || 0,
            startDate: createdAccount.fechaInicio,
            originalType: 'inversion',
          };
        } else {
          mappedAccount = {
            id: createdAccount.idCuenta || Date.now(),
            uniqueId: `cuenta-${createdAccount.idCuenta || Date.now()}`,
            title: createdAccount.nombre || newAccount.title,
            bank: createdAccount.banco || newAccount.bank || "",
            amount: parseFloat(createdAccount.monto) || parseFloat(newAccount.amount?.toString() || "0") || 0,
            type: validType,
            movements: [],
            number: createdAccount.numeroUltimosDigitos || newAccount.number || "",
            freeAmount: parseFloat(createdAccount.montoLibre) || parseFloat(newAccount.amount?.toString() || "0") || 0,
            occupiedAmount: parseFloat(createdAccount.montoOcupado) || 0,
            originalType: 'cuenta',
          };
        }

        setAccounts((prev) => [...prev, mappedAccount]);
        toast.custom((t) => <CustomSuccessToast t={t} message="Cuenta creada exitosamente." />);
      } else {
        const errorText = await response.text();
        console.error("Failed to create account:", response.status, errorText);
        toast.custom((t) => <CustomErrorToast t={t} message={`Error al crear cuenta: ${response.status} - ${errorText}`} />);
      }
    } catch (error: any) {
      console.error("Error creating account:", error);
      toast.custom((t) => <CustomErrorToast t={t} message={`Error al crear cuenta: ${error.message || "Error desconocido"}`} />);
    }
  };

  const handleEditAccount = async (updatedAccount: Account) => {
    if (!editAccount) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.custom((t) => <CustomErrorToast t={t} message="Token no encontrado. Por favor, inicia sesión." />);
        return;
      }

      let endpoint = "";
      let payload: any = {};

      const accountType = determineAccountType(editAccount);
      const normalizedType = updatedAccount.type?.toLowerCase();
      const validType = ["corriente", "ahorros", "efectivo"].includes(normalizedType)
        ? normalizedType
        : "corriente";

      if (accountType === 'tarjeta') {
        endpoint = `http://localhost:8080/finzen/tarjetas/${editAccount.id}`;
        payload = {
          nombre: updatedAccount.title,
          tipo: (updatedAccount.type?.toUpperCase() === "DEBITO" || updatedAccount.type?.toUpperCase() === "CREDITO")
                ? updatedAccount.type.toUpperCase()
                : "CREDITO",
          banco: updatedAccount.bank || "",
          numeroUltimosDigitos: updatedAccount.number || "",
          saldoActual: parseFloat(updatedAccount.amount?.toString() || "0") || 0,
          limiteCredito: parseFloat(updatedAccount.creditLimit?.toString() || "0") || 0,
        };
      } else if (accountType === 'inversion') {
        endpoint = `http://localhost:8080/finzen/inversiones/${editAccount.id}`;
        payload = {
          nombre: updatedAccount.title,
          tipoInversion: updatedAccount.investmentType?.toUpperCase() || "ACCIONES",
          plataforma: updatedAccount.platform || "",
          valorActual: parseFloat(updatedAccount.amount?.toString() || "0") || 0,
        };
      } else {
        endpoint = `http://localhost:8080/finzen/cuentas/${editAccount.id}`;
        payload = {
          nombre: updatedAccount.title,
          banco: updatedAccount.bank || "",
          numeroUltimosDigitos: updatedAccount.number || "",
          monto: parseFloat(updatedAccount.amount?.toString() || "0") || 0,
          montoLibre: parseFloat(updatedAccount.freeAmount?.toString() || updatedAccount.amount?.toString() || "0") || 0,
          montoOcupado: parseFloat(updatedAccount.occupiedAmount?.toString() || "0") || 0,
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
            acc.id === editAccount.id ? { ...acc, ...updatedAccount, type: validType, originalType: acc.originalType } : acc
          )
        );
        setEditModalOpen(false);
        setEditAccount(null);
        toast.custom((t) => <CustomSuccessToast t={t} message="Cuenta actualizada exitosamente." />);
      } else {
        const errorText = await response.text();
        console.error("Failed to update account:", response.status, errorText);
        toast.custom((t) => <CustomErrorToast t={t} message={`Error al actualizar cuenta: ${response.status} - ${errorText}`} />);
      }
    } catch (error: any) {
      console.error("Error updating account:", error);
      toast.custom((t) => <CustomErrorToast t={t} message={`Error al actualizar cuenta: ${error.message || "Error desconocido"}`} />);
    }
  };

  const handleDeleteAccount = async (id: number) => {
    if (!id) {
      toast.custom((t) => <CustomErrorToast t={t} message="ID de cuenta no válido para eliminar." />);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.custom((t) => <CustomErrorToast t={t} message="Token de autorización no encontrado. Por favor, inicia sesión." />);
        return;
      }

      const accountToDelete = accounts.find(acc => acc.id === id);
      if (!accountToDelete) {
        toast.custom((t) => <CustomErrorToast t={t} message="Cuenta no encontrada en el estado local para eliminar." />);
        return;
      }

      const accountType = determineAccountType(accountToDelete);

      const endpoint =
        accountType === 'tarjeta'
          ? `http://localhost:8080/finzen/tarjetas/${id}`
          : accountType === 'inversion'
          ? `http://localhost:8080/finzen/inversiones/${id}`
          : `http://localhost:8080/finzen/cuentas/${id}`;

      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setAccounts((prev) => prev.filter((acc) => acc.id !== id));
        toast.custom((t) => <CustomSuccessToast t={t} message="Cuenta eliminada exitosamente." />);
      } else {
        if (response.status === 401) {
          toast.custom((t) => <CustomErrorToast t={t} message="Error de autorización. Tu sesión ha expirado. Por favor, inicia sesión de nuevo." />);
          window.location.href = "/login";
        } else if (response.status === 404) {
          toast.custom((t) => <CustomErrorToast t={t} message="La cuenta no fue encontrada." />);
        } else {
          const errorText = await response.text();
          toast.custom((t) => <CustomErrorToast t={t} message={`Error al eliminar cuenta: ${response.status} - ${errorText}`} />);
        }
      }
    } catch (error: any) {
      console.error("Error en la petición de eliminación:", error);
      toast.custom((t) => <CustomErrorToast t={t} message={`Error en la petición para eliminar cuenta: ${error.message || "Error desconocido"}`} />);
    }
  };

  const handleViewMovements = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  const getEditModalType = (account: Account): string => {
    const accountType = determineAccountType(account);
    switch (accountType) {
      case 'tarjeta':
        return 'Tarjetas';
      case 'inversion':
        return 'Inversiones';
      default:
        return 'Cuentas';
    }
  };

return (
  <>
    <Toaster position="bottom-right" />
    <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    <div
      className={`flex-1 p-6 min-h-screen transition-all duration-300 ease-in-out bg-[#020817] text-white ${
        isSidebarOpen ? "ml-64" : "ml-20"
      }`}
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Cuentas</h1>
        <p className="text-sm text-gray-400 mt-1">
          Gestiona tus cuentas bancarias, tarjetas y otros activos financieros.
        </p>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <TotalBalance visible={visible} amount={totalAmount} />
        <BalanceToggle visible={visible} toggle={() => setVisible(!visible)} />
      </div>

      <div className="mb-6">
        <AccountTabs selectedTab={tab} onSelectTab={setTab} onAddAccount={handleAddAccount} />
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Resumen por categoría</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {Object.entries(grouped).map(([title, group]) => (
            <AccountCategoryCard key={title} title={title} account={group} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Tus cuentas</h2>
        {accounts.length === 0 ? (
          <p className="text-gray-500">No tienes cuentas registradas todavía.</p>
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
      </section>

      {/* Modals */}
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