import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface FinancialDataPoint {
  month: string;
  income: number;
  expenses: number;
}

interface IncomeVsExpensesProps {
  data: FinancialDataPoint[];
}

const IncomeVsExpenses: React.FC<IncomeVsExpensesProps> = ({ data }) => {
  return (
    <div className="bg-[#0F1525] p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-1">Ingresos vs Gastos</h2>
      <p className="text-gray-400 text-sm mb-4">Comparativa mensual de ingresos y gastos</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            barGap={10}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#888' }} 
              domain={[0, 'dataMax + 1000']}
              tickFormatter={(value) => `${value}`}
            />
            <Bar 
              dataKey="income" 
              name="Ingresos"
              barSize={35}
            >
              {data.map((_entry, index) => (
                <Cell key={`income-${index}`} fill="#3B82F6" />
              ))}
            </Bar>
            <Bar 
              dataKey="expenses" 
              name="Gastos"
              barSize={35}
            >
              {data.map((_entry, index) => (
                <Cell key={`expenses-${index}`} fill="#EF4444" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeVsExpenses;