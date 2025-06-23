import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

const quickOptions = [
  "¿Cómo puedo reducir mis gastos mensuales?",
  "Analiza mis hábitos de gasto",
  "¿Cuánto debería ahorrar cada mes?",
  "Ayúdame a crear un presupuesto",
  "¿Dónde estoy gastando demasiado?",
  "Consejos para invertir mis ahorros",
];

const hardcodedResponses: Record<string, string> = {
  "¿Cómo puedo reducir mis gastos mensuales?":
    "Para reducir tus gastos mensuales, comienza por identificar los gastos fijos y variables. Elimina o reduce suscripciones innecesarias y establece un presupuesto claro para cada categoría.",
  "Analiza mis hábitos de gasto":
    "Analizando tus hábitos, noto que gastas mucho en entretenimiento y comida a domicilio. Podrías limitar esas categorías y optar por planes más económicos.",
  "¿Cuánto debería ahorrar cada mes?":
    "Una buena regla es ahorrar al menos el 20% de tus ingresos mensuales. Ajusta según tus metas y nivel de endeudamiento.",
  "Ayúdame a crear un presupuesto":
    "Claro, para crear un presupuesto empieza por tus ingresos mensuales, luego asigna montos a gastos fijos, variables, ahorro e inversión.",
  "¿Dónde estoy gastando demasiado?":
    "Según tus patrones de consumo, parece que los gastos en transporte privado y comida representan un porcentaje alto de tus ingresos.",
  "Consejos para invertir mis ahorros":
    "Te recomiendo comenzar con fondos de bajo riesgo si eres principiante, como CDT o fondos indexados. Diversifica siempre tus inversiones.",
};

export default function FinanceAssistantChat() {
  const [messages, setMessages] = useState<
    { from: "user" | "bot"; text: string }[]
  >([
    {
      from: "bot",
      text: "¡Hola! Soy tu asistente financiero IA. ¿En qué puedo ayudarte hoy?",
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { from: "user", text }]);

    setTimeout(() => {
      const response =
        hardcodedResponses[text] ||
        "Gracias por tu pregunta. Pronto tendré una respuesta detallada para ti.";
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
    }, 500);

    setInput("");
  };

  return (
    <div className="h-screen w-full max-w-full flex flex-col bg-[#020817] text-white shadow-[0_0_20px_4px_rgba(99,102,241,0.4)] border border-indigo-600/60 rounded-md m-2 sm:m-5 mt-10 ml-1 overflow-hidden md:ml-0">
      {/* Encabezado */}
      <div className="p-3 sm:p-4 border-b border-slate-700 flex items-center gap-2">
        <Sparkles className="text-blue-400 w-5 h-5 sm:w-6 sm:h-6" />
        <h1 className="text-base sm:text-lg font-semibold">Asistente Financiero IA</h1>
        <span className="ml-auto text-xs bg-blue-600 px-2 py-0.5 rounded-full">
          Premium
        </span>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-3 sm:px-4 py-5 space-y-4 mr-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              msg.from === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full ${
                msg.from === "bot" ? "bg-gray-400" : "bg-blue-600"
              }`}
            >
              {msg.from === "bot" ? (
                <Bot className="text-black w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <User className="text-white w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
            <div
              className={`p-3 rounded-lg max-w-[85%] sm:max-w-xs break-words ${
                msg.from === "bot"
                  ? "bg-slate-700 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Opciones rápidas */}
      <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-800 border-t border-slate-700">
        {quickOptions.map((option, i) => (
          <button
            key={i}
            className="bg-slate-700 hover:bg-slate-600 text-sm text-white px-4 py-2 rounded-lg transition"
            onClick={() => handleSend(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Campo de entrada */}
      <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-700 flex items-center gap-2">
        <input
          type="text"
          placeholder="Escribe tu pregunta financiera..."
          className="flex-1 p-2 sm:p-3 bg-slate-800 text-white rounded-lg outline-none text-sm"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSend(input);
            }
          }}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 p-2 sm:p-3 rounded-lg"
          onClick={() => handleSend(input)}
        >
          <Send className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </button>
      </div>
    </div>
  );
}
