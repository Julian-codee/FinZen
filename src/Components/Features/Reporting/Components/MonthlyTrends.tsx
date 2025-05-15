import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    {mes: 'Ene', ingresos: 4800,gastos: 2500, balance: 1500},
    {mes: 'Feb', ingresos: 3000, gastos: 2900, balance: 0},
    {mes: 'Mar', ingresos: 5000, gastos: 3200, balance: 1600},
    {mes: 'Abr', ingresos: 4500, gastos: 3000, balance: 1500},
    {mes: 'May', ingresos:4700, gastos: 3100, balance: 1300},
    {mes: 'Jun', ingresos: 5300, gastos: 3400, balance: 1900},
];

const MonthlyTrends = () => {
    return (
        <div className="border border-white/40 rounded-lg p-6 shadow-md text-white">
      <h2 className="text-lg font-semibold mb-1">Tendencias Mensuales</h2>
      <p className="text-gray-400 text-sm mb-4">
        Evolución de tus finanzas a lo largo del tiempo
      </p>
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
        <p className="text-blue-500 font-medium">+12.5% vs. mes anterior</p>
      </div>
    </div>
    );
};

export default MonthlyTrends;