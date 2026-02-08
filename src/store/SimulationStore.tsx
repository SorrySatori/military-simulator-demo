import { create } from 'zustand'
import type { Unit } from '../types/units'
import { moveUnit, checkCollision, resolveCombat, hasReachedDestination } from '../services/SimulationEngine'
import { mockunits } from '../types/units'

interface SimulationState {
  selectedUnit: Unit | null
  setSelectedUnit: (unit: Unit | null) => void
  
  isRunning: boolean
  setIsRunning: (running: boolean) => void
  toggleRunning: () => void
  
  speed: number
  setSpeed: (speed: number) => void
  
  currentTime: number
  setCurrentTime: (time: number) => void
  incrementTime: () => void
  resetTime: () => void
  
  units: Unit[]
  setunits: (units: Unit[]) => void
  updateUnit: (id: string, updates: Partial<Unit>) => void
  tick: (deltaTime: number) => void
  resetunits: () => void
  
  combatLogs: string[]
  addCombatLog: (log: string) => void
  clearCombatLogs: () => void
}

export const useSimulationStore = create<SimulationState>((set) => ({
  selectedUnit: null,
  setSelectedUnit: (unit) => set({ selectedUnit: unit }),
  
  isRunning: false,
  setIsRunning: (running) => set({ isRunning: running }),
  toggleRunning: () => set((state) => ({ isRunning: !state.isRunning })),
  
  speed: 50,
  setSpeed: (speed) => set({ speed }),
  
  currentTime: 0,
  setCurrentTime: (time) => set({ currentTime: time }),
  incrementTime: () => set((state) => ({ currentTime: state.currentTime + 1 })),
  resetTime: () => set({ currentTime: 0 }),
  
  units: mockunits,
  setunits: (units) => set({ units }),
  updateUnit: (id, updates) => set((state) => ({
    units: state.units.map((unit) =>
      unit.id === id ? { ...unit, ...updates } : unit
    )
  })),
  
  tick: (deltaTime) => set((state) => {
    let updatedunits = state.units.map((unit) => {
      if (unit.status === 'destroyed') return unit
      return moveUnit(unit, deltaTime, state.speed)
    })
    
    const newCombatLogs: string[] = []
    const unitMap = new Map(updatedunits.map(e => [e.id, e]))
    
    for (let i = 0; i < updatedunits.length; i++) {
      for (let j = i + 1; j < updatedunits.length; j++) {
        const unit1 = unitMap.get(updatedunits[i].id)!
        const unit2 = unitMap.get(updatedunits[j].id)!
        
        if (unit1.status === 'destroyed' || unit2.status === 'destroyed') {
          continue
        }
        
        if (checkCollision(unit1, unit2)) {
          const combatResult = resolveCombat(unit1, unit2)
          
          unitMap.set(unit1.id, combatResult.unit1)
          unitMap.set(unit2.id, combatResult.unit2)
          
          if (combatResult.combatLog) {
            newCombatLogs.push(combatResult.combatLog)
          }
        }
      }
    }
    
    updatedunits = Array.from(unitMap.values())
    
    const allFinished = updatedunits.every(unit => 
      unit.status === 'destroyed' || hasReachedDestination(unit)
    )
    
    return { 
      units: updatedunits,
      combatLogs: [...state.combatLogs, ...newCombatLogs].slice(-50),
      isRunning: allFinished ? false : state.isRunning
    }
  }),
  
  resetunits: () => set({ units: mockunits }),
  
  combatLogs: [],
  addCombatLog: (log) => set((state) => ({
    combatLogs: [...state.combatLogs, log].slice(-50)
  })),
  clearCombatLogs: () => set({ combatLogs: [] })
}))