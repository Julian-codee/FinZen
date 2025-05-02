import React from 'react';

interface DateFilterProps {
  dateRange: string;
  onChange: (value: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ dateRange, onChange }) => {
  return (
    <div className="inline-flex items-center justify-center border border-gray-700 rounded-md px-4 py-2">
      <svg className="w-5 h-5 mr-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
      </svg>
      <span>{dateRange}</span>
    </div>
  );
};

export default DateFilter;