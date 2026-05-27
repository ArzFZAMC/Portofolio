import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiGithub, FiInstagram, FiMail, FiMessageCircle,
  FiExternalLink, FiCopy, FiCheck,
} from 'react-icons/fi'

const CONTACTS = [
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/rasya-arista',
    display: '@rasya-arista',
    Icon: FiGithub,
    color: '#e2e8f0',
    href: 'https://github.com/rasya-arista',
    copyable: false,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: '@rasya.arista',
    display: '@rasya.arista',
    Icon: FiInstagram,
    color: '#e1306c',
    href: 'https://instagram.com/rasya.arista',
    copyable: true,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'rasya@mrcodehex.dev',
    display: 'rasya@mrcodehex.dev',
    Icon: FiMail,
    color: '#00d4ff',
    href: 'mailto:rasya@mrcodehex.dev',
    copyable: true,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+62 812-3456-7890',
    display: '+62 812-3456-7890',
    Icon: FiMessageCircle,
    color: '#25d366',
    href: 'https://wa.me/6281234567890',
    copyable: true,
  },
]

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
}

export default function ContactApp() {
  const [copied, setCopied] = useState(null)

  const handleCopy = (id, value) => {
    navigator.clipboard.writeText(value).catch(() => {})
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-5 h-full overflow-y-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="font-cyber text-lg font-bold text-white">Contact</div>
        <div className="font-terminal text-xs text-neon/50 mt-0.5">Get in touch with Rasya</div>
      </div>

      {/* Status badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-4 rounded-xl mb-5"
        style={{ background: 'rgba(0,255,136,0.06)', border: '1px solid rgba(0,255,136,0.2)' }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        <div>
          <div className="font-body text-sm font-semibold text-green-300">Available for Work</div>
          <div className="font-terminal text-xs text-white/40 mt-0.5">Open to freelance & collaboration</div>
        </div>
      </motion.div>

      {/* Contact cards */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
        {CONTACTS.map(c => (
          <motion.div
            key={c.id}
            variants={item}
            className="relative rounded-xl overflow-hidden group"
            style={{
              background: 'rgba(10,22,40,0.6)',
              border: `1px solid ${c.color}20`,
              transition: 'border-color 0.2s, background 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = `${c.color}50`
              e.currentTarget.style.background = `${c.color}08`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = `${c.color}20`
              e.currentTarget.style.background = 'rgba(10,22,40,0.6)'
            }}
          >
            {/* Left accent bar */}
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 opacity-60"
              style={{ background: c.color }}
            />

            <div className="flex items-center gap-4 px-4 py-3.5 pl-5">
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${c.color}12`, border: `1px solid ${c.color}30` }}
              >
                <c.Icon size={18} style={{ color: c.color }} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-terminal text-xs tracking-widest mb-0.5" style={{ color: `${c.color}80` }}>
                  {c.label.toUpperCase()}
                </div>
                <div className="font-body text-sm text-white/80 truncate">{c.display}</div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1.5">
                {c.copyable && (
                  <button
                    onClick={() => handleCopy(c.id, c.value)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                    style={{
                      background: copied === c.id ? `${c.color}20` : 'rgba(255,255,255,0.05)',
                      border: `1px solid ${copied === c.id ? c.color + '50' : 'rgba(255,255,255,0.08)'}`,
                    }}
                    title="Copy to clipboard"
                  >
                    {copied === c.id
                      ? <FiCheck size={13} style={{ color: c.color }} />
                      : <FiCopy size={13} className="text-white/40" />
                    }
                  </button>
                )}
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: `${c.color}10`,
                    border: `1px solid ${c.color}30`,
                  }}
                  title={`Open ${c.label}`}
                >
                  <FiExternalLink size={13} style={{ color: c.color }} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 pt-4 border-t border-white/5 text-center"
      >
        <p className="font-body text-xs text-white/30 leading-relaxed">
          Let's build something amazing together.<br />
          <span className="text-neon/60">Always open to new ideas & collaborations.</span>
        </p>
      </motion.div>
    </div>
  )
}
