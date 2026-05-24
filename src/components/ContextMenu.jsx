import { motion } from 'framer-motion'

export default function ContextMenu({ x, y, items, onAction, onClose }) {
  // Prevent overflow
  const safeX = Math.min(x, window.innerWidth - 200)
  const safeY = Math.min(y, window.innerHeight - 200)

  return (
    <>
      <div className="fixed inset-0 z-[998]" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.12 }}
        style={{ left: safeX, top: safeY }}
        className="fixed z-[999] w-48 rounded-xl overflow-hidden shadow-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass neon-border rounded-xl overflow-hidden py-1">
          {items.map((item, i) => {
            if (item.divider) {
              return <div key={i} className="my-1 border-t border-white/5 mx-2" />
            }
            return (
              <button
                key={i}
                onClick={() => onAction(item.action)}
                className="w-full text-left px-3 py-2 font-body text-sm text-white/70 hover:text-white hover:bg-neon/10 transition-all duration-150 flex items-center gap-2"
              >
                <div className="w-1 h-1 rounded-full bg-neon/40" />
                {item.label}
              </button>
            )
          })}
        </div>
      </motion.div>
    </>
  )
}
