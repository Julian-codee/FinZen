import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

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

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState('Resumen');
  
  return (
    <div className="min-h-screen bg-[#020817] text-white p-6">
      <div>
        <h1 className="text-3xl font-bold">Informes</h1>
        <p className="mt-2 text-gray-400">
          Analiza tus finanzas con informes detallados y visualizaciones personalizables.
        </p>
      </div>
      
      <div className="flex justify-between items-center my-6">
        <div className="inline-flex items-center justify-center border border-gray-700 rounded-md px-4 py-2">
          <span>1 de febrero de 2025 - 30 de abril de 2025</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
            Exportar
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <div className="w-1/3">
          <h3 className="text-sm mb-2">Cuenta</h3>
          <div className="relative w-full">
            <select className="appearance-none w-full bg-[#0D1119] border border-gray-700 text-white py-2 px-4 rounded-md">
              <option>Todas las cuentas</option>
            </select>
          </div>
        </div>
        <div className="w-1/3">
          <h3 className="text-sm mb-2">Categoría</h3>
          <div className="relative w-full">
            <select className="appearance-none w-full bg-[#0D1119] border border-gray-700 text-white py-2 px-4 rounded-md">
              <option>Todas las categorías</option>
            </select>
          </div>
        </div>
        <div className="w-1/3">
          <h3 className="text-sm mb-2">Tipo</h3>
          <div className="relative w-full">
            <select className="appearance-none w-full bg-[#0D1119] border border-gray-700 text-white py-2 px-4 rounded-md">
              <option>Todos los tipos</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="flex bg-[#0F1525] rounded-md p-1 mb-6">
        {['Resumen', 'Ingresos/Gastos', 'Categorías', 'Tendencias'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md text-sm ${
              activeTab === tab ? 'bg-gray-800 text-white' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#0F1525] p-6 rounded-lg">
          <h2 className="text-xl font-bold">Ingresos vs Gastos</h2>
          <p className="text-gray-400 text-sm mb-4">Comparativa mensual de ingresos y gastos</p>
          
          <div className="h-64">
            <BarChart width={600} height={300} data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#888' }} />
              <YAxis tick={{ fill: '#888' }} />
              <Bar dataKey="income" fill="#3B82F6" barSize={35} />
              <Bar dataKey="expenses" fill="#EF4444" barSize={35} />
            </BarChart>
          </div>
        </div>
        
        <div className="bg-[#0F1525] p-6 rounded-lg">
          <h2 className="text-xl font-bold">Distribución por Categoría</h2>
          <p className="text-gray-400 text-sm mb-4">Desglose de gastos por categoría</p>
          
          <div className="h-64 flex justify-center">
            <PieChart width={300} height={250}>
              <Pie
                data={categoryData}
                cx={150}
                cy={120}
                outerRadius={80}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </div>
          
          <div className="flex justify-center flex-wrap gap-4 mt-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}