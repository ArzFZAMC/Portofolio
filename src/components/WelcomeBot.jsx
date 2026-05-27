import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMessageCircle } from 'react-icons/fi'

const PHOTO_SRC = '/photo.jpg'
const FULL_TEXT = `Hai! Saya Rasya Arista, seorang Frontend Developer. Saya membangun sebuah company sederhana yang bernama MR Codehex. Klik ikon di atas untuk melihat portfolio saya! 👋`

export default function WelcomeBot() {
  const [visible,    setVisible]    = useState(false)
  const [minimized,  setMinimized]  = useState(false)
  const [displayed,  setDisplayed]  = useState('')
  const [typing,     setTyping]     = useState(false)
  const [imgError,   setImgError]   = useState(false)

  useEffect(() => {
    const t = setTimeout(() => { setVisible(true); setTyping(true) }, 1800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!typing) return
    let i = 0
    setDisplayed('')
    const iv = setInterval(() => {
      i++
      setDisplayed(FULL_TEXT.slice(0, i))
      if (i >= FULL_TEXT.length) { clearInterval(iv); setTyping(false) }
    }, 26)
    return () => clearInterval(iv)
  }, [typing])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1   }}
          exit={{   opacity: 0, y: 20,  scale: 0.9 }}
          transition={{ type: 'spring', damping: 22 }}
          /* Mobile: bottom-center   Desktop: bottom-right */
          className="absolute bottom-16 z-50
                     left-3 right-3
                     md:left-auto md:right-5 md:w-72"
        >
          {minimized ? (
            /* Minimized pill */
            <motion.button
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              onClick={() => { setMinimized(false) }}
              className="ml-auto flex items-center gap-2 px-3 py-2 rounded-full shadow-neon"
              style={{ background: 'rgba(0,212,255,0.15)', border: '1px solid rgba(0,212,255,0.4)' }}
            >
              <FiMessageCircle size={14} className="text-neon" />
              <span className="font-terminal text-xs text-neon">Rasya Bot</span>
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            </motion.button>
          ) : (
            /* Chat bubble card */
            <div
              className="rounded-2xl overflow-hidden shadow-window w-full"
              style={{
                background: 'rgba(8,16,32,0.97)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(0,212,255,0.2)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-center gap-2.5 px-3.5 py-2.5 border-b border-white/5"
                style={{ background: 'rgba(0,212,255,0.06)' }}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden"
                    style={{ border: '1.5px solid rgba(0,212,255,0.5)' }}
                  >
                    {!imgError ? (
                      <img
                        src={PHOTO_SRC}
                        alt="Rasya"
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-neon/20 to-blue-500/20 flex items-center justify-center text-base">
                        👨‍💻
                      </div>
                    )}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border border-cyber-bg" />
                </div>

                <div className="flex-1">
                  <div className="font-body text-xs font-semibold text-white/90">Rasya Arista</div>
                  <div className="font-terminal text-[9px] text-green-400">● Online</div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMinimized(true)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-white/5 transition-all active:scale-90"
                  >
                    <span className="text-xs leading-none font-bold">—</span>
                  </button>
                  <button
                    onClick={() => setVisible(false)}
                    className="w-6 h-6 rounded-lg flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all active:scale-90"
                  >
                    <FiX size={12} />
                  </button>
                </div>
              </div>

              {/* Chat content */}
              <div className="p-3.5">
                <div
                  className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm font-body leading-relaxed text-white/85"
                  style={{ background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.15)' }}
                >
                  {displayed}
                  {typing && <span className="inline-block w-1.5 h-3.5 bg-neon align-middle ml-0.5 animate-blink" />}
                </div>

                {!typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="font-terminal text-[9px] text-white/25 mt-1.5 ml-1"
                  >
                    Just now · MR Codehex OS
                  </motion.div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
