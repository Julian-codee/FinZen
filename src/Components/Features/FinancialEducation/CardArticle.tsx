// src/components/WallStreetArticles.tsx
import { useEffect, useState } from 'react';
// Importamos los iconos de Lucide React necesarios
import { ArrowRight, ImageOff } from 'lucide-react'; // Añadido ImageOff

// Asegúrate de que la ruta sea correcta a tu archivo ArticleAPI.ts
import { fetchWSJArticles, Article } from "../../../Apis/ArticleAPI"; 

export const WallStreetArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);
        setError(null); 
        
        const data = await fetchWSJArticles(); 
        setArticles(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error desconocido al cargar los artículos.');
        }
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []); 

  if (loading) {
    return (
      <div className="text-center text-lg mt-8 p-4 text-white">
        Cargando artículos...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center text-lg mt-8 p-4 bg-gray-900 rounded-lg mx-auto max-w-md">
        Error: {error}. Por favor, intenta de nuevo más tarde.
      </div>
    );
  }

  if (articles.length === 0 && !loading && !error) {
    return (
      <div className="text-center text-gray-400 text-lg mt-8 p-4 bg-gray-900 rounded-lg mx-auto max-w-md">
        No se encontraron artículos en este momento.
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-gray-950 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-white">
        Últimos Artículos de Noticias Financieras
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.url}
            className="relative bg-gray-900 rounded-lg shadow-xl overflow-hidden
                       hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
          >
            <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
              {article.image ? ( 
                <img
                  src={article.image}
                  alt={article.title || 'Imagen del artículo'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                // ¡Reemplazado el SVG del placeholder por ImageOff de Lucide!
                <ImageOff className="h-16 w-16 text-gray-600" /> 
              )}
            </div>

            <div className="p-4 flex flex-col justify-between">
              <div className="flex justify-end items-center mb-3"> 
                <span className="text-gray-400 text-sm">
                  {article.content ? Math.ceil(article.content.split(' ').length / 200) : 5} min 
                </span>
              </div>

              <h2 className="text-2xl font-bold mb-2 text-white line-clamp-2">
                {article.title}
              </h2>

              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {article.description || 'No hay descripción disponible para este artículo.'}
              </p>

              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 mt-4 text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              >
                Leer artículo
                {/* Icono de Lucide React (ya lo tenías, solo confirmación) */}
                <ArrowRight className="ml-2 h-5 w-5" /> 
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};