import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi'

const PROJECTS = [
  {
    id: 1,
    title: 'Fake OS Portfolio',
    desc: 'Portfolio pribadi berbentuk Fake Operating System dengan UI cyberpunk, draggable windows, boot screen, dan terminal interaktif.',
    tech: ['React.js', 'Vite', 'TailwindCSS', 'Framer Motion'],
    emoji: '🖥️',
    color: '#00d4ff',
    github: 'https://github.com/ArzFZAMC',
    preview: 'https://lacy-os.vercel.app/',
  },
  {
    id: 2,
    title: 'Pokemon TCG - BETA',
    desc: 'Website TCG Pokemon yang terinspirasi dari Pokemon TCGP.',
    tech: ['React 18 + Vite', 'TailwindCSS', 'Framer Motion', 'Node.js + Express.js', 'dll..'],
    emoji: '🎮',
    color: '#0066ff',
    github: 'https://github.com/ArzFZAMC',
    disabled: true,
    preview: '🚧 Website Sedang Dalam Perbaikan'
  },
  {
    id: 3,
    title: 'Money Tracker',
    desc: 'Aplikasi Pencatatan keuangan pribadi yang simpel & intuitif.',
    tech: ['PHP', 'JavaScript', 'MySQL', 'TailwindCSS'],
    emoji: '📈',
    color: '#f05340',
    github: 'https://github.com/ArzFZAMC',
    preview: 'https://raslynn.my-board.org/finansial/auth/login.php',
  },
  {
    id: 4,
    title: 'Website FAN MADE JKT48 - BETA',
    desc: 'Website yang terinspirasi dari website JKT48 untuk melihat jadwal theater dan konser',
    tech: ['PHP', 'JavaScript', 'MySQL', 'TailwindCSS'],
    emoji: '🎤',
    color: '#a855f7',
    github: 'https://github.com/ArzFZAMC',
    preview: 'https://raslynn.my-board.org/idol_grup/',
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const card = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 22 } },
}

export default function ProjectsApp() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="p-5 h-full overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-cyber text-lg font-bold text-white">Projects</div>
          <div className="font-terminal text-xs text-neon/50 mt-0.5">{PROJECTS.length} projects</div>
        </div>
        <div className="glass neon-border rounded-lg px-3 py-1.5 font-terminal text-xs text-neon/60">
          MR Codehex
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 gap-3"
      >
        {PROJECTS.map(p => (
          <motion.div
            key={p.id}
            variants={card}
            whileHover={{ y: -2 }}
            className="rounded-xl overflow-hidden cursor-pointer group transition-all duration-200"
            style={{
              background: 'rgba(10,22,40,0.7)',
              border: `1px solid ${p.color}25`,
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = `${p.color}60`}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = `${p.color}25`}
            onClick={() => setSelected(p)}
          >
            {/* Card header */}
            <div
              className="h-24 flex items-center justify-center relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${p.color}15, ${p.color}05)` }}
            >
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, ${p.color}50 0%, transparent 70%)`,
                }}
              />
              <span className="text-4xl relative z-10">{p.emoji}</span>
            </div>

            {/* Card body */}
            <div className="p-3">
              <div className="font-body text-sm font-semibold text-white/90 mb-1 group-hover:text-white transition-colors">
                {p.title}
              </div>
              <div className="font-body text-xs text-white/50 line-clamp-2 leading-relaxed mb-2">
                {p.desc}
              </div>
              <div className="flex flex-wrap gap-1">
                {p.tech.slice(0, 3).map(t => (
                  <span
                    key={t}
                    className="font-terminal text-[9px] px-1.5 py-0.5 rounded"
                    style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}30` }}
                  >
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="font-terminal text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/40">
                    +{p.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 flex items-center justify-center p-6 z-50"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 16 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 16 }}
              className="glass neon-border rounded-2xl p-6 max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${selected.color}15`, border: `1px solid ${selected.color}30` }}
                  >
                    <span className="text-2xl">{selected.emoji}</span>
                  </div>
                  <div>
                    <div className="font-body font-semibold text-white">{selected.title}</div>
                    <div className="font-terminal text-xs" style={{ color: selected.color }}>
                      MR Codehex
                    </div>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="text-white/30 hover:text-white/70 transition-colors">
                  <FiX size={16} />
                </button>
              </div>

              <p className="font-body text-sm text-white/60 leading-relaxed mb-4">{selected.desc}</p>

              <div className="mb-4">
                <div className="font-terminal text-xs text-neon/50 tracking-widest mb-2">TECH USED</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tech.map(t => (
                    <span
                      key={t}
                      className="font-terminal text-xs px-2 py-0.5 rounded-lg"
                      style={{ color: selected.color, background: `${selected.color}12`, border: `1px solid ${selected.color}35` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <a
                  href={selected.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-body text-sm text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200"
                >
                  <FiGithub size={14} /> GitHub
                </a>
                <a
                  href={selected.disabled ? (
                  <div
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-body text-sm opacity-70 cursor-not-allowed"
                    style={{
                      color: '#facc15',
                      background: 'rgba(250,204,21,0.08)',
                      border: '1px solid rgba(250,204,21,0.25)',
                    }}
                  >
                    🚧 Website Sedang Dalam Perbaikan
                  </div>
                ) : (
                  <a
                    href={selected.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl font-body text-sm transition-all duration-200"
                    style={{
                      color: selected.color,
                      background: `${selected.color}15`,
                      border: `1px solid ${selected.color}40`,
                    }}
                  >
                    <FiExternalLink size={14} /> Preview
                  </a>
                )}
                >
                  <FiExternalLink size={14} /> Preview
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
