import { motion } from 'framer-motion';

const consejos = [
  "Podrías ahorrar hasta $120 este mes reduciendo compras en línea.",
  "Evita gastos hormiga como cafés diarios para mejorar tus finanzas.",
  "Analiza tus suscripciones mensuales y elimina las que no uses.",
  "Usa efectivo para limitar tus gastos diarios.",
  "Planifica tus compras y evita las decisiones impulsivas.",
  "Revisa tus gastos semanales y ajusta tu presupuesto si es necesario.",
  "Intenta cocinar en casa más seguido para reducir gastos en comida rápida.",
  "Usa una sola tarjeta para tus compras y ten mejor control.",
  "Establece un objetivo de ahorro y hazle seguimiento.",
  "Usa cupones o descuentos cuando compres en línea.",
];

function obtenerConsejoDelDia() {
  const hoy = new Date();
  const indice = hoy.getDate() % consejos.length;
  return consejos[indice];
}

export const DailyAdvice = () => {
  const consejo = obtenerConsejoDelDia();
  
  return (
    <motion.div 
      className="relative bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-[#1e293b] rounded-xl p-6 shadow-xl text-white overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Animated galaxy border effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl opacity-60"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      >
        <div 
          className="absolute inset-0 rounded-xl"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(59, 130, 246, 0.6) 15%, rgba(168, 85, 247, 0.4) 35%, rgba(59, 130, 246, 0.6) 65%, rgba(139, 92, 246, 0.3) 85%, transparent 100%)'
          }}
        />
        <div className="absolute inset-[1px] rounded-xl bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-[#1e293b]"></div>
      </motion.div>
      
      {/* Floating nebula particles */}
      <motion.div 
        className="absolute top-0 right-0 w-32 h-32 bg-blue-400/8 rounded-full blur-3xl"
        animate={{ 
          x: [0, 20, 0], 
          y: [0, -15, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-24 h-24 bg-purple-400/6 rounded-full blur-2xl"
        animate={{ 
          x: [0, -15, 0], 
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Floating star particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 bg-blue-${300 + (i % 2) * 100}/80 rounded-full`}
          style={{
            top: `${20 + (i * 12)}%`,
            left: `${15 + (i * 15)}%`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3 + (i * 0.5),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
      
      {/* Header with enhanced styling */}
      <motion.div 
        className="flex items-center gap-3 mb-4 relative z-10"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <motion.div 
          className="flex items-center justify-center w-8 h-8 bg-blue-400/10 rounded-lg border border-blue-400/20"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.span 
            className="text-blue-400 text-lg"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ✨
          </motion.span>
        </motion.div>
        <h3 className="text-sm font-semibold text-blue-400 tracking-wide uppercase">
          Asistente IA
        </h3>
        <motion.div 
          className="flex-1 h-px bg-gradient-to-r from-blue-400/20 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        />
      </motion.div>
      
      {/* Main content with improved typography */}
      <motion.div 
        className="relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.div 
          className="mb-2"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <span className="inline-block text-xs font-medium text-blue-300/80 bg-blue-400/10 px-2 py-1 rounded-md border border-blue-400/20">
            Consejo del día
          </span>
        </motion.div>
        <motion.p 
          className="text-white/90 leading-relaxed font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {consejo}
        </motion.p>
      </motion.div>
      
      {/* Animated bottom accent */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)'
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Hover sparkles */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${30 + (i * 20)}%`,
              right: `${20 + (i * 15)}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};