"use client";

import type React from "react";
import {
  User,
  AtSign,
  Eye,
  EyeOff,
  Lock,
  Check,
  Facebook,
  X,
  ArrowLeft,
  Flag,
  Loader2,
  FileText,
} from "lucide-react";
import { AiOutlineGoogle, AiOutlineApple } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert, showErrorAlert } from "../Ui/Alerts/Alerts"; // Assuming these are correctly imported

export const Register = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [paisResidencia, setPaisResidencia] = useState("");
  const [numeroDocumento, setNumeroDocumento] = useState("");
  // Set an initial default value that matches one of your backend enum values
  const [tipoDocumento, setTipoDocumento] = useState("cedula");

  const [contrasena, setContrasena] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Password validation logic
  const hasMinLength = contrasena.length >= 8;
  const hasUpperCase = /[A-Z]/.test(contrasena);
  const hasLowerCase = /[a-z]/.test(contrasena);
  const hasNumber = /[0-9]/.test(contrasena);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(contrasena);
  const passwordsMatch = contrasena === confirmPassword;

  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  const handleRegister = async () => {
    setError("");
    setIsLoading(true);

    try {
      const userData = {
        nombre: nombre,
        correo: correo,
        // Use part of the email as username if not provided
        nombreUsuario: nombreUsuario || correo.split("@")[0],
        contrasena: contrasena,
        paisResidencia: paisResidencia,
        numeroDocumento: numeroDocumento,
        tipoDocumento: tipoDocumento, // This state holds the value from the select dropdown
        tipoPersona: "personalizado", // Ensure this matches your backend enum if used
        role: "USUARIO", // Default role, ensure it matches backend expected values ('USUARIO' or 'ADMIN')
        ingresoMensual: 0, // Default value, adjust as needed
        metaActual: true, // Default value, adjust as needed
      };

      console.log("Enviando datos al servidor:", userData);
      console.log("Valor de tipoDocumento (frontend):", tipoDocumento); // For debugging

      const response = await fetch("http://localhost:8080/finzen/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (response.ok) {
        showSuccessAlert("Cuenta creada exitosamente", "¡Bienvenido!");
        setTimeout(() => {
          navigate("/Profile"); // Redirect on success
        }, 2000);
      } else {
        setError(data.message || "Error al crear la cuenta");
        showErrorAlert(data.message || "Error al crear la cuenta");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Error al conectar con el servidor");
      showErrorAlert("No se pudo conectar con el servidor");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      setError("");
      window.location.href = `http://localhost:8080/finzen/auth/${provider}`;
    } catch (error) {
      setError(`Error al conectar con ${provider}`);
      setIsLoading(false);
    }
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (nombre.trim() && correo.trim()) {
        setStep(2);
      } else {
        setError("Por favor completa el nombre y correo electrónico");
        showErrorAlert("Por favor completa el nombre y correo electrónico");
      }
    } else if (step === 2) {
      if (paisResidencia.trim() && numeroDocumento.trim()) {
        setStep(3);
      } else {
        setError("Por favor completa el país y número de documento");
        showErrorAlert("Por favor completa el país y número de documento");
      }
    } else {
      if (!passwordsMatch) {
        setError("Las contraseñas no coinciden");
        showErrorAlert("Las contraseñas no coinciden");
        return;
      }

      if (passwordStrength < 3) {
        setError("La contraseña debe ser más segura");
        showErrorAlert("La contraseña debe ser más segura");
        return;
      }
      await handleRegister();
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Crear una cuenta";
      case 2:
        return "Información personal";
      case 3:
        return "Establece tu contraseña";
      default:
        return "Registro";
    }
  };

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Ingresa tus datos básicos para comenzar";
      case 2:
        return "Completa tu información de identificación";
      case 3:
        return "Crea una contraseña segura para tu cuenta";
      default:
        return "Completa el formulario para registrarte";
    }
  };

  return (
    <>
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">{getStepTitle()}</h2>
      <p className="text-sm text-white/50 mb-5">{getStepDescription()}</p>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-5.5">
        <div className="relative w-3/4 h-1 bg-white/20 rounded-full">
          <div
            className="absolute top-0 left-0 h-1 bg-indigo-500 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs text-white/70">Paso {step} de 3</span>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleContinue}>
        {step === 1 ? (
          // Step 1: Basic Information
          <>
            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Nombre completo *
              </label>
              <User className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                disabled={isLoading}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Correo electrónico *
              </label>
              <AtSign className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="email"
                required
                placeholder="nombre@ejemplo.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                disabled={isLoading}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Nombre de usuario (opcional)
              </label>
              <User className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Tu nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                disabled={isLoading}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              />
            </div>
          </>
        ) : step === 2 ? (
          // Step 2: Identification Information
          <>
            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                País de residencia *
              </label>
              <Flag className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Colombia"
                value={paisResidencia}
                onChange={(e) => setPaisResidencia(e.target.value)}
                required
                disabled={isLoading}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Tipo de documento *
              </label>
              <select
                value={tipoDocumento}
                onChange={(e) => setTipoDocumento(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              >
                <option value="cedula">Cédula de Ciudadanía</option>
                {/* --- IMPORTANT CHANGE HERE --- */}
                {/* Ensure this VALUE exactly matches your backend's Usuario.TipoDocumentoEnum for "Tarjeta de Identidad" */}
                <option value="tarjeta_de_identidad">
                  Tarjeta de Identidad
                </option>{" "}
                {/* Corrected value */}
                {/* --- END IMPORTANT CHANGE --- */}
                <option value="cedula_extranjera">Cédula de Extranjería</option>
                {/* --- IMPORTANT CHANGE HERE --- */}
                {/* Ensure this VALUE exactly matches your backend's Usuario.TipoDocumentoEnum for "Pasaporte" */}
                <option value="pasaporte">Pasaporte</option>{" "}
                {/* Corrected value (from PASSPORT to PASAPORTE) */}
                {/* --- END IMPORTANT CHANGE --- */}
              </select>
            </div>

            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Número de documento *
              </label>
              <FileText className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Número de documento"
                value={numeroDocumento}
                onChange={(e) => setNumeroDocumento(e.target.value)}
                required
                disabled={isLoading}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              />
            </div>
          </>
        ) : (
          // Step 3: Password and Terms
          <>
            <div className="relative">
              <label className="block text-sm text-white/50 mb-1.5">
                Contraseña *
              </label>
              <Lock className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  required
                  disabled={isLoading}
                  className="pl-10 pr-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              {contrasena && (
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          passwordStrength <= 2
                            ? "bg-red-500"
                            : passwordStrength <= 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs ml-2 text-white/70">
                      {passwordStrength <= 2
                        ? "Débil"
                        : passwordStrength <= 4
                        ? "Buena"
                        : "Fuerte"}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center">
                      {hasMinLength ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-white/40 mr-1" />
                      )}
                      <span
                        className={
                          hasMinLength ? "text-white/90" : "text-white/40"
                        }
                      >
                        Mínimo 8 caracteres
                      </span>
                    </div>
                    <div className="flex items-center">
                      {hasUpperCase ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-white/40 mr-1" />
                      )}
                      <span
                        className={
                          hasUpperCase ? "text-white/90" : "text-white/40"
                        }
                      >
                        Mayúscula
                      </span>
                    </div>
                    <div className="flex items-center">
                      {hasLowerCase ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-white/40 mr-1" />
                      )}
                      <span
                        className={
                          hasLowerCase ? "text-white/90" : "text-white/40"
                        }
                      >
                        Minúscula
                      </span>
                    </div>
                    <div className="flex items-center">
                      {hasNumber ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-white/40 mr-1" />
                      )}
                      <span
                        className={
                          hasNumber ? "text-white/90" : "text-white/40"
                        }
                      >
                        Número
                      </span>
                    </div>
                    <div className="flex items-center">
                      {hasSpecialChar ? (
                        <Check className="h-3 w-3 text-green-500 mr-1" />
                      ) : (
                        <X className="h-3 w-3 text-white/40 mr-1" />
                      )}
                      <span
                        className={
                          hasSpecialChar ? "text-white/90" : "text-white/40"
                        }
                      >
                        Carácter especial
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm text-white/50 mb-1.5">
                Confirmar contraseña *
              </label>
              <Lock className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  className={`pl-10 pr-10 w-full px-4 py-2 rounded-md bg-white/10 border ${
                    confirmPassword && !passwordsMatch
                      ? "border-red-500"
                      : "border-white/20"
                  } text-sm text-white placeholder-white/50 focus:ring-2 ${
                    confirmPassword && !passwordsMatch
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  } focus:outline-none disabled:opacity-50`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 disabled:opacity-50"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && (
                <p className="text-xs text-red-500 mt-1">
                  Las contraseñas no coinciden
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <input
                type="checkbox"
                id="terms"
                required
                disabled={isLoading}
                className="rounded border border-white/30 bg-white/10 accent-indigo-500 disabled:opacity-50"
              />
              <label htmlFor="terms" className="text-sm text-white/70">
                Acepto los{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  términos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  política de privacidad
                </a>{" "}
                de Finzen
              </label>
            </div>
          </>
        )}

        {/* Navigation buttons */}
        <div className={`flex ${step > 1 ? "space-x-3" : ""} mt-4`}>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={isLoading}
              className="flex-1 py-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-md text-center transition disabled:opacity-50"
            >
              <ArrowLeft className="inline-block w-4 h-4 mr-1" />
              Atrás
            </button>
          )}

          <button
            type="submit"
            disabled={
              isLoading ||
              (step === 3 && (!passwordsMatch || passwordStrength < 3))
            }
            className={`${
              step > 1 ? "flex-1" : "w-full"
            } py-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {step < 3 ? "Continuando..." : "Creando cuenta..."}
              </>
            ) : (
              <>
                {step < 3 ? "Continuar" : "Crear cuenta"} <span>→</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Social login section (only visible on step 1) */}
      {step === 1 && (
        <>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-white/20" />
            <span className="mx-4 text-xs text-white/60">O REGÍSTRATE CON</span>
            <hr className="flex-grow border-white/20" />
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
              className="group bg-black p-3 rounded-md border border-white/30 hover:bg-blue-500/20 hover:border hover:border-blue-400/30 disabled:opacity-50"
            >
              <Facebook className="w-19 h-4 text-white group-hover:text-blue-400" />
            </button>
            <button
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
              className="group bg-black p-3 rounded-md border border-white/30 hover:bg-indigo-500/20 hover:border hover:border-indigo-400/30 disabled:opacity-50"
            >
              <AiOutlineApple className="w-19 h-4 text-white group-hover:text-indigo-400" />
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="group bg-black p-3 rounded-md border border-white/30 hover:bg-violet-500/20 hover:border hover:border-violet-400/30 disabled:opacity-50"
            >
              <AiOutlineGoogle className="w-19 h-4 text-white group-hover:text-violet-400" />
            </button>
          </div>
        </>
      )}

      {/* Link to login (only visible on step 1) */}
      {step === 1 && (
        <p className="text-sm text-white/70 text-center mt-6">
          ¿Ya tienes una cuenta?{" "}
          <a href="./login" className="text-blue-400 hover:underline">
            Inicia sesión
          </a>
        </p>
      )}
    </>
  );
};
