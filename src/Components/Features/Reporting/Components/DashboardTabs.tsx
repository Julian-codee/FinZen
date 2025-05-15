import { useState } from "react";
import TabSwitcher from "./TabSwitcher";
import MonthlyTrends from "./MonthlyTrends";
import SavingsProgress from "./SavingsProgress";
import CategoryDistributionChart from "./CategoryDistribution";
import IncomeExpensesChart from "./IncomeExpensesChart";

interface FinancialData {
  month: string;
  income: number;
  expenses: number;
}

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  financialData: FinancialData[];
  categoryData: CategoryData[];
}

const DashboardTabs = ({ financialData, categoryData }: Props) => {
  const [activeTab, setActiveTab] = useState("Resumen");

  const renderContent = () => {
    switch (activeTab) {
      case "Resumen":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <IncomeExpensesChart data={financialData} />
            <CategoryDistributionChart data={categoryData} />
            <MonthlyTrends />
            <SavingsProgress />
          </div>
        );
      case "Ingresos/Gastos":
        return (
          <div className="grid grid-cols-1 gap-6">
            <IncomeExpensesChart data={financialData} />
          </div>
        );
      case "Categorías":
        return (
          <div>
            <CategoryDistributionChart data={categoryData} />
          </div>
        );
      case "Tendencias":
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
