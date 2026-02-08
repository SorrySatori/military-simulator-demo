import type { Unit } from '../types/units'

export interface FactionStats {
  totalUnits: number
  active: number
  damaged: number
  destroyed: number
  reachedDestination: number
}

export const calculateFactionStats = (units: Unit[], faction: 'human' | 'alien'): FactionStats => {
  const factionUnits = units.filter(u => u.faction === faction)
  
  return {
    totalUnits: factionUnits.length,
    active: factionUnits.filter(u => u.status === 'active').length,
    damaged: factionUnits.filter(u => u.status === 'damaged').length,
    destroyed: factionUnits.filter(u => u.status === 'destroyed').length,
    reachedDestination: factionUnits.filter(u => u.currentWaypointIndex >= u.route.length - 1 && u.status !== 'destroyed').length
  }
}
