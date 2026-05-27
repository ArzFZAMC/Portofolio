import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import { FiGrid, FiWifi, FiBattery, FiVolume2 } from 'react-icons/fi'

export default function Taskbar({ onOpenApp, apps }) {
  const { windows, focusWindow, minimizeWindow } = useStore()
  const [time, setTime] = useState(new Date())
  const [launcherOpen, setLauncherOpen] = useState(false)

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const formatTime = (d) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
  const formatDate = (d) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  const handleWindowClick = (win) => {
    if (win.isMinimized) minimizeWindow(win.id)
    else focusWindow(win.id)
  }

  return (
    <>
      {/* App Launcher */}
      <AnimatePresence>
        {launcherOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-2 right-2 md:left-4 md:right-auto z-[999] glass neon-border rounded-xl p-4 md:w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-cyber text-xs text-neon/70 tracking-widest mb-3">APP LAUNCHER</div>
            <div className="grid grid-cols-3 md:grid-cols-2 gap-2">
              {apps.map(app => (
                <button
                  key={app.id}
                  onClick={() => { onOpenApp(app.id); setLauncherOpen(false) }}
                  className="flex flex-col md:flex-row items-center md:items-center gap-1 md:gap-2 p-2 rounded-lg bg-white/5 hover:bg-neon/10 border border-transparent hover:border-neon/30 transition-all duration-200 active:scale-95"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${app.accentColor}20`, border: `1px solid ${app.accentColor}40` }}
                  >
                    <app.Icon size={15} style={{ color: app.accentColor }} />
                  </div>
                  <span className="font-body text-[10px] text-white/80 text-center md:text-left truncate">{app.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 font-terminal text-xs text-white/30 text-center">
              MR Codehex OS v2.4.1
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar bar */}
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 h-12 glass border-t border-neon/15 flex items-center px-2 md:px-3 gap-1.5 md:gap-2 z-[900]"
        onClick={(e) => { e.stopPropagation(); setLauncherOpen(false) }}
      >
        {/* Launcher btn */}
        <button
          onClick={(e) => { e.stopPropagation(); setLauncherOpen(v => !v) }}
          className={`w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            launcherOpen
              ? 'bg-neon/20 border border-neon/50'
              : 'taskbar-btn bg-white/5'
          }`}
        >
          <FiGrid size={15} className={launcherOpen ? 'text-neon' : 'text-white/60'} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 flex-shrink-0" />

        {/* Open windows */}
        <div className="flex items-center gap-1 flex-1 overflow-x-auto scrollbar-hide">
          {windows.map(win => (
            <button
              key={win.id}
              onClick={() => handleWindowClick(win)}
              className={`flex items-center gap-1 md:gap-1.5 px-2 h-7 rounded-lg text-[10px] md:text-xs font-body transition-all duration-200 whitespace-nowrap flex-shrink-0 active:scale-95 ${
                win.isMinimized
                  ? 'bg-white/5 text-white/40 border border-transparent'
                  : 'bg-neon/10 text-neon border border-neon/30'
              }`}
            >
              <win.Icon size={11} />
              <span className="hidden sm:inline">{win.title}</span>
              {!win.isMinimized && <div className="w-1 h-1 rounded-full bg-neon" />}
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="hidden md:flex items-center gap-2 text-white/40">
            <FiWifi size={12} />
            <FiVolume2 size={12} />
            <FiBattery size={12} />
          </div>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <div className="text-right">
            <div className="font-terminal text-xs md:text-sm text-neon leading-none">{formatTime(time)}</div>
            <div className="font-terminal text-[9px] text-white/40 leading-none mt-0.5 hidden md:block">{formatDate(time)}</div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
