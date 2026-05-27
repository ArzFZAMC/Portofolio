import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BootScreen from './components/BootScreen'
import Desktop from './components/Desktop'

export default function App() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="w-screen h-screen overflow-hidden bg-cyber-bg">
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
    </div>
  )
}
