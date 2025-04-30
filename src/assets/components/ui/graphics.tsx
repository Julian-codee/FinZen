import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { mes: 'Ene', ingresos: 3800, gastos: 2400 },
    { mes: 'Feb', ingresos: 2900, gastos: 2800 },
    { mes: 'Mar', ingresos: 4800, gastos: 3100 },
    { mes: 'Abr', ingresos: 4500, gastos: 2900 },
    { mes: 'May', ingresos: 4200, gastos: 3100 },
    { mes: 'Jun', ingresos: 5400, gastos: 3300 },
  ];
  
  const GraficoIngresosGastos = () => {
    return (
      <div className="bg-[#0f172a] text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Ingresos vs Gastos</h2>
        <p className="mb-4 text-gray-400">Comparativa mensual de ingresos y gastos</p>
  
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="ingresos" fill="#34a7fc" name="Ingresos" />
            <Bar dataKey="gastos" fill="#c53030" name="Gastos" />
          </BarChart>
        </ResponsiveContainer>
  
        <div className="flex justify-between mt-6">
          <div>
            <p className="text-green-400 font-bold">Ingresos Totales</p>
            <p className="text-green-300 text-xl">$26,200.00</p>
          </div>
          <div>
            <p className="text-pink-500 font-bold">Gastos Totales</p>
            <p className="text-pink-400 text-xl">$17,900.00</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default GraficoIngresosGastos;
  