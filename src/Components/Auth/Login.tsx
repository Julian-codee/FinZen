"use client";

import { useState } from "react";
import { Register } from "./Register";
import { AiOutlineApple, AiOutlineGoogle } from "react-icons/ai";
import { LucideFingerprint, Facebook } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert, showErrorAlert } from "../Ui/Alerts/Alerts";
import { ClipLoader } from "react-spinners";

export const Login = () => {
  const navigate = useNavigate();

  const forgotPassword = () => {
    navigate("/Forgot");
  };

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://finzenbackend-production.up.railway.app/finzen/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo, contrasena }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        showSuccessAlert("Has iniciado sesión exitosamente", "Bienvenido");

        setTimeout(() => {
          navigate("/Transactions");
          navigate("/BudgetDashboard");
          navigate("/Reporting");
        }, 2000);
      } else {
        setError(data.message || "Credenciales inválidas");
        showErrorAlert(data.message || "Credenciales inválidas");
      }
    } catch (error) {
      setError("Error al iniciar sesión");
      showErrorAlert("No se pudo conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-70 flex flex-col items-center justify-center z-[9999]">
          <div className="w-32 h-32 relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-xl animate-pulse"></div>
            <div className="w-full h-full relative flex items-center justify-center">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin blur-sm"></div>
              <div className="absolute inset-1 bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-12 bg-cyan-500 rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 h-12 bg-blue-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.1s]"></div>
                  <div className="w-1.5 h-12 bg-indigo-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
                  <div className="w-1.5 h-12 bg-purple-500 rounded-full animate-[bounce_1s_ease-in-out_infinite_0.3s]"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-100"></div>
            <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-cyan-500 rounded-full animate-ping delay-200"></div>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-ping delay-300"></div>
          </div>
          <p className="mt-4 text-white text-lg -top-4">Iniciando sesión...</p>
        </div>
      )}

      <div className="w-full px-4 sm:px-6 md:px-0">
        <div className="bg-gray-600/30 backdrop-blur-xs border border-white/10 rounded-2xl p-6 sm:p-8 w-full max-w-md mx-auto text-white shadow-xl">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row w-full items-center justify-center mb-6 border border-white/10 backdrop-blur-xs rounded-xl overflow-hidden text-sm sm:text-base">
            <button
              onClick={() => setActiveTab("login")}
              className={`w-full sm:w-1/2 px-6 py-2 font-semibold transition ${
                activeTab === "login"
                  ? "bg-white/20 text-white"
                  : "text-white/70"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`w-full sm:w-1/2 px-6 py-2 font-semibold transition ${
                activeTab === "register"
                  ? "bg-white/20 text-white"
                  : "text-white/70"
              }`}
            >
              Registrarse
            </button>
          </div>

          {activeTab === "login" ? (
            <>
              <h2 className="text-2xl font-bold mb-1">Bienvenido de nuevo</h2>
              <p className="text-sm text-white/70 mb-6">
                Ingresa tus credenciales para acceder a tu cuenta
              </p>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="text-sm text-white/50">Email</label>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    className="mt-1 min-w-0 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={loading}
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm">
                    <label className="text-white/50">Contraseña</label>
                    <a
                      onClick={forgotPassword}
                      className="text-blue-400 hover:underline cursor-pointer"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <input
                    type="password"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="mt-1 min-w-0 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    disabled={loading}
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    id="remember"
                    className="accent-indigo-500"
                    disabled={loading}
                  />
                  <label htmlFor="remember">Recordarme</label>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <ClipLoader size={16} color="#ffffff" /> Iniciando
                      sesión...
                    </>
                  ) : (
                    <>
                      Iniciar sesión <span>→</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  className="w-full py-2 bg-black/80 text-white rounded-md flex items-center justify-center gap-2 hover:bg-black transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <LucideFingerprint className="w-5 h-5" />
                  Iniciar sesión con biometría
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <hr className="flex-grow border-white/20" />
                <span className="mx-4 text-xs text-white/60">
                  O CONTINÚA CON
                </span>
                <hr className="flex-grow border-white/20" />
              </div>

              {/* Redes sociales */}
              <div className="grid grid-cols-3 gap-3 mt-4">
                <button
                  className="flex items-center justify-center p-3 bg-black/80 border border-white/20 rounded-lg hover:border-blue-400/50 hover:bg-blue-500/10 transition"
                  disabled={loading}
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white group-hover:text-blue-400" />
                </button>

                <button
                  className="flex items-center justify-center p-3 bg-black/80 border border-white/20 rounded-lg hover:border-indigo-400/50 hover:bg-indigo-500/10 transition"
                  disabled={loading}
                  aria-label="Apple"
                >
                  <AiOutlineApple className="w-5 h-5 text-white group-hover:text-indigo-400" />
                </button>

                <button
                  className="flex items-center justify-center p-3 bg-black/80 border border-white/20 rounded-lg hover:border-violet-400/50 hover:bg-violet-500/10 transition"
                  disabled={loading}
                  aria-label="Google"
                >
                  <AiOutlineGoogle className="w-5 h-5 text-white group-hover:text-violet-400" />
                </button>
              </div>

              <p className="text-sm text-white/70 text-center mt-6">
                ¿No tienes una cuenta?{" "}
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => setActiveTab("register")}
                >
                  Regístrate
                </button>
              </p>
            </>
          ) : (
            <Register />
          )}
        </div>

        {(activeTab === "login" || activeTab === "register") && (
          <p className="text-xs text-white/40 text-center mt-6 mb-0 max-w-sm px-4 mx-auto leading-snug">
            Al continuar, aceptas nuestros{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Términos de servicio
            </a>{" "}
            y{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Política de privacidad
            </a>
          </p>
        )}
      </div>
    </>
  );
};
