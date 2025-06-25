// src/components/FAQs.tsx
import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, FileText } from "lucide-react";

const faqs = [
  {
    question: "¿Cómo puedo conectar mi cuenta bancaria?",
    answer:
      'Para conectar tu cuenta bancaria, ve a la sección "Cuentas" y haz clic en "Añadir Cuenta". Selecciona tu banco de la lista y sigue las instrucciones para autenticarte de forma segura. Finzen utiliza encriptación de nivel bancario para proteger tus credenciales.',
  },
  {
    question: "¿Cómo funciona la sincronización automática?",
    answer:
      "Una vez que conectas tu cuenta bancaria, Finzen sincroniza automáticamente tus transacciones cada pocas horas para mantener tu información financiera actualizada sin que tengas que hacer nada manualmente.",
  },
  {
    question: "¿Es seguro proporcionar mis datos bancarios?",
    answer:
      "Sí. Finzen emplea estándares de seguridad de nivel bancario, incluyendo encriptación de extremo a extremo y autenticación segura, para garantizar la confidencialidad y protección de tus datos bancarios.",
  },
  {
    question: "¿Cómo puedo cancelar mi suscripción?",
    answer:
      "Puedes cancelar tu suscripción en cualquier momento desde la sección 'Configuración > Suscripción'. Allí encontrarás la opción para gestionar tu plan y cancelarlo si lo deseas.",
  },
  {
    question: "¿Cómo puedo exportar mis datos?",
    answer:
      "Ve a la sección 'Configuración > Exportar datos' y selecciona el formato que prefieras (CSV o PDF). Finzen te generará un archivo con tu información financiera para que puedas guardarla o analizarla fuera de la plataforma.",
  },
];

export const FAQS = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
     <div className="text-white p-6 border border-white/10 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <HelpCircle className="text-blue-600" />
        <h2 className="text-2xl font-semibold">Preguntas Frecuentes</h2>
      </div>
      <p className="text-sm text-gray-400 mb-6">
        Respuestas a las preguntas más comunes sobre Finzen.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700 pb-3">
            <button
              onClick={() => toggleQuestion(index)}
              className="flex justify-between items-center w-full text-left text-white font-medium"
            >
              <span>{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-40 mt-2" : "max-h-0"
              }`}
            >
              <p className="text-gray-300 text-sm mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button className="w-full flex items-center justify-center border border-gray-600 rounded-md px-4 py-2 text-sm text-white hover:bg-gray-800 transition">
          <FileText className="w-4 h-4 mr-2" />
          Ver todas las preguntas frecuentes
        </button>
      </div>
    </div>
  );
};
