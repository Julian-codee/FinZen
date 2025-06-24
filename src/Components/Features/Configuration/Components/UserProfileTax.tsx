export const UserProfileTax = () => {
  return (
    <div className="p-6 text-white border border-white/10 rounded-lg bg-[#020817] mt-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Información Fiscal</h2>
        <p className="text-white/70 mt-1">
          Datos utilizados para la generación de informes fiscales.
        </p>
      </div>

      <div className="flex gap-6 flex-wrap pt-5">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Documento */}
          <div>
            <label className="block text-sm mb-1">Tipo de Documento</label>
            <select
              defaultValue=""
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option value="" disabled hidden>
                Selecciona el tipo de Documento
              </option>
              <option>Cedula de Ciudadania</option>
              <option>Tarjeta de Identidas</option>
              <option>Pasaporte</option>
              <option>Cedula Extrajería</option>
            </select>
          </div>

          {/* No Documento */}
          <div>
            <label className="block text-sm mb-1">Numero de Documento</label>
            <input
              type="email"
              placeholder="2345965"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Direccion */}
          <div>
            <label className="block text-sm mb-1">Direccion</label>
            <input
              type="email"
              placeholder="Cale 123 #45-67"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Ciudad */}
          <div>
            <label className="block text-sm mb-1">Ciudad</label>
            <input
              type="email"
              placeholder="Bogotá"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <button className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white text-sm">
          Guardar Informe fiscal
        </button>
      </div>
    </div>
  );
};
