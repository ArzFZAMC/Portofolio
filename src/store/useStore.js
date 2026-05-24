import { create } from 'zustand'

let zBase = 100

const useStore = create((set, get) => ({
  windows: [],
  notifications: [],

  openWindow: (appConfig) => {
    const { windows } = get()
    const existing = windows.find(w => w.id === appConfig.id)
    if (existing) {
      set(state => ({
        windows: state.windows.map(w =>
          w.id === appConfig.id
            ? { ...w, isMinimized: false, zIndex: ++zBase }
            : w
        )
      }))
      return
    }
    set(state => ({
      windows: [
        ...state.windows,
        { ...appConfig, isMinimized: false, zIndex: ++zBase }
      ]
    }))
  },

  closeWindow: (id) =>
    set(state => ({ windows: state.windows.filter(w => w.id !== id) })),

  minimizeWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      )
    })),

  maximizeWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      )
    })),

  focusWindow: (id) =>
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: ++zBase } : w
      )
    })),

  addNotification: (notification) => {
    const id = Date.now() + Math.random()
    set(state => ({
      notifications: [...state.notifications, { ...notification, id }]
    }))
    setTimeout(() => {
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }))
    }, 4500)
  },

  removeNotification: (id) =>
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id)
    })),
}))

export default useStore
