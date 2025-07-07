import { Eye, EyeOff } from 'lucide-react';

interface BalanceToggleProps {
  visible: boolean;
  toggle: () => void;
}

const BalanceToggle = ({ visible, toggle }: BalanceToggleProps) => (
  <button onClick={toggle} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white">
    {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    {visible ? 'Ocultar saldos' : 'Mostrar saldos'}
  </button>
);

export default BalanceToggle;