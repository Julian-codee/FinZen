import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { TabNavigation } from "./TabNavegation";
import { Header } from "./HeaderTaskReport";
import { TaxSummary } from "./TaxSummary";
import { UserRound } from "lucide-react";

export const TaxReport = () => {
  // Sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //Tipo de documento

  const [tipoDocumento, setTipoDocumento] = useState("");

  return (
    <>
      {/** Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
          flex-1 p-6 transition-all duration-300 ease-in-out bg-[#020817] text-white
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
          <UserRound className="text-white"/>
          <h2 className="text-xl font-semibold text-white">Información Personal</h2>
        </div>
        <p className="text-gray-400 mb-6">
          Ingresa tus datos personales para la declaración de renta 2024
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-white/80 text-sm font-medium mb-1 "
            >
              Nombre Completo
            </label>
            <input
              type="text"
              id="fullName"
              className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
              placeholder="Juan Pérez"
            />
          </div>
          <div>
            <label
              htmlFor="docType"
              className="block text-white/80 text-sm font-medium mb-1"
            >
              Tipo de Documento
            </label>
            <div className="relative">
              <select
                value={tipoDocumento}
                className={`w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500 appearance-none pr-8 ${
                  tipoDocumento === "" ? "text-white/40" : "text-white"
                }`}
                onChange={(e) => setTipoDocumento(e.target.value)}
              >
                <option value="" disabled>
                  Selecione un tipo de documento
                </option>
                <option>Cédula de Ciudadanía</option>
                <option>Pasaporte</option>
                <option>Cédula de Extranjería</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="docNumber"
              className="block text-white/80 text-sm font-medium mb-1"
            >
              Número de Documento
            </label>
            <input
              type="text"
              id="docNumber"
              className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
              placeholder="123456789"
            />
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-white/80 text-sm font-medium mb-1"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
              placeholder="Calle 123 #45-67"
            />
          </div>

          <div>
            <label
              htmlFor="city"
              className="block text-white/80 text-sm font-medium mb-1"
            >
              Ciudad
            </label>
            <input
              type="text"
              id="city"
              className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
              placeholder="Bogotá"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-white/80 text-sm font-medium mb-1"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
              placeholder="juan.perez@ejemplo.com"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="phone"
              className="block text-white/80 text-sm font-medium mb-1"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="phone"
              className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
              placeholder="3001234567"
            />
          </div>
        </div>
        <TaxSummary />
      </div>
    </>
  );
};
