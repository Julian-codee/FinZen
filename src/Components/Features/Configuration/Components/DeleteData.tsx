"use client";

import { BadgeX, LogOut } from "lucide-react"; // Importar LogOut para el icono
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const DeleteData = () => {
  const navigate = useNavigate();

  const handleDeleteAllData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No autenticado. Por favor, inicia sesión.");
      return;
    }

    if (
      !window.confirm(
        "¿Estás seguro de que quieres eliminar TODOS tus datos? Esta acción es irreversible."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        "https://finzenbackend-production.up.railway.app/finzen/usuarios",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success("Todos tus datos han sido eliminados exitosamente.");
        localStorage.removeItem("token"); // Eliminar el token al borrar los datos
        navigate("/"); // Redirige al usuario a la página de registro
      } else {
        const errorData = await response.json();
        toast.error(
          `Error al eliminar datos: ${errorData.error || "Algo salió mal."}`
        );
      }
    } catch (error) {
      console.error(
        "Error al conectar con el servidor para eliminar datos:",
        error
      );
      toast.error(
        "Error de red o del servidor al intentar eliminar tus datos."
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Eliminar el token de autenticación
    toast.info("Sesión cerrada correctamente.");
    navigate("/"); // Redirigir a la página de inicio de sesión o a la principal
  };

  return (
    <div className="text-white p-6 rounded-lg border border-white/10 mt-6">
      <h2 className="text-2xl font-semibold flex items-center mb-1">
        <BadgeX className="mr-2 text-red-500" />
        Eliminar Datos
      </h2>
      <p className="text-gray-400 mb-6">
        Elimina permanentemente tus datos de la aplicación.
      </p>

      <div>
        <p className="font-bold mb-2">
          Esta acción eliminará permanentemente todos tus datos financieros.
          Esta acción no se puede deshacer.
        </p>
      </div>

      <div className="space-y-4 flex flex-col sm:flex-row w-full sm:space-x-4 sm:space-y-0">
        {" "}
        {/* Flexbox para alinear botones */}
        <button
          onClick={handleDeleteAllData}
          className="w-fit bg-red-600/60 hover:bg-red-600/80 px-4 py-2 rounded text-sm h-10 mt-4 flex items-center justify-center"
        >
          Eliminar todos los Datos
        </button>
        {/* Botón de Cerrar Sesión */}
        <button
          onClick={handleLogout}
          className="w-fit bg-yellow-500/60 hover:bg-yellow-500/80 px-4 py-2 rounded text-sm h-10 mt-4 flex items-center justify-center"
        >
          <LogOut className="w-4 h-4 mr-2" /> {/* Icono de cerrar sesión */}
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};
