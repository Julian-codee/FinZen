"use client";
import { useState } from "react";
import { Shell, Wallet } from "lucide-react";

export const Hero = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, boolean>
  >({});
  const [otherObjective, setOtherObjective] = useState("");

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
    {
      id: "improve_education",
      title: "Mejorar educación financiera",
      description: "Aprender más sobre finanzas personales",
    },
    { id: "other", title: "Otro objetivo", description: "" },
  ];

  /**
   * Creamos una segunda constante para que no se combine con la información anterior del paso 1 **/

  /* Paso 2*/


  const handleCheckboxChange = (id: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
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
            <p className="text-gray-300 mb-8">
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
                      className="w-6 h-6 border border-blue-500 rounded flex-shrink-0 mr-3 mt-1 flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: selectedOptions[goal.id]
                          ? "#3b82f6"
                          : "transparent",
                      }}
                      onClick={() => handleCheckboxChange(goal.id)}
                    >
                      {/* Check eliminado */}
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
            <p className="text-gray-300">Esta información nos ayudará a ofrecerte recomendaciones más precisas. Todos los datos son confidenciales.</p>

            <div>

              

            </div>
          </>
        );
      case 3:
        return (
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Experiencia financiera</h2>
            <p className="text-gray-300">Contenido del paso 3...</p>
          </div>
        );
      case 4:
        return (
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">
              Preferencias de inversión
            </h2>
            <p className="text-gray-300">Contenido del paso 4...</p>
          </div>
        );
      case 5:
        return (
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-6">Resumen de perfil</h2>
            <p className="text-gray-300">Contenido del paso 5...</p>
          </div>
        );
      default:
        return null;
    }
  };

  const progress = (currentStep / 5) * 100;

  return (
    <div className="w-full bg-[#020817] min-h-screen flex items-center justify-center p-4 -mt-14">
      <div className="w-full max-w-5xl scale-[0.7]">
        <div className="flex justify-between items-center mb-4">
          <div className="text-white text-xl">Paso {currentStep} de 5</div>
          <div className="text-white text-xl">
            {currentStep === 1
              ? "Objetivos financieros"
              : currentStep === 2
              ? "Situación Financiera"
              : currentStep === 3
              ? "Experiencia y Conocimientos"
              : currentStep === 4
              ? "Áreas de Interes"
              : "Resumen"}
          </div>
        </div>
        <div className="w-full h-2 bg-gray-800 rounded-full mb-8">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-xl p-8 mb-8">
          {renderStepContent()}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            className="flex items-center px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
            disabled={currentStep === 1}
          >
            Volver
          </button>

          <button
            onClick={handleNext}
            className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};
