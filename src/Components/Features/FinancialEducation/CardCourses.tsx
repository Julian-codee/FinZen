// src/components/YoutubeCourses.tsx
import { useYoutubeVideos } from "../../../Apis/ApiCourses";

const YoutubeCourses = () => {
  const { videos, error } = useYoutubeVideos();

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Cursos de Finanzas Personales</h2>
      {error && <p className="text-red-600 text-center">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full"
            />
            <div className="p-4">
              <h4 className="text-lg font-medium mb-1">{video.snippet.title}</h4>
              <p className="text-sm text-gray-600 mb-2">Canal: {video.snippet.channelTitle}</p>
              <a
                href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm"
              >
                Ver en YouTube
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YoutubeCourses;
