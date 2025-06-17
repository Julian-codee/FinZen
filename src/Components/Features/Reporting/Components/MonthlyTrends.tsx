import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

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

interface MonthlyDataPoint {
    mes: string;
    ingresos: number;
    gastos: number;
    balance: number;
}

const MonthlyTrends = () => {
    const [data, setData] = useState<MonthlyDataPoint[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFinances = async () => {
            try {
                // Remove Authorization header for public endpoint
                const response = await axios.get('http://localhost:8080/finzen/gasto/user/finances');
                const { ingresos, gastos } = response.data;
                const monthlyData = processFinancialData(ingresos || [], gastos || []);
                setData(monthlyData);
                setError(null);
            } catch (error) {
                console.error('Error al obtener datos financieros:', error);
                const errorMessage = error.response?.data?.message || 
                                   (typeof error.response?.data === 'string' ? error.response.data : '') || 
                                   'No se pudieron cargar los datos financieros';
                setError(errorMessage);
            }
        };

        fetchFinances();
    }, []);

    const processFinancialData = (ingresos: Ingreso[], gastos: Gasto[]): MonthlyDataPoint[] => {
        const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
        const monthlyMap: { [key: number]: MonthlyDataPoint } = {};

        months.forEach((month, index) => {
            monthlyMap[index] = { mes: month, ingresos: 0, gastos: 0, balance: 0 };
        });

        ingresos.forEach((ingreso) => {
            try {
                const date = new Date(ingreso.fecha);
                if (isNaN(date.getTime())) {
                    console.warn(`Fecha inválida en ingreso: ${ingreso.fecha}`);
                    return;
                }
                const monthIndex = date.getMonth();
                monthlyMap[monthIndex].ingresos += Number(ingreso.monto) || 0;
            } catch (e) {
                console.warn(`Error procesando ingreso: ${e.message}`);
            }
        });

        gastos.forEach((gasto) => {
            try {
                const date = new Date(gasto.fecha);
                if (isNaN(date.getTime())) {
                    console.warn(`Fecha inválida en gasto: ${gasto.fecha}`);
                    return;
                }
                const monthIndex = date.getMonth();
                monthlyMap[monthIndex].gastos += Number(gasto.monto) || 0;
            } catch (e) {
                console.warn(`Error procesando gasto: ${e.message}`);
            }
        });

        Object.values(monthlyMap).forEach((month) => {
            month.balance = month.ingresos - month.gastos;
        });

        return Object.values(monthlyMap).filter((month) => month.ingresos > 0 || month.gastos > 0);
    };

    return (
        <div className="border border-white/40 rounded-lg p-6 shadow-md text-white">
            <h2 className="text-lg font-semibold mb-1">Tendencias Mensuales</h2>
            <p className="text-gray-400 text-sm mb-4">
                Evolución de tus finanzas a lo largo del tiempo
            </p>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                    <XAxis dataKey="mes" stroke="#cbd5e1" />
                    <YAxis stroke="#cbd5e1" />
                    <Tooltip />
                    <Line type="monotone" dataKey="ingresos" stroke="#00FF00" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="gastos" stroke="#b91c1c" strokeWidth={2} dot />
                    <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} dot />
                </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 text-sm">
                <p className="text-gray-400">Tendencia de Balance</p>
                <p className="text-blue-500 font-medium">
                    {data.length > 1 && data[data.length - 2].balance !== 0
                        ? `${(
                              ((data[data.length - 1].balance - data[data.length - 2].balance) /
                                  Math.abs(data[data.length - 2].balance)) * 100
                          ).toFixed(1)}% vs. mes anterior`
                        : 'N/A'}
                </p>
            </div>
        </div>
    );
};

export default MonthlyTrends;