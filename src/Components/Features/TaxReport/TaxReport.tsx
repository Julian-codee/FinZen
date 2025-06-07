import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { TabNavigation } from "./TabNavegation";
import { Header } from "./HeaderTaskReport";
import { TaxSummary } from "./TaxSummary";
import { UserRound } from "lucide-react"; // Necesario para el formulario Personal

// Importa los componentes de formulario que has creado por separado
// Asegúrate de que estos archivos existan en la misma carpeta o la ruta correcta
import { IncomeForm } from "./Income";
import { DeductionsForm } from "./Deductions";
import { PatrimonyForm } from "./Patrimony";
import { TaxesForm } from "./Taxes";

export const TaxReport = () => {
  // Estado para controlar si el Sidebar está abierto o cerrado
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Función para alternar el estado del Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Estados para la navegación por pestañas (se mantienen aquí en el componente padre)
  const [activeViewTab, setActiveViewTab] = useState("Formulario");
  const [activeDeductionTab, setActiveDeductionTab] = useState("Personal"); // La pestaña "Personal" es la inicial/por defecto

  // Estado para el tipo de documento del formulario "Información Personal"
  // Si esta información es específica solo de este formulario, puede quedarse aquí.
  const [tipoDocumento, setTipoDocumento] = useState("");

  return (
    <>
      {/** Componente Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`
          flex-1 p-6 transition-all duration-300 ease-in-out bg-[#020817] text-white
          ${
            isSidebarOpen ? "ml-64" : "ml-20"
          } /* Ajusta el margen izquierdo según el estado del Sidebar */
        `}
      >
        {/** Componente Header */}
        <Header />

        {/** Componente TabNavigation: le pasamos los estados y funciones para que pueda controlarlos */}
        <TabNavigation
          activeViewTab={activeViewTab}
          setActiveViewTab={setActiveViewTab}
          activeDeductionTab={activeDeductionTab}
          setActiveDeductionTab={setActiveDeductionTab}
        />

        {/* Renderizado condicional del contenido del formulario */}
        {activeDeductionTab === "Formulario" ||
        activeDeductionTab === "Personal" ? (
          // Si la pestaña activa es "Personal", mostramos este formulario inline
          <>
            <div className="flex items-center text-gray-400 mb-1 mt-12">
              <UserRound className="text-white mr-2" />
              <h2 className="text-xl font-semibold text-white">
                Información Personal
              </h2>
            </div>
            <p className="text-gray-400 mb-10">
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
          </>
        ) : (
          // Si no es la pestaña "Personal", usamos un switch para renderizar los otros componentes
          <div className="my-6">
            {(() => {
              switch (activeDeductionTab) {
                case "Ingresos":
                  return <IncomeForm />;
                case "Deducciones":
                  return <DeductionsForm />;
                case "Patrimonio":
                  return <PatrimonyForm />;
                case "Impuestos":
                  return <TaxesForm />;
                default:
                  return null; // O puedes retornar un mensaje de error o nada si no coincide
              }
            })()}
          </div>
        )}

        {/** Componente TaxSummary */}
        <TaxSummary />
      </div>
    </>
  );
};
