import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

interface CategoryDataPoint {
  name: string;
  value: number;
  color: string;
}

interface CategoryDistributionProps {
  data: CategoryDataPoint[];
}

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ data }) => {
  return (
    <div className="bg-[#0F1525] p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-1">Distribución por Categoría</h2>
      <p className="text-gray-400 text-sm mb-4">Desglose de gastos por categoría</p>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              layout="horizontal" 
              verticalAlign="bottom" 
              align="center"
              formatter={(value) => {
                return <span className="text-white">{value}</span>;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryDistribution;