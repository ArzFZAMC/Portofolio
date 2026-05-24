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
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const handleWindowClick = (win) => {
    if (win.isMinimized) {
      minimizeWindow(win.id)
    } else {
      focusWindow(win.id)
    }
  }

  return (
    <>
      {/* App Launcher overlay */}
      <AnimatePresence>
        {launcherOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-14 left-4 z-[999] glass neon-border rounded-xl p-4 w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="font-cyber text-xs text-neon/70 tracking-widest mb-3">APP LAUNCHER</div>
            <div className="grid grid-cols-2 gap-2">
              {apps.map(app => (
                <button
                  key={app.id}
                  onClick={() => { onOpenApp(app.id); setLauncherOpen(false) }}
                  className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 hover:bg-neon/10 border border-transparent hover:border-neon/30 transition-all duration-200 text-left"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${app.accentColor}20`, border: `1px solid ${app.accentColor}40` }}
                  >
                    <app.Icon size={15} style={{ color: app.accentColor }} />
                  </div>
                  <span className="font-body text-xs text-white/80 truncate">{app.title}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-white/5 font-terminal text-xs text-white/30 text-center">
              MR Codehex OS v2.4.1
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <motion.div
        initial={{ y: 60 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', damping: 20, delay: 0.1 }}
        className="absolute bottom-0 left-0 right-0 h-12 glass border-t border-neon/15 flex items-center px-3 gap-2 z-[900]"
        onClick={(e) => { e.stopPropagation(); setLauncherOpen(false) }}
      >
        {/* Launcher button */}
        <button
          onClick={(e) => { e.stopPropagation(); setLauncherOpen(v => !v) }}
          className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
            launcherOpen
              ? 'bg-neon/20 border border-neon/50'
              : 'taskbar-btn bg-white/5'
          }`}
          title="App Launcher"
        >
          <FiGrid size={16} className={launcherOpen ? 'text-neon' : 'text-white/60'} />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-white/10 flex-shrink-0" />

        {/* Open windows */}
        <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
          {windows.map(win => (
            <button
              key={win.id}
              onClick={() => handleWindowClick(win)}
              className={`flex items-center gap-1.5 px-2.5 h-8 rounded-lg text-xs font-body transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                win.isMinimized
                  ? 'bg-white/5 text-white/40 border border-transparent'
                  : 'bg-neon/10 text-neon border border-neon/30'
              }`}
            >
              <win.Icon size={12} />
              <span>{win.title}</span>
              {!win.isMinimized && (
                <div className="w-1 h-1 rounded-full bg-neon ml-0.5" />
              )}
            </button>
          ))}
        </div>

        {/* System tray */}
        <div className="flex items-center gap-3 flex-shrink-0 ml-2">
          <div className="flex items-center gap-2 text-white/40">
            <FiWifi size={13} />
            <FiVolume2 size={13} />
            <FiBattery size={13} />
          </div>
          <div className="w-px h-6 bg-white/10" />
          <div className="text-right">
            <div className="font-terminal text-sm text-neon leading-none">{formatTime(time)}</div>
            <div className="font-terminal text-[10px] text-white/40 leading-none mt-0.5">{formatDate(time)}</div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
