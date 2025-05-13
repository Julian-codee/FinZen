const goals = [
    {
      nombre: 'Fondo de Emergencia',
      actual: 4500,
      meta: 6000,
    },
    {
      nombre: 'Vacaciones',
      actual: 1200,
      meta: 3000,
    },
  ];
  
  const SavingsProgress = () => {
    return (
      <div className="border border-white/40 rounded-lg p-6 shadow-md text-white">
        <h2 className="text-lg font-semibold mb-1">Progreso de Ahorro</h2>
        <p className="text-gray-400 text-sm mb-4">
          Seguimiento de tus metas de ahorro
        </p>
  
        {goals.map((g, i) => {
          const porcentaje = Math.round((g.actual / g.meta) * 100);
          const restante = g.meta - g.actual;
  
          return (
            <div key={i} className="mb-4">
              <div className="flex justify-between items-center text-sm font-medium mb-1">
                <span>{g.nombre}</span>
                <span>${g.actual} / ${g.meta}</span>
              </div>
              <div className="h-2 rounded-full bg-gray-700 mb-1">
                <div
                  className="h-2 bg-blue-500 rounded-full"
                  style={{ width: `${porcentaje}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                {porcentaje}% completado — ${restante} restantes
              </div>
            </div>
          );
        })}
  
        <a href="#" className="text-sm text-blue-500 hover:underline flex items-center gap-1">
          Ver todas las metas <span>→</span>
        </a>
      </div>
    );
  };
  
  export default SavingsProgress;
  