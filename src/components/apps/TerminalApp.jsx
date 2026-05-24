import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const WELCOME = [
  { text: '╔══════════════════════════════════════╗', color: '#00d4ff' },
  { text: '║     MR Codehex OS — Terminal v1.0    ║', color: '#00d4ff' },
  { text: '║       Developer: Rasya Arista         ║', color: '#00d4ff' },
  { text: '╚══════════════════════════════════════╝', color: '#00d4ff' },
  { text: '' },
  { text: 'Type "help" to see available commands.', color: '#64748b' },
  { text: '' },
]

const COMMANDS = {
  help: () => [
    { text: 'Available commands:', color: '#00d4ff' },
    { text: '' },
    { text: '  help       — Show this help menu', color: '#e2e8f0' },
    { text: '  about      — About Rasya Arista', color: '#e2e8f0' },
    { text: '  skills     — List technical skills', color: '#e2e8f0' },
    { text: '  projects   — View projects', color: '#e2e8f0' },
    { text: '  contact    — Contact information', color: '#e2e8f0' },
    { text: '  whoami     — Display user identity', color: '#e2e8f0' },
    { text: '  status     — System status', color: '#e2e8f0' },
    { text: '  clear      — Clear terminal', color: '#e2e8f0' },
    { text: '' },
  ],

  about: () => [
    { text: '┌─ ABOUT ──────────────────────────────┐', color: '#00d4ff' },
    { text: '│ Name    : Rasya Arista', color: '#e2e8f0' },
    { text: '│ Brand   : MR Codehex Studio', color: '#e2e8f0' },
    { text: '│ Status  : Graduate Student / Developer', color: '#e2e8f0' },
    { text: '│ Focus   : Frontend Development & UI', color: '#e2e8f0' },
    { text: '└──────────────────────────────────────┘', color: '#00d4ff' },
    { text: '' },
    { text: 'Frontend developer focused on modern,', color: '#64748b' },
    { text: 'interactive, and unique web experiences.', color: '#64748b' },
    { text: '' },
  ],

  whoami: () => [
    { text: 'rasya@codehex: ~$', color: '#00d4ff' },
    { text: 'uid=1337(rasya) gid=1337(developer)', color: '#e2e8f0' },
    { text: 'groups=frontend,ui-ux,problem-solver', color: '#e2e8f0' },
    { text: '' },
  ],

  skills: () => [
    { text: 'FRONTEND', color: '#00d4ff' },
    { text: '  ████████████████░░░░  HTML        90%', color: '#e2e8f0' },
    { text: '  ███████████████░░░░░  CSS         85%', color: '#e2e8f0' },
    { text: '  ██████████████░░░░░░  JavaScript  80%', color: '#f7df1e' },
    { text: '  █████████████░░░░░░░  React.js    75%', color: '#61dafb' },
    { text: '  █████████████░░░░░░░  TailwindCSS 75%', color: '#38bdf8' },
    { text: '' },
    { text: 'BACKEND', color: '#00d4ff' },
    { text: '  ████████████░░░░░░░░  PHP         70%', color: '#e2e8f0' },
    { text: '  ████████████░░░░░░░░  Laravel     70%', color: '#f05340' },
    { text: '  ███████████░░░░░░░░░  MySQL       65%', color: '#00758f' },
    { text: '' },
    { text: 'TOOLS', color: '#00d4ff' },
    { text: '  ████████████░░░░░░░░  VB.Net      65%', color: '#e2e8f0' },
    { text: '  █████████████░░░░░░░  Git/GitHub  75%', color: '#f05032' },
    { text: '' },
  ],

  projects: () => [
    { text: '┌─ PROJECTS ───────────────────────────┐', color: '#00d4ff' },
    { text: '│ 01  Fake OS Portfolio', color: '#e2e8f0' },
    { text: '│ 02  Website Sekolah Modern', color: '#e2e8f0' },
    { text: '│ 03  Laravel Library System', color: '#e2e8f0' },
    { text: '│ 04  VB.Net Maze Game', color: '#e2e8f0' },
    { text: '│ 05  PPDB Desktop Application', color: '#e2e8f0' },
    { text: '│ 06  Snack Branding Design', color: '#e2e8f0' },
    { text: '└──────────────────────────────────────┘', color: '#00d4ff' },
    { text: '' },
    { text: 'Open the Projects app for more details.', color: '#64748b' },
    { text: '' },
  ],

  contact: () => [
    { text: 'CONTACT INFORMATION', color: '#00d4ff' },
    { text: '' },
    { text: '  GitHub    : github.com/rasya-arista', color: '#e2e8f0' },
    { text: '  Instagram : @rasya.arista', color: '#e2e8f0' },
    { text: '  Email     : rasya@mrcodehex.dev', color: '#e2e8f0' },
    { text: '  WhatsApp  : +62 xxx-xxxx-xxxx', color: '#e2e8f0' },
    { text: '' },
  ],

  status: () => [
    { text: 'SYSTEM STATUS', color: '#00d4ff' },
    { text: '' },
    { text: `  Date/Time : ${new Date().toLocaleString()}`, color: '#e2e8f0' },
    { text: '  OS        : MR Codehex OS v2.4.1', color: '#e2e8f0' },
    { text: '  User      : Rasya Arista [authenticated]', color: '#00ff88' },
    { text: '  Uptime    : All systems operational', color: '#00ff88' },
    { text: '  Coffee    : ██████████████████░░  90%', color: '#f59e0b' },
    { text: '' },
  ],
}

export default function TerminalApp() {
  const [history, setHistory] = useState([...WELCOME])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const processCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase()

    setHistory(prev => [
      ...prev,
      { text: `rasya@codehex:~$ ${cmd}`, color: '#00d4ff', isInput: true },
    ])

    if (!trimmed) return

    if (trimmed === 'clear') {
      setHistory([])
      return
    }

    const handler = COMMANDS[trimmed]
    if (handler) {
      setHistory(prev => [...prev, ...handler()])
    } else {
      setHistory(prev => [
        ...prev,
        { text: `bash: ${trimmed}: command not found`, color: '#ef4444' },
        { text: 'Type "help" for available commands.', color: '#64748b' },
        { text: '' },
      ])
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      processCommand(input)
      if (input.trim()) setCmdHistory(prev => [input, ...prev])
      setInput('')
      setHistIdx(-1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (histIdx < cmdHistory.length - 1) {
        const ni = histIdx + 1
        setHistIdx(ni)
        setInput(cmdHistory[ni])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx > 0) {
        const ni = histIdx - 1
        setHistIdx(ni)
        setInput(cmdHistory[ni])
      } else {
        setHistIdx(-1)
        setInput('')
      }
    }
  }

  return (
    <div
      className="h-full flex flex-col"
      style={{ background: 'rgba(2,8,16,0.95)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Terminal output */}
      <div className="flex-1 overflow-y-auto p-4 font-terminal text-sm leading-6">
        {history.map((line, i) => (
          <div key={i} style={{ color: line.color || '#e2e8f0' }} className="whitespace-pre">
            {line.text || '\u00A0'}
          </div>
        ))}

        {/* Current input line */}
        <div className="flex items-center">
          <span style={{ color: '#00d4ff' }}>rasya@codehex:~$ </span>
          <span className="text-white/90">{input}</span>
          <span className="terminal-cursor" />
        </div>

        <div ref={bottomRef} />
      </div>

      {/* Hidden input */}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="absolute opacity-0 pointer-events-none w-0 h-0"
        autoFocus
        spellCheck={false}
      />
    </div>
  )
}
