import { motion } from 'framer-motion'

export default function DesktopIcon({ app, onOpen, delay = 0 }) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4, type: 'spring', damping: 20 }}
      onDoubleClick={onOpen}
      onClick={onOpen}
      className="app-icon flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white/5 transition-all duration-200 w-16 group"
      title={`Open ${app.title}`}
    >
      {/* Icon container */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shadow-icon transition-all duration-200 group-hover:scale-105"
        style={{
          background: `linear-gradient(135deg, ${app.accentColor}22, ${app.accentColor}08)`,
          border: `1px solid ${app.accentColor}40`,
          boxShadow: `0 4px 16px ${app.accentColor}20`,
        }}
      >
        <app.Icon size={22} style={{ color: app.accentColor }} />
      </div>

      {/* Label */}
      <span
        className="font-body text-[10px] text-white/70 text-center leading-tight group-hover:text-white/90 transition-colors"
        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
      >
        {app.title}
      </span>
    </motion.button>
  )
}
