import { Book, GraduationCap, Library, Lightbulb, Search } from "lucide-react";
import { useState } from "react";
import { WallStreetArticles } from "./CardArticle";
import FinancialTipCard from "./Cardtips";
import GlosarioFinanciero from "./CardGloray";
import YoutubeCourses from "./CardCourses";

export const HeaderEducation = () => {
  const [activeTab, setActiveTab] = useState("Recursos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourses, setSelectedCourses] = useState("Todos");

  const tabs = [
    { name: "Recursos", icon: <Book size={18} /> },
    { name: "Consejos", icon: <Lightbulb size={18} /> },
    { name: "Glosario", icon: <Library size={18} /> },
    { name: "Cursos", icon: <GraduationCap size={18} /> },
  ];

  const CoursesLevel = [
    "Todos",
    "Presupuesto",
    "Ahorro",
    "Deudas",
    "Inversion",
    "Gastos",
  ];

  return (
    <div className="text-white px-4 pt-6 sm:px-6 lg:px-12">
      {/* Tabs */}
      <div className="w-full overflow-x-auto scrollbar-hide">
        <div
          className={`
            flex flex-col gap-2
            sm:flex-row sm:overflow-x-auto sm:gap-2 sm:bg-gray-800 sm:rounded-lg sm:p-2
            sm:inline-flex
          `}
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium flex-shrink-0
                transition-all duration-300
                ${
                  activeTab === tab.name
                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow"
                    : "bg-[#1c1f2b] text-gray-300 hover:bg-[#2c2f3c] sm:bg-transparent sm:hover:bg-[#2c2f3c]"
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Buscador y Filtros */}
      <div className="flex flex-col gap-4 mt-6 sm:flex-row sm:items-center sm:justify-between sm:mt-4 sm:mb-6">
        {activeTab === "Glosario" && (
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Buscar en el glosario..."
              className="w-full sm:w-[300px] pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </span>
          </div>
        )}

        {activeTab === "Consejos" && (
          <div className="w-full">
            <div
              className={`
                grid grid-cols-2 gap-2 mt-2
                sm:flex sm:flex-row sm:overflow-x-auto sm:bg-gray-800 sm:rounded-lg sm:p-2 sm:gap-2 w-full sm:w-fit
              `}
            >
              {CoursesLevel.map((course) => (
                <button
                  key={course}
                  onClick={() => setSelectedCourses(course)}
                  className={`px-4 py-2 rounded-md text-sm font-medium flex-shrink-0 text-center 
                    ${
                      selectedCourses === course
                        ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow"
                        : "bg-[#1c1f2b] text-gray-300 hover:bg-[#2c2f3c] sm:bg-transparent"
                    }
                  `}
                >
                  {course}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contenido dinámico */}
      <div className="mt-4 sm:mt-6 lg:mt-8 text-gray-300">
        {activeTab === "Recursos" && <WallStreetArticles />}
        {activeTab === "Consejos" && (
          <FinancialTipCard selectedCategory={selectedCourses} />
        )}
        {activeTab === "Glosario" && (
          <GlosarioFinanciero
            selectedCategory="Todos"
            searchQuery={searchQuery}
          />
        )}
        {activeTab === "Cursos" && <YoutubeCourses />}
      </div>
    </div>
  );
};
