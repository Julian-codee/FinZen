import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from 'recharts';
  
  const data = [
    { categoria: 'Alquiler', valor: 700 },
    { categoria: 'Comida', valor: 450 },
    { categoria: 'Transporte', valor: 300 },
    { categoria: 'Entretenimiento', valor: 200 },
    { categoria: 'Otros', valor: 150 },
  ];
  
  const COLORS = ['#34d399', '#60a5fa', '#fbbf24', '#f87171', '#a78bfa'];
  
  const GraficoGastosPorCategoria = () => {
    return (
      <div className="bg-[#0f172a] text-white p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Gastos por Categoría</h2>
        <p className="mb-4 text-gray-400">Distribución de tus gastos actuales</p>
  
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="valor"
              nameKey="categoria"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
  
        <div className="flex justify-between mt-6">
          <div>
            <p className="text-indigo-400 font-bold">Total Gastado</p>
            <p className="text-indigo-300 text-xl">$1,800.00</p>
          </div>
          <div>
            <p className="text-gray-400 font-bold">Categorías</p>
            <p className="text-gray-300 text-xl">{data.length}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default GraficoGastosPorCategoria;
  