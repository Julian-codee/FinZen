import React from 'react';
import { useNavigate } from "react-router-dom"

const TransactionsHeader: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Transacciones</h1>
        <p className="mt-2 text-gray-400 max-w-lg leading-relaxed">
          Visualiza y gestiona todas tus transacciones financieras
        </p>
      </div>

      <div className="flex gap-3">
     <button
      type="button"
      className="bg-blue-500 hover:bg-blue-600 focus:ring-blue-400 focus:ring-offset-blue-900 focus:ring-2 text-white px-5 py-2 rounded-md flex items-center gap-2 text-sm font-semibold shadow-sm transition"
      onClick={() => navigate("/AddTransaction") }
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0h6" />
      </svg>
      Nueva Transacción
    </button>
        
        <button
          type="button"
          className="bg-transparent border border-gray-600 hover:border-gray-500 focus:ring-gray-400 focus:ring-offset-gray-900 focus:ring-2 text-white p-2 rounded-md transition flex items-center"
          aria-label="Abrir filtros"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 11 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default TransactionsHeader;
