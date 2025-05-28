"use client";

import React, { useState } from "react";
import { ArrowLeft, Mail, Shield, Lock, Eye, EyeOff, Check } from "lucide-react";
import axios from "axios";
import { AuthBackground } from "../../assets/Backgrounds/Auht-background";
import { showErrorAlert, showSuccessAlert } from "../Ui/Alerts/Alerts";

const API_URL = "http://localhost:8080/finzen/auth"; // Adjust to your backend URL

export default function Component() {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

 const handleEmailSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) {
    showErrorAlert("Por favor, ingresa un correo electrónico.");
    return;
  }

  try {
    const response = await axios.post(`${API_URL}/forgot-password`, {
      correo: email,
    });
    showSuccessAlert(response.data.message || "Código enviado al correo.");
    setCurrentStep(2);
  } catch (error: any) {
    console.error("Error in handleEmailSubmit:", error.response?.data || error.message);
    showErrorAlert(
      error.response?.data?.message ||
        "Error al enviar el código. Inténtalo de nuevo."
    );
  }
};

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) {
      showErrorAlert("El código debe tener 6 dígitos.");
      return;
    }

    try {
      // Optional: Add an endpoint to verify the code if needed, or proceed to step 3
      setCurrentStep(3);
    } catch (error: any) {
      showErrorAlert("Error al verificar el código. Inténtalo de nuevo.");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      showErrorAlert("Por favor, completa ambos campos de contraseña.");
      return;
    }
    if (password !== confirmPassword) {
      showErrorAlert("Las contraseñas no coinciden.");
      return;
    }
    if (!Object.values(passwordValidation).every(Boolean)) {
      showErrorAlert("La contraseña no cumple con los requisitos.");
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/reset-password`, {
        token: code,
        nuevaContrasena: password,
      });
      showSuccessAlert(
        response.data.message || "Contraseña actualizada exitosamente."
      );
      // Optionally, redirect to login page or reset the form
      setCurrentStep(1);
      setEmail("");
      setCode("");
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      showErrorAlert(
        error.response?.data?.message ||
          "Error al actualizar la contraseña. Inténtalo de nuevo."
      );
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validatePassword = (pwd: string) => {
    const validation = {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /\d/.test(pwd),
      symbol: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(pwd),
    };
    setPasswordValidation(validation);
    return Object.values(validation).every(Boolean);
  };

  const handleCodeChange = (value: string, index: number) => {
    if (!/^[0-9]*$/.test(value) && value !== "") return; // Allow only digits
    const newCode = code.split("");
    newCode[index] = value;
    setCode(newCode.join(""));

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="relative w-full h-screen overflow-x-hidden overflow-y-auto">
      <AuthBackground mode="login" theme="dark" />
      <div className="relative z-10 min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-gray-600/30 text-white border-amber-50/20 backdrop-blur-1 bg-opacity-10 rounded-lg border shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 text-center">
            <div className="flex items-center justify-center mb-4">
              {currentStep > 1 && (
                <button
                  onClick={goBack}
                  className="absolute left-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
              )}
              <div className="bg-blue-100 p-3 rounded-full">
                {currentStep === 1 && <Mail className="h-6 w-6 text-indigo-600" />}
                {currentStep === 2 && <Shield className="h-6 w-6 text-indigo-700" />}
                {currentStep === 3 && <Lock className="h-6 w-6 text-indigo-800" />}
              </div>
            </div>

            {currentStep === 1 && (
              <>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Recuperar Contraseña
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ingresa tu correo electrónico para recibir el código de verificación
                </p>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Verificar Código
                </h3>
                <p className="text-sm text-muted-foreground">
                  Ingresa el código de 6 dígitos que enviamos a tu correo
                </p>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h3 className="text-2xl font-semibold leading-none tracking-tight">
                  Nueva Contraseña
                </h3>
                <p className="text-sm text-muted-foreground">
                  Crea una nueva contraseña segura para tu cuenta
                </p>
              </>
            )}
          </div>

          <div className="p-6 pt-0">
            {currentStep === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-indigo-600 disabled:cursor-not-allowed disabled:opacity-10"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-indigo-500 to-blue-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  Enviar Código
                </button>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleCodeSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="code"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-center block"
                  >
                    Código de Verificación
                  </label>
                  <div className="flex justify-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        maxLength={1}
                        value={code[index] || ""}
                        onChange={(e) => handleCodeChange(e.target.value, index)}
                        onKeyDown={(e) => handleCodeKeyDown(e, index)}
                        className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-sm text-white/70 mb-2">
                    Código enviado a: <span className="font-medium">{email}</span>
                  </p>
                  <button
                    type="button"
                    onClick={handleEmailSubmit} // Re-send email
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 underline-offset-4 hover:underline text-primary h-auto p-0"
                  >
                    ¿No recibiste el código? Reenviar
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={code.length !== 6}
                  className="bg-indigo-500 to-blue-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  Verificar Código
                </button>
              </form>
            )}

            {currentStep === 3 && (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresa tu nueva contraseña"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirma tu nueva contraseña"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                {password && confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-600">Las contraseñas no coinciden</p>
                )}

                <div className="text-sm space-y-2">
                  <p className="font-medium text-white">Requisitos de la contraseña:</p>
                  <div className="space-y-2">
                    <div className={`flex items-center space-x-2 ${passwordValidation.length ? "text-green-500" : "text-white/70"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${passwordValidation.length ? "bg-green-600 border-green-600" : "border-gray-300"}`}>
                        {passwordValidation.length && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className="text-xs">Al menos 8 caracteres</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.uppercase ? "text-green-500" : "text-white/70"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${passwordValidation.uppercase ? "bg-green-600 border-green-600" : "border-gray-300"}`}>
                        {passwordValidation.uppercase && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className="text-xs">Una letra mayúscula (A-Z)</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.lowercase ? "text-green-500" : "text-white/70"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${passwordValidation.lowercase ? "bg-green-600 border-green-600" : "border-gray-300"}`}>
                        {passwordValidation.lowercase && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className="text-xs">Una letra minúscula (a-z)</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.number ? "text-green-500" : "text-white/70"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${passwordValidation.number ? "bg-green-600 border-green-600" : "border-gray-300"}`}>
                        {passwordValidation.number && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className="text-xs">Un número (0-9)</span>
                    </div>
                    <div className={`flex items-center space-x-2 ${passwordValidation.symbol ? "text-green-500" : "text-white/70"}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${passwordValidation.symbol ? "bg-green-600 border-green-600" : "border-gray-300"}`}>
                        {passwordValidation.symbol && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <span className="text-xs">Un signo especial (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    !password ||
                    !confirmPassword ||
                    password !== confirmPassword ||
                    !Object.values(passwordValidation).every(Boolean)
                  }
                  className="bg-indigo-500 to-blue-500 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                >
                  Actualizar Contraseña
                </button>
              </form>
            )}

            <div className="flex justify-center mt-6 space-x-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full ${step <= currentStep ? "bg-blue-600" : "bg-gray-300"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}