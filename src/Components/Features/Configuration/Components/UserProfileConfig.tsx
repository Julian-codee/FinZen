import { Upload, UserCog } from "lucide-react";
import { useState, ChangeEvent } from "react";

export const UserProfileConfig = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileURL = URL.createObjectURL(e.target.files[0]);
      setProfileImage(fileURL);
    }
  };

  return (
    <div className="p-4 md:p-6 text-white border border-white/10 rounded-lg bg-[#020817]">
      {/* Título */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <UserCog className="text-blue-400" />
          <h2 className="text-lg md:text-2xl font-semibold">
            Información de Perfil
          </h2>
        </div>
        <p className="text-white/70 text-sm">
          Actualiza tu información personal y preferencias de cuenta.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:gap-6 gap-4">
        {/* Imagen de perfil */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Foto de perfil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-sm">Sin foto</span>
            )}
          </div>
          <label className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded cursor-pointer text-sm flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Cambiar foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Formulario */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm mb-1">Nombre completo</label>
            <input
              type="text"
              placeholder="Juan Pérez"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Correo electrónico</label>
            <input
              type="email"
              placeholder="juan.perez@ejemplo.com"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-sm mb-1">Teléfono</label>
            <input
              type="tel"
              placeholder="3001234567"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>

          {/* Moneda */}
          <div>
            <label className="block text-sm mb-1">Moneda predeterminada</label>
            <select
              defaultValue=""
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option value="" disabled hidden>
                Selecciona una moneda
              </option>
              <option>Peso Colombiano (COP)</option>
              <option>Dólar Estadounidense (USD)</option>
              <option>Euro (EUR)</option>
            </select>
          </div>

          {/* Idioma */}
          <div>
            <label className="block text-sm mb-1">Idioma</label>
            <select
              defaultValue=""
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            >
              <option value="" disabled hidden>
                Selecciona un Idioma
              </option>
              <option>Español</option>
              <option>Inglés</option>
            </select>
          </div>

          {/* Biografía */}
          <div className="md:col-span-2">
            <label className="block text-sm mb-1">Biografía</label>
            <textarea
              rows={3}
              placeholder="Profesional en finanzas con interés en inversiones y ahorro."
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Botón */}
      <div className="mt-6 flex justify-end">
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded text-sm">
          Guardar cambios
        </button>
      </div>
    </div>
  );
};
