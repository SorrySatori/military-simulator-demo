import { create } from 'zustand'
import type { Unit } from '../types/units'
import { moveUnit, checkCollision, resolveCombat, hasReachedDestination } from '../services/SimulationEngine'
import { wsService } from '../services/WebSocketService'

interface SimulationState {
  selectedUnit: Unit | null
  setSelectedUnit: (unit: Unit | null) => void
  
  isRunning: boolean
  setIsRunning: (running: boolean) => void
  toggleRunning: () => void
  
  simulationEnded: boolean
  setSimulationEnded: (ended: boolean) => void
  
  speed: number
  setSpeed: (speed: number) => void
    
  units: Unit[]
  setunits: (units: Unit[]) => void
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
  
  simulationEnded: false,
  setSimulationEnded: (ended) => set({ simulationEnded: ended }),
  
  speed: 50,
  setSpeed: (speed) => set({ speed }),
  
  units: [],
  setunits: (units) => set({ units }),
  
  tick: (deltaTime) => set((state) => {
    let updatedUnits = state.units.map((unit) => {
      if (unit.status === 'destroyed') return unit
      return moveUnit(unit, deltaTime, state.speed)
    })
    
    const newCombatLogs: string[] = []
    const unitMap = new Map(updatedUnits.map(e => [e.id, e]))
    
    for (let i = 0; i < updatedUnits.length; i++) {
      for (let j = i + 1; j < updatedUnits.length; j++) {
        const unit1 = unitMap.get(updatedUnits[i].id)!
        const unit2 = unitMap.get(updatedUnits[j].id)!
        
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
    
    updatedUnits = Array.from(unitMap.values())
    
    const allFinished = updatedUnits.every(unit => 
      unit.status === 'destroyed' || hasReachedDestination(unit)
    )
    
    return { 
      units: updatedUnits,
      combatLogs: [...state.combatLogs, ...newCombatLogs].slice(-50),
      isRunning: allFinished ? false : state.isRunning,
      simulationEnded: allFinished ? true : state.simulationEnded
    }
  }),
  
  resetunits: () => {
    wsService.send('reset_units')
    set({ simulationEnded: false, combatLogs: [] })
  },
  
  combatLogs: [],
  addCombatLog: (log) => set((state) => ({
    combatLogs: [...state.combatLogs, log].slice(-50)
  })),
  clearCombatLogs: () => set({ combatLogs: [] })
}))