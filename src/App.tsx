

import DashboardReporting from './Components/Features/Reporting/Components/Dashboard'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import {Hero} from './Components/Auth/Hero'
import { AuthPage } from './Components/Auth/AuthPage';





export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage/>} />
        <Route path="/Reporting" element={<DashboardReporting />} />
        <Route path="/dashboard" element={<Hero />} />
        {/* otras rutas */}
      </Routes>
    </Router>
  );
}
