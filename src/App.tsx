

import DashboardReporting from './Components/Features/Reporting/Components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import {Hero} from './Components/Auth/Hero'
import CustomProfile from './Components/Auth/CustomProfile';
import { AuthPage } from './Components/Auth/AuthPage';





export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/Reporting" element={<DashboardReporting />} />
        <Route path="/dashboard" element={<Hero />} />
        <Route path="/Profile" element={<CustomProfile />} />
        <Route path="/Hero" element={<Hero />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  );
}
