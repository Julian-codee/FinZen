import {
    LucideUser,
    LucideAtSign,
    LucideBuilding2,
    LucideFacebook,
    LucideTwitter,
    LucideGithub,
  } from "lucide-react";
  
  export const Register = () => {
    return (
      <div className="text-white">
        <h2 className="text-2xl font-bold mb-1">Crear una cuenta</h2>
        <p className="text-sm text-white/70 mb-6">
          Ingresa tus datos para registrarte en la plataforma
        </p>
  
        {/* Barra de progreso */}
        <div className="flex items-center justify-between mb-4 text-sm text-white/60">
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mr-2">
            <div className="h-full bg-blue-400 w-1/3 rounded-full transition-all duration-300" />
          </div>
          <span>Paso 1 de 2</span>
        </div>
  
        <form className="space-y-4">
          {/* Nombre completo */}
          <div>
            <label className="text-sm mb-1 block">Nombre completo</label>
            <div className="flex items-center px-4 py-2 rounded-md bg-white/10 border border-white/20">
              <LucideUser className="w-4 h-4 text-white/50 mr-2" />
              <input
                type="text"
                placeholder="Tu nombre"
                className="bg-transparent outline-none w-full text-sm text-white placeholder-white/50"
              />
            </div>
          </div>
  
          {/* Correo electrónico */}
          <div>
            <label className="text-sm mb-1 block">Correo electrónico</label>
            <div className="flex items-center px-4 py-2 rounded-md bg-white/10 border border-white/20">
              <LucideAtSign className="w-4 h-4 text-white/50 mr-2" />
              <input
                type="email"
                placeholder="nombre@ejemplo.com"
                className="bg-transparent outline-none w-full text-sm text-white placeholder-white/50"
              />
            </div>
          </div>
  
          {/* Empresa (opcional) */}
          <div>
            <label className="text-sm mb-1 block">Empresa (opcional)</label>
            <div className="flex items-center px-4 py-2 rounded-md bg-white/10 border border-white/20">
              <LucideBuilding2 className="w-4 h-4 text-white/50 mr-2" />
              <input
                type="text"
                placeholder="Nombre de tu empresa"
                className="bg-transparent outline-none w-full text-sm text-white placeholder-white/50"
              />
            </div>
          </div>
  
          {/* Botón continuar */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition"
          >
            Continuar <span>→</span>
          </button>
        </form>
  
        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-white/20" />
          <span className="mx-4 text-xs bg-black/40 px-2 py-0.5 rounded text-white/60">
            O REGÍSTRATE CON
          </span>
          <hr className="flex-grow border-white/20" />
        </div>
  
        {/* Social buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-black/80 p-3 rounded-md hover:bg-black transition">
            <LucideFacebook className="w-5 h-5 text-white" />
          </button>
          <button className="bg-black/80 p-3 rounded-md hover:bg-black transition">
            <LucideTwitter className="w-5 h-5 text-white" />
          </button>
          <button className="bg-black/80 p-3 rounded-md hover:bg-black transition">
            <LucideGithub className="w-5 h-5 text-white" />
          </button>
        </div>
  
        {/* Link a iniciar sesión */}
        <p className="text-sm text-white/70 text-center mt-6">
          ¿Ya tienes una cuenta?{" "}
          <a href="#" className="text-blue-400 hover:underline">
            Inicia sesión
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

      


    );
  };
  