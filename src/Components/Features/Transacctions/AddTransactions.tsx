// src/components/AgregarTransaccion.tsx
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  CalendarDays,
  ShoppingCart,
  Bus,
  Film,
  Lightbulb,
  Home,
  ShoppingBag,
  Hospital,
  Utensils,
  Coffee,
  Globe,
  Smartphone,
  BookOpen,
  Gamepad2,
  Music,
  Plus,
  Delete,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { Sidebar } from '../../Ui/UiDashBoard/SideBar';

export const AddTransaction: React.FC = () => {
  const [monto, setMonto] = useState<string>('0');
  const [displayMonto, setDisplayMonto] = useState<string>('0,00');
  const [tipoTransaccion, setTipoTransaccion] = useState<'gasto' | 'ingreso'>('gasto');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);
  const [nota, setNota] = useState<string>('');

  //SideBar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado del sidebar gestionado aquí

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  //Calendario
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date()); // Inicializado con la fecha actual

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleSelect = (selectedDay: Date | undefined) => {
    if (selectedDay) {
      setSelectedDate(selectedDay);
      setShowCalendar(false);
    }
  };

  const formatDate = () => {
    if (selectedDate) {
      return format(selectedDate, 'd MMMM', { locale: es });
    }
    return 'Selecciona una fecha';
  };

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
      fecha: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
      nota: nota,
    };
    console.log('Transacción a guardar:', transaccion);
    setMonto('0');
    setTipoTransaccion('gasto');
    setCategoriaSeleccionada(null);
    setSelectedDate(new Date());
    setNota('');
  };

  const categorias = [
    { nombre: 'Comida', icono: <Utensils size={18} /> },
    { nombre: 'Supermercado', icono: <ShoppingCart size={18} /> },
    { nombre: 'Transporte', icono: <Bus size={18} /> },
    { nombre: 'Entretenimiento', icono: <Film size={18} /> },
    { nombre: 'Servicios', icono: <Lightbulb size={18} /> },
    { nombre: 'Hogar', icono: <Home size={18} /> },
    { nombre: 'Compras', icono: <ShoppingBag size={18} /> },
    { nombre: 'Salud', icono: <Hospital size={18} /> },
    { nombre: 'Restaurante', icono: <Utensils size={18} /> },
    { nombre: 'Café', icono: <Coffee size={18} /> },
    { nombre: 'Internet', icono: <Globe size={18} /> },
    { nombre: 'Teléfono', icono: <Smartphone size={18} /> },
    { nombre: 'Educación', icono: <BookOpen size={18} /> },
    { nombre: 'Ocio', icono: <Gamepad2 size={18} /> },
    { nombre: 'Música', icono: <Music size={18} /> },
    { nombre: 'Otros', icono: <Plus size={18} /> },
  ];

  // Colores base para el borde de neón
  const coloresNeon = [
    'border-[#f9c94b]/60 ',
    'border-[#60f410]/60 ',
    'border-[#1055f4]/60 ',
    'border-purple-500/60 ',
    'border-yellow-500/60 ',
    'border-teal-500/60' ,
    'border-indigo-500/60' ,
    'border-pink-500/60 ',
    'border-orange-500/60 ',
    'border-cyan-500/60' ,
    'border-lime-500/60 ',
    'border-fuchsia-500/60 ',
    'border-rose-500/60 ',
    'border-emeral-500/60 ',
    'border-amber-500/60 ',
    'border-violet-500/60 ',
  ];

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="min-h-screen bg-[#020817] text-white flex flex-col items-center justify-center py-4 px-2">
        <div className="w-[95%] sm:w-[80%]b border border-white/40 md:w-[60%] lg:w-[40%] bg-[#020817] rounded-lg shadow-lg p-4">
          <h1 className="text-xl font-bold mb-1">Agregar Transacción</h1>
          <p className="text-gray-400 text-sm mb-4">Registra tus gastos e ingresos de manera rápida y sencilla.</p>

          <div className="flex rounded-md p-0.5 mb-4">
            <button
              className={`flex-1 py-5 text-base border m-2 border-white/40 rounded-md font-semibold transition-colors duration-200 ${tipoTransaccion === 'gasto' ? 'bg-rose-500 text-white' : 'text-red-500 hover:bg-neutral-700'}`}
              onClick={() => setTipoTransaccion('gasto')}
            >
              <TrendingDown className="inline-block mr-1" size={18} /> Gasto
            </button>
            <button
              className={`flex-1 py-2 text-base border m-2 border-white/40 rounded-md font-semibold transition-colors duration-200 ${tipoTransaccion === 'ingreso' ? 'bg-green-600 text-white' : 'text-green-600 hover:bg-neutral-700'}`}
              onClick={() => setTipoTransaccion('ingreso')}
            >
              <TrendingUp className="inline-block mr-1" size={18} /> Ingreso
            </button>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Monto</h2>
            <div className="flex justify-end mb-3">
              <span className="text-3xl font-bold text-white">$ {displayMonto}</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {['10,000','30,000' ,'50,000' ,'60,000' ,'80,000' ,'100,000' ,'300,000','500,000' ].map((val) => (
                <button
                  key={val}
                  className="col-span-1 bg-neutral-800 hover:bg-neutral-700 text-gray-300 py-2.5 rounded-md text-base font-medium"
                >
                  ${val}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', ',', '0', 'del'].map((key) => (
                <button
                  key={key}
                  className={`py-3 border border-white/40 rounded-md text-xl font-bold ${key === 'del' ? 'bg-[#020817] hover:bg-neutral-700 text-red-400' : 'bg-[#020817] hover:bg-neutral-600'}`}
                  onClick={() => handleMontoClick(key === 'del' ? 'del' : key)}
                >
                  {key === 'del' ? <Delete size={25} className='ml-17' /> : key}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Categoría</h2>
            <div className="grid grid-cols-4 gap-1.5">
              {categorias.map((categoria, index) => {
                // Obtiene las clases de borde y sombra del array de colores de neón
                const neonClasses = coloresNeon[index % coloresNeon.length];

                return (
                  <button
                    key={categoria.nombre}
                    className={`flex flex-col border-2 items-center justify-center p-2.5 rounded-md transition-all duration-300
                      ${categoriaSeleccionada === categoria.nombre 
                        ? 'bg-gradient-to-r from-indigo-500 to-blue-500 border-indigo-500 transition-colors' // Estilo de selección
                        : `bg-[#020817] ${neonClasses} shadow-md hover:shadow-lg` // Estilo de neón
                      }
                    `}
                    onClick={() => setCategoriaSeleccionada(categoria.nombre)}
                  >
                    <span className="mb-0.5">{categoria.icono}</span>
                    <span className="text-xs text-gray-300">{categoria.nombre}</span>
                  </button>
                );
              })}
            </div>
          </div>


            {/*Calendario*/}
          <div className="relative inline-block w-full mb-6">
            <button
              onClick={toggleCalendar}
              className="inline-flex items-center gap-2 w-full h-12 bg-[#020817] border border-white/40 text-gray-300 text-sm rounded-md px-4 py-2 focus:ring-2 focus:ring-violet-500"
            >
              <CalendarDays className="w-4 h-4 text-gray-400" />
              <span>{formatDate()}</span>
            </button>

            {showCalendar && (
              <div className="absolute z-10 bottom-full mb-2 bg-[#0F1525] border border-gray-700 rounded-md shadow-lg p-4">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  numberOfMonths={1}
                  locale={es}
                  modifiersClassNames={{
                    selected: 'bg-blue-600 text-white',
                    today: 'border border-white',
                  }}
                />
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Nota (Opcional)</h2>
            <textarea
              value={nota}
              onChange={(e) => setNota(e.target.value)}
              placeholder="Añadir una nota sobre esta transacción..."
              rows={2}
              className="w-full p-2.5 rounded-md bg-[#020817] border border-white/40 text-gray-300 focus:outline-none focus:ring-2 focus:ring-violet-500 resize-y"
            ></textarea>
          </div>

          <button
            onClick={handleGuardarTransaccion}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-3 rounded-md text-lg transition-colors duration-200"
          >
            Guardar Transacción
          </button>
        </div>
      </div>
    </>
  );
};