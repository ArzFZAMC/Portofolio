import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SKILLS = [
  { name: 'HTML', level: 90, color: '#e34f26', category: 'Frontend' },
  { name: 'CSS', level: 85, color: '#264de4', category: 'Frontend' },
  { name: 'JavaScript', level: 80, color: '#f7df1e', category: 'Frontend' },
  { name: 'React.js', level: 75, color: '#61dafb', category: 'Frontend' },
  { name: 'TailwindCSS', level: 80, color: '#38bdf8', category: 'Frontend' },
  { name: 'PHP', level: 70, color: '#777bb4', category: 'Backend' },
  { name: 'Laravel', level: 70, color: '#f05340', category: 'Backend' },
  { name: 'MySQL', level: 65, color: '#00758f', category: 'Backend' },
  { name: 'VB.Net', level: 65, color: '#68217a', category: 'Desktop' },
  { name: 'Git / GitHub', level: 75, color: '#f05032', category: 'Tools' },
]

const CATEGORIES = ['All', 'Frontend', 'Backend', 'Desktop', 'Tools']

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const row = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', damping: 22 } },
}

export default function SkillsApp() {
  const [active, setActive] = useState('All')
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100)
    return () => clearTimeout(t)
  }, [])

  const filtered = active === 'All' ? SKILLS : SKILLS.filter(s => s.category === active)

  return (
    <div className="p-5 h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="font-cyber text-lg font-bold text-white">Skills</div>
          <div className="font-terminal text-xs text-neon/50 mt-0.5">{filtered.length} skills loaded</div>
        </div>
        {/* Category tabs */}
        <div className="flex gap-1.5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActive(cat); setAnimate(false); setTimeout(() => setAnimate(true), 50) }}
              className="font-terminal text-[10px] px-2.5 py-1 rounded-lg transition-all duration-200"
              style={active === cat
                ? { background: 'rgba(0,212,255,0.15)', color: '#00d4ff', border: '1px solid rgba(0,212,255,0.4)' }
                : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.06)' }
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills list */}
      <motion.div
        key={active}
        variants={stagger}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {filtered.map(skill => (
          <motion.div
            key={skill.name}
            variants={row}
            className="glass neon-border rounded-xl p-3.5 group hover:border-neon/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: skill.color, boxShadow: `0 0 6px ${skill.color}80` }}
                />
                <span className="font-body text-sm font-medium text-white/85">{skill.name}</span>
                <span
                  className="font-terminal text-[9px] px-1.5 py-0.5 rounded"
                  style={{ color: skill.color, background: `${skill.color}12`, border: `1px solid ${skill.color}25` }}
                >
                  {skill.category}
                </span>
              </div>
              <span className="font-terminal text-sm font-bold" style={{ color: skill.color }}>
                {skill.level}%
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg, ${skill.color}90, ${skill.color})` }}
                initial={{ width: 0 }}
                animate={{ width: animate ? `${skill.level}%` : 0 }}
                transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
              />
            </div>

            {/* Level label */}
            <div className="flex justify-between mt-1.5">
              <span className="font-terminal text-[9px] text-white/20">BEGINNER</span>
              <span className="font-terminal text-[9px] text-white/20">EXPERT</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer note */}
      <div className="mt-4 pt-4 border-t border-white/5 font-terminal text-xs text-white/25 text-center">
        Skills are always growing — learning never stops 🚀
      </div>
    </div>
  )
}
