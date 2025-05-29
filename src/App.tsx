import DashboardReporting from './Components/Features/Reporting/Components/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import { Hero } from './Components/Auth/Hero';
import CustomProfile from './Components/Auth/CustomProfile';
import { RegisterProvider } from './Components/Auth/RegisterContext';
import { AuthPage } from './Components/Auth/AuthPage';

export default function App() {
  return (
    <RegisterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} /> {/* Asumiendo que AuthPage contiene Register */}
          <Route path="/custom-profile" element={<CustomProfile />} /> {/* Ruta corregida */}
          <Route path="/Reporting" element={<Hero />} />
          <Route path="/dashboard" element={<DashboardReporting />} />
          <Route path="/Hero" element={<Hero />} />
          {/* Eliminar /Profile si no es necesario, o aclarar su propósito */}
        </Routes>
      </BrowserRouter>
    </RegisterProvider>
  );
}