import {
  User,
  AtSign,
  Building2,
  Facebook,
  Twitter,
  Github,
} from "lucide-react";

export const Register = () => {
  return (
    <>
      {/* Header */}
      <h2 className="text-2xl font-bold mb-1">Crear una cuenta</h2>
      <p className="text-sm text-white/70 mb-11">
        Ingresa tus datos para registrarte en la plataforma
      </p>

      {/* Progress bar */}
      <div className="relative w-full h-1 bg-white/20 rounded-full mb-7.5">
        <div className="absolute top-0 left-0 h-1 bg-indigo-500 w-1/2 rounded-full"></div>
        <span className="absolute right-0 text-xs -top-6 text-white/70">Paso 1 de 2</span>
      </div>

      {/* Form */}
      <form className="space-y-1">
        <div className="relative">
          <label className="block text-sm text-white/80 mb-1">Nombre completo</label>
          <User className="absolute left-3 top-10 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Tu nombre"
            className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none"
          />
        </div>

        <div className="relative">
          <label className="block text-sm text-white/80 mb-1">Correo electrónico</label>
          <AtSign className="absolute left-3 top-10 w-4 h-4 text-white/60" />
          <input
            type="email"
            placeholder="nombre@ejemplo.com"
            className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none"
          />
        </div>

        <div className="relative">
          <label className="block text-sm text-white/80 mb-1">Empresa (opcional)</label>
          <Building2 className="absolute left-3 top-10 w-4 h-4 text-white/60" />
          <input
            type="text"
            placeholder="Nombre de tu empresa"
            className="pl-10 w-full px-4 py-2 rounded-md bg-white/10 border border-white/20 text-sm text-white placeholder-white/50 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          Continuar <span>→</span>
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-6">
        <hr className="flex-grow border-white/20" />
        <span className="mx-4 text-xs text-white/60">O REGÍSTRATE CON</span>
        <hr className="flex-grow border-white/20" />
      </div>

      {/* Social buttons */}
      <div className="flex justify-center gap-4">
        <button className="bg-black p-3 rounded-md hover:bg-black/80 transition">
          <Facebook className="w-4 h-4 text-white" />
        </button>
        <button className="bg-black p-3 rounded-md hover:bg-black/80 transition">
          <Twitter className="w-4 h-4 text-white" />
        </button>
        <button className="bg-black p-3 rounded-md hover:bg-black/80 transition">
          <Github className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Switch to login */}
      <p className="text-sm text-white/70 text-center mt-6">
        ¿Ya tienes una cuenta?{" "}
        <a href="#" className="text-blue-400 hover:underline">
          Inicia sesión
        </a>
      </p>
    </>
  );
};
