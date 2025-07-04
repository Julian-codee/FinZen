import {
  PiggyBank,
  ChartLine,
  Wallet,
  House,
  Signal,
  CreditCard,
  Briefcase,
  GraduationCap,
} from "lucide-react";

interface Hero4Props {
  selectedItems: string[];
  setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>;
}

export const Hero4 = ({ selectedItems, setSelectedItems }: Hero4Props) => {
  const knowledgeOptionsHero4 = [
    {
      id: "Presupuestos",
      icon: <PiggyBank size={36} color="#3063c5" />,
      title: "Presupuestos y control de gastos",
    },
    {
      id: "Ahorro",
      icon: <Wallet size={36} color="#3063c5" />,
      title: "Estrategias de ahorro",
    },
    {
      id: "planificacion",
      icon: <ChartLine size={36} color="#3063c5" />,
      title: "Planificación fiscal",
    },
    {
      id: "bienes",
      icon: <House size={36} color="#3063c5" />,
      title: "Bienes raíces e hipotecas",
    },
    {
      id: "criptos",
      icon: <ChartLine size={36} color="#3063c5" />,
      title: "Criptomonedas",
    },
    {
      id: "Inversiones",
      icon: <Signal size={36} color="#3063c5" />,
      title: "Inversiones y mercados financieros",
    },
    {
      id: "Gestion",
      icon: <CreditCard size={36} color="#3063c5" />,
      title: "Gestión de deudas",
    },
    {
      id: "Planificacion",
      icon: <Briefcase size={36} color="#3063c5" />,
      title: "Planificación para la jubilación",
    },
    {
      id: "Mercado",
      icon: <ChartLine size={36} color="#3063c5" />,
      title: "Mercado de Valores",
    },
    {
      id: "education",
      icon: <GraduationCap size={36} color="#3063c5" />,
      title: "Educación financiera general",
    },
  ];

  const toggleSelection = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {knowledgeOptionsHero4.map((item) => {
        const isSelected = selectedItems.includes(item.id);
        return (
          <div
            key={item.id}
            onClick={() => toggleSelection(item.id)}
            className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all duration-200 ease-in-out
              ${isSelected ? "bg-blue-100 border-blue-500" : "hover:shadow-md"}
            `}
          >
            <div className="text-blue-600">{item.icon}</div>
            <div
              className={`text-base sm:text-lg font-medium ${
                isSelected ? "text-[#020817]" : "text-gray-300"
              }`}
            >
              {item.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};
