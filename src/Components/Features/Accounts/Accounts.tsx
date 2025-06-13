import { useState } from "react";

import MovementsModal from "./Components/MovementsModal";
import AccountTabs from "./Components/AccountTabs";
import TotalBalance from "./Components/TotalBalance";
import BalanceToggle from "./Components/BalanceToggle";
import AccountCategoryCard from "./Components/AccountCategoryCard";
import AccountList from "./Components/AccountList";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";

interface Movement {
  id: number;
  description: string;
  amount: number;
  date: string;
  type: "Ingreso" | "Gasto" | "Transferencia";
}

export interface Account {
  id: number;
  title: string;
  bank: string;
  amount: number;
  movements: Movement[];
}

// Agrupa cuentas por categoría
const groupAccountsByCategory = (accounts: Account[]) => {
  const categories: { [key: string]: Account[] } = {};

  accounts.forEach((account) => {
    const t = account.title.toLowerCase();
    let category = "Otros";

    if (t.includes("corriente")) category = "Corriente";
    else if (t.includes("ahorros")) category = "Ahorros";
    else if (t.includes("efectivo")) category = "Efectivo";
    else if (t.includes("banco")) category = "Banco";

    if (!categories[category]) {
      categories[category] = [];
    }
    categories[category].push(account);
  });

  return categories;
};

const Account = () => {
  const [visible, setVisible] = useState(true);
  const [tab, setTab] = useState("Cuentas");

  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [account, setAccounts] = useState<Account[]>([
    {
      id: 1,
      title: "Cuenta Corriente",
      bank: "Banco Santander",
      amount: 8250.45,
      movements: [
        {
          id: 1,
          description: "Depósito",
          amount: 5000,
          date: "2025-05-20",
          type: "Ingreso",
        },
        {
          id: 2,
          description: "Pago tarjeta",
          amount: -2000,
          date: "2025-05-22",
          type: "Gasto",
        },
      ],
    },
    {
      id: 2,
      title: "Inversión Fondo Mutuo",
      bank: "Bancolombia",
      amount: 5200.0,
      movements: [
        {
          id: 1,
          description: "Depósito",
          amount: 5000,
          date: "2025-05-20",
          type: "Ingreso",
        },
        {
          id: 2,
          description: "Pago tarjeta",
          amount: -2000,
          date: "2025-05-22",
          type: "Gasto",
        },
      ],
    },
    {
      id: 3,
      title: "Tarjeta de Crédito",
      bank: "Banco Popular",
      amount: 3000.0,
      movements: [
        {
          id: 1,
          description: "Depósito",
          amount: 5000,
          date: "2025-05-20",
          type: "Ingreso",
        },
        {
          id: 2,
          description: "Pago tarjeta",
          amount: -2000,
          date: "2025-05-22",
          type: "Gasto",
        },
      ],
    },
    {
      id: 4,
      title: "Efectivo Principal",
      bank: "Caja",
      amount: 1500.0,
      movements: [],
    },
  ]);

  const totalAmount = account.reduce((sum, acc) => sum + acc.amount, 0);
  const grouped = groupAccountsByCategory(account);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const handleOpenModal = (account: Account) => {
    setSelectedAccount(account);
    setModalOpen(true);
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
          flex-1 p-6 transition-all duration-300 ease-in-out text-white bg-[#020817]
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } /* Ajusta 'ml-20' si tu sidebar cerrada es de otro ancho */
        `}
      >
        <h1 className="text-3xl font-bold mb-2">Cuentas</h1>
        <p className="text-gray-400 mb-4">
          Gestiona tus cuentas bancarias, tarjetas y otros activos financieros.
        </p>

        <TotalBalance visible={visible} amount={totalAmount} />

        <div className="flex justify-between items-center mt-4 mb-6">
          <AccountTabs
            selectedTab={tab}
            onSelectTab={setTab}
            onAddAccount={(newAccount) =>
              setAccounts((prev) => [...prev, newAccount])
            }
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
        </div>

        <h2 className="text-xl font-semibold mb-4">Tus Cuentas</h2>

        {account.length === 0 ? (
          <p className="text-gray-500">
            No tienes cuentas registradas todavía.
          </p>
        ) : (
          <AccountList
            visible={visible}
            account={account}
            onViewMovements={handleOpenModal}
          />
        )}

        <MovementsModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          account={selectedAccount}
        />
      </div>
    </>
  );
};

export default Account;
