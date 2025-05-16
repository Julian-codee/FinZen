export interface Hero3Props {
  knowledgeLevel: string;
  onKnowledgeChange: (value: string) => void;
  knowledgeLevel2: string;
  onKnowledgeChange2: (value: string) => void;
  knowledgeLevel3: string;
  onKnowledgeChange3: (value: string) => void;
  knowledgeLevel4: string;
  onKnowledgeChange4: (value: string) => void;
}

export const Hero3 = ({
  knowledgeLevel,
  onKnowledgeChange,
  knowledgeLevel2,
  onKnowledgeChange2,
  knowledgeLevel3,
  onKnowledgeChange3,
  knowledgeLevel4,
  onKnowledgeChange4,
}: Hero3Props) => {
  const knowledgeOptions = [
    {
      value: "Principiante",
      label:
        "Principiante - Tengo conocimientos básicos sobre finanzas personales",
    },
    {
      value: "Intermedio",
      label:
        "Intermedio - Entiendo conceptos como interés compuesto y diversificación",
    },
    {
      value: "Avanzado",
      label:
        "Avanzado - Comprendo estrategias financieras complejas y términos técnicos",
    },
  ];

  const knowledgeOptions2 = [
    {
      value2: "Ninguna",
      label2: "Ninguna - No he invertido antes o tengo muy poca experiencia",
    },
    {
      value2: "Alguna",
      label2:
        "Alguna - He invertido en productos básicos como fondos indexados",
    },
    {
      value2: "Experientado",
      label2:
        "Experimentado - Invierto regularmente en diversos activos financieros",
    },
  ];

  const knowledgeOptions3 = [
    {
      value3: "Regularmente",
      label3: "Regularmente - Hago y sigo un presupuesto detallado",
    },
    {
      value3: "Ocasionalmente",
      label3: "Ocasionalmente - Hago presupuestos pero no siempre los sigo",
    },
    {
      value3: "Nunca",
      label3: "Nunca - No suelo hacer presupuestoss",
    },
  ];

  const knowledgeOptions4 = [
    {
      value4: "Manualmente",
      label4: "Manualmente - Prefiero registrar cada transacción yo mismo",
    },
    {
      value4: "Automaticamente",
      label4: "Automáticamente - Prefiero que se sincronicen automáticamente",
    },
    {
      value4: "Ambos",
      label4: "Ambos - Una combinación de registro manual y automático",
    },
  ];

  return (
    <>
      {/*Primera pregunta del form*/}
      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Cómo evaluarías tu conocimiento sobre finanzas personales?
        </p>
        {knowledgeOptions.map((option) => (
          <label key={option.value} className="flex items-start space-x-3">
            <input
              type="radio"
              name="knowledge"
              value={option.value}
              checked={knowledgeLevel === option.value}
              onChange={() => onKnowledgeChange(option.value)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label}</span>
          </label>
        ))}
      </div>

      {/*Segunda pregunta del form*/}

      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Cuál es tu experiencia con inversiones?
        </p>
        {knowledgeOptions2.map((option) => (
          <label key={option.value2} className="flex items-start space-x-3 ">
            <input
              type="radio"
              name="knowledge2"
              value={option.value2}
              checked={knowledgeLevel2 === option.value2}
              onChange={() => onKnowledgeChange2(option.value2)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label2}</span>
          </label>
        ))}
      </div>

      {/*Tercera pregunta del form*/}

      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Con qué frecuencia haces presupuestos?
        </p>
        {knowledgeOptions3.map((option) => (
          <label key={option.value3} className="flex items-start space-x-3">
            <input
              type="radio"
              name="knowledge3"
              value={option.value3}
              checked={knowledgeLevel3 === option.value3}
              onChange={() => onKnowledgeChange3(option.value3)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label3}</span>
          </label>
        ))}
      </div>

      {/*Cuarta pregunta del form*/}

      <div className="mt-6 space-y-4">
        <p className="text-white text-xl font-semibold">
          ¿Cómo prefieres registrar tus transacciones financieras?
        </p>
        {knowledgeOptions4.map((option) => (
          <label key={option.value4} className="flex items-start space-x-3 ">
            <input
              type="radio"
              name="knowledge4"
              value={option.value4}
              checked={knowledgeLevel4 === option.value4}
              onChange={() => onKnowledgeChange4(option.value4)}
              className="mt-1 cursor-pointer appearance-none bg-transparent h-6 w-6 border border-gray-300 rounded-full checked:border-blue-500 checked:ring-2 checked:ring-blue-500 checked:ring-offset-2 checked:ring-offset-transparent focus:outline-none"
            />
            <span className="text-white text-lg">{option.label4}</span>
          </label>
        ))}
      </div>
    </>
  );
};
