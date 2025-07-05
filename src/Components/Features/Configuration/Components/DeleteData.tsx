"use client";

import { BadgeX } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Cambiado a useNavigate
import { toast } from "sonner";

export const DeleteData = () => {
  const navigate = useNavigate(); // Hook para redirigir

  const handleDeleteAllData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("No autenticado. Por favor, inicia sesión.");
      return;
    }

    if (!window.confirm("¿Estás seguro de que quieres eliminar TODOS tus datos? Esta acción es irreversible.")) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/finzen/usuarios", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success("Todos tus datos han sido eliminados exitosamente.");
        navigate("/register"); // Redirige al usuario a la página de registro
      } else {
        const errorData = await response.json();
        toast.error(`Error al eliminar datos: ${errorData.error || "Algo salió mal."}`);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor para eliminar datos:", error);
      toast.error("Error de red o del servidor al intentar eliminar tus datos.");
    }
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

      <div className="space-y-4 flex w-full">
        <button
          onClick={handleDeleteAllData}
          className="w-fit bg-red-600/60 hover:bg-red-600/80 px-4 py-2 rounded text-sm h-10 mt-4 flex items-center"
        >
          Eliminar todos los Datos
        </button>
      </div>
    </div>
  );
};