import { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import axios from "axios";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

// Colores predefinidos para las categorías
const COLORS = [
  "#FF6B6B", // Rojo
  "#4ECDC4", // Turquesa
  "#45B7D1", // Azul
  "#96CEB4", // Verde
  "#FFEEAD", // Amarillo
  "#D4A5A5", // Rosa
  "#9B59B6", // Morado
];

interface CategoriaGastoConConteoDTO {
  idCategoriaGasto: number;
  nombreCategoria: string;
  conteoGastos: number;
}

const CategoryDistributionChart = () => {
  const [data, setData] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener el token del localStorage (o donde lo almacenes)
        const token = localStorage.getItem("token"); // Ajusta según tu implementación

        if (!token) {
          setError("No se encontró el token de autenticación");
          setLoading(false);
          return;
        }

        // Llamada al endpoint
        const response = await axios.get<CategoriaGastoConConteoDTO[]>(
          "http://localhost:8080/finzen/gasto/getCategoriasGasto", // Ajusta la URL según tu backend
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Transformar los datos al formato CategoryData
        const chartData: CategoryData[] = response.data.map((item, index) => ({
          name: item.nombreCategoria,
          value: item.conteoGastos,
          color: COLORS[index % COLORS.length], // Asignar un color cíclicamente
        }));

        setData(chartData);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="border border-white/40 p-6 rounded-lg">
      <h2 className="text-xl font-bold">Distribución por Categoría</h2>
      <p className="text-gray-400 text-sm mb-4">
        Desglose de gastos por categoría
      </p>
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
            <div
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: category.color }}
            ></div>
            <span>{category.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDistributionChart;
