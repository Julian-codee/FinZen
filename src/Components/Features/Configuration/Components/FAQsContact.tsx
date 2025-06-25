import { Mail, MessageCircle, Phone } from "lucide-react";

export const FAQsContact = () => {
  return (
    <div className="text-white p-6 border border-white/10 rounded-lg mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <Phone className="text-blue-600" />
        <h2 className="text-2xl font-semibold">Contacto Directo</h2>
      </div>
      <p className="text-sm text-white/70 mb-6">
        Otras formas de contactar con nuestro equipo de soporte.
      </p>

      <div className="text-white p-4 border border-white/10 rounded-lg">
        <div className="flex items-center gap-4">
          {/* Ícono a la izquierda, centrado */}
          <div className="flex-shrink-0">
            <Mail className="text-blue-600 w-6 h-6" />
          </div>

          {/* Contenido a la derecha */}
          <div>
            <h2 className="text-md font-semibold">Correo Electrónico</h2>
            <p className="text-sm text-white/70">finzencompanyco@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="text-white p-4 border border-white/10 rounded-lg mt-2">
        <div className="flex items-center gap-4">
          {/* Ícono a la izquierda, centrado */}
          <div className="flex-shrink-0">
            <Phone className="text-blue-600 w-6 h-6" />
          </div>

          {/* Contenido a la derecha */}
          <div>
            <h2 className="text-md font-semibold">Teléfono</h2>
            <p className="text-sm text-white/70">+57 300 867 4345</p>
          </div>
        </div>
      </div>

      <div className="text-white p-4 border border-white/10 rounded-lg mt-2">
        <div className="flex items-center gap-4">
          {/* Ícono a la izquierda, centrado */}
          <div className="flex-shrink-0">
            <MessageCircle className="text-blue-600 w-6 h-6" />
          </div>

          {/* Contenido a la derecha */}
          <div>
            <h2 className="text-md font-semibold">Chat en Vivo</h2>
            <p className="text-sm text-white/70">
              Disponible 24/7 para usuarios Premium
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded -mt-10">
            Chat En Vivo
          </button>
        </div>
      </div>
    </div>
  );
};
