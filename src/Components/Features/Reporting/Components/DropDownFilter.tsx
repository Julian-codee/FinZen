import React, { useState } from 'react';

interface DropdownFilterProps {
  options: string[];
  defaultOption?: string;
}

const DropdownFilter: React.FC<DropdownFilterProps> = ({ options, defaultOption }) => {
  const [selectedOption, setSelectedOption] = useState(defaultOption || options[0]);

  return (
    <div className="relative w-full">
      <select
        className="appearance-none w-full bg-[#0D1119] border border-gray-700 text-white py-2 px-4 pr-8 rounded-md leading-tight focus:outline-none"
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default DropdownFilter;