import { create } from 'zustand'
import type { Entity } from '../types/entities'
import { moveEntity, checkCollision, resolveCombat, hasReachedDestination } from '../services/Simulationengine'
import { mockEntities } from '../types/entities'

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
  tick: (deltaTime: number) => void
  resetEntities: () => void
  
  combatLogs: string[]
  addCombatLog: (log: string) => void
  clearCombatLogs: () => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  selectedEntity: null,
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
  
  isRunning: false,
  setIsRunning: (running) => set({ isRunning: running }),
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  
  speed: 50,
  setSpeed: (speed) => set({ speed }),
  
  currentTime: 0,
  setCurrentTime: (time) => set({ currentTime: time }),
  incrementTime: () => set((state) => ({ currentTime: state.currentTime + 1 })),
  resetTime: () => set({ currentTime: 0 }),
  
  entities: mockEntities,
  setEntities: (entities) => set({ entities }),
  updateEntity: (id, updates) => set((state) => ({
    entities: state.entities.map((entity) =>
      entity.id === id ? { ...entity, ...updates } : entity
    )
  })),
  
  tick: (deltaTime) => set((state) => {
    let updatedEntities = state.entities.map((entity) => {
      if (entity.status === 'destroyed') return entity
      return moveEntity(entity, deltaTime, state.speed)
    })
    
    const newCombatLogs: string[] = []
    const entityMap = new Map(updatedEntities.map(e => [e.id, e]))
    
    for (let i = 0; i < updatedEntities.length; i++) {
      for (let j = i + 1; j < updatedEntities.length; j++) {
        const entity1 = entityMap.get(updatedEntities[i].id)!
        const entity2 = entityMap.get(updatedEntities[j].id)!
        
        if (entity1.status === 'destroyed' || entity2.status === 'destroyed') {
          continue
        }
        
        if (checkCollision(entity1, entity2)) {
          const combatResult = resolveCombat(entity1, entity2)
          
          entityMap.set(entity1.id, combatResult.entity1)
          entityMap.set(entity2.id, combatResult.entity2)
          
          if (combatResult.combatLog) {
            newCombatLogs.push(combatResult.combatLog)
          }
        }
      }
    }
    
    updatedEntities = Array.from(entityMap.values())
    
    const allFinished = updatedEntities.every(entity => 
      entity.status === 'destroyed' || hasReachedDestination(entity)
    )
    
    return { 
      entities: updatedEntities,
      combatLogs: [...state.combatLogs, ...newCombatLogs].slice(-50),
      isRunning: allFinished ? false : state.isRunning
    }
  }),
  
  resetEntities: () => set({ entities: mockEntities }),
  
  combatLogs: [],
  addCombatLog: (log) => set((state) => ({
    combatLogs: [...state.combatLogs, log].slice(-50)
  })),
  clearCombatLogs: () => set({ combatLogs: [] })
}))