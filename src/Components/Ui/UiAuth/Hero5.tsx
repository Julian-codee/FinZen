export interface Hero5Props {
  props: string;
  propsChange: (value: string) => void;
  props2: string;
  propsChange2: (value: string) => void;
  props3: string;
  propsChange3: (value: string) => void;
  props4: string;
  propsChange4: (value: string) => void;
}

export const Hero5 = ({
  props,
  propsChange,
  props2,
  propsChange2,
  props3,
  propsChange3,
  props4,
  propsChange4,
}: Hero5Props) => {
  const propsOptions = [
    {
      value: "Diariamente",
      label: "Diariamente - Para registrar transacciones y revisar finanzas",
    },
    {
      value: "Semanalmente",
      label: "Semanalmente - Para revisar y planificar",
    },
    {
      value: "Mensualmente",
      label: "Mensualmente - Para análisis y ajustes periódicos",
    },
  ];

  const propsOptions2 = [
    {
      value2: "Todas",
      label2: "Todas - Quiero estar informado de todo",
    },
    {
      value2: "importantes",
      label2: "Solo importantes - Alertas de presupuesto, facturas, etc.",
    },
    {
      value2: "Ninguna",
      label2: "Ninguna - Prefiero revisar la app sin notificaciones",
    },
  ];

  const propsOptions3 = [
    {
      value3: "Gráficos",
      label3: "Gráficos - Visualizaciones y diagramas",
    },
    {
      value3: "Tablas",
      label3: "Tablas - Datos numéricos detallados",
    },
    {
      value3: "Ambos",
      label3: "Ambos - Combinación de gráficos y tablas",
    },
  ];

  const propsOptions4 = [
    {
      value4: "Detallado",
      label4: "Detallado - Quiero ver todos los datos y métricas posibles",
    },
    {
      value4: "Equilibrado",
      label4: "Equilibrado - Un balance entre simplicidad y detalle",
    },
    {
      value4: "Simplificado",
      label4: "Simplificado - Solo lo esencial y fácil de entender",
    },
  ];

  return (
    <>
      {/* Pregunta 1 */}
      <div className="mt-6 space-y-3">
        <p className="text-white text-lg sm:text-xl font-semibold">
          ¿Con qué frecuencia planeas usar la aplicación?
        </p>
        {propsOptions.map((option) => (
          <label key={option.value} className="flex items-start gap-3">
            <input
              type="radio"
              name="usageFrequency"
              value={option.value}
              checked={props === option.value}
              onChange={() => propsChange(option.value)}
              className="mt-1 h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-blue-500 checked:ring-2 checked:ring-blue-500 focus:outline-none"
            />
            <span className="text-white text-base">{option.label}</span>
          </label>
        ))}
      </div>

      {/* Pregunta 2 */}
      <div className="mt-6 space-y-3">
        <p className="text-white text-lg sm:text-xl font-semibold">
          ¿Qué tipo de notificaciones prefieres recibir?
        </p>
        {propsOptions2.map((option) => (
          <label key={option.value2} className="flex items-start gap-3">
            <input
              type="radio"
              name="notificationPreference"
              value={option.value2}
              checked={props2 === option.value2}
              onChange={() => propsChange2(option.value2)}
              className="mt-1 h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-blue-500 checked:ring-2 checked:ring-blue-500 focus:outline-none"
            />
            <span className="text-white text-base">{option.label2}</span>
          </label>
        ))}
      </div>

      {/* Pregunta 3 */}
      <div className="mt-6 space-y-3">
        <p className="text-white text-lg sm:text-xl font-semibold">
          ¿Cómo prefieres visualizar tus datos financieros?
        </p>
        {propsOptions3.map((option) => (
          <label key={option.value3} className="flex items-start gap-3">
            <input
              type="radio"
              name="visualPreference"
              value={option.value3}
              checked={props3 === option.value3}
              onChange={() => propsChange3(option.value3)}
              className="mt-1 h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-blue-500 checked:ring-2 checked:ring-blue-500 focus:outline-none"
            />
            <span className="text-white text-base">{option.label3}</span>
          </label>
        ))}
      </div>

      {/* Pregunta 4 */}
      <div className="mt-6 space-y-3">
        <p className="text-white text-lg sm:text-xl font-semibold">
          ¿Qué nivel de detalle prefieres?
        </p>
        {propsOptions4.map((option) => (
          <label key={option.value4} className="flex items-start gap-3">
            <input
              type="radio"
              name="detailLevel"
              value={option.value4}
              checked={props4 === option.value4}
              onChange={() => propsChange4(option.value4)}
              className="mt-1 h-5 w-5 cursor-pointer appearance-none rounded-full border border-gray-400 checked:border-blue-500 checked:ring-2 checked:ring-blue-500 focus:outline-none"
            />
            <span className="text-white text-base">{option.label4}</span>
          </label>
        ))}
      </div>
    </>
  );
};
