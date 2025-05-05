import {
  User,
  AtSign,
  Building2,
  Eye,
  EyeOff,
  Lock,
  Check,
  Facebook,
  X,
  ArrowLeft,
} from "lucide-react";
import { AiOutlineGoogle, AiOutlineApple } from 'react-icons/ai';
import { useState } from "react";

export const Register = () => {
  // Estado para controlar el paso del formulario
  const [step, setStep] = useState(1);

  // Estados para los campos del formulario
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");

  // Estados para las contraseñas
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validación de contraseña
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  const passwordsMatch = password === confirmPassword;

  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  // Función para manejar el botón continuar
  const handleContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 1) {
      // Validar campos del paso 1
      if (name.trim() && email.trim()) {
        setStep(2);
      }
    } else {
      // Aquí iría la lógica para enviar el formulario completo
      console.log("Formulario enviado", { name, email, company, password });
    }
  };

  return (
    <>
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">
        {step === 1 ? "Crear una cuenta" : "Completa tu registro"}
      </h2>
      <p className="text-sm text-white/50 mb-5">
        {step === 1
          ? "Ingresa tus datos para registrarte en la plataforma"
          : "Establece una contraseña segura para tu cuenta"}
      </p>

      {/* Progress bar */}
      <div className="flex items-center gap-4 mb-5.5">
        <div className="relative w-3/4 h-1 bg-white/20 rounded-full">
          <div
            className="absolute top-0 left-0 h-1 bg-indigo-500 rounded-full"
            style={{ width: step === 1 ? "50%" : "100%" }}
          ></div>
        </div>
        <span className="text-xs text-white/70">Paso {step} de 2</span>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleContinue}>
        {step === 1 ? (
          // Paso 1: Información personal
          <>
            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Nombre completo
              </label>
              <User className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Correo electrónico
              </label>
              <AtSign className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="email"
                required
                placeholder="nombre@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-white/50 mb-1">
                Empresa (opcional)
              </label>
              <Building2 className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <input
                type="text"
                placeholder="Nombre de tu empresa"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </>
        ) : (
          // Paso 2: Contraseña
          <>
            <div className="relative top-">
              <label className="block text-sm text-white/50 mb-1.5">
                Contraseña
              </label>
              <Lock className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Mínimo 8 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 pr-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              {password && (
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
                Confirmar contraseña
              </label>
              <Lock className="absolute left-3 top-9 w-4 h-4 text-white/60" />
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repite tu contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`pl-10 pr-10 w-full px-4 py-2 rounded-md bg-white/10 border ${
                    confirmPassword && !passwordsMatch
                      ? "border-red-500"
                      : "border-white/20"
                  } text-sm text-white placeholder-white/50 focus:ring-2 ${
                    confirmPassword && !passwordsMatch
                      ? "focus:ring-red-500"
                      : "focus:ring-indigo-500"
                  } focus:outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90"
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
                className="rounded border border-white/30 bg-white/10 accent-indigo-500"
              />
              <label htmlFor="terms" className="text-sm text-white/70">
                Acepto los{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  terminos y condiciones
                </a>{" "}
                y la{" "}
                <a href="#" className="text-blue-400 hover:underline">
                  politica de privacidad
                </a>{" "}
                de Finzen
              </label>
            </div>

            {step === 1 && (
              <p className="text-sm text-white/70 text-center mt-6">
                ¿Ya tienes una cuenta?{" "}
                <a href="./login" className="text-blue-400 hover:underline">
                  Inicia sesión
                </a>
              </p>
            )}
          </>
        )}

        {/* Botones de navegación */}
        <div className={`flex ${step === 2 ? "space-x-3" : ""} mt-4`}>
          {step === 2 && (
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 py-2 bg-white/10 text-white/70 hover:bg-white/20 rounded-md text-center transition"
            >
              <ArrowLeft className="inline-block w-4 h-4 mr-1" />
              Atrás
            </button>
          )}

          <button
            type="submit"
            className={`${
              step === 2 ? "flex-1" : "w-full"
            } py-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition ${
              step === 2 && (!passwordsMatch || passwordStrength < 3)
                ? "opacity-70 cursor-not-allowed"
                : ""
            }`}
            disabled={step === 2 && (!passwordsMatch || passwordStrength < 3)}
          >
            {step === 1 ? "Continuar" : "Crear cuenta"} <span>→</span>
          </button>
        </div>
      </form>

      {/* Solo mostrar la sección de redes sociales en el paso 1 */}
      {step === 1 && (
        <>
          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-white/20" />
            <span className="mx-4 text-xs text-white/60">O REGÍSTRATE CON</span>
            <hr className="flex-grow border-white/20" />
          </div>

          {/* Social buttons */}

          <div className="flex justify-center gap-4">
            <button className= "group bg-black p-3 rounded-md border border-white/30 hover:bg-blue-500/20 hover:border hover:border-blue-400/30 ">
              <Facebook className="w-19 h-4 text-white group-hover:text-blue-400" />
            </button>
            <button className="group bg-black p-3 rounded-md border border-white/30 hover:bg-indigo-500/20 hover:border hover:border-indigo-400/30">
              <AiOutlineApple className="w-19 h-4 text-white group-hover:text-indigo-400" />
            </button>
            <button className="group bg-black p-3 rounded-md border border-white/30 hover:bg-violet-500/20 hover:border hover:border-violet-400/30">
              <AiOutlineGoogle className="w-19 h-4 text-white group-hover:text-violet-400" />
            </button>
          </div>
        </>
      )}

      {/* Switch to login - solo mostrar en el paso 1 */}
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
