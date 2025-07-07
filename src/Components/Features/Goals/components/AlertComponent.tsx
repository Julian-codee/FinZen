import { X, CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { Alert } from "../Types/types";

export function AlertComponent({ alert, onClose }: { alert: Alert; onClose: (id: string) => void }) {
  const getStyles = () => {
    switch (alert.type) {
      case 'success':
        return { bg: 'bg-green-900/20', icon: CheckCircle, color: 'text-green-300' };
      case 'error':
        return { bg: 'bg-red-900/20', icon: XCircle, color: 'text-red-300' };
      case 'warning':
        return { bg: 'bg-yellow-900/20', icon: AlertCircle, color: 'text-yellow-300' };
      case 'info':
        return { bg: 'bg-blue-900/20', icon: Info, color: 'text-blue-300' };
      default:
        return { bg: 'bg-gray-800', icon: Info, color: 'text-white' };
    }
  };

  const styles = getStyles();
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} border p-4 rounded-lg shadow-lg backdrop-blur-sm`}>
      <div className="flex gap-3 items-start">
        <Icon className={`w-5 h-5 ${styles.color}`} />
        <div className="flex-1">
          <h4 className={`font-semibold ${styles.color}`}>{alert.title}</h4>
          <p className="text-sm text-white/80">{alert.message}</p>
        </div>
        <button onClick={() => onClose(alert.id)} className="text-gray-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}