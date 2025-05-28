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
      label:
        "Diariamente - Para registrar transacciones y revisar finanzas",
    },
    {
      value: "Semanalmente",
      label:
        "Semanalmente - Para revisar y planificar",
    },
    {
      value: "Mensualmente",
      label:
        "Mensualmente - Para análisis y ajustes periódicos",
    },
  ];

  const propsOptions2 = [
    {
      value2: "Todas",
      label2: "Todas - Quiero estar informado de todo",
    },
    {
      value2: "importantes",
      label2:
        "Solo importantes - Alertas de presupuesto, facturas, etc.",
    },
    {
      value2: "Ninguna",
      label2:
        "Ninguna - Prefiero revisar la app sin notificaciones",
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
      {/*Primera pregunta del form*/}
      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Con qué frecuencia planeas usar la aplicación?
        </p>
        {propsOptions.map((option) => (
          <label key={option.value} className="flex items-start space-x-3">
            <input
              type="radio"
              name="knowledge"
              value={option.value}
              checked={props === option.value}
              onChange={() => propsChange(option.value)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label}</span>
          </label>
        ))}
      </div>

      {/*Segunda pregunta del form*/}

      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Qué tipo de notificaciones prefieres recibir?
        </p>
        {propsOptions2.map((option) => (
          <label key={option.value2} className="flex items-start space-x-3 ">
            <input
              type="radio"
              name="knowledge2"
              value={option.value2}
              checked={props2 === option.value2}
              onChange={() => propsChange2(option.value2)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label2}</span>
          </label>
        ))}
      </div>

      {/*Tercera pregunta del form*/}

      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Cómo prefieres visualizar tus datos financieros?
        </p>
        {propsOptions3.map((option) => (
          <label key={option.value3} className="flex items-start space-x-3">
            <input
              type="radio"
              name="knowledge3"
              value={option.value3}
              checked={props3 === option.value3}
              onChange={() => propsChange3(option.value3)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label3}</span>
          </label>
        ))}
      </div>

      {/*Cuarta pregunta del form*/}

      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Qué nivel de detalle prefieres?
        </p>
        {propsOptions4.map((option) => (
          <label key={option.value4} className="flex items-start space-x-3 ">
            <input
              type="radio"
              name="knowledge4"
              value={option.value4}
              checked={props4 === option.value4}
              onChange={() => propsChange4(option.value4)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label4}</span>
          </label>
        ))}
      </div>
    </>
  );
};
