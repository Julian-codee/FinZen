export interface Hero3Props {
  knowledgeLevel: string;
  onKnowledgeChange: (value: string) => void;
}

export const Hero3 = ({
  knowledgeLevel,
  onKnowledgeChange,
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

  return (
    <div className="mt-6 space-y-4">
      <p className="text-white text-lg font-semibold">
        ¿Cómo evaluarías tu conocimiento sobre finanzas personales?
      </p>
      {knowledgeOptions.map((option) => (
        <label
          key={option.value}
          className="flex items-start space-x-3 cursor-pointer"
        >
          <input
            type="radio"
            name="knowledge"
            value={option.value}
            checked={knowledgeLevel === option.value}
            onChange={() => onKnowledgeChange(option.value)}
            className="mt-1 accent-blue-600"
          />
          <span className="text-white">{option.label}</span>
        </label>
      ))}
    </div>
  );
};
