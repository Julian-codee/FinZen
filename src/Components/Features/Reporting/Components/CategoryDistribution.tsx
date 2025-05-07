import { PieChart, Pie, Cell } from 'recharts';

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface Props {
  data: CategoryData[];
}

const CategoryDistributionChart = ({ data }: Props) => {
  return (
    <div className=" border border-white/40 p-6 rounded-lg">
      <h2 className="text-xl font-bold">Distribución por Categoría</h2>
      <p className="text-gray-400 text-sm mb-4">Desglose de gastos por categoría</p>
      <div className="h-64 flex justify-center">
        <PieChart width={300} height={250}>
          <Pie data={data} cx={150} cy={120} outerRadius={80} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex justify-center flex-wrap gap-4 mt-4">
        {data.map((category) => (
          <div key={category.name} className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: category.color }}></div>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
