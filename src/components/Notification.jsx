import { motion } from 'framer-motion'
import { FiInfo, FiCheckCircle, FiAlertTriangle, FiX } from 'react-icons/fi'
import useStore from '../store/useStore'

const TYPE_CONFIG = {
  info:    { icon: FiInfo,         color: '#00d4ff', bg: 'rgba(0,212,255,0.08)' },
  success: { icon: FiCheckCircle,  color: '#00ff88', bg: 'rgba(0,255,136,0.08)' },
  warning: { icon: FiAlertTriangle,color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
}

export default function Notification({ notification }) {
  const { removeNotification } = useStore()
  const cfg = TYPE_CONFIG[notification.type] || TYPE_CONFIG.info
  const Icon = cfg.icon

  return (
    <motion.div
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      transition={{ type: 'spring', damping: 22 }}
      className="pointer-events-auto w-72 rounded-xl overflow-hidden shadow-window"
      style={{
        background: 'rgba(10,22,40,0.95)',
        backdropFilter: 'blur(16px)',
        border: `1px solid ${cfg.color}30`,
      }}
    >
      <div
        className="h-0.5 w-full"
        style={{ background: cfg.color }}
      />
      <div className="flex items-start gap-3 p-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: cfg.bg }}
        >
          <Icon size={14} style={{ color: cfg.color }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-body text-sm font-semibold text-white/90 truncate">{notification.title}</div>
          <div className="font-body text-xs text-white/50 mt-0.5 leading-relaxed">{notification.message}</div>
        </div>
        <button
          onClick={() => removeNotification(notification.id)}
          className="text-white/30 hover:text-white/70 transition-colors flex-shrink-0"
        >
          <FiX size={14} />
        </button>
      </div>
    </motion.div>
  )
}
