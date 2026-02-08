import type { Unit } from '../types/units'

export function moveUnit(
  unit: Unit,
  deltaTime: number,
  speedMultiplier: number
): Unit {
  if (!unit.route || unit.route.length < 2) {
    return unit
  }

  const totalDistanceToTravel = calculateDistancePerFrame(
    unit.speed, 
    speedMultiplier, 
    deltaTime
  )

  const moveResult = moveAlongRoute(
    unit.position,
    unit.route,
    unit.currentWaypointIndex,
    totalDistanceToTravel
  )

  return { 
    ...unit, 
    position: moveResult.newPosition,
    currentWaypointIndex: moveResult.newWaypointIndex
  }
}

function calculateDistancePerFrame(
  speedKmPerHour: number,
  speedMultiplier: number,
  deltaTimeSeconds: number
): number {
  const speedKmPerSecond = (speedKmPerHour * speedMultiplier) / 3600
  
  const speedDegreesPerSecond = speedKmPerSecond / 111
  
  const distanceInDegrees = speedDegreesPerSecond * deltaTimeSeconds
  
  return distanceInDegrees
}

function moveAlongRoute(
  startPosition: [number, number],
  route: [number, number][],
  startWaypointIndex: number,
  distanceBudget: number
): {
  newPosition: [number, number]
  newWaypointIndex: number
} {
  let currentPosition = [...startPosition] as [number, number]
  let remainingDistance = distanceBudget
  let currentWaypointIndex = startWaypointIndex

  const MINIMUM_DISTANCE = 0.00001
  
  while (remainingDistance > MINIMUM_DISTANCE) {
    if (currentWaypointIndex >= route.length - 1) {
      currentPosition = route[route.length - 1]
      break
    }

    const nextWaypoint = route[currentWaypointIndex + 1]

    const moveResult = moveTowardWaypoint(
      currentPosition,
      nextWaypoint,
      remainingDistance
    )

    currentPosition = moveResult.newPosition
    remainingDistance = moveResult.remainingDistance

    if (moveResult.reachedWaypoint) {
      currentWaypointIndex++
      
      if (currentWaypointIndex >= route.length - 1) {
        break
      }
    } else {
      break
    }
  }

  return {
    newPosition: currentPosition,
    newWaypointIndex: currentWaypointIndex
  }
}

function moveTowardWaypoint(
  currentPosition: [number, number],
  targetWaypoint: [number, number],
  distanceBudget: number
): {
  newPosition: [number, number]
  remainingDistance: number
  reachedWaypoint: boolean
} {
  const deltaX = targetWaypoint[0] - currentPosition[0]
  const deltaY = targetWaypoint[1] - currentPosition[1]
  const distanceToTarget = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

  if (distanceBudget >= distanceToTarget) {
    return {
      newPosition: [...targetWaypoint] as [number, number],
      remainingDistance: distanceBudget - distanceToTarget,
      reachedWaypoint: true
    }
  }

  const travelRatio = distanceBudget / distanceToTarget
  const newPosition: [number, number] = [
    currentPosition[0] + deltaX * travelRatio,
    currentPosition[1] + deltaY * travelRatio
  ]

  return {
    newPosition,
    remainingDistance: 0,
    reachedWaypoint: false
  }
}

function getDistance(pos1: [number, number], pos2: [number, number]): number {
  const dx = pos2[0] - pos1[0]
  const dy = pos2[1] - pos1[1]
  return Math.sqrt(dx * dx + dy * dy)
}

export function hasReachedDestination(unit: Unit): boolean {
  if (!unit.route || unit.route.length < 2) {
    return true
  }
  
  if (unit.currentWaypointIndex >= unit.route.length - 1) {
    return true
  }
  
  const finalWaypoint = unit.route[unit.route.length - 1]
  const distance = getDistance(unit.position, finalWaypoint)
  
  return distance < 0.0001
}

export function checkCollision(unit1: Unit, unit2: Unit): boolean {
  const distance = getDistance(unit1.position, unit2.position)

  const baseDistance = 0.005
  const rangeBonus = 0.002
  
  const maxRange = Math.max(unit1.range || 0, unit2.range || 0)
  const combatDistance = baseDistance + (maxRange * rangeBonus)
  
  return distance < combatDistance
}

export function resolveCombat(unit1: Unit, unit2: Unit): {
  unit1: Unit
  unit2: Unit
  combatLog: string | null
} {
  if (unit1.faction === unit2.faction) {
    return { unit1, unit2, combatLog: null }
  }

  const distance = getDistance(unit1.position, unit2.position)
  const baseRange = 0.005
  const rangeIncrement = 0.002
  
  const unit1Range = baseRange + ((unit1.range || 0) * rangeIncrement)
  const unit2Range = baseRange + ((unit2.range || 0) * rangeIncrement)
  
  const unit1CanHit = distance <= unit1Range
  const unit2CanHit = distance <= unit2Range
  
  const unit1DamageDealt = (unit1CanHit && unit1.ammunition > 0)
    ? Math.max(3, unit1.ammunition / 10)
    : 0
  const unit2DamageDealt = (unit2CanHit && unit2.ammunition > 0)
    ? Math.max(3, unit2.ammunition / 10)
    : 0

  let updated1 = { ...unit1 }
  let updated2 = { ...unit2 }

  if (unit1DamageDealt > 0) {

    updated2.damage = Math.min(100, updated2.damage + unit1DamageDealt)
  }

  if (unit2DamageDealt > 0) {
      updated1.damage = Math.min(100, updated1.damage + unit2DamageDealt)
  }

  if (unit1CanHit && unit1.ammunition > 0) {
    updated1.ammunition = Math.max(0, updated1.ammunition - 5)
  }
  if (unit2CanHit && unit2.ammunition > 0) {
    updated2.ammunition = Math.max(0, updated2.ammunition - 5)
  }

  if (updated1.damage >= 100) {
    updated1.status = 'destroyed'
  } else if (updated1.damage >= 50) {
    updated1.status = 'damaged'
  }

  if (updated2.damage >= 100) {
    updated2.status = 'destroyed'
  } else if (updated2.damage >= 50) {
    updated2.status = 'damaged'
  }

  let combatLog = ''
  if (unit1CanHit && unit2CanHit) {
    combatLog = `${unit1.callSign} ⚔️ ${unit2.callSign} - Damage: ${unit1DamageDealt.toFixed(1)} / ${unit2DamageDealt.toFixed(1)}`
  } else if (unit1CanHit && !unit2CanHit) {
    combatLog = `${unit1.callSign} 🎯 ${unit2.callSign} (OUT OF RANGE) - Damage: ${unit1DamageDealt.toFixed(1)} / 0`
  } else if (!unit1CanHit && unit2CanHit) {
    combatLog = `${unit2.callSign} 🎯 ${unit1.callSign} (OUT OF RANGE) - Damage: ${unit2DamageDealt.toFixed(1)} / 0`
  }

  return { unit1: updated1, unit2: updated2, combatLog }
}