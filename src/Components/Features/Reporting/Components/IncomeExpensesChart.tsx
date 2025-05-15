import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
  } from 'recharts';
  
  interface ChartData {
    month: string;
    income: number;
    expenses: number;
  }
  
  interface Props {
    data: ChartData[];
  }
  
  const IncomeExpensesChart = ({ data }: Props) => {
    const totalIncome = data.reduce((acc, curr) => acc + curr.income, 0);
    const totalExpenses = data.reduce((acc, curr) => acc + curr.expenses, 0);
  
    return (
      <div className=" border border-white/40 p-6 rounded-lg w-full">
        <h2 className="text-white text-lg font-semibold">Ingresos vs Gastos</h2>
        <p className="text-gray-400 text-sm mb-6">Comparativa mensual de ingresos y gastos</p>
        
        <div className="h-72">
          <ResponsiveContainer width="90%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
                labelStyle={{ color: '#fff' }}
                cursor={{ fill: '#374615120' }}
              />
              <Legend
                verticalAlign="top"
                align="center"
                wrapperStyle={{ color: '#9CA3AF', fontSize: 12 }}
              />
              <Bar dataKey="income" name="Ingresos" fill="#2f45ff" barSize={35} />
              <Bar dataKey="expenses" name="Gastos" fill="#B91C1C" barSize={35} />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        <div className="flex justify-between text-sm mt-6">
          <div className="text-green-400 font-semibold">
            Ingresos Totales <br />
            <span className="text-xl">${totalIncome.toLocaleString()}</span>
          </div>
          <div className="text-red-500 font-semibold text-right">
            Gastos Totales <br />
            <span className="text-xl">${totalExpenses.toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default IncomeExpensesChart;
  