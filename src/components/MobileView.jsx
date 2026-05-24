import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiUser, FiFolder, FiZap, FiMail,
  FiGithub, FiInstagram, FiMessageCircle,
  FiExternalLink, FiCopy, FiCheck, FiTerminal,
} from 'react-icons/fi'

/* ─── Data ─────────────────────────────────────────── */

const SKILLS = [
  { name: 'HTML',        level: 90, color: '#e34f26', cat: 'Frontend' },
  { name: 'CSS',         level: 85, color: '#264de4', cat: 'Frontend' },
  { name: 'JavaScript',  level: 80, color: '#f7df1e', cat: 'Frontend' },
  { name: 'React.js',    level: 75, color: '#61dafb', cat: 'Frontend' },
  { name: 'TailwindCSS', level: 80, color: '#38bdf8', cat: 'Frontend' },
  { name: 'PHP',         level: 70, color: '#777bb4', cat: 'Backend'  },
  { name: 'Laravel',     level: 70, color: '#f05340', cat: 'Backend'  },
  { name: 'MySQL',       level: 65, color: '#00758f', cat: 'Backend'  },
  { name: 'VB.Net',      level: 65, color: '#68217a', cat: 'Desktop'  },
  { name: 'Git / GitHub',level: 75, color: '#f05032', cat: 'Tools'    },
]

const PROJECTS = [
  {
    title: 'Fake OS Portfolio',
    desc: 'Portfolio berbentuk OS cyberpunk dengan boot screen, draggable windows, dan terminal interaktif.',
    tech: ['React', 'Vite', 'Framer Motion', 'TailwindCSS'],
    emoji: '🖥️', color: '#00d4ff',
    github: 'https://github.com/rasya-arista',
  },
  {
    title: 'Website Sekolah Modern',
    desc: 'Website sekolah responsif dengan fitur pengumuman, galeri, dan informasi akademik.',
    tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    emoji: '🏫', color: '#0066ff',
    github: 'https://github.com/rasya-arista',
  },
  {
    title: 'Laravel Library System',
    desc: 'Sistem manajemen perpustakaan dengan peminjaman buku dan laporan otomatis.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
    emoji: '📚', color: '#f05340',
    github: 'https://github.com/rasya-arista',
  },
  {
    title: 'VB.Net Maze Game',
    desc: 'Game maze desktop interaktif dengan level system dan timer challenge.',
    tech: ['VB.Net', 'Windows Forms', '.NET'],
    emoji: '🎮', color: '#a855f7',
    github: 'https://github.com/rasya-arista',
  },
  {
    title: 'PPDB Desktop App',
    desc: 'Aplikasi penerimaan peserta didik baru dengan seleksi dan laporan cetak.',
    tech: ['VB.Net', 'MySQL', 'Crystal Reports'],
    emoji: '📋', color: '#00ff88',
    github: 'https://github.com/rasya-arista',
  },
  {
    title: 'Snack Branding Design',
    desc: 'Identitas brand snack lokal: logo, kemasan, dan materi promosi digital.',
    tech: ['Figma', 'Illustrator', 'Canva'],
    emoji: '🎨', color: '#f59e0b',
    github: 'https://github.com/rasya-arista',
  },
]

const CONTACTS = [
  { label: 'GitHub',    value: 'github.com/rasya-arista',  Icon: FiGithub,       href: 'https://github.com/rasya-arista',         color: '#e2e8f0', copy: false },
  { label: 'Instagram', value: '@rasya.arista',             Icon: FiInstagram,    href: 'https://instagram.com/rasya.arista',       color: '#e1306c', copy: true  },
  { label: 'Email',     value: 'rasya@mrcodehex.dev',       Icon: FiMail,         href: 'mailto:rasya@mrcodehex.dev',               color: '#00d4ff', copy: true  },
  { label: 'WhatsApp',  value: '+62 812-3456-7890',         Icon: FiMessageCircle,href: 'https://wa.me/6281234567890',               color: '#25d366', copy: true  },
]

const TECH_STACK = [
  { name: 'React.js',    color: '#61dafb' },
  { name: 'TailwindCSS', color: '#38bdf8' },
  { name: 'Laravel',     color: '#f05340' },
  { name: 'JavaScript',  color: '#f7df1e' },
  { name: 'Vite',        color: '#a259ff' },
  { name: 'MySQL',       color: '#00758f' },
  { name: 'PHP',         color: '#777bb4' },
  { name: 'Git',         color: '#f05032' },
]

/* ─── Shared animation variants ───────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', damping: 22 } },
}
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

/* ─── Tab: About ───────────────────────────────────── */
function AboutTab() {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="p-5 space-y-5 pb-8">

      {/* Hero card */}
      <motion.div variants={fadeUp}
        className="relative rounded-2xl overflow-hidden p-5"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(0,100,255,0.05))', border: '1px solid rgba(0,212,255,0.2)' }}
      >
        {/* BG glow */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-neon/5 blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 relative">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}>
              👨‍💻
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-400 border-2 border-cyber-bg" />
          </div>
          <div>
            <div className="font-cyber text-xl font-bold text-white">Rasya Arista</div>
            <div className="font-terminal text-xs text-neon mt-0.5">MR Codehex Studio</div>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              {['Frontend Dev', 'UI Enthusiast', 'Problem Solver'].map(r => (
                <span key={r} className="font-terminal text-[9px] px-2 py-0.5 rounded-full"
                  style={{ color: '#00d4ff', background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.25)' }}>
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bio */}
      <motion.div variants={fadeUp}
        className="rounded-xl p-4 font-body text-sm text-white/65 leading-relaxed"
        style={{ background: 'rgba(10,22,40,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
      >
        Frontend developer yang fokus membuat website{' '}
        <span className="text-neon font-medium">modern, interaktif, dan unik</span>{' '}
        dengan pengalaman pengguna yang menarik. Setiap project adalah kanvas untuk
        bereksperimen dengan teknologi dan desain terbaru.
      </motion.div>

      {/* Passion grid */}
      <motion.div variants={fadeUp}>
        <div className="font-terminal text-[10px] text-neon/50 tracking-widest mb-2.5">PASSION</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: '⚡', label: 'Frontend Development' },
            { icon: '🎨', label: 'UI / UX Design' },
            { icon: '🚀', label: 'Interactive Web Apps' },
            { icon: '💎', label: 'Modern Interfaces' },
          ].map(p => (
            <div key={p.label}
              className="flex items-center gap-2.5 p-3 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <span className="text-xl">{p.icon}</span>
              <span className="font-body text-xs text-white/65 leading-tight">{p.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Tech stack */}
      <motion.div variants={fadeUp}>
        <div className="font-terminal text-[10px] text-neon/50 tracking-widest mb-2.5">TECH STACK</div>
        <div className="flex flex-wrap gap-1.5">
          {TECH_STACK.map(t => (
            <span key={t.name} className="font-terminal text-xs px-2.5 py-1 rounded-lg"
              style={{ color: t.color, background: `${t.color}12`, border: `1px solid ${t.color}30` }}>
              {t.name}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Status footer */}
      <motion.div variants={fadeUp}
        className="flex items-center gap-3 p-3.5 rounded-xl"
        style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.18)' }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        <span className="font-body text-sm text-green-300">Available for work & collaboration</span>
      </motion.div>
    </motion.div>
  )
}

/* ─── Tab: Skills ──────────────────────────────────── */
function SkillsTab() {
  const [activeFilter, setActiveFilter] = useState('All')
  const cats = ['All', 'Frontend', 'Backend', 'Desktop', 'Tools']
  const filtered = activeFilter === 'All' ? SKILLS : SKILLS.filter(s => s.cat === activeFilter)

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="p-5 pb-8">

      {/* Filter pills */}
      <motion.div variants={fadeUp} className="flex gap-1.5 overflow-x-auto pb-3 scrollbar-hide">
        {cats.map(cat => (
          <button key={cat} onClick={() => setActiveFilter(cat)}
            className="font-terminal text-[10px] px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-all duration-200"
            style={activeFilter === cat
              ? { background: 'rgba(0,212,255,0.15)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.4)' }
              : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.07)' }
            }
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div key={activeFilter}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="space-y-3 mt-1"
        >
          {filtered.map((skill, i) => (
            <motion.div key={skill.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-3.5 rounded-xl"
              style={{ background: 'rgba(10,22,40,0.7)', border: `1px solid ${skill.color}18` }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}80` }} />
                  <span className="font-body text-sm text-white/85">{skill.name}</span>
                </div>
                <span className="font-terminal text-sm font-bold" style={{ color: skill.color }}>
                  {skill.level}%
                </span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: `linear-gradient(90deg, ${skill.color}70, ${skill.color})` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.9, delay: i * 0.05 + 0.1, ease: [0.4, 0, 0.2, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Tab: Projects ────────────────────────────────── */
function ProjectsTab() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="p-5 pb-8">
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
        {PROJECTS.map((p) => (
          <motion.div key={p.title} variants={fadeUp}
            onClick={() => setSelected(p)}
            className="flex items-start gap-3.5 p-4 rounded-xl active:scale-[0.98] transition-transform cursor-pointer"
            style={{ background: `${p.color}07`, border: `1px solid ${p.color}22` }}
          >
            {/* Emoji icon */}
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: `${p.color}12`, border: `1px solid ${p.color}30` }}>
              {p.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-body text-sm font-semibold text-white/90 mb-1">{p.title}</div>
              <div className="font-body text-xs text-white/45 leading-relaxed line-clamp-2 mb-2">{p.desc}</div>
              <div className="flex gap-1 flex-wrap">
                {p.tech.slice(0, 3).map(t => (
                  <span key={t} className="font-terminal text-[9px] px-1.5 py-0.5 rounded"
                    style={{ color: p.color, background: `${p.color}14`, border: `1px solid ${p.color}28` }}>
                    {t}
                  </span>
                ))}
                {p.tech.length > 3 && (
                  <span className="font-terminal text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/35">
                    +{p.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Detail sheet */}
      <AnimatePresence>
        {selected && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setSelected(null)}
            />
            {/* Bottom sheet */}
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl p-6 pb-10"
              style={{ background: 'rgba(8,16,32,0.98)', border: '1px solid rgba(0,212,255,0.15)', borderBottom: 'none' }}
            >
              {/* Drag pill */}
              <div className="w-10 h-1 rounded-full bg-white/20 mx-auto mb-5" />

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                  style={{ background: `${selected.color}12`, border: `1px solid ${selected.color}30` }}>
                  {selected.emoji}
                </div>
                <div>
                  <div className="font-body font-semibold text-white">{selected.title}</div>
                  <div className="font-terminal text-xs mt-0.5" style={{ color: selected.color }}>MR Codehex</div>
                </div>
              </div>

              <p className="font-body text-sm text-white/60 leading-relaxed mb-4">{selected.desc}</p>

              <div className="mb-5">
                <div className="font-terminal text-[10px] text-neon/50 tracking-widest mb-2">TECH USED</div>
                <div className="flex flex-wrap gap-1.5">
                  {selected.tech.map(t => (
                    <span key={t} className="font-terminal text-xs px-2 py-0.5 rounded-lg"
                      style={{ color: selected.color, background: `${selected.color}12`, border: `1px solid ${selected.color}35` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a href={selected.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body text-sm font-medium transition-all duration-200"
                style={{ background: `${selected.color}15`, color: selected.color, border: `1px solid ${selected.color}40` }}
              >
                <FiGithub size={15} /> View on GitHub
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Tab: Contact ─────────────────────────────────── */
function ContactTab() {
  const [copied, setCopied] = useState(null)

  const handleCopy = (id, value) => {
    navigator.clipboard.writeText(value).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="p-5 pb-8 space-y-4">

      {/* Status */}
      <motion.div variants={fadeUp}
        className="flex items-center gap-3 p-4 rounded-xl"
        style={{ background: 'rgba(0,255,136,0.05)', border: '1px solid rgba(0,255,136,0.18)' }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        <div>
          <div className="font-body text-sm font-semibold text-green-300">Available for Work</div>
          <div className="font-terminal text-[10px] text-white/40 mt-0.5">Open to freelance & collaboration</div>
        </div>
      </motion.div>

      {/* Contact cards */}
      {CONTACTS.map(c => (
        <motion.div key={c.label} variants={fadeUp}
          className="relative rounded-xl overflow-hidden"
          style={{ background: `${c.color}07`, border: `1px solid ${c.color}20` }}
        >
          {/* Left accent */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: c.color }} />

          <div className="flex items-center gap-3.5 px-4 py-3.5 pl-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${c.color}12`, border: `1px solid ${c.color}30` }}>
              <c.Icon size={17} style={{ color: c.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-terminal text-[9px] tracking-widest mb-0.5" style={{ color: `${c.color}80` }}>
                {c.label.toUpperCase()}
              </div>
              <div className="font-body text-sm text-white/75 truncate">{c.value}</div>
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {c.copy && (
                <button onClick={() => handleCopy(c.label, c.value)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95"
                  style={{ background: copied === c.label ? `${c.color}20` : 'rgba(255,255,255,0.05)', border: `1px solid ${copied === c.label ? c.color + '50' : 'rgba(255,255,255,0.08)'}` }}
                >
                  {copied === c.label
                    ? <FiCheck size={13} style={{ color: c.color }} />
                    : <FiCopy size={13} className="text-white/40" />
                  }
                </button>
              )}
              <a href={c.href} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 active:scale-95"
                style={{ background: `${c.color}10`, border: `1px solid ${c.color}30` }}
              >
                <FiExternalLink size={13} style={{ color: c.color }} />
              </a>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Footer */}
      <motion.div variants={fadeUp} className="text-center pt-2">
        <p className="font-body text-xs text-white/25 leading-relaxed">
          Let's build something amazing together.<br/>
          <span className="text-neon/50">Always open to new ideas & collaborations.</span>
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Navigation tabs config ───────────────────────── */
const TABS = [
  { id: 'about',    label: 'About',    Icon: FiUser,     Content: AboutTab    },
  { id: 'skills',   label: 'Skills',   Icon: FiZap,      Content: SkillsTab   },
  { id: 'projects', label: 'Projects', Icon: FiFolder,   Content: ProjectsTab },
  { id: 'contact',  label: 'Contact',  Icon: FiMail,     Content: ContactTab  },
]

/* ─── Root mobile component ────────────────────────── */
export default function MobileView() {
  const [activeTab, setActiveTab] = useState('about')
  const activeConfig = TABS.find(t => t.id === activeTab)
  const Content = activeConfig.Content

  return (
    <div className="flex flex-col w-full h-full bg-cyber-bg overflow-hidden">
      {/* ── Top status bar ── */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{ background: 'rgba(5,10,20,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,212,255,0.1)' }}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.3)' }}>
            <FiTerminal size={12} className="text-neon" />
          </div>
          <div>
            <div className="font-cyber text-sm font-bold text-neon leading-none">MR CODEHEX</div>
            <div className="font-terminal text-[8px] text-white/30 tracking-widest leading-none mt-0.5">PORTFOLIO OS v2.4</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="font-terminal text-[9px] text-white/40">ONLINE</span>
          </div>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <Content />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Bottom tab bar ── */}
      <div
        className="flex flex-shrink-0 relative"
        style={{ background: 'rgba(5,10,20,0.97)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(0,212,255,0.1)' }}
      >
        {TABS.map(tab => {
          const isActive = tab.id === activeTab
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex flex-col items-center gap-1 py-2.5 relative transition-all duration-200 active:scale-95"
            >
              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="tab-bar-indicator"
                  className="absolute top-0 left-3 right-3 h-0.5 rounded-full"
                  style={{ background: '#00d4ff' }}
                  transition={{ type: 'spring', damping: 26 }}
                />
              )}
              <tab.Icon
                size={19}
                style={{ color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.3)' }}
              />
              <span
                className="font-terminal text-[9px] tracking-wider"
                style={{ color: isActive ? '#00d4ff' : 'rgba(255,255,255,0.3)' }}
              >
                {tab.label.toUpperCase()}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
