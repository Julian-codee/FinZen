"use client";

import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { showErrorAlert } from "../Ui/Alerts/Alerts";
import { useRegister } from "./RegisterContext";

export const Register = () => {
  const navigate = useNavigate();
  const { registerData, updateRegisterData, submitRegister } = useRegister();

  const [step, setStep] = useState(1);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const hasMinLength = registerData.contrasena.length >= 8;
  const hasUpperCase = /[A-Z]/.test(registerData.contrasena);
  const hasLowerCase = /[a-z]/.test(registerData.contrasena);
  const hasNumber = /[0-9]/.test(registerData.contrasena);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(registerData.contrasena);
  const passwordsMatch = registerData.contrasena === confirmPassword;

  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  const handleSocialLogin = async (provider: string) => {
    try {
      setIsLoading(true);
      setError("");
      window.location.href = `http://localhost:8080/finzen/auth/${provider}`;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError(`Error al conectar con ${provider}`);
      setIsLoading(false);
    }
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (step === 1) {
      if (registerData.nombre.trim() && registerData.correo.trim()) {
        setStep(2);
      } else {
        setError("Por favor completa el nombre y correo electrónico");
        showErrorAlert("Por favor completa el nombre y correo electrónico");
      }
    } else if (step === 2) {
      if (
        registerData.paisResidencia.trim() &&
        registerData.numeroDocumento.trim() &&
        registerData.tipoDocumento &&
        [
          "cedula",
          "pasaporte",
          "tarjeta_de_identidad",
          "cedula_extranjera",
        ].includes(registerData.tipoDocumento)
      ) {
        setStep(3);
      } else {
        setError(
          "Por favor completa el país, selecciona un tipo de documento válido y número de documento"
        );
        showErrorAlert(
          "Por favor completa el país, selecciona un tipo de documento válido y número de documento"
        );
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

      setIsLoading(true);
      try {
        await submitRegister();
        navigate("/custom-profile");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setError("Error al continuar al siguiente paso");
        showErrorAlert("Error al continuar al siguiente paso");
      } finally {
        setIsLoading(false);
      }
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
      <h2 className="text-2xl font-bold mb-1 sm:mb-2">{getStepTitle()}</h2>
      <p className="text-sm text-white/50 mb-5 sm:mb-6">
        {getStepDescription()}
      </p>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <div className="flex items-center gap-4 mb-5.5 sm:mb-6">
        <div className="relative w-3/4 h-1 bg-white/20 rounded-full">
          <div
            className="absolute top-0 left-0 h-1 bg-indigo-500 rounded-full"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <span className="text-xs text-white/70">Paso {step} de 3</span>
      </div>

      <form className="space-y-4" onSubmit={handleContinue}>
        {step === 1 ? (
          <>
            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Nombre completo *
              </label>
              <User className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Tu nombre"
                value={registerData.nombre}
                onChange={(e) => updateRegisterData({ nombre: e.target.value })}
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
                value={registerData.correo}
                onChange={(e) => updateRegisterData({ correo: e.target.value })}
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
                value={registerData.nombreUsuario}
                onChange={(e) =>
                  updateRegisterData({ nombreUsuario: e.target.value })
                }
                disabled={isLoading}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              />
            </div>
          </>
        ) : step === 2 ? (
          <>
            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                País de residencia *
              </label>
              <Flag className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Colombia"
                value={registerData.paisResidencia}
                onChange={(e) =>
                  updateRegisterData({ paisResidencia: e.target.value })
                }
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
                value={registerData.tipoDocumento}
                onChange={(e) =>
                  updateRegisterData({ tipoDocumento: e.target.value })
                }
                required
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              >
                <option value="" disabled>
                  Selecciona un tipo de documento
                </option>
                <option value="cedula">Cédula de Ciudadanía</option>
                <option value="tarjeta_de_identidad">
                  Tarjeta de Identidad
                </option>
                <option value="cedula_extranjera">Cédula de Extranjería</option>
                <option value="pasaporte">Pasaporte</option>
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
                value={registerData.numeroDocumento}
                onChange={(e) =>
                  updateRegisterData({ numeroDocumento: e.target.value })
                }
                required
                disabled={isLoading}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none disabled:opacity-50"
              />
            </div>
          </>
        ) : (
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
                  value={registerData.contrasena}
                  onChange={(e) =>
                    updateRegisterData({ contrasena: e.target.value })
                  }
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

              {registerData.contrasena && (
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
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

        <div
          className={`flex ${
            step > 1
              ? "flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3"
              : ""
          } mt-4`}
        >
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
                {step < 3 ? "Continuando..." : "Siguiente..."}
              </>
            ) : (
              <>
                {step < 3 ? "Continuar" : "Siguiente"} <span>→</span>
              </>
            )}
          </button>
        </div>
      </form>

      {step === 1 && (
        <>
          <div className="flex items-center my-6 sm:my-8">
            <hr className="flex-grow border-white/20" />
            <span className="mx-4 text-xs text-white/60">O REGÍSTRATE CON</span>
            <hr className="flex-grow border-white/20" />
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <button
              onClick={() => handleSocialLogin("facebook")}
              disabled={isLoading}
              className="flex items-center justify-center p-3 bg-black/80 border border-white/20 rounded-lg hover:border-blue-400/50 hover:bg-blue-500/10 transition"
            >
              <Facebook className="w-5 h-5 text-white group-hover:text-blue-400" />
            </button>
            <button
              onClick={() => handleSocialLogin("apple")}
              disabled={isLoading}
              className="flex items-center justify-center p-3 bg-black/80 border border-white/20 rounded-lg hover:border-indigo-400/50 hover:bg-indigo-500/10 transition"
            >
              <AiOutlineApple className="w-5 h-5 text-white group-hover:text-indigo-400" />
            </button>
            <button
              onClick={() => handleSocialLogin("google")}
              disabled={isLoading}
              className="flex items-center justify-center p-3 bg-black/80 border border-white/20 rounded-lg hover:border-violet-400/50 hover:bg-violet-500/10 transition"
            >
              <AiOutlineGoogle className="w-5 h-5 text-white group-hover:text-violet-400" />
            </button>
          </div>

          <p className="text-sm text-white/70 text-center mt-6 sm:mt-8">
            ¿Ya tienes una cuenta?{" "}
            <a href="./login" className="text-blue-400 hover:underline">
              Inicia sesión
            </a>
          </p>
        </>
      )}
    </>
  );
};
