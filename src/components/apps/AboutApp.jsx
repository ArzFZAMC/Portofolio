import { useState } from 'react'
import { motion } from 'framer-motion'

// ── FOTO PROFILE ──────────────────────────────────────
// Taruh foto kamu di folder public/ dengan nama photo.jpg
// Contoh: public/photo.jpg
// Ganti '/photo.jpg' dengan nama file foto kamu
const PHOTO_SRC = '/photo.jpg'
// ──────────────────────────────────────────────────────

const TECH_STACK = [
  { name: 'React.js', color: '#61dafb' },
  { name: 'TailwindCSS', color: '#38bdf8' },
  { name: 'Laravel', color: '#f05340' },
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'Vite', color: '#a259ff' },
  { name: 'MySQL', color: '#00758f' },
  { name: 'PHP', color: '#777bb4' },
  { name: 'Git', color: '#f05032' },
]

const PASSIONS = [
  { label: 'Frontend Development', icon: '⚡' },
  { label: 'UI / UX Design', icon: '🎨' },
  { label: 'Interactive Web Apps', icon: '🚀' },
  { label: 'Modern Interfaces', icon: '💎' },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
}

export default function AboutApp() {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="p-6 h-full overflow-y-auto"
    >
      {/* Header */}
      <motion.div variants={item} className="flex items-center gap-5 mb-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden neon-border relative">
            {!imgError ? (
              <img
                src={PHOTO_SRC}
                alt="Rasya Arista"
                className="w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-neon/20 to-neon-blue/20 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-cyber-bg" />
        </div>

        {/* Name / title */}
        <div>
          <div className="font-cyber text-2xl font-bold text-white tracking-wide">Rasya Arista</div>
          <div className="font-terminal text-sm text-neon mt-0.5">MR Codehex</div>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {['Front-End Dev', 'UI Enthusiast', 'Problem Solver'].map(r => (
              <span
                key={r}
                className="font-body text-[10px] px-2 py-0.5 rounded-full border"
                style={{ borderColor: 'rgba(0,212,255,0.3)', color: '#00d4ff', background: 'rgba(0,212,255,0.07)' }}
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div variants={item} className="glass neon-border rounded-xl p-4 mb-4 text-sm font-body text-white/70 leading-relaxed">
        Frontend developer yang fokus membuat website <span className="text-neon">modern, interaktif, dan unik</span>{' '}
        dengan pengalaman pengguna yang menarik. Setiap project adalah kanvas untuk bereksperimen dengan
        teknologi dan desain terbaru.
      </motion.div>

      {/* Passions */}
      <motion.div variants={item} className="mb-4">
        <div className="font-terminal text-xs text-neon/60 tracking-widest mb-2">PASSION</div>
        <div className="grid grid-cols-2 gap-2">
          {PASSIONS.map(p => (
            <div
              key={p.label}
              className="flex items-center gap-2.5 p-2.5 rounded-lg bg-white/3 border border-white/6 hover:border-neon/30 transition-all duration-200"
            >
              <span className="text-lg">{p.icon}</span>
              <span className="font-body text-xs text-white/70">{p.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div variants={item}>
        <div className="font-terminal text-xs text-neon/60 tracking-widest mb-2">TECH STACK</div>
        <div className="flex flex-wrap gap-1.5">
          {TECH_STACK.map(t => (
            <motion.span
              key={t.name}
              whileHover={{ scale: 1.07 }}
              className="font-terminal text-xs px-2.5 py-1 rounded-lg"
              style={{
                color: t.color,
                background: `${t.color}12`,
                border: `1px solid ${t.color}35`,
              }}
            >
              {t.name}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
