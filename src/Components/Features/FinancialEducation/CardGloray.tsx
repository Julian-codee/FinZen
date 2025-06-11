import { useState, useEffect } from "react";
import { GlosaryApi } from "../../../Apis/GlosaryApi"; // Asegúrate que esté correctamente importado
import { BookOpen } from "lucide-react";

const API_KEY = "f1nz3n-2025-4PI-k3y-d4ta-Acc3ss";

type GlosarioItem = {
  id: number;
  titulo: string;
  categoria: string;
  descripcion: string;
};

type GlosarioProps = {
  selectedCategory: string;
};

export default function GlosarioFinanciero({
  selectedCategory,
}: GlosarioProps) {
  const [items, setItems] = useState<GlosarioItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      if (GlosaryApi.api_key === API_KEY) {
        const filteredItems = GlosaryApi.glosario.filter((item) => {
          if (selectedCategory === "Todos") return true;
          return (
            item.categoria.toLowerCase() === selectedCategory.toLowerCase()
          );
        });
        setItems(filteredItems);
      } else {
        setError("API Key inválida ❌");
      }
    } catch (err) {
      setError("Error al cargar el glosario");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 min-h-screen text-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-100">
        Glosario Financiero
      </h2>
      {loading && (
        <p className="text-center text-gray-400">Cargando definiciones...</p>
      )}
      {error && <p className="text-center text-red-500 font-bold">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="text-center text-gray-400">
          No se encontraron términos para esta categoría.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl p-7 border border-gray-700 transform transition duration-300 hover:scale-105 hover:shadow-3xl"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="bg-green-600 text-white text-[70%] font-bold px-4 py-1.5 rounded-full shadow-md">
                {item.categoria}
              </span>
            </div>
            <div className="mb-3">
              <div className="flex items-center mb-2">
                <BookOpen className="text-yellow-400 mr-3" size={24} />
                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.titulo}
                </h4>
              </div>
              <p className="text-white/70 leading-relaxed text-base">
                {item.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
