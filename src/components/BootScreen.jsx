import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BOOT_LINES = [
  { text: 'BIOS v2.4.1 — MR Codehex Hardware Layer', color: '#64748b', delay: 0 },
  { text: 'CPU: Rasya-Core i9 @ 5.0GHz [16 cores detected]', color: '#64748b', delay: 350 },
  { text: 'RAM: 32GB DDR5 Neon-Blue Edition ............ [OK]', color: '#64748b', delay: 700 },
  { text: 'GPU: CodehexFX 4090 Ti ...................... [OK]', color: '#64748b', delay: 1000 },
  { text: '', delay: 1300 },
  { text: '> Initializing MR Codehex OS v2.4 ...', color: '#00d4ff', delay: 1500 },
  { text: '> Loading kernel modules .................... [DONE]', color: '#00d4ff', delay: 1900 },
  { text: '> Mounting file system ...................... [DONE]', color: '#00d4ff', delay: 2200 },
  { text: '> Starting UI compositor .................... [DONE]', color: '#00d4ff', delay: 2500 },
  { text: '> Loading developer profile ................. [DONE]', color: '#00d4ff', delay: 2800 },
  { text: '> Importing skill modules ................... [DONE]', color: '#00d4ff', delay: 3100 },
  { text: '', delay: 3400 },
  { text: '> Authenticating user: Rasya Arista ......... [OK]', color: '#00ff88', delay: 3600 },
  { text: '> Verifying identity ........................ [PASS]', color: '#00ff88', delay: 3900 },
  { text: '', delay: 4100 },
  { text: '> All systems operational. Launching desktop...', color: '#00d4ff', delay: 4300 },
]

export default function BootScreen({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100))
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => setShowWelcome(true), 400)
          setTimeout(() => {
            setExiting(true)
            setTimeout(onComplete, 700)
          }, 1800)
        }
      }, line.delay)
    })
  }, [])

  return (
    <motion.div
      className="w-full h-full bg-cyber-bg flex flex-col items-center justify-center relative overflow-hidden"
      animate={exiting ? { opacity: 0, scale: 1.05 } : {}}
      transition={{ duration: 0.7 }}
    >
      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent opacity-30"
          animate={{ y: ['-2px', '100vh'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <div className="font-cyber text-3xl font-black neon-text tracking-widest mb-1">
          MR CODEHEX OS
        </div>
        <div className="font-terminal text-xs text-neon-dim tracking-[0.3em] opacity-70">
          SYSTEM v2.4.1 — DEVELOPER EDITION
        </div>
      </motion.div>

      {/* Terminal window */}
      <div className="w-full max-w-2xl mx-4">
        <div className="glass neon-border rounded-lg overflow-hidden">
          {/* Terminal titlebar */}
          <div className="flex items-center gap-2 px-4 py-2 bg-black/40 border-b border-neon/10">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 font-terminal text-xs text-neon/50 tracking-widest">BOOT — /dev/tty0</span>
          </div>

          {/* Terminal content */}
          <div className="p-5 font-terminal text-sm leading-6 min-h-[300px] max-h-[380px] overflow-y-auto">
            <AnimatePresence>
              {visibleLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  style={{ color: line.color || '#e2e8f0' }}
                  className="whitespace-pre"
                >
                  {line.text || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>
            {!showWelcome && (
              <span className="terminal-cursor" />
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 px-1">
          <div className="flex justify-between items-center mb-1">
            <span className="font-terminal text-xs text-neon/50 tracking-widest">LOADING SYSTEM</span>
            <span className="font-terminal text-xs text-neon">{progress}%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-shimmer rounded-full"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Welcome message */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="mt-8 text-center"
          >
            <div className="font-cyber text-2xl font-bold neon-text animate-glow-pulse">
              WELCOME, RASYA ARISTA
            </div>
            <div className="font-terminal text-xs text-neon/50 mt-1 tracking-widest">
              INITIALIZING DESKTOP ENVIRONMENT...
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
