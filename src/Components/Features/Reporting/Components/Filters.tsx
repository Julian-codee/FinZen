const Filters = () => {
    const labels = ['Cuenta', 'Categoría', 'Tipo'];
  
    return (
      <div className="flex gap-4 mb-6">
        {labels.map((label) => (
          <div key={label} className="w-1/3">
            <h3 className="text-xs uppercase text-white-400 mb-2">{label}</h3>
            <div className="relative">
              <select className="appearance-none w-full  border border-white/40 text-sm text-white py-2.5 px-4 pr-10 rounded-md">
                <option>{`Todas las ${label.toLowerCase()}s`}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  export default Filters;
  