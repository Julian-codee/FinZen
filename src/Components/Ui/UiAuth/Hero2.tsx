import { Check } from "lucide-react";

interface Hero2Props {
  financialStatusOptions: Record<string, boolean>;
  onCheckboxChange: (id: string) => void;
  financialInputs: {
    ingresos: string;
    gastos: string;
    ahorros: string;
    deudas: string;
  };
  onInputChange: (field: string, value: string) => void;
  updateRegisterData: (data: { ingresoMensual: number }) => void;
}

export const Hero2 = ({
  financialStatusOptions,
  onCheckboxChange,
  financialInputs,
  onInputChange,
  updateRegisterData,
}: Hero2Props) => {
  const financialGoalsWithOther = [
    {
      id: "Stability",
      title: "Estable - ",
      description:
        "Tengo ingresos regulares y puedo cubrir mis gastos sin problemas",
    },
    {
      id: "Moderate",
      title: "Moderada - ",
      description:
        "Puedo cubrir mis gastos básicos pero tengo poco margen para ahorrar",
    },
    {
      id: "Inestability",
      title: "Inestable - ",
      description:
        "Tengo dificultades para cubrir todos mis gastos regularmente",
    },
  ];

  return (
    <div className="flex flex-col gap-8 mt-6">
      {/* Inputs de ingresos, gastos, etc */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {["ingresos", "gastos", "ahorros", "deudas"].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="block text-base sm:text-lg font-medium text-white mb-2">
              {field.charAt(0).toUpperCase() + field.slice(1)} mensuales
              aproximados
            </label>
            <input
              type="text"
              value={financialInputs[field as keyof typeof financialInputs]}
              onChange={(e) => {
                onInputChange(field, e.target.value);
                if (field === "ingresos") {
                  const ingresoMensual = Number(e.target.value);
                  updateRegisterData({ ingresoMensual });
                }
              }}
              placeholder="$ 0.00"
              className="w-full border border-gray-700 text-white placeholder-gray-400/40 rounded-md h-12 px-4 bg-gray-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        ))}
      </div>

      {/* Opciones de estado financiero */}
      <div className="grid grid-cols-1 gap-5">
        {financialGoalsWithOther.map((goal) => (
          <div key={goal.id} className="flex items-start space-x-4">
            <div
              className="w-7 h-7 border border-blue-500 rounded-full flex-shrink-0 mt-1 flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: financialStatusOptions[goal.id]
                  ? "#3b82f6"
                  : "transparent",
              }}
              onClick={() => onCheckboxChange(goal.id)}
            >
              {financialStatusOptions[goal.id] && (
                <Check className="text-white w-5 h-5 font-extrabold" />
              )}
            </div>
            <div
              onClick={() => onCheckboxChange(goal.id)}
              className="cursor-pointer flex flex-col text-white"
            >
              <span className="text-base sm:text-lg font-medium">
                {goal.title}
              </span>
              {goal.description && (
                <p className="text-sm sm:text-base text-gray-300 mt-1">
                  {goal.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
