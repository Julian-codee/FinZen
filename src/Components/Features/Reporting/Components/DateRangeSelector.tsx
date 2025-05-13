import { useState } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const DateRangeSelector = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [range, setRange] = useState<DateRange>({
    from: new Date('2025-02-01'),
    to: new Date('2025-04-30'),
  });

  const toggleCalendar = () => setShowCalendar(!showCalendar);

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange?.from && selectedRange?.to) {
      setRange(selectedRange);
      setShowCalendar(false);
    }
  };

  const formatRange = () => {
    if (range.from && range.to) {
      return `${format(range.from, 'd MMMM yyyy', { locale: es })} - ${format(range.to, 'd MMMM yyyy', { locale: es })}`;
    }
    return 'Selecciona un rango';
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleCalendar}
        className="inline-flex items-center gap-2 bg-[#0F1525] border border-gray-700 text-gray-300 text-sm rounded-md px-4 py-2"
      >
        <CalendarDays className="w-4 h-4 text-gray-400" />
        <span>{formatRange()}</span>
      </button>

      {showCalendar && (
        <div className="absolute z-10 mt-2 bg-[#0F1525] border border-gray-700 rounded-md shadow-lg p-4">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={2}
            locale={es}
            modifiersClassNames={{
              selected: 'bg-blue-600 text-white',
              range_middle: 'bg-blue-400 text-white',
              today: 'border border-white',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;

