import DashboardReporting from './Components/Features/Reporting/Components/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Hero } from './Components/Auth/Hero';
import CustomProfile from './Components/Auth/CustomProfile';
import { RegisterProvider } from './Components/Auth/RegisterContext';
import { AuthPage } from './Components/Auth/AuthPage';
import Accounts from './Components/Features/Accounts/Accounts'
import BudgetDashboard from './Components/Features/Budgets/BudgetDashboard';
import { DashBoardPrincipal } from './Components/Features/DashBoard/DashBoardPrincipal';
import ForgotPassword from './Components/Auth/ForgotPassword';
import { Sidebar } from './Components/Ui/UiDashBoard/SideBar';
import { Transactions } from './Components/Features/Transacctions/Transactions';

export default function App() {
  return (
    <RegisterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/Home" element={<DashBoardPrincipal />} />
          <Route path="/register" element={<AuthPage />} /> {/* Asumiendo que AuthPage contiene Register */}
          <Route path="/custom-profile" element={<CustomProfile />} /> {/* Ruta corregida */}
          <Route path="/Reporting" element={<DashboardReporting />} />
          <Route path="/Accounts" element={<Accounts />} />
          <Route path="/BudgetDashboard" element={<BudgetDashboard />} />
          <Route path="/dashboard" element={<Hero />} />
          <Route path="/Hero" element={<Hero />} />
          <Route path="/Forgot" element={<ForgotPassword />} />
          <Route path="/Transactions" element={<Transactions />} />
             <Route
            path='/sideBar'
            element={
              <Sidebar
                isOpen={true}
                toggleSidebar={() => {}}
              />
            }
          />
          {/* Eliminar /Profile si no es necesario, o aclarar su propósito */}
        </Routes>
      </BrowserRouter>
    </RegisterProvider>
  );
}