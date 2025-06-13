// src/components/YoutubeCourses.tsx
import { SquareArrowOutUpRight } from "lucide-react";
import { useYoutubeVideos } from "../../../Apis/ApiCourses";

const YoutubeCourses = () => {
  const { videos, error } = useYoutubeVideos();

  const isLoading = !videos.length && !error;

  return (
    <div className="px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center text-white">
        Cursos de Finanzas Personales
      </h2>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && <p className="text-red-600 text-center">{error}</p>}

      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-md overflow-hidden flex flex-col h-full hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-full"
              />

              <div className="p-4 flex flex-col h-full">
                <h4 className="text-lg font-medium mb-1 line-clamp-2">
                  {video.snippet.title}
                </h4>
                <p className="text-sm text-gray-400 mb-2">
                  Canal: {video.snippet.channelTitle}
                </p>

                <a
                  href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-2 mt-auto text-base font-medium rounded-md text-white bg-gradient-to-r from-indigo-500 to-blue-500 hover:brightness-130 hover:saturate-130 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Ver Curso <SquareArrowOutUpRight className="w-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YoutubeCourses;
