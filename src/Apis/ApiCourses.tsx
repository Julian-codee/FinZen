// src/hooks/useYoutubeVideos.ts
import { useEffect, useState } from 'react';

export interface VideoItem {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: { url: string };
    };
  };
}

const API_KEY = 'AIzaSyCMh5EZ7Yfg1FZ19BvhptRlSt9GvB2qAeQ';//Aqui estara el APIKEY que nos trae los cursos


//Aqui se exporta la funcion que nos permite visualizar la informacion de la api 

export const useYoutubeVideos = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=curso%20finanzas&type=video&maxResults=12&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.items) {
          setVideos(data.items);
        } else {
          setError('No se encontraron videos.');
        }
      } catch (err) {
        setError('Error al cargar videos.');
      }
    };

    fetchVideos();
  }, []);

  return { videos, error };
};
