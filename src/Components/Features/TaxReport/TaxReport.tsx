import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { TabNavigation } from "./TabNavegation";
import { Header } from "./HeaderTaskReport";
import { TaxSummary } from "./TaxSummary";

export const TaxReport = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/** Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
          flex-1 p-6 transition-all duration-300 ease-in-out
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } /* Ajusta 'ml-20' si tu sidebar cerrada es de otro ancho */
        `}
      >
        {/** Header */}
        <Header />

        {/** Tabs */}
        <TabNavigation />
        <div className="flex items-center text-gray-400 mb-4">
          <svg
            className="w-6 h-6 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold">Información Personal</h2>
        </div>
        <p className="text-gray-400 mb-6">
          Ingresa tus datos personales para la declaración de renta 2024
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
              defaultValue="Juan Carlos Pérez"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="docType"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Tipo de Documento
            </label>
            <div className="relative">
              <select
                id="docType"
                className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500 appearance-none pr-8"
                defaultValue="Cédula de Ciudadanía"
                disabled
              >
                <option>Cédula de Ciudadanía</option>
                <option>Pasaporte</option>
                <option>Cédula de Extranjería</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15 8.172l-1.414-1.414L10 10.828 6.414 7.243 5 8.657z" />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="docNumber"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Número de Documento
            </label>
            <input
              type="text"
              id="docNumber"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
              defaultValue="1234567890"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
              defaultValue="Calle 123 #45-67"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
              defaultValue="Bogotá"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
              defaultValue="juan.perez@ejemplo.com"
              readOnly
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="phone"
              className="block text-gray-400 text-sm font-medium mb-1"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 focus:outline-none focus:border-indigo-500"
              defaultValue="3001234567"
              readOnly
            />
          </div>
        </div>
        <TaxSummary />
      </div>
    </>
  );
};
