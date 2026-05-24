import { useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import useStore from '../store/useStore'
import Taskbar from './Taskbar'
import Window from './Window'
import DesktopIcon from './DesktopIcon'
import Notification from './Notification'
import ContextMenu from './ContextMenu'
import AboutApp from './apps/AboutApp'
import ProjectsApp from './apps/ProjectsApp'
import TerminalApp from './apps/TerminalApp'
import SkillsApp from './apps/SkillsApp'
import ContactApp from './apps/ContactApp'

import {
  FiUser, FiFolder, FiTerminal, FiZap, FiMail, FiCpu
} from 'react-icons/fi'

export const APP_CONFIGS = [
  {
    id: 'about',
    title: 'About Me',
    Icon: FiUser,
    component: AboutApp,
    defaultSize: { w: 680, h: 540 },
    defaultPos: { x: 80, y: 40 },
    accentColor: '#00d4ff',
  },
  {
    id: 'projects',
    title: 'Projects',
    Icon: FiFolder,
    component: ProjectsApp,
    defaultSize: { w: 860, h: 580 },
    defaultPos: { x: 120, y: 60 },
    accentColor: '#0066ff',
  },
  {
    id: 'terminal',
    title: 'Terminal',
    Icon: FiTerminal,
    component: TerminalApp,
    defaultSize: { w: 720, h: 440 },
    defaultPos: { x: 160, y: 80 },
    accentColor: '#00ff88',
  },
  {
    id: 'skills',
    title: 'Skills',
    Icon: FiZap,
    component: SkillsApp,
    defaultSize: { w: 680, h: 520 },
    defaultPos: { x: 100, y: 60 },
    accentColor: '#a855f7',
  },
  {
    id: 'contact',
    title: 'Contact',
    Icon: FiMail,
    component: ContactApp,
    defaultSize: { w: 560, h: 440 },
    defaultPos: { x: 200, y: 80 },
    accentColor: '#f59e0b',
  },
]

const CONTEXT_ITEMS = [
  { label: 'Open Terminal', action: 'terminal' },
  { label: 'View Projects', action: 'projects' },
  { label: 'About Rasya', action: 'about' },
  { divider: true },
  { label: 'Refresh Desktop', action: 'refresh' },
  { label: 'System Info', action: 'sysinfo' },
]

export default function Desktop() {
  const { windows, openWindow, closeWindow, minimizeWindow, maximizeWindow, focusWindow, notifications, addNotification } = useStore()
  const [contextMenu, setContextMenu] = useState(null)

  const handleOpenApp = useCallback((appId) => {
    const cfg = APP_CONFIGS.find(a => a.id === appId)
    if (!cfg) return
    openWindow(cfg)
    addNotification({
      title: `Launching ${cfg.title}`,
      message: 'Application started successfully',
      type: 'info',
    })
  }, [openWindow, addNotification])

  const handleContextMenu = (e) => {
    e.preventDefault()
    setContextMenu({ x: e.clientX, y: e.clientY })
  }

  const handleContextAction = (action) => {
    setContextMenu(null)
    if (action === 'refresh') {
      addNotification({ title: 'Desktop Refreshed', message: 'All icons reloaded', type: 'success' })
      return
    }
    if (action === 'sysinfo') {
      addNotification({ title: 'MR Codehex OS v2.4.1', message: 'Developer: Rasya Arista | Build: 2024', type: 'info' })
      return
    }
    handleOpenApp(action)
  }

  return (
    <div
      className="w-full h-full desktop-grid relative overflow-hidden select-none"
      onContextMenu={handleContextMenu}
      onClick={() => setContextMenu(null)}
    >
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />

      {/* Desktop icons */}
      <div className="absolute top-6 left-6 flex flex-col gap-4 z-10">
        {APP_CONFIGS.map((app, i) => (
          <DesktopIcon
            key={app.id}
            app={app}
            onOpen={() => handleOpenApp(app.id)}
            delay={i * 0.08}
          />
        ))}
      </div>

      {/* Open Windows */}
      <AnimatePresence>
        {windows.map(win => {
          if (win.isMinimized) return null
          const AppComponent = win.component
          return (
            <Window
              key={win.id}
              win={win}
              onClose={() => closeWindow(win.id)}
              onMinimize={() => minimizeWindow(win.id)}
              onMaximize={() => maximizeWindow(win.id)}
              onFocus={() => focusWindow(win.id)}
            >
              <AppComponent />
            </Window>
          )
        })}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            items={CONTEXT_ITEMS}
            onAction={handleContextAction}
            onClose={() => setContextMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Notifications */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-[9999] pointer-events-none">
        <AnimatePresence>
          {notifications.map(n => (
            <Notification key={n.id} notification={n} />
          ))}
        </AnimatePresence>
      </div>

      {/* Taskbar */}
      <Taskbar onOpenApp={handleOpenApp} apps={APP_CONFIGS} />
    </div>
  )
}
