import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    CartesianGrid,
  } from 'recharts';
  
  const data = [
    { mes: 'Ene', ingresos: 4300, gastos: 2700, balance: 1600 },
    { mes: 'Feb', ingresos: 3000, gastos: 2900, balance: 100 },
    { mes: 'Mar', ingresos: 4800, gastos: 3100, balance: 1700 },
    { mes: 'Abr', ingresos: 4500, gastos: 3000, balance: 1500 },
    { mes: 'May', ingresos: 4200, gastos: 3100, balance: 1100 },
    { mes: 'Jun', ingresos: 5400, gastos: 3200, balance: 2200 },
  ];
  
  const GraficoTendenciasMensuales = () => {
    return (
      <div className="bg-[#0f172a] text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-1">Tendencias Mensuales</h2>
        <p className="mb-4 text-gray-400">Evolución de tus finanzas a lo largo del tiempo</p>
  
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
            <XAxis dataKey="mes" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: 10 }}
              formatter={(value) => {
                const map: any = {
                  ingresos: 'Ingresos',
                  gastos: 'Gastos',
                  balance: 'Balance',
                };
                return <span className="text-white">{map[value]}</span>;
              }}
            />
            <Line type="monotone" dataKey="ingresos" stroke="#ffffff" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="gastos" stroke="#ef4444" dot={{ r: 4 }} />
            <Line type="monotone" dataKey="balance" stroke="#3b82f6" activeDot={{ r: 6 }} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
  
        <div className="mt-6">
          <p className="text-sm text-gray-400">Tendencia de Balance</p>
          <p className="text-blue-400 text-xl font-bold">+12.5% vs. mes anterior</p>
        </div>
      </div>
    );
  };
  
  export default GraficoTendenciasMensuales;
  