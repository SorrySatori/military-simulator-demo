import { create } from 'zustand'
import type { Entity } from '../types/entities'

interface SimulationState {
  selectedEntity: Entity | null
  setSelectedEntity: (entity: Entity | null) => void
  
  isRunning: boolean
  setIsRunning: (running: boolean) => void
  toggleRunning: () => void
  
  speed: number
  setSpeed: (speed: number) => void
  
  currentTime: number
  setCurrentTime: (time: number) => void
  incrementTime: () => void
  resetTime: () => void
  
  entities: Entity[]
  setEntities: (entities: Entity[]) => void
  updateEntity: (id: string, updates: Partial<Entity>) => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  selectedEntity: null,
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
  
  isRunning: false,
  setIsRunning: (running) => set({ isRunning: running }),
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  
  speed: 1,
  setSpeed: (speed) => set({ speed }),
  
  currentTime: 0,
  setCurrentTime: (time) => set({ currentTime: time }),
  incrementTime: () => set((state) => ({ currentTime: state.currentTime + 1 })),
  resetTime: () => set({ currentTime: 0 }),
  
  entities: [],
  setEntities: (entities) => set({ entities }),
  updateEntity: (id, updates) => set((state) => ({
    entities: state.entities.map((entity) =>
      entity.id === id ? { ...entity, ...updates } : entity
    )
  }))
}))