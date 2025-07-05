import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// --- Interfaces para los datos del backend ---
interface Ingreso {
  idIngreso?: number;
  fecha: string;
  monto: number;
}

interface Gasto {
  idGasto?: number;
  fecha: string;
  monto: number;
}

// Interfaz para la data que usará el gráfico
interface ChartData {
  month: string;
  income: number;
  expenses: number;
}

// El componente ya no necesita Props para `data`
const IncomeExpensesChart = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true); // Nuevo estado de carga

  // --- Lógica para procesar los datos financieros del backend ---
  const processFinancialData = (
    ingresos: Ingreso[],
    gastos: Gasto[]
  ): ChartData[] => {
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    // Usamos un mapa para agrupar ingresos y gastos por mes
    const monthlyMap: { [key: number]: { income: number; expenses: number } } =
      {};

    // Inicializar el mapa para todos los meses del año para asegurar que todos los meses se muestren
    months.forEach((_, index) => {
      monthlyMap[index] = { income: 0, expenses: 0 };
    });

    // Sumar ingresos por mes
    ingresos.forEach((ingreso) => {
      try {
        const date = new Date(ingreso.fecha);
        if (!isNaN(date.getTime())) {
          const monthIndex = date.getMonth();
          monthlyMap[monthIndex].income += Number(ingreso.monto) || 0;
        } else {
          console.warn(`Fecha inválida en ingreso: ${ingreso.fecha}`);
        }
      } catch (e) {
        console.warn(`Error procesando ingreso:`, e);
      }
    });

    // Sumar gastos por mes
    gastos.forEach((gasto) => {
      try {
        const date = new Date(gasto.fecha);
        if (!isNaN(date.getTime())) {
          const monthIndex = date.getMonth();
          monthlyMap[monthIndex].expenses += Number(gasto.monto) || 0;
        } else {
          console.warn(`Fecha inválida en gasto: ${gasto.fecha}`);
        }
      } catch (e) {
        console.warn(`Error procesando gasto:`, e);
      }
    });

    // Convertir el mapa a un array en el formato que espera el gráfico
    return months.map((monthName, index) => ({
      month: monthName,
      income: monthlyMap[index].income,
      expenses: monthlyMap[index].expenses,
    }));
  };

  // --- useEffect para cargar los datos del backend ---
  useEffect(() => {
    const fetchFinances = async () => {
      setIsLoading(true); // Iniciar carga
      setError(null); // Limpiar errores previos
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError(
            "No se encontró token de autenticación. Por favor, inicia sesión."
          );
          setIsLoading(false);
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "https://finzenbackend-production.up.railway.app/finzen/gasto/user/finances",
          config
        );

        const { ingresos, gastos } = response.data;
        // Procesar y establecer los datos para el gráfico
        const monthlyChartData = processFinancialData(
          ingresos || [],
          gastos || []
        );
        setData(monthlyChartData);
      } catch (error) {
        console.error(
          "Error al obtener datos financieros para IncomeExpensesChart:",
          error
        );
        let errorMessage = "No se pudieron cargar los datos financieros.";

        if (axios.isAxiosError(error) && error.response) {
          const response = error.response;
          if (response.status === 401) {
            errorMessage = "No autorizado. Por favor, inicia sesión de nuevo.";
          } else if (response.data?.message) {
            errorMessage = `Error: ${response.data.message}`;
          } else if (typeof response.data === "string") {
            errorMessage = `Error: ${response.data}`;
          } else {
            errorMessage = `Error en la solicitud: ${response.status} ${response.statusText}`;
          }
        } else if (error instanceof Error) {
          errorMessage = `Error: ${error.message}`;
        }
        setError(errorMessage);
        setData([]); // Limpiar datos si hay un error
      } finally {
        setIsLoading(false); // Finalizar carga
      }
    };

    fetchFinances();
  }, []); // El array de dependencias vacío asegura que se ejecute solo una vez al montar

  // Calcular totales después de que los datos se hayan cargado
  const totalIncome = data.reduce((acc, curr) => acc + curr.income, 0);
  const totalExpenses = data.reduce((acc, curr) => acc + curr.expenses, 0);

  return (
    <div className="border border-white/40 p-6 rounded-lg w-full bg-[#020817]">
      <h2 className="text-white text-lg font-semibold">Ingresos vs Gastos</h2>
      <p className="text-gray-400 text-sm mb-4">
        Comparativa mensual de ingresos y gastos
      </p>

      {isLoading && <p className="text-blue-400 mb-4">Cargando datos...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!isLoading && !error && data.length === 0 && (
        <p className="text-gray-400 text-center">
          No hay datos de ingresos o gastos para mostrar en el gráfico.
        </p>
      )}

      {!isLoading && !error && data.length > 0 && (
        <div className="h-72">
          <ResponsiveContainer width="90%" height="100%">
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#1F2937"
                vertical={false}
              />
              <XAxis dataKey="month" tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9CA3AF", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1F2937", border: "none" }}
                labelStyle={{ color: "#fff" }}
                // Eliminado `cursor={{ fill: '#374615120' }}` por un color más estándar si no es específico
                cursor={{ fill: "rgba(55, 65, 81, 0.5)" }} // Un color más legible para el cursor del tooltip
              />
              <Legend
                verticalAlign="top"
                align="center"
                wrapperStyle={{
                  color: "#9CA3AF",
                  fontSize: 12,
                  paddingTop: "10px",
                }} // Ajuste para el espaciado
              />
              <Bar
                dataKey="income"
                name="Ingresos"
                fill="#33beff"
                barSize={35}
              />
              <Bar
                dataKey="expenses"
                name="Gastos"
                fill="#B91C1C"
                barSize={35}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {!isLoading &&
        !error && ( // Solo muestra los totales si no está cargando y no hay error
          <div className="flex justify-between text-sm mt-6">
            <div className="text-green-400 font-semibold">
              Ingresos Totales <br />
              <span className="text-xl">
                ${totalIncome.toLocaleString("es-CO")}
              </span>{" "}
              {/* Formato de moneda */}
            </div>
            <div className="text-red-500 font-semibold text-right">
              Gastos Totales <br />
              <span className="text-xl">
                ${totalExpenses.toLocaleString("es-CO")}
              </span>{" "}
              {/* Formato de moneda */}
            </div>
          </div>
        )}
    </div>
  );
};

export default IncomeExpensesChart;
