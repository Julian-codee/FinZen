// src/Apis/ArticleAPI.ts (o la ruta donde lo tengas)
// No necesitamos axios aquí si seguimos con fetch

const GNEWS_API_KEY = "6693af24d811a6efe113725dade04395"; // ¡REEMPLAZA CON TU API KEY DE GNEWS!
const GNEWS_BASE_URL = "https://gnews.io/api/v4/search"; // Endpoint de búsqueda de GNews

// Define una interfaz para el tipo de datos que se espera en los artículos
// La estructura de los artículos en GNews es muy similar a NewsAPI, pero es bueno ser explícito
export interface Article {
  source: {
    name: string; // En GNews, source no tiene un 'id' siempre, solo 'name'
    url: string;
  };
  author: string | null; // GNews no siempre proporciona el autor
  title: string;
  description: string | null;
  url: string;
  image: string | null; // GNews usa 'image' en lugar de 'urlToImage'
  publishedAt: string;
  content: string | null;
}

export const fetchWSJArticles = async (): Promise<Article[]> => {
  try {
    const url = new URL(GNEWS_BASE_URL);
    
    // Parámetros específicos para GNews
    url.searchParams.append('q', 'finanzas OR economía OR inversiones OR ahorros OR gastos OR ingresos'); // Palabras clave de búsqueda en español
    url.searchParams.append('lang', 'es'); // Idioma español
    url.searchParams.append('country', 'co'); // Países en español para filtrar (opcional, remuévelo si quieres cualquier país)
    url.searchParams.append('max', '10'); // Número máximo de artículos (ajusta según tus necesidades)
    url.searchParams.append('token', GNEWS_API_KEY); // GNews usa 'token' en lugar de 'apiKey'

    // Realizamos la petición usando fetch
    const response = await fetch(url.toString());

    if (!response.ok) {
      // Intentamos leer el mensaje de error de la API si la respuesta no es OK
      const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
      throw new Error(`Error de la API GNews: ${response.status} - ${errorData.message || response.statusText}`);
    }

    const data: { articles: Article[], totalArticles: number } = await response.json();

    // GNews API devuelve un array 'articles' directamente en la raíz de la respuesta JSON.
    return data.articles;

  } catch (error) {
    console.error("Error al obtener noticias de GNews:", error);
    throw error; 
  }
};