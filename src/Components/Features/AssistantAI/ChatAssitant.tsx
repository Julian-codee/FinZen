import { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, User, Loader2 } from "lucide-react";

const quickOptions = [
  "¿Cómo puedo reducir mis gastos mensuales?",
  "Analiza mis hábitos de gasto",
  "¿Cuánto debería ahorrar cada mes?",
  "Ayúdame a crear un presupuesto",
  "¿Dónde estoy gastando demasiado?",
  "Consejos para invertir mis ahorros",
];

export default function FinanceAssistantChat() {
  const [messages, setMessages] = useState<{ from: "user" | "bot"; text: string }[]>([
    {
      from: "bot",
      text: "¡Hola! Soy tu asistente financiero IA. ¿En qué puedo ayudarte hoy?",
    },
  ]);

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setJwtToken(token);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Para usar el asistente, por favor inicia sesión. Tu sesión actual no está activa.",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (apiError === "Sesión inválida o expirada.") {
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
    }
  }, [apiError]);

  const handleSend = async (text: string) => {
    const messageToSend = text.trim();
    if (!messageToSend) return;

    setApiError(null);
    setMessages((prev) => [...prev, { from: "user", text: messageToSend }]);
    setInput("");

    if (!jwtToken) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Parece que no has iniciado sesión o tu sesión ha caducado. Por favor, inicia sesión para continuar.",
        },
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://finzenbackend-production.up.railway.app/finzen/gpt/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({ prompt: messageToSend }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("jwtToken");
          setJwtToken(null);
          const errorMessage = "Tu sesión ha expirado o es inválida. Por favor, vuelve a iniciar sesión para continuar.";
          setApiError("Sesión inválida o expirada.");
          setMessages((prev) => [...prev, { from: "bot", text: errorMessage }]);
        } else {
          const errorData = await response.json().catch(() => ({ message: response.statusText }));
          const errorMessage = `Error del servidor: ${errorData.message || response.statusText}`;
          setApiError(errorMessage);
          setMessages((prev) => [...prev, { from: "bot", text: errorMessage }]);
          console.error(`Error ${response.status}:`, errorData);
        }
      } else {
        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          { from: "bot", text: data.response || "No se recibió una respuesta clara de la IA." },
        ]);
      }
    } catch (error) {
      console.error("Error al comunicarse con la IA:", error);
      setApiError("Problema de conexión o error inesperado.");
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Lo siento, hubo un problema al comunicarse con el asistente. Por favor, inténtalo de nuevo más tarde.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#020817] text-white overflow-hidden shadow-[0_0_20px_4px_rgba(99,102,241,0.4)] border border-indigo-600/60 rounded-md m-5 mt-10">
      <div className="p-4 border-b border-slate-700 flex items-center gap-2">
        <Sparkles className="text-blue-400" />
        <h1 className="text-lg font-semibold">Asistente Financiero IA</h1>
        <span className="ml-auto text-xs bg-blue-600 px-2 py-0.5 rounded-full">Premium</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
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
                msg.from === "bot" ? "bg-slate-700 text-white" : "bg-blue-600 text-white"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-400">
              <Bot className="text-black" />
            </div>
            <div className="p-3 rounded-lg bg-slate-700 text-white max-w-xs">
              <Loader2 className="animate-spin text-white" size={20} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-slate-800 border-t border-slate-700">
        {quickOptions.map((option, i) => (
          <button
            key={i}
            className="bg-slate-700 hover:bg-slate-600 text-sm text-white px-4 py-2 rounded-lg transition"
            onClick={() => handleSend(option)}
            disabled={isLoading || !jwtToken}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-700 flex items-center gap-2">
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
          disabled={isLoading || !jwtToken}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 p-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => handleSend(input)}
          disabled={isLoading || !jwtToken}
        >
          {isLoading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Send className="w-5 h-5 text-white" />}
        </button>
      </div>
    </div>
  );
}
