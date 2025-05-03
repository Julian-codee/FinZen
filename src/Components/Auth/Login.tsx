import React, { useState } from "react";
import {
  LucideFingerprint,
  LucideFacebook,
  LucideTwitter,
  LucideGithub,
} from "lucide-react";

export const Login = () => {
  //Nos permite cambiar entre el login y el register
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <>
      <div className="bg-gray-600/30 backdrop-blur-xs border border-white/10 rounded-2xl p-8 w-full max-w-md text-white shadow-xl">
        <div className="flex w-full max-w-md items-center justify-center mb-6 border-1 border-white/10 backdrop-blur-xs rounded-xl h-11 overflow-hidden">
          <button
            onClick={() => setActiveTab("login")}
            className={`w-1/2 mx-1 px-6 py-1 rounded-md font-semibold transition duration-100 ${
              activeTab === "login"
                ? "bg-white/20 text-white"
                : "text-white/70"
            }`}
          >
            Iniciar Sesión
          </button>

          <button
            onClick={() => setActiveTab("register")}
            className={`w-1/2 px-6 py-1 mx-1 rounded-md font-semibold transition duration-100 ${
              activeTab === "register"
                ? "bg-white/20 text-white"
                : "text-white/70"
            }`}
          >
            Registrarse
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-1">Bienvenido de nuevo</h2>
        <p className="text-sm text-white/70 mb-6">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>

        <form className="space-y-5">
          <div>
            <label className="text-sm">Email</label>
            <input
              type="email"
              placeholder="tu@email.com"
              className="mt-1 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-sm">
              <label>Contraseña</label>
              <a href="#" className="text-blue-400 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              id="remember"
              className="accent-indigo-500"
            />
            <label htmlFor="remember">Recordarme</label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            Iniciar sesión <span>→</span>
          </button>

          <button
            type="button"
            className="w-full py-2 bg-black/80 text-white rounded-md flex items-center justify-center gap-2 hover:bg-black transition"
          >
            <LucideFingerprint className="w-5 h-5" />
            Iniciar sesión con biometría
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-white/20" />
          <span className="mx-4 text-xs text-white/60">O CONTINÚA CON</span>
          <hr className="flex-grow border-white/20" />
        </div>

        {/* Social buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-black/60 p-2 rounded-md hover:bg-black">
            <LucideFacebook className="w-5 h-5 text-white" />
          </button>
          <button className="bg-black/60 p-2 rounded-md hover:bg-black">
            <LucideTwitter className="w-5 h-5 text-white" />
          </button>
          <button className="bg-black/60 p-2 rounded-md hover:bg-black">
            <LucideGithub className="w-5 h-5 text-white" />
          </button>
        </div>

        <p className="text-sm text-white/70 text-center mt-6">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Regístrate
          </a>
        </p>

        <p className="text-xs text-white/40 text-center mt-4">
          Al continuar, aceptas nuestros{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Términos de servicio
          </a>{" "}
          y{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Política de privacidad
          </a>
        </p>
      </div>
    </>
  );
};
