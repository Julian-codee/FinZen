import { useState } from "react";

export const Hero2 = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});

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

  const handleCheckboxChange = (id: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8 mt-6">
        <div className="mt-6 flex flex-col justify-center">
          <label className="block text-lg font-medium text-white mb-1">
            Ingresos Mensuales Aproximados
          </label>

          <input
            type="text"
            className="border px-4 border-gray-700 text-white placeholder-gray-400/40 rounded-md h-12 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="$  0.00"
          />
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <label className="block text-lg font-medium text-white mb-1">
            Gastos Mensuales Aproximados
          </label>

          <input
            type="text"
            className="border px-4 border-gray-700 text-white placeholder-gray-400/40 rounded-md h-12 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="$  0.00"
          />
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <label className="block text-lg font-medium text-white mb-1">
            Ahorros Totales Actuales
          </label>

          <input
            type="text"
            className="border px-4 border-gray-700 text-white placeholder-gray-400/40 rounded-md h-12 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="$  0.00"
          />
        </div>

        <div className="mt-6 flex flex-col justify-center">
          <label className="block text-lg font-medium text-white mb-1">
            Deuda Total Actual
          </label>

          <input
            type="text"
            className="border px-4 border-gray-700 text-white placeholder-gray-400/40 rounded-md h-12 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="$  0.00"
          />
        </div>

        {/*Selecion de otras Finanzas*/}

        <div className="grid grid-cols-1 gap-4 w-240">
          {financialGoalsWithOther.map((goal) => (
            <div key={goal.id}>
              <div className="flex items-start space-x-4">
                {/* Checkbox */}
                <div
                  className="w-6 h-6 border border-blue-500 rounded flex-shrink-0 flex items-center justify-center cursor-pointer mt-1"
                  style={{
                    backgroundColor: selectedOptions[goal.id]
                      ? "#3b82f6"
                      : "transparent",
                  }}
                  onClick={() => handleCheckboxChange(goal.id)}
                >
                  {/* Aquí podría ir un ícono de check si deseas */}
                </div>

                {/* Título y descripción en columna, pero alineados al lado del checkbox */}
                <div
                  onClick={() => handleCheckboxChange(goal.id)}
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
    </>
  );
};
