import { Lock } from "lucide-react";
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

export const Security = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Inicializa el hook useNavigate

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (newPassword !== confirmNewPassword) {
      setError("Las nuevas contraseñas no coinciden.");
      setLoading(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No se encontró token de autenticación. Por favor, inicia sesión.");
        setLoading(false);
        navigate("/"); // Redirige al usuario a la página de inicio de sesión
        return;
      }

      const response = await axios.put(
        "http://localhost:8080/finzen/usuarios/cambiar-contrasena", // Este es tu endpoint en UsuariosControllers
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("¡Contraseña actualizada exitosamente!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      console.error("Error al cambiar la contraseña:", err);
      if (axios.isAxiosError(err) && err.response) {
        // Tu backend devuelve un String, así que lo mostramos directamente
        setError(err.response.data || "Error al cambiar la contraseña. Inténtalo de nuevo.");
      } else {
        setError("Error al cambiar la contraseña. Inténtalo de nuevo.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white p-6 border border-white/10 rounded-lg bg-[#020817]">
      <h2 className="text-2xl font-semibold flex items-center">
        <Lock className="text-yellow-600 mr-2" /> Cambiar Contraseña
      </h2>
      <p className="text-gray-400 mb-6">
        Actualiza tu contraseña para mantener tu cuenta segura.
      </p>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <label htmlFor="currentPassword" className="block text-sm mb-1">
            Contraseña Actual
          </label>
          <input
            type="password"
            id="currentPassword"
            placeholder="********"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            value={currentPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4 mt-4">
          <label htmlFor="newPassword" className="block text-sm mb-1">
            Nueva Contraseña
          </label>
          <input
            type="password"
            id="newPassword"
            placeholder="********"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="space-y-4 mt-4">
          <label htmlFor="confirmNewPassword" className="block text-sm mb-1">
            Confirmar Nueva Contraseña
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            placeholder="********"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
            value={confirmNewPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-6 flex justify-start">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Cambiando..." : "Cambiar Contraseña"}
          </button>
        </div>
      </form>
    </div>
  );
};