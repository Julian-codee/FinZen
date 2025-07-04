import { Gauge } from "lucide-react";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate



export const TaxSummary: React.FC = () => {
  const [totalIncomes, setTotalIncomes] = useState<number>(0);
  const [totalDeductions, setTotalDeductions] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);
  const [calculatedTax, setCalculatedTax] = useState<number>(0);
  const [balanceInFavor, setBalanceInFavor] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const taxesPaid = 9200000; // Constante, no cambia

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("token");
        if (!token) {
          setError("No se encontró token de autenticación. Por favor, inicia sesión.");
          navigate("/");
          setLoading(false);
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const totalIngresosResponse = await axios.get<number>(
          "http://localhost:8080/finzen/ingreso/total",
          { headers }
        );

        const totalIncomeValue = totalIngresosResponse.data || 0;
        setTotalIncomes(Number(totalIncomeValue));

        const deductionsRate = 0.35;
        const calculatedDeductions = totalIncomeValue * deductionsRate;
        setTotalDeductions(calculatedDeductions);

        const calculatedNetIncome = totalIncomeValue - calculatedDeductions;
        setNetIncome(calculatedNetIncome);

        let tax = 0;
        if (calculatedNetIncome <= 20000000) {
          tax = calculatedNetIncome * 0.01;
        } else if (calculatedNetIncome <= 50000000) {
          tax = 200000 + (calculatedNetIncome - 20000000) * 0.05;
        } else {
          tax = 1700000 + (calculatedNetIncome - 50000000) * 0.1;
        }
        setCalculatedTax(tax);

        const finalBalance = taxesPaid - tax;
        setBalanceInFavor(finalBalance);
      } catch (err) {
        console.error("Fallo al obtener datos de ingresos o calcular impuestos:", err);
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data || "Error al obtener datos de ingresos.");
        } else {
          setError("Error al calcular el resumen de impuestos. Inténtalo de nuevo.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchIncomeData();
  }, [navigate]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="bg-[#111827] border border-white/60 p-6 rounded-lg mt-8 text-white text-center">
        <p>Cargando resumen de impuestos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#111827] border border-white/60 p-6 rounded-lg mt-8 text-white text-center">
        <p>Error: {error}</p>
        <p>Por favor, asegúrate de que estás autenticado y de que el backend está funcionando correctamente.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#111827] border border-white/60 p-6 rounded-lg mt-8 text-white">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-gray-400 mb-4">
        <Gauge className="text-indigo-400" />
        <h2 className="text-xl font-semibold text-white">
          Resumen de Impuestos
        </h2>
      </div>

      <p className="text-gray-400 mb-6 text-sm sm:text-base">
        Cálculo preliminar basado en la información proporcionada
      </p>

      {/* Resumen de cifras */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <p className="text-gray-400 text-sm">Ingresos Totales</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(totalIncomes)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Deducciones Totales</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(totalDeductions)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Renta Líquida</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(netIncome)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Impuesto Calculado</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(calculatedTax)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Impuestos Pagados</p>
          <p className="text-2xl font-bold mt-1">{formatCurrency(taxesPaid)}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">
            {balanceInFavor >= 0 ? "Saldo a Favor" : "Saldo a Pagar"}
          </p>
          <p
            className={`text-2xl font-bold mt-1 ${
              balanceInFavor >= 0 ? "text-green-400" : "text-red-500"
            }`}
          >
            {formatCurrency(Math.abs(balanceInFavor))}
          </p>
        </div>
      </div>
    </div>
  );
};