import { useState, useEffect } from "react";
import { tipsData } from "../../../Apis/tipsApi";
import { Lightbulb, Bookmark } from "lucide-react";

const API_KEY = "f1nz3n-2025-4PI-k3y-d4ta-Acc3ss";

type Consejo = {
  id: number;
  categoria: string;
  titulo: string;
  descripcion: string;
  autor?: string;
};

// Define las props que el componente FinancialTipCard va a recibir
type FinancialTipCardProps = {
  selectedCategory: string; // Nueva prop para la categoría seleccionada
};

export default function ConsejosFinancieros({
  selectedCategory,
}: FinancialTipCardProps) {
  const [consejos, setConsejos] = useState<Consejo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (tipsData.api_key === API_KEY) {
        // Filtra los consejos aquí basado en la categoría seleccionada
        const filteredConsejos = tipsData.consejos.filter((consejo) => {
          if (selectedCategory === "Todos") {
            return true; // Si la categoría es "Todos", muestra todos los consejos
          }
          // Compara la categoría del consejo con la categoría seleccionada (ignorando mayúsculas/minúsculas)
          return (
            consejo.categoria.toLowerCase() === selectedCategory.toLowerCase()
          );
        });
        setConsejos(filteredConsejos);
      } else {
        setError("API Key inválida ❌");
      }
    } catch (err) {
      setError("Error al procesar los consejos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]); // Añade selectedCategory como dependencia para que el efecto se ejecute cuando cambie

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen text-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
        Consejos Financieros
      </h2>
      {loading && (
        <p className="text-center text-gray-400">Cargando consejos...</p>
      )}
      {error && <p className="text-center text-red-500 font-bold">{error}</p>}
      {!loading && !error && consejos.length === 0 && (
        <p className="text-center text-gray-400">
          No se encontraron consejos para esta categoría.
        </p> // Mensaje más específico
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {consejos.map((consejo) => (
          <div
            key={consejo.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-7 border border-gray-700 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex justify-between items-center mb-5">
              <span className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-[70%] font-bold px-4 py-1.5 rounded-full shadow-md">
                {consejo.categoria}
              </span>
              <Bookmark
                className="text-gray-400 hover:text-blue-400 cursor-pointer transition duration-200"
                size={22}
              />
            </div>

            <div className="mb-5 flex-grow">
              <div className="flex items-center mb-3">
                <Lightbulb className="text-yellow-400 mr-3" size={24} />
                <h3 className="text-md font-bold text-gray-100 leading-tight">
                  {consejo.titulo}
                </h3>
              </div>
              <p className="text-white/70 leading-relaxed text-base">
                {consejo.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
