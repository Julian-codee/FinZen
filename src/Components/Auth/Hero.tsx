// src/components/Hero.tsx
"use client";
import { useState } from "react";
import { Shell, Wallet, Check, Signal, ChartLine, Heart } from "lucide-react";
import { Hero2 } from "../Ui/UiAuth/Hero2";
import { Hero3 } from "../Ui/UiAuth/Hero3";
import { Hero4 } from "../Ui/UiAuth/Hero4";
import { Hero5 } from "../Ui/UiAuth/Hero5";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import { useRegister } from "./RegisterContext";

export const Hero = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});
   const {  updateRegisterData,submitRegister } = useRegister();
  const [otherObjective, setOtherObjective] = useState("");

  // Estado para Hero2
  const [financialStatusOptions, setFinancialStatusOptions] = useState<
    Record<string, boolean>
  >({});

  
  

  // Estado para los inputs de Hero3
  const [knowledgeLevel, setKnowledgeLevel] = useState("");
  const [knowledgeLevel2, setKnowledgeLevel2] = useState("");
  const [knowledgeLevel3, setKnowledgeLevel3] = useState("");
  const [knowledgeLevel4, setKnowledgeLevel4] = useState("");

  // Estado para los inputs de Hero4
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  // Estado para los inputs de Hero5
  const [props, setProps] = useState("");
  const [props2, setProps2] = useState("");
  const [props3, setProps3] = useState("");
  const [props4, setProps4] = useState("");

  const [financialInputs, setFinancialInputs] = useState({
    ingresos: "",
    gastos: "",
    ahorros: "",
    deudas: "",
  });

  // Inicializa el hook de navegación
  const navigate = useNavigate();

  const handleHero2CheckboxChange = (id: string) => {
    setFinancialStatusOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleHero2InputChange = (field: string, value: string) => {
    setFinancialInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const financialGoals = [
    {
      id: "save_money",
      title: "Ahorrar dinero",
      description: "Crear un fondo de ahorro para objetivos a corto plazo",
    },
    {
      id: "pay_debts",
      title: "Pagar deudas",
      description:
        "Reducir o eliminar préstamos, tarjetas de crédito u otras deudas",
    },
    {
      id: "emergency_fund",
      title: "Crear fondo de emergencia",
      description: "Establecer un colchón financiero para imprevistos",
    },
    {
      id: "invest_future",
      title: "Invertir para el futuro",
      description: "Crear una cartera de inversiones a corto y largo plazo",
    },
    {
      id: "buy_home",
      title: "Comprar una vivienda",
      description: "Ahorrar para la entrada o financiar una propiedad",
    },
    {
      id: "plan_retirement",
      title: "Planificar jubilación",
      description: "Preparar finanzas para el retiro laboral",
    },
    {
      id: "finance_education",
      title: "Financiar educación",
      description: "Ahorrar para estudios propios o de familiares",
    },
    {
      id: "start_business",
      title: "Iniciar un negocio",
      description: "Financiar un emprendimiento o proyecto propio",
    },
    { id: "other", title: "Otro objetivo", description: "" },
  ];

  const handleCheckboxChange = (id: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNext = async () => {
    if (currentStep < 5 ) {
      setCurrentStep(currentStep + 1);
    } else {
      // Enviar los datos al backend
      try {
        await submitRegister(); // Llama a la función del contexto para enviar los dato
        console.log("Registro exitoso");
        navigate("/register");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1); // Retrocede un paso dentro del cuestionario
    } else {
      // Si estamos en el primer paso (currentStep === 1), navegamos a la ruta anterior
      navigate(-1); // Esto hace lo mismo que el botón "atrás" del navegador
      // O puedes especificar una ruta concreta si sabes a dónde quieres volver
      // navigate("/seleccionar-perfil");
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <div className="flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-transparent text-blue-600 flex items-center justify-center mr-4">
                <Shell className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold text-white">
                ¿Cuáles son tus principales objetivos financieros?
              </h2>
            </div>
            <p className="text-gray-300 mb-10 text-xl">
              Selecciona todos los objetivos que sean relevantes para ti. Esto
              nos ayudará a personalizar tu experiencia.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {financialGoals.map((goal, index) => (
                <div
                  key={goal.id}
                  className={
                    index === financialGoals.length - 1 &&
                    financialGoals.length % 2 !== 0
                      ? "md:col-span-2"
                      : ""
                  }
                >
                  <div className="flex items-start mb-2">
                    <div
                      className="w-7 h-7 border border-blue-500 rounded-full flex-shrink-0 mr-3 mt-1 flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: selectedOptions[goal.id]
                          ? "#3b82f6"
                          : "transparent",
                      }}
                      onClick={() => handleCheckboxChange(goal.id)}
                    >
                      {selectedOptions[goal.id] && (
                        <Check className="text-white w-5 h-5 font-extrabold" />
                      )}
                    </div>
                    <div>
                      <label
                        className="text-white text-lg font-medium cursor-pointer"
                        onClick={() => handleCheckboxChange(goal.id)}
                      >
                        {goal.title}
                      </label>
                      {goal.description && (
                        <p className="text-gray-400 mt-1">{goal.description}</p>
                      )}
                    </div>
                  </div>
                  {goal.id === "other" && selectedOptions[goal.id] && (
                    <div className="ml-9 mt-2">
                      <input
                        type="text"
                        value={otherObjective}
                        onChange={(e) => setOtherObjective(e.target.value)}
                        placeholder="Especifica tu objetivo..."
                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="text-white flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-transparent text-blue-600 flex items-center justify-center mr-4">
                <Wallet className="w-8 h-8 -mt-6" />
              </div>
              <h2 className="text-3xl font-bold mb-6">
                ¿Cuál es tu situación financiera actual?
              </h2>
            </div>
            <p className="text-gray-300 mb-10 text-xl">
              Esta información nos ayudará a ofrecerte recomendaciones más
              precisas. Todos los datos son confidenciales.
            </p>

            {/* Pasamos los props a Hero2 */}
            <Hero2
              financialStatusOptions={financialStatusOptions}
              onCheckboxChange={handleHero2CheckboxChange}
              financialInputs={financialInputs}
              onInputChange={handleHero2InputChange}
              updateRegisterData={updateRegisterData}
            />
          </>
        );
      case 3:
        return (
          <>
            <div className="text-white flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-transparent text-blue-600 flex items-center justify-center mr-4">
                <Signal className="w-8 h-8 -mt-6" />
              </div>
              <h2 className="text-3xl font-bold mb-6">
                ¿Cuál es tu nivel de experiencia financiera?
              </h2>
            </div>
            <p className="text-gray-300 mb-10 text-xl">
              Estas preguntas nos ayudarán a adaptar el contenido y las
              herramientas a tu nivel de conocimiento.
            </p>

            <Hero3
              knowledgeLevel={knowledgeLevel}
              onKnowledgeChange={setKnowledgeLevel}
              knowledgeLevel2={knowledgeLevel2}
              onKnowledgeChange2={setKnowledgeLevel2}
              knowledgeLevel3={knowledgeLevel3}
              onKnowledgeChange3={setKnowledgeLevel3}
              knowledgeLevel4={knowledgeLevel4}
              onKnowledgeChange4={setKnowledgeLevel4}
            />
          </>
        );
      case 4:
        return (
          <>
            <div className="text-white flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-transparent text-blue-600 flex items-center justify-center mr-4">
                <ChartLine className="w-8 h-8 -mt-6" />
              </div>
              <h2 className="text-3xl font-bold mb-6">
                ¿Qué áreas financieras te interesan más?
              </h2>
            </div>
            <p className="text-gray-300 mb-10 text-xl">
              Selecciona las áreas que más te interesen para personalizar el
              contenido y las herramientas que verás.
            </p>

            <Hero4
              selectedItems={selectedInterests}
              setSelectedItems={setSelectedInterests}
            />
          </>
        );
      case 5:
        return (
          <>
            <div className="text-white flex items-center mb-6">
              <div className="w-8 h-8 rounded-full bg-transparent text-blue-600 flex items-center justify-center mr-4">
                <Heart className="w-8 h-8 -mt-6" />
              </div>
              <h2 className="text-3xl font-bold mb-6">
                ¿Cómo prefieres usar Finzen?
              </h2>
            </div>
            <p className="text-gray-300 mb-10 text-xl">
              Estas preferencias nos ayudarán a personalizar tu experiencia en
              la aplicación.
            </p>

            <Hero5
              props={props}
              propsChange={setProps}
              props2={props2}
              propsChange2={setProps2}
              props3={props3}
              propsChange3={setProps3}
              props4={props4}
              propsChange4={setProps4}
            />
          </>
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="w-full bg-[#020817] min-h-screen flex items-center justify-center p-4 -mt-10">
      <div className="w-full max-w-5xl scale-[0.75]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-xl">Paso {currentStep} de 5</div>
          <div className="text-white text-xl">
            {
              [
                "Objetivos financieros",
                "Situación Financiera",
                "Experiencia y Conocimientos",
                "Áreas de Interés",
                "Resumen de perfil",
              ][currentStep - 1]
            }
          </div>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full mb-8">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="bg-[#020817] border border-gray-700 rounded-xl p-8 mb-8">
          {renderStepContent()}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            // La lógica para deshabilitar el botón se maneja dentro de handleBack
            // Si quieres deshabilitarlo solo si no hay historial de navegación,
            // necesitarías una lógica más avanzada o un estado global.
          >
            Volver
          </button>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {currentStep < 5 ? "Siguiente" : "Finalizar"}
          </button>
        </div>
      </div>
    </div>
  );
};