import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Draggable from 'react-draggable'
import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'

export default function Window({ win, onClose, onMinimize, onMaximize, onFocus, children }) {
  const nodeRef = useRef(null)
  const isMax = win.isMaximized

  const w = win.defaultSize?.w || 700
  const h = win.defaultSize?.h || 500

  const vw = typeof window !== 'undefined' ? window.innerWidth  : 1280
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const boundsRight  = Math.max(0, vw - w)
  const boundsBottom = Math.max(0, vh - h - 48)

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      cancel=".no-drag"          /* ← kunci fix: tombol pakai class ini */
      disabled={isMax}
      defaultPosition={win.defaultPos || { x: 100, y: 60 }}
      bounds={{ left: 0, top: 0, right: boundsRight, bottom: boundsBottom }}
    >
      <motion.div
        ref={nodeRef}
        style={{
          position: 'absolute',
          zIndex: win.zIndex,
          width:  isMax ? '100%'               : w,
          height: isMax ? 'calc(100% - 48px)'  : h,
          left:   isMax ? 0 : undefined,
          top:    isMax ? 0 : undefined,
        }}
        initial={{ scale: 0.88, opacity: 0, y: 16 }}
        animate={{ scale: 1,    opacity: 1, y: 0  }}
        exit={{    scale: 0.88, opacity: 0, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 280 }}
        onMouseDown={onFocus}
        className="flex flex-col rounded-xl overflow-hidden shadow-window"
      >
        {/* Glass background */}
        <div className="absolute inset-0 glass neon-border rounded-xl pointer-events-none" style={{ zIndex: -1 }} />

        {/* Window Header — seluruh area bisa di-drag KECUALI tombol (.no-drag) */}
        <div
          className="drag-handle flex items-center justify-between px-4 py-2.5 border-b border-white/5 flex-shrink-0 relative"
          style={{ background: 'rgba(5,10,20,0.7)', cursor: 'grab' }}
        >
          {/* Traffic lights — no-drag supaya klik tidak ditangkap draggable */}
          <div className="no-drag flex items-center gap-1.5" style={{ cursor: 'default' }}>
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="w-3.5 h-3.5 rounded-full bg-red-500/80 hover:bg-red-400 transition-colors flex items-center justify-center group"
              title="Close"
            >
              <FiX size={8} className="opacity-0 group-hover:opacity-100 text-red-900" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize() }}
              className="w-3.5 h-3.5 rounded-full bg-yellow-400/80 hover:bg-yellow-300 transition-colors flex items-center justify-center group"
              title="Minimize"
            >
              <FiMinus size={8} className="opacity-0 group-hover:opacity-100 text-yellow-900" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onMaximize() }}
              className="w-3.5 h-3.5 rounded-full bg-green-500/80 hover:bg-green-400 transition-colors flex items-center justify-center group"
              title={isMax ? 'Restore' : 'Maximize'}
            >
              {isMax
                ? <FiMinimize2 size={8} className="opacity-0 group-hover:opacity-100 text-green-900" />
                : <FiMaximize2 size={8} className="opacity-0 group-hover:opacity-100 text-green-900" />
              }
            </button>
          </div>

          {/* Window title (center) */}
          <div className="no-drag flex items-center gap-2 absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <win.Icon size={12} style={{ color: win.accentColor }} />
            <span className="font-terminal text-xs text-white/60 tracking-wider">{win.title}</span>
          </div>

          {/* Right — visible close button */}
          <div className="no-drag flex items-center gap-2" style={{ cursor: 'default' }}>
            <div className="flex items-center gap-1 mr-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-terminal text-[9px] text-white/30">ACTIVE</span>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onClose() }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-terminal text-xs text-white/50 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-200"
              title="Close Window"
            >
              <FiX size={12} />
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Window Content */}
        <div className="no-drag flex-1 overflow-auto" style={{ minHeight: 0, cursor: 'default' }}>
          {children}
        </div>
      </motion.div>
    </Draggable>
  )
}
