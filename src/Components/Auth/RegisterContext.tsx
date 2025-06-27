/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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

  useEffect(() => {
    localStorage.setItem("registerData", JSON.stringify(registerData));
  }, [registerData]);

  const updateRegisterData = (data: Partial<RegisterData>) => {
    setRegisterData((prev) => {
      const newData = { ...prev, ...data };
      console.log("Updated registerData:", newData);
      return newData;
    });
  };

  const submitRegister = async () => {
    console.log("Final registerData before submission:", registerData);

    const missingFields = [];
    if (!registerData.nombre.trim()) missingFields.push("nombre");
    if (!registerData.correo.trim()) missingFields.push("correo");
    if (!registerData.paisResidencia.trim()) missingFields.push("paisResidencia");
    if (!registerData.numeroDocumento.trim()) missingFields.push("numeroDocumento");
    if (!registerData.contrasena.trim()) missingFields.push("contrasena");
    if (!registerData.tipoPersona.trim()) missingFields.push("tipoPersona");
    if (
      !registerData.tipoDocumento ||
      !["cedula", "pasaporte", "tarjeta_de_identidad", "cedula_extranjera"].includes(
        registerData.tipoDocumento
      )
    ) {
      missingFields.push("tipoDocumento");
    }
    if (registerData.ingresoMensual == null || registerData.ingresoMensual <= 0) {
      missingFields.push("ingresoMensual");
    }
    if (registerData.metaActual == null || registerData.metaActual <= 0) {
      missingFields.push("metaActual");
    }

    if (missingFields.length > 0) {
      throw new Error(`Faltan los siguientes campos obligatorios: ${missingFields.join(", ")}`);
    }

    try {
      const payload = { ...registerData };
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
  };

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