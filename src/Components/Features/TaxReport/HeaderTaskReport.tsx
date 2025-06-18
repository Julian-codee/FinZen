import React from "react";

export const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Informe Fiscal</h1>
        <p className="text-white/70">Genera tu declaración de renta con la información de tus finanzas personales.</p>
      </div>
      <p></p>
      <div className="flex space-x-4">
        <span className="text-gray-400">2024</span>
        <button className="p-2 rounded-md hover:bg-gray-700">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <button className="p-2 rounded-md hover:bg-gray-700">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 4a2 2 0 00-2 2v6a2 2 0 002 2h2V4H5z"></path>
            <path d="M12 4a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2V4z"></path>
          </svg>
        </button>
        <button className="p-2 rounded-md hover:bg-gray-700">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.736-1.564l-3.535.707a.5.5 0 01-.58-.707l.707-3.535A8.841 8.841 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM9 9a1 1 0 00-2 0v2a1 1 0 002 0V9zm4-1a1 1 0 00-2 0v3a1 1 0 002 0V8z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
