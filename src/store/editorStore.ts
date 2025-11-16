import { create } from 'zustand'

interface EditorStore {
  isSidebarOpen: boolean
  activePanel: 'outline' | 'history' | 'export' | null
  toolbarCollapsed: boolean
  toggleSidebar: () => void
  setActivePanel: (panel: EditorStore['activePanel']) => void
  setToolbarCollapsed: (collapsed: boolean) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  isSidebarOpen: false,
  activePanel: null,
  toolbarCollapsed: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  setActivePanel: (panel) => set({ activePanel: panel }),
  setToolbarCollapsed: (collapsed) => set({ toolbarCollapsed: collapsed }),
}))
