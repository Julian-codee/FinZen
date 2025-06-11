import React, { useState } from 'react';
import TransactionsHeader from './Components/TransactionsHeader';
import SummaryCards from './Components/SumaryCards';
import TransactionFilters from './Components/TransactionFilters';
import TransactionTable from './Components/TransactionTable';
import { transactionsSummary, transactionsData } from './Data/TransactionData';

const Transactions: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Todas');
  const [dateRange, setDateRange] = useState<string>('1 de junio de 2025 - 9 de junio de 2025');
  const [sortBy, setSortBy] = useState<string>('Más recientes');

  return (
    <div className="min-h-screen bg-[#0D1119] text-white p-6">
      <TransactionsHeader />
      
      <SummaryCards data={transactionsSummary} />
      
      <TransactionFilters 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <TransactionTable 
        data={transactionsData}
        activeTab={activeTab}
      />
    </div>
  );
};

export default Transactions;
