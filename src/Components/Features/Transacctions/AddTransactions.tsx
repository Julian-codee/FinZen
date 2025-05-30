// src/components/AgregarTransaccion.tsx
import React, { useState, useEffect } from 'react';

export const AddTransaction: React.FC = () => {
  const [monto, setMonto] = useState<string>('0'); // Valor interno del monto
  const [displayMonto, setDisplayMonto] = useState<string>('0,00'); // Monto a mostrar formateado
  const [tipoTransaccion, setTipoTransaccion] = useState<'gasto' | 'ingreso'>('gasto');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [fecha, setFecha] = useState<string>(new Date().toISOString().split('T')[0]); // Fecha actual por defecto (YYYY-MM-DD)
  const [nota, setNota] = useState<string>(''); // Nota de la transacción
  

  // useEffect para actualizar el displayMonto cada vez que monto cambie
  useEffect(() => {
    const cleanMonto = monto.replace(/\./g, '').replace(/,/g, '');
    const formatter = new Intl.NumberFormat('es-CO', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true
    });

    const parsedMonto = parseFloat(cleanMonto.replace(',', '.'));

    if (!isNaN(parsedMonto)) {
      setDisplayMonto(formatter.format(parsedMonto));
    } else {
      setDisplayMonto('0,00');
    }

    if (monto === '0,') {
      setDisplayMonto('0,');
    } else if (monto.startsWith('0') && monto.length > 1 && !monto.startsWith('0,')) {
      setDisplayMonto(formatter.format(parseFloat(cleanMonto.substring(1).replace(',', '.'))));
    } else if (monto.includes(',')) {
      const [intPart, decPart] = monto.split(',');
      let formattedInt = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      let displayedDecPart = decPart;
      if (decPart === undefined || decPart === '') {
        displayedDecPart = '';
      } else if (decPart.length === 1) {
        displayedDecPart += '0';
      }
      setDisplayMonto(`${formattedInt},${displayedDecPart}`);
    }
  }, [monto]);

  const handleMontoClick = (valor: string) => {
    setMonto(prevMonto => {
      let currentInput = prevMonto;

      if (valor === 'del') {
        if (currentInput.length === 1 || currentInput === '0') {
          return '0';
        }
        if (currentInput.endsWith(',') && currentInput.length === 2 && currentInput.startsWith('0')) {
          return '0';
        }
        return currentInput.slice(0, -1);
      }

      if (valor === ',') {
        if (currentInput.includes(',')) {
          return currentInput;
        }
        if (currentInput === '0') {
          return '0,';
        }
        return currentInput + ',';
      }

      if (currentInput === '0' && valor !== ',') {
        return valor;
      }

      if (currentInput.includes(',')) {
        const parts = currentInput.split(',');
        if (parts[1] && parts[1].length >= 2) {
          return currentInput;
        }
      }
      return currentInput + valor;
    });
  };

  const handleGuardarTransaccion = () => {
    const transaccion = {
      monto: parseFloat(monto.replace(',', '.')),
      tipo: tipoTransaccion,
      categoria: categoriaSeleccionada,
      fecha: fecha,
      nota: nota,
    };
    console.log('Transacción a guardar:', transaccion);
    // Lógica para enviar a API o almacenar
  };

  const categorias = [
    { nombre: 'Comida', icono: '🍔' },
    { nombre: 'Supermercado', icono: '🛒' },
    { nombre: 'Transporte', icono: '🚌' },
    { nombre: 'Entretenimiento', icono: '🎬' },
    { nombre: 'Servicios', icono: '💡' },
    { nombre: 'Hogar', icono: '🏠' },
    { nombre: 'Compras', icono: '🛍️' },
    { nombre: 'Salud', icono: '🏥' },
    { nombre: 'Restaurante', icono: '🍽️' },
    { nombre: 'Café', icono: '☕' },
    { nombre: 'Internet', icono: '🌐' },
    { nombre: 'Teléfono', icono: '📱' },
    { nombre: 'Educación', icono: '📚' },
    { nombre: 'Ocio', icono: '🎲' },
    { nombre: 'Música', icono: '🎵' },
    { nombre: 'Otros', icono: '➕' },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center py-4 px-2"> {/* Reducido p-4 a py-4 px-2 */}
      <div className="w-[95%] sm:w-[80%] md:w-[60%] lg:w-[40%] bg-neutral-900 rounded-lg shadow-lg p-4"> {/* Reducido p-6 a p-4 */}
        <h1 className="text-xl font-bold mb-1">Agregar Transacción</h1> {/* Reducido a text-xl, mb-1 */}
        <p className="text-gray-400 text-sm mb-4">Registra tus gastos e ingresos de manera rápida y sencilla.</p> {/* Reducido a text-sm, mb-4 */}

        <div className="flex bg-neutral-800 rounded-md p-0.5 mb-4"> {/* Reducido p-1 a p-0.5, rounded-lg a rounded-md, mb-6 a mb-4 */}
          <button
            className={`flex-1 py-2 text-base rounded-md font-semibold transition-colors duration-200 ${tipoTransaccion === 'gasto' ? 'bg-rose-500 text-white' : 'text-gray-400 hover:bg-neutral-700'}`} 
            onClick={() => setTipoTransaccion('gasto')}
          >
            💸 Gasto
          </button>
          <button
            className={`flex-1 py-2 text-base rounded-md font-semibold transition-colors duration-200 ${tipoTransaccion === 'ingreso' ? 'bg-green-600 text-white' : 'text-gray-400 hover:bg-neutral-700'}`} 
            onClick={() => setTipoTransaccion('ingreso')}
          >
            📈 Ingreso
          </button>
        </div>

        <div className="mb-4"> {/* Reducido mb-6 a mb-4 */}
          <h2 className="text-lg font-semibold mb-2">Monto</h2> {/* Reducido text-xl a text-lg, mb-3 a mb-2 */}
          <div className="flex justify-end mb-3"> {/* Reducido mb-4 a mb-3 */}
            <span className="text-3xl font-bold text-violet-500">$ {displayMonto}</span> {/* Reducido text-4xl a text-3xl */}
          </div>

          <div className="grid grid-cols-4 gap-1.5 mb-3"> {/* Reducido gap-2 a gap-1.5, mb-4 a mb-3 */}
            {[, , , , , , ].map((val) => (
              <button
                key={val}
                className="col-span-1 bg-neutral-800 hover:bg-neutral-700 text-gray-300 py-2.5 rounded-md text-base font-medium" 
              >
                ${val}
              </button>
            ))}
            <button
              className="col-span-1 bg-neutral-800 hover:bg-neutral-700 text-gray-300 py-2.5 rounded-md text-base font-medium" 
            >
              $1000
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5"> {/* Reducido gap-2 a gap-1.5 */}
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'].map((key) => (
              <button
                key={key}
                className={`py-3 rounded-md text-xl font-bold ${key === 'del' ? 'bg-neutral-800 hover:bg-neutral-700 text-red-400' : 'bg-neutral-700 hover:bg-neutral-600'}`} 
                onClick={() => handleMontoClick(key === 'del' ? 'del' : key)}
              >
                {key === 'del' ? '⌫' : key}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4"> {/* Reducido mb-6 a mb-4 */}
          <h2 className="text-lg font-semibold mb-2">Categoría</h2> {/* Reducido text-xl a text-lg, mb-3 a mb-2 */}
          <div className="grid grid-cols-4 gap-1.5"> {/* Reducido gap-2 a gap-1.5 */}
            {categorias.map((categoria) => (
              <button
                key={categoria.nombre}
                className={`flex flex-col items-center justify-center p-2.5 rounded-md transition-colors duration-200
                  ${categoriaSeleccionada === categoria.nombre ? 'bg-violet-600' : 'bg-neutral-800 hover:bg-neutral-700'}
                `} 
                onClick={() => setCategoriaSeleccionada(categoria.nombre)}
              >
                <span className="text-xl mb-0.5">{categoria.icono}</span> {/* Reducido text-2xl a text-xl, mb-1 a mb-0.5 */}
                <span className="text-xs text-gray-300">{categoria.nombre}</span> {/* Reducido text-sm a text-xs */}
              </button>
            ))}
          </div>
        </div>

        {/* Campo de Fecha */}
        <div className="mb-4"> {/* Reducido mb-6 a mb-4 */}
          <h2 className="text-lg font-semibold mb-2">Fecha</h2> {/* Reducido text-xl a text-lg, mb-3 a mb-2 */}
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="w-full p-2.5 rounded-md bg-neutral-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500" 
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* Campo de Nota */}
        <div className="mb-6"> {/* Reducido mb-8 a mb-6 */}
          <h2 className="text-lg font-semibold mb-2">Nota (Opcional)</h2> {/* Reducido text-xl a text-lg, mb-3 a mb-2 */}
          <textarea
            value={nota}
            onChange={(e) => setNota(e.target.value)}
            placeholder="Añadir una nota sobre esta transacción..."
            rows={2} // Reducido de 3 a 2 filas para hacerlo más compacto
            className="w-full p-2.5 rounded-md bg-neutral-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y" 
          ></textarea>
        </div>

        {/* Botón de Guardar Transacción */}
        <button
          onClick={handleGuardarTransaccion}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-md text-lg transition-colors duration-200" 
        >
          Guardar Transacción
        </button>
      </div>
    </div>
  );
};