import { CardProps } from "../Types/types";

export function Card({ title, value, subtitle, progress }: CardProps) {
  return (
    <div className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-5 rounded-2xl shadow-lg border border-gray-700 hover:scale-[1.03] transition-transform duration-300">
      <h3 className="text-sm text-gray-400 tracking-wide uppercase">{title}</h3>

      <div className="text-3xl font-semibold text-white mt-1">{value}</div>

      {progress ? (
        <div className="mt-4">
          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-in-out"
              style={{ width: value }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-2">{subtitle}</div>
        </div>
      ) : (
        <div className="text-xs text-gray-400 mt-3">{subtitle}</div>
      )}
    </div>
  );
}
