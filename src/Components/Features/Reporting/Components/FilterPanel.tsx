import React from 'react';
import DropdownFilter from './DropDownFilter';

const FilterPanel: React.FC = () => {
  return (
    <div className="mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 bg-amber-200">
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="w-full lg:w-1/3">
            <h3 className="text-sm mb-2">Cuenta</h3>
            <DropdownFilter options={['Todas las cuentas']} />
          </div>
          <div className="w-full lg:w-1/3">
            <h3 className="text-sm mb-2">Categoría</h3>
            <DropdownFilter options={['Todas las categorías']} />
          </div>
          <div className="w-full lg:w-1/3">
            <h3 className="text-sm mb-2">Tipo</h3>
            <DropdownFilter options={['Todos los tipos']} />
          </div>
        </div>
        <div className="mt-4 lg:mt-0">
          <span className="text-sm">Filtros Aplicados</span>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;