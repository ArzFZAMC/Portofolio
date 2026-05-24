import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useMediaQuery } from './hooks/useMediaQuery'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'
import MobileView from './components/MobileView'

export default function App() {
  const [booted, setBooted] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="w-screen h-screen overflow-hidden bg-cyber-bg">
      {isDesktop ? (
        /* ── Desktop OS experience ── */
        <AnimatePresence mode="wait">
          {!booted ? (
            <BootScreen key="boot" onComplete={() => setBooted(true)} />
          ) : (
            <motion.div
              key="desktop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full"
            >
              <Desktop />
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        /* ── Mobile / Tablet experience ── */
        <MobileView />
      )}
    </div>
  )
}
