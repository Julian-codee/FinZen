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
  updateRegisterData: (data: { ingresoMensual: number }) => void; // Agregar esta prop
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
        " Tengo ingresos regulares y puedo cubrir mis gastos sin problemas",
    },
    {
      id: "Moderate",
      title: "Moderada - ",
      description:
        " Puedo cubrir mis gastos básicos pero tengo poco margen para ahorrar",
    },
    {
      id: "Inestability",
      title: "Inestable - ",
      description:
        " Tengo dificultades para cubrir todos mis gastos regularmente",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-6">
      {["ingresos", "gastos", "ahorros", "deudas"].map((field) => (
        <div className="mt-6 flex flex-col justify-center" key={field}>
          <label className="block text-lg font-medium text-white mb-1">
            {field.charAt(0).toUpperCase() + field.slice(1)} Mensuales
            Aproximados
          </label>
          <input
            type="text"
            value={financialInputs[field as keyof typeof financialInputs]}
            onChange={(e) => {
              onInputChange(field, e.target.value); // Actualiza el estado local
              if (field === "ingresos") {
                // Aquí puedes enviar los ingresos al controlador o actualizar el estado global
                updateRegisterData({ ingresoMensual: Number(e.target.value)}); // Asegúrate de tener esta función disponible
              }
            }}
            className="border px-4 border-gray-700 text-white placeholder-gray-400/40 rounded-md h-12 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="$ 0.00"
          />
        </div>
      ))}

      <div className="grid grid-cols-1 gap-4 w-240 mt-6 col-span-2">
        {financialGoalsWithOther.map((goal) => (
          <div key={goal.id}>
            <div className="flex items-start space-x-4">
              <div
                className="w-7 h-7 border border-blue-500 rounded-full flex-shrink-0 mr-3 mt-1 flex items-center justify-center cursor-pointer"
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
                className="cursor-pointer flex w-full"
              >
                <span className="text-white text-lg font-medium">
                  {goal.title}
                </span>
                {goal.description && (
                  <p className="text-white">{goal.description}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};