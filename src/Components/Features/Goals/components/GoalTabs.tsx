interface Props {
    view: "active" | "completed" | "upcoming";
    onChange: (view: "active" | "completed" | "upcoming") => void;
  }
  
  export function GoalTabs({ view, onChange }: Props) {
    return (
      <div className="mb-6 bg-[#1e293b] border border-gray-700 w-fit px-2 py-1 rounded-lg flex space-x-2 shadow-md">
        {(["active", "completed", "upcoming"] as const).map((type) => {
          const isActive = view === type;
          return (
            <button
              key={type}
              onClick={() => onChange(type)}
              aria-pressed={isActive}
              className={`px-4 py-1 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isActive
                  ? "bg-blue-700 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {type === "active"
                ? "Activas"
                : type === "completed"
                ? "Completadas"
                : "Próximas"}
            </button>
          );
        })}
      </div>
    );
  }