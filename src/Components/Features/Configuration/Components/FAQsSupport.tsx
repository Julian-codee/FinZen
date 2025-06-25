import { useState } from "react";
import { MessageSquare, Paperclip, Send, X } from "lucide-react";

export const FAQsSupport = () => {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachedFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="text-white p-6 border border-white/10 rounded-lg mt-6">
      <div className="flex items-center space-x-2 mb-4">
        <MessageSquare className="text-blue-600" />
        <h2 className="text-2xl font-semibold">Contactar a Soporte</h2>
      </div>
      <p className="text-sm text-white/70 mb-6">
        Envíanos un mensaje y te responderemos a la brevedad.
      </p>

      <form action="#">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="juan.perez@gmail.com"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm mb-1">
            Asunto
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Ej: Problema con la sincronización"
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm mb-1">
            Mensaje
          </label>
          <textarea
            id="message"
            rows={3}
            placeholder="Profesional en finanzas con interés en inversiones y ahorro."
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-6">
          <label className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 border border-gray-600 rounded text-sm cursor-pointer hover:bg-gray-700 transition">
            <Paperclip className="w-4 h-4" />
            Adjuntar captura
            <input
              type="file"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
          >
            <Send className="w-4 h-4" />
            Enviar mensaje
          </button>
        </div>

        {attachedFiles.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm text-white/60">Archivos adjuntados:</p>
            <ul className="space-y-1">
              {attachedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-800 px-3 py-2 rounded text-sm"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-white/50 hover:text-red-400 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};
