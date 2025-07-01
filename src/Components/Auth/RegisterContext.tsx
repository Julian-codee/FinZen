// RegisterContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { showSuccessAlert, showErrorAlert } from "../Ui/Alerts/Alerts";

interface RegisterData {
  nombre: string;
  correo: string;
  nombreUsuario: string;
  paisResidencia: string;
  tipoDocumento: string;
  numeroDocumento: string;
  contrasena: string;
  tipoPersona: string;
  role: string;
  ingresoMensual: number | null;
  metaActual: number | null;
}

interface RegisterContextType {
  registerData: RegisterData;
  updateRegisterData: (data: Partial<RegisterData>) => void;
  submitRegister: () => Promise<void>;
}

const initialRegisterData: RegisterData = {
  nombre: "",
  correo: "",
  nombreUsuario: "",
  paisResidencia: "",
  tipoDocumento: "cedula",
  numeroDocumento: "",
  contrasena: "",
  tipoPersona: "emprendedor",
  role: "USUARIO",
  ingresoMensual: null,
  metaActual: null,
};

const RegisterContext = createContext<RegisterContextType | undefined>(undefined);

export const RegisterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registerData, setRegisterData] = useState<RegisterData>(() => {
    const savedData = localStorage.getItem("registerData");
    return savedData ? JSON.parse(savedData) : initialRegisterData;
  });

  // Usamos una referencia para el estado más reciente accesible sincrónicamente
  // No es ideal para triggers de render, pero útil para leer el estado más reciente en closures.
  const latestRegisterData = React.useRef(registerData);

  useEffect(() => {
    localStorage.setItem("registerData", JSON.stringify(registerData));
    latestRegisterData.current = registerData; // Mantener la referencia actualizada
  }, [registerData]);

  const updateRegisterData = useCallback((data: Partial<RegisterData>) => {
    setRegisterData((prev) => {
      const newData = { ...prev, ...data };
      console.log("Updated registerData (pending):", newData); // Muestra el estado que se va a setear
      return newData;
    });
  }, []);

  const submitRegister = useCallback(async () => {
    // Aquí, usamos latestRegisterData.current para asegurar que tenemos la última versión
    // que fue actualizada por el último `setRegisterData` y el `useEffect` lo sincronizó.
    // Esto es lo que permite que el "segundo click" funcione.
    // Para el "primer click", es un hack.
    const currentDataForSubmission = latestRegisterData.current;

    console.log("Final registerData before submission (from ref):", currentDataForSubmission);

    const missingFields = [];
    if (!currentDataForSubmission.nombre.trim()) missingFields.push("nombre");
    if (!currentDataForSubmission.correo.trim()) missingFields.push("correo");
    if (!currentDataForSubmission.paisResidencia.trim()) missingFields.push("paisResidencia");
    if (!currentDataForSubmission.numeroDocumento.trim()) missingFields.push("numeroDocumento");
    if (!currentDataForSubmission.contrasena.trim()) missingFields.push("contrasena");
    if (!currentDataForSubmission.tipoPersona.trim()) missingFields.push("tipoPersona");
    if (!currentDataForSubmission.nombreUsuario || !currentDataForSubmission.nombreUsuario.trim()) missingFields.push("nombreUsuario");

    if (
      !currentDataForSubmission.tipoDocumento ||
      !["CEDULA", "PASAPORTE", "TARJETA_DE_IDENTIDAD", "CEDULA_EXTRANJERA"].includes(
        currentDataForSubmission.tipoDocumento.toUpperCase()
      )
    ) {
      missingFields.push("tipoDocumento");
    }

    if (typeof currentDataForSubmission.ingresoMensual !== 'number' || currentDataForSubmission.ingresoMensual <= 0) {
      missingFields.push("ingresoMensual");
    }
    if (typeof currentDataForSubmission.metaActual !== 'number' || currentDataForSubmission.metaActual <= 0) {
      missingFields.push("metaActual");
    }

    if (missingFields.length > 0) {
      throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(", ")}`);
    }

    try {
      const payload = { ...currentDataForSubmission };
      console.log("Enviando datos al servidor:", payload);

      const response = await fetch("http://localhost:8080/finzen/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        showSuccessAlert("Cuenta creada exitosamente", "¡Bienvenido!");
        localStorage.removeItem("registerData");
        setRegisterData(initialRegisterData);
      } else {
        throw new Error(data.message || "Error al crear la cuenta");
      }
    } catch (error: any) {
      console.error("Error en la solicitud:", error);
      showErrorAlert(error.message || "No se pudo conectar con el servidor");
      throw error;
    }
  }, []); // Dependencias vacías porque usa latestRegisterData.current

  return (
    <RegisterContext.Provider value={{ registerData, updateRegisterData, submitRegister }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegister = () => {
  const context = useContext(RegisterContext);
  if (!context) {
    throw new Error("useRegister debe usarse dentro de RegisterProvider");
  }
  return context;
};