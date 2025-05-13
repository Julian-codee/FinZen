import { useState } from 'react';
import TabSwitcher from './TabSwitcher';
import MonthlyTrends from './MonthlyTrends';
import SavingsProgress from './SavingsProgress';
import CategoryDistributionChart from './CategoryDistribution';
import IncomeExpensesChart from './IncomeExpensesChart';

const financialData = [
    { month: 'Ene', income: 4000, expenses: 2300 },
    { month: 'Feb', income: 4500, expenses: 2500 },
    { month: 'Mar', income: 4400, expenses: 3100 },
    { month: 'Abr', income: 4300, expenses: 2700 },
    { month: 'May', income: 4200, expenses: 3000 },
    { month: 'Jun', income: 5500, expenses: 3400 }
  ];
  
  const categoryData = [
    { name: 'Vivienda', value: 35, color: '#3B82F6' },
    { name: 'Alimentación', value: 25, color: '#10B981' },
    { name: 'Entretenimiento', value: 15, color: '#F59E0B' },
    { name: 'Transporte', value: 12, color: '#EF4444' },
    { name: 'Servicios', value: 8, color: '#8B5CF6' }
  ];

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('Resumen');

  const renderContent = () => {
    switch (activeTab) {
      case 'Resumen':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IncomeExpensesChart data={financialData} />
            <CategoryDistributionChart data={categoryData} />
            <MonthlyTrends />
            <SavingsProgress />
          </div>
        );
      case 'Ingresos/Gastos':
        return (
          <div className="grid grid-cols-1 gap-6">
            {/* Aquí podrías tener un gráfico de barras o pastel */}
            <IncomeExpensesChart data={financialData}  />
          </div>
        );
      case 'Categorías':
        return (
          <div>
            {/* Aquí podrías tener un gráfico de distribución por categoría */}
            <p className="text-white">[Gráfico de categorías]</p>
            <CategoryDistributionChart data={categoryData} />
          </div>
        );
      case 'Tendencias':
        return (
          <div>
            <MonthlyTrends />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <TabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default DashboardTabs;
