import { useRef } from 'react'
import { motion } from 'framer-motion'
import Draggable from 'react-draggable'
import { FiX, FiMinus, FiMaximize2, FiMinimize2 } from 'react-icons/fi'

// Detect mobile — windows are fullscreen & non-draggable on small screens
const isMobile = () =>
  typeof window !== 'undefined' && window.innerWidth < 768

export default function Window({ win, onClose, onMinimize, onMaximize, onFocus, children }) {
  const nodeRef = useRef(null)
  const mobile  = isMobile()
  const isMax   = win.isMaximized || mobile   // always fullscreen on mobile

  const w = win.defaultSize?.w || 700
  const h = win.defaultSize?.h || 500

  const vw = typeof window !== 'undefined' ? window.innerWidth  : 1280
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const boundsRight  = Math.max(0, vw - w)
  const boundsBottom = Math.max(0, vh - h - 48)

  const windowStyle = mobile
    ? {
        position: 'fixed',
        zIndex: win.zIndex,
        inset: 0,
        bottom: 48,            // leave taskbar visible
        width: '100%',
        height: 'calc(100% - 48px)',
      }
    : {
        position: 'absolute',
        zIndex: win.zIndex,
        width:  isMax ? '100%'               : w,
        height: isMax ? 'calc(100% - 48px)'  : h,
        left:   isMax ? 0 : undefined,
        top:    isMax ? 0 : undefined,
      }

  const inner = (
    <motion.div
      ref={nodeRef}
      style={windowStyle}
      initial={{ scale: mobile ? 1 : 0.88, opacity: 0, y: mobile ? 20 : 16 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{   scale: mobile ? 1 : 0.88, opacity: 0, y: mobile ? 20 : 16 }}
      transition={{ type: 'spring', damping: 26, stiffness: 280 }}
      onMouseDown={onFocus}
      onTouchStart={onFocus}
      className="flex flex-col rounded-xl overflow-hidden shadow-window"
    >
      {/* Glass background */}
      <div
        className="absolute inset-0 glass neon-border rounded-xl pointer-events-none"
        style={{ zIndex: -1 }}
      />

      {/* ── Window Header ── */}
      <div
        className={`drag-handle flex items-center justify-between px-4 py-2.5 border-b border-white/5 flex-shrink-0 relative ${mobile ? '' : ''}`}
        style={{ background: 'rgba(5,10,20,0.85)', cursor: mobile ? 'default' : 'grab' }}
      >
        {/* Left — traffic lights */}
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
          {!mobile && (
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
          )}
        </div>

        {/* Center — title */}
        <div className="no-drag flex items-center gap-2 absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <win.Icon size={12} style={{ color: win.accentColor }} />
          <span className="font-terminal text-xs text-white/60 tracking-wider">{win.title}</span>
        </div>

        {/* Right — Close button (always visible, especially on mobile) */}
        <div className="no-drag flex items-center gap-2" style={{ cursor: 'default' }}>
          {!mobile && (
            <div className="flex items-center gap-1 mr-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="font-terminal text-[9px] text-white/30">ACTIVE</span>
            </div>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onClose() }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-terminal text-xs text-white/50 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-200 active:scale-95"
            title="Close"
          >
            <FiX size={12} />
            <span>Close</span>
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div
        className="no-drag flex-1 overflow-auto"
        style={{ minHeight: 0, cursor: 'default', WebkitOverflowScrolling: 'touch' }}
      >
        {children}
      </div>
    </motion.div>
  )

  // On mobile: no dragging
  if (mobile) return inner

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".drag-handle"
      cancel=".no-drag"
      disabled={isMax}
      defaultPosition={win.defaultPos || { x: 100, y: 60 }}
      bounds={{ left: 0, top: 0, right: boundsRight, bottom: boundsBottom }}
    >
      {inner}
    </Draggable>
  )
}
