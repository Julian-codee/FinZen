import { useState } from "react";
import { Sidebar } from "../../Ui/UiDashBoard/SideBar";
import { TabNavigation } from "./TabNavegation";
import { Header } from "./HeaderTaskReport";
import { TaxSummary } from "./TaxSummary";
import { UserRound } from "lucide-react";
import { IncomeForm } from "./Income";
import { DeductionsForm } from "./Deductions";
import { PatrimonyForm } from "./Patrimony";
import { TaxesForm } from "./Taxes";
import { Download, Printer } from "lucide-react";



export const TaxReport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeViewTab, setActiveViewTab] = useState("Formulario");
  const [activeDeductionTab, setActiveDeductionTab] = useState("Personal");
  const [formData, setFormData] = useState({
    // Personal Data
    fullName: "",
    docType: "",
    docNumber: "",
    address: "",
    city: "",
    email: "",
    phone: "",
    // Ingresos
    ingresosLaborales: 0,
    trabajoIndependiente: 0,
    arrendamientos: 0,
    dividendos: 0,
    otrosIngresos: 0,
    intereses: 0,
    // Deducciones
    salud: 0,
    pension: 0,
    interesesVivienda: 0,
    dependientes: 0,
    educacion: 0,
    donaciones: 0,
    otrasDeducciones: 0,
    // Patrimonio
    bienesRaices: 0,
    vehiculos: 0,
    activosFinancieros: 0,
    otrosActivos: 0,
    hipotecas: 0,
    prestamos: 0,
    tarjetasCredito: 0,
    otrosPasivos: 0,
    // Impuestos
    retencionFuente: 0,
    anticiposPagados: 0,
  });

  const numericFields = [
  "ingresosLaborales",
  "trabajoIndependiente",
  "arrendamientos",
  "dividendos",
  "otrosIngresos",
  "intereses",
  "salud",
  "pension",
  "interesesVivienda",
  "dependientes",
  "educacion",
  "donaciones",
  "otrasDeducciones",
  "bienesRaices",
  "vehiculos",
  "activosFinancieros",
  "otrosActivos",
  "hipotecas",
  "prestamos",
  "tarjetasCredito",
  "otrosPasivos",
  "retencionFuente",
  "anticiposPagados",
];

// const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//   const { id, value } = e.target;
//   setFormData((prev) => ({
//     ...prev,
//     [id]: numericFields.includes(id) ? Number(value) || 0 : value,
//   }));
// };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: id.includes("ingresos") || id.includes("deducciones") || id.includes("activos") || id.includes("pasivos") || id.includes("retencion") || id.includes("anticipos") ? Number(value) || 0 : value,
    }));
  };

  const validateData = () => {
    const totalIngresos =
      formData.ingresosLaborales +
      formData.trabajoIndependiente +
      formData.arrendamientos +
      formData.dividendos +
      formData.otrosIngresos +
      formData.intereses;
    const totalDeducciones =
      formData.salud +
      formData.pension +
      formData.interesesVivienda +
      formData.dependientes +
      formData.educacion +
      formData.donaciones +
      formData.otrasDeducciones;
    return totalIngresos >= totalDeducciones;
  };

  const handlePreview = () => {
    if (validateData()) {
      setActiveViewTab("Vista Previa");
    } else {
      alert("Error: Los ingresos totales deben ser mayores o iguales a las deducciones.");
    }
  };

  const handleDownload = () => {
    alert("Descarga iniciada.");
    // Implement PDF generation logic here (e.g., using jsPDF)
  };

  const handlePrint = () => {
    window.print();
  };

  const totalIngresos =
    formData.ingresosLaborales +
    formData.trabajoIndependiente +
    formData.arrendamientos +
    formData.dividendos +
    formData.otrosIngresos +
    formData.intereses;
  const totalDeducciones =
    formData.salud +
    formData.pension +
    formData.interesesVivienda +
    formData.dependientes +
    formData.educacion +
    formData.donaciones +
    formData.otrasDeducciones;
  const rentaLiquida = totalIngresos - totalDeducciones;
  const impuestoCalculado = rentaLiquida > 0 ? Math.round(rentaLiquida * 0.035) : 0; // 3.5% tax rate as an example
  const impuestosPagados = formData.retencionFuente + formData.anticiposPagados;
  const saldoAFavor = Math.max(0, impuestosPagados - impuestoCalculado); // Ensure no negative saldo

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 p-6 transition-all duration-300 ease-in-out bg-[#020817] text-white ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Header />

        <TabNavigation
          activeViewTab={activeViewTab}
          setActiveViewTab={(tab) => {
            if (tab === "Vista Previa") handlePreview();
            else setActiveViewTab(tab);
          }}
          activeDeductionTab={activeDeductionTab}
          setActiveDeductionTab={setActiveDeductionTab}
        />

        {activeViewTab === "Vista Previa" ? (
          <div className="my-6">
            <h2 className="text-2xl font-bold text-center text-white mb-6 border-b-2 border-indigo-500 pb-2">Vista Previa - Declaración de Renta 2024</h2>

            {/* Personal Information */}
            <div className="bg-[#111827] p-4 rounded-lg mb-6 shadow-lg">
              <h3 className="text-xl font-bold text-center text-white mb-4 border-b border-gray-700 pb-2">Información Personal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Nombre Completo:</strong> {formData.fullName || "No ingresado"}</p>
                <p><strong>Tipo de Documento:</strong> {formData.docType || "No ingresado"}</p>
                <p><strong>Número de Documento:</strong> {formData.docNumber || "No ingresado"}</p>
                <p><strong>Dirección:</strong> {formData.address || "No ingresado"}</p>
                <p><strong>Ciudad:</strong> {formData.city || "No ingresado"}</p>
                <p><strong>Correo Electrónico:</strong> {formData.email || "No ingresado"}</p>
                <p className="md:col-span-2"><strong>Teléfono:</strong> {formData.phone || "No ingresado"}</p>
              </div>
            </div>

            {/* Ingresos */}
            <div className="bg-[#111827] p-4 rounded-lg mb-6 shadow-lg">
              <h3 className="text-xl font-bold text-center text-white mb-4 border-b border-gray-700 pb-2">Ingresos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Ingresos Laborales:</strong> ${formData.ingresosLaborales.toLocaleString() || "0"}</p>
                <p><strong>Trabajo Independiente:</strong> ${formData.trabajoIndependiente.toLocaleString() || "0"}</p>
                <p><strong>Arrendamientos:</strong> ${formData.arrendamientos.toLocaleString() || "0"}</p>
                <p><strong>Dividendos:</strong> ${formData.dividendos.toLocaleString() || "0"}</p>
                <p><strong>Otros Ingresos:</strong> ${formData.otrosIngresos.toLocaleString() || "0"}</p>
                <p><strong>Intereses:</strong> ${formData.intereses.toLocaleString() || "0"}</p>
                <p className="md:col-span-2 text-green-400 font-semibold"><strong>Total Ingresos:</strong> ${totalIngresos.toLocaleString()}</p>
              </div>
            </div>

            {/* Deducciones */}
            <div className="bg-[#111827] p-4 rounded-lg mb-6 shadow-lg">
              <h3 className="text-xl font-bold text-center text-white mb-4 border-b border-gray-700 pb-2">Deducciones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Salud:</strong> ${formData.salud.toLocaleString() || "0"}</p>
                <p><strong>Pensión:</strong> ${formData.pension.toLocaleString() || "0"}</p>
                <p><strong>Intereses de Vivienda:</strong> ${formData.interesesVivienda.toLocaleString() || "0"}</p>
                <p><strong>Dependientes:</strong> ${formData.dependientes.toLocaleString() || "0"}</p>
                <p><strong>Educación:</strong> ${formData.educacion.toLocaleString() || "0"}</p>
                <p><strong>Donaciones:</strong> ${formData.donaciones.toLocaleString() || "0"}</p>
                <p><strong>Otras Deducciones:</strong> ${formData.otrasDeducciones.toLocaleString() || "0"}</p>
                <p className="md:col-span-2 text-green-400 font-semibold"><strong>Total Deducciones:</strong> ${totalDeducciones.toLocaleString()}</p>
              </div>
            </div>

            {/* Patrimonio */}
            <div className="bg-[#111827] p-4 rounded-lg mb-6 shadow-lg">
              <h3 className="text-xl font-bold text-center text-white mb-4 border-b border-gray-700 pb-2">Patrimonio</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Bienes Raíces:</strong> ${formData.bienesRaices.toLocaleString() || "0"}</p>
                <p><strong>Vehículos:</strong> ${formData.vehiculos.toLocaleString() || "0"}</p>
                <p><strong>Activos Financieros:</strong> ${formData.activosFinancieros.toLocaleString() || "0"}</p>
                <p><strong>Otros Activos:</strong> ${formData.otrosActivos.toLocaleString() || "0"}</p>
                <p><strong>Hipotecas:</strong> ${formData.hipotecas.toLocaleString() || "0"}</p>
                <p><strong>Préstamos:</strong> ${formData.prestamos.toLocaleString() || "0"}</p>
                <p><strong>Tarjetas de Crédito:</strong> ${formData.tarjetasCredito.toLocaleString() || "0"}</p>
                <p><strong>Otros Pasivos:</strong> ${formData.otrosPasivos.toLocaleString() || "0"}</p>
              </div>
            </div>

            {/* Impuestos */}
            <div className="bg-[#111827] p-4 rounded-lg mb-6 shadow-lg">
              <h3 className="text-xl font-bold text-center text-white mb-4 border-b border-gray-700 pb-2">Impuestos Pagados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Retención en la Fuente:</strong> ${formData.retencionFuente.toLocaleString() || "0"}</p>
                <p><strong>Anticipos Pagados:</strong> ${formData.anticiposPagados.toLocaleString() || "0"}</p>
                <p className="md:col-span-2 text-green-400 font-semibold"><strong>Total Impuestos Pagados:</strong> ${impuestosPagados.toLocaleString()}</p>
              </div>
            </div>

            {/* Resumen */}
            <div className="bg-[#111827] p-6 rounded-lg shadow-lg border border-indigo-500">
              <h3 className="text-xl font-bold text-center text-white mb-4 border-b border-gray-700 pb-2">Resumen de Impuestos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p><strong>Ingresos Totales:</strong> <span className="text-green-400">${totalIngresos.toLocaleString()}</span></p>
                <p><strong>Deducciones Totales:</strong> <span className="text-green-400">${totalDeducciones.toLocaleString()}</span></p>
                <p><strong>Renta Líquida:</strong> <span className="text-green-400">${rentaLiquida.toLocaleString()}</span></p>
                <p><strong>Impuesto Calculado:</strong> <span className="text-yellow-400">${impuestoCalculado.toLocaleString()}</span></p>
                <p><strong>Impuestos Pagados:</strong> <span className="text-yellow-400">${impuestosPagados.toLocaleString()}</span></p>
                <p className="md:col-span-2"><strong>Saldo a Favor:</strong> <span className={saldoAFavor > 0 ? "text-green-400" : "text-red-400"}>${saldoAFavor.toLocaleString()}</span></p>
              </div>
            </div>

            <div className="flex justify-center space-x-6 mt-6">
              <button
                onClick={handleDownload}
                className="p-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 flex items-center"
              >
                <Download className="w-5 h-5 mr-2" /> Descargar
              </button>
              <button
                onClick={handlePrint}
                className="p-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition duration-300 flex items-center"
              >
                <Printer className="w-5 h-5 mr-2" /> Imprimir
              </button>
            </div>
          </div>
        ) : (
          <>
            {activeDeductionTab === "Personal" ? (
            <>
              <div className="flex items-center text-gray-400 mb-1 mt-12">
                <UserRound className="text-white mr-2" />
                <h2 className="text-xl font-semibold text-white">Información Personal</h2>
              </div>
              <p className="text-gray-400 mb-10">
                Ingresa tus datos personales para la declaración de renta 2024
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fullName" className="block text-white/80 text-sm font-medium mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
                    placeholder="Juan Pérez"
                  />
                </div>
                <div>
                  <label htmlFor="docType" className="block text-white/80 text-sm font-medium mb-1">
                    Tipo de Documento
                  </label>
                  <select
                    id="docType"
                    value={formData.docType}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500 appearance-none pr-8"
                  >
                    <option value="" disabled>Seleccione un tipo de documento</option>
                    <option>Cédula de Ciudadanía</option>
                    <option>Pasaporte</option>
                    <option>Cédula de Extranjería</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="docNumber" className="block text-white/80 text-sm font-medium mb-1">
                    Número de Documento
                  </label>
                  <input
                    type="text"
                    id="docNumber"
                    value={formData.docNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
                    placeholder="1234567890"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-white/80 text-sm font-medium mb-1">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-center p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
                    placeholder="Calle 123 #45-67"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-white/80 text-sm font-medium mb-1">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
                    placeholder="Bogotá"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-1">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
                    placeholder="juan.perez@ejemplo.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-1">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 rounded-md bg-[#020817] border border-white/60 focus:outline-none focus:border-indigo-500"
                    placeholder="3001234567"
                  />
                </div>
              </div>
            </>  
            ) : (
              <div className="my-6">
                {(() => {
                  switch (activeDeductionTab) {
                    case "Ingresos":
                      return <IncomeForm handleInputChange={handleInputChange} formData={formData} />;
                    case "Deducciones":
                      return <DeductionsForm handleInputChange={handleInputChange} formData={formData} />;
                    case "Patrimonio":
                      return <PatrimonyForm handleInputChange={handleInputChange} formData={formData} />;
                    case "Impuestos":
                      return <TaxesForm handleInputChange={handleInputChange} formData={formData} />;
                    default:
                      return null;
                  }
                })()}
              </div>
            )}
          </>
        )}

        <TaxSummary
          totalIngresos={totalIngresos}
          totalDeducciones={totalDeducciones}
          rentaLiquida={rentaLiquida}
          impuestoCalculado={impuestoCalculado}
          impuestosPagados={impuestosPagados}
          saldoAFavor={saldoAFavor}
        />
      </div>
    </>
  );
};