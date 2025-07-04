import { Upload, UserCog } from "lucide-react";
import { useState, ChangeEvent, useEffect, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface UserProfileForm {
  nombreCompleto: string;
  correoElectronico: string;
  nombreUsuario: string;
  tipoPersona: string;
}

interface BackendUserDto {
  id?: number;
  nombre: string;
  correo: string;
  contrasena?: string;
  numeroDocumento: number | null;
  paisResidencia: string;
  ingresoMensual: number | null;
  metaActual?: boolean;
  nombreUsuario: string;
  tipoDocumento: string;
  tipoPersona: string;
  urlImg?: string;
  tipoUsuario: string;
}

export const UserProfileConfig = () => {
  const [currentProfileImageUrl, setCurrentProfileImageUrl] = useState<string | null>(null);
  const [newImageBase64, setNewImageBase64] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserProfileForm>({
    nombreCompleto: "",
    correoElectronico: "",
    nombreUsuario: "",
    tipoPersona: "",
  });
  const [backendUserData, setBackendUserData] = useState<BackendUserDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No se encontró token de autenticación.");
          setLoading(false);
          navigate("/");
          return;
        }

        const response = await axios.get<BackendUserDto>("http://localhost:8080/finzen/usuarios", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const dataFromBackend = response.data;
        setBackendUserData(dataFromBackend);

        if (dataFromBackend.urlImg) {
          setCurrentProfileImageUrl(dataFromBackend.urlImg);
        } else {
          setCurrentProfileImageUrl(null);
        }

        setUserData({
          nombreCompleto: dataFromBackend.nombre || "",
          correoElectronico: dataFromBackend.correo || "",
          nombreUsuario: dataFromBackend.nombreUsuario || "",
          tipoPersona: dataFromBackend.tipoPersona || "",
        });
      } catch (err) {
        console.error("Error al cargar los datos del usuario:", err);
        setError("Error al cargar la información del perfil.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setCurrentProfileImageUrl(fileURL);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró token de autenticación. Por favor, inicia sesión.");
        setLoading(false);
        return;
      }

      const dataToSend: BackendUserDto = {
        ...backendUserData,
        nombre: userData.nombreCompleto,
        correo: userData.correoElectronico,
        nombreUsuario: userData.nombreUsuario,
        tipoPersona: userData.tipoPersona,
        urlImg: newImageBase64 || currentProfileImageUrl || undefined,
      };

      await axios.put("http://localhost:8080/finzen/usuarios", dataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setSuccessMessage("¡Perfil actualizado exitosamente!");
      setNewImageBase64(null);
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      if (axios.isAxiosError(err) && err.response) {
        setError(`Error: ${err.response.data || 'No se pudo guardar la información.'}`);
      } else {
        setError("Error al guardar los cambios. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white border border-white/10 rounded-lg bg-[#020817]">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-4">
          <UserCog className="text-blue-400" />
          <h2 className="text-2xl font-semibold">Información de Perfil</h2>
        </div>
        <p className="text-white/70 mt-1">
          Actualiza tu información personal y preferencias de cuenta.
        </p>
      </div>

      {loading && <p className="text-blue-300">Cargando información del perfil...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
              {currentProfileImageUrl ? (
                <img
                  src={currentProfileImageUrl}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-500 text-sm">Sin foto</span>
              )}
            </div>
            <label className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded cursor-pointer text-sm flex items-center gap-2">
              <Upload className="w-4 h-8" />
              Cambiar foto
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombreCompleto" className="block text-sm mb-1">
                Nombre completo
              </label>
              <input
                type="text"
                id="nombreCompleto"
                name="nombreCompleto"
                placeholder="Juan Pérez"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
                value={userData.nombreCompleto}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="correoElectronico" className="block text-sm mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="correoElectronico"
                name="correoElectronico"
                placeholder="juan.perez@ejemplo.com"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
                value={userData.correoElectronico}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="nombreUsuario" className="block text-sm mb-1">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="nombreUsuario"
                name="nombreUsuario"
                placeholder="usuario123"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
                value={userData.nombreUsuario}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="tipoPersona" className="block text-sm mb-1">
                Tipo de Persona
              </label>
              <select
                id="tipoPersona"
                name="tipoPersona"
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
                value={userData.tipoPersona}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecciona un tipo
                </option>
                <option value="padre_de_familia">Padre de Familia</option>
                <option value="joven_profesional">Joven Profesional</option>
                <option value="jubilado">Jubilado</option>
                <option value="personalizado">Personalizado</option>
                <option value="emprendedor">Emprendedor</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};