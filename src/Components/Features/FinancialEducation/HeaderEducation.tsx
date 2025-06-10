import { Book, GraduationCap, Library, Lightbulb, Search } from "lucide-react";
import { useState } from "react";

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
    <div className="text-white px-4 pt-8">
      {" "}
      {/* Añadido padding para que no esté pegado al borde */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Educación Financiera</h1>
        <p className="mb-12 max-w-2xl text-white/70 text-lg">
          Aprende conceptos financieros, recibe consejos personalizados y mejora
          tus habilidades para tomar decisiones financieras inteligentes.
        </p>
      </div>
      {/* Tabs de navegación */}
      <div className="flex space-x-2 mb-8 p-1 rounded-lg w-fit bg-gray-800 shadow-lg">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ease-in-out
              ${
                activeTab === tab.name
                  ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            onClick={() => setActiveTab(tab.name)}
          >
            <span className="mr-2 flex items-center justify-center">
              {tab.icon}
            </span>
            {tab.name}
          </button>
        ))}
      </div>
      {/* Barra de búsqueda y filtros de nivel y cursos */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        {/* Barra de búsqueda: visible en todas las pestañas */}
        <div className="relative flex-grow w-full md:w-auto">
          <input
            type="text"
            placeholder="Buscar recursos..."
            className="w-[38%] pl-10 pr-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 shadow-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <Search size={20} />
          </span>
        </div>

        {/* Filtros de nivel Cursos (CoursesLevel): visibles SÓLO si activeTab es 'Cursos' */}
        {activeTab === "Consejos" && (
          <div className="flex space-x-2 bg-gray-800 rounded-lg p-1 shadow-lg">
            {CoursesLevel.map(
              (
                course // Cambiado 'courses' a 'course' para evitar conflicto con el array
              ) => (
                <button
                  key={course}
                  className={`px-4 py-2 rounded-md transition-colors duration-200 text-sm font-medium
                  ${
                    selectedCourses === course
                      ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-md"
                      : "text-gray-400 hover:bg-gray-700"
                  }`}
                  onClick={() => setSelectedCourses(course)}
                >
                  {course}
                </button>
              )
            )}
          </div>
        )}
      </div>
      {/* Aquí podrías renderizar el contenido basado en activeTab, selectedLevel y selectedCourses */}
      <div className="mt-8">
        {activeTab === "Consejos" && (
          <p className="text-gray-400">
            Aquí irán los consejos. Nivel seleccionado: {selectedCourses}
          </p>
        )}
      </div>
    </div>
  );
};
