import type { Entity } from '../types/entities'

export function moveEntity(
  entity: Entity,
  deltaTime: number,
  speedMultiplier: number
): Entity {
  if (!entity.route || entity.route.length < 2) {
    return entity
  }

  const totalDistanceToTravel = calculateDistancePerFrame(
    entity.speed, 
    speedMultiplier, 
    deltaTime
  )

  const moveResult = moveAlongRoute(
    entity.position,
    entity.route,
    entity.currentWaypointIndex,
    totalDistanceToTravel
  )

  return { 
    ...entity, 
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

export function hasReachedDestination(entity: Entity): boolean {
  if (!entity.route || entity.route.length < 2) {
    return true
  }
  
  if (entity.currentWaypointIndex >= entity.route.length - 1) {
    return true
  }
  
  const finalWaypoint = entity.route[entity.route.length - 1]
  const distance = getDistance(entity.position, finalWaypoint)
  
  return distance < 0.0001
}

export function checkCollision(entity1: Entity, entity2: Entity): boolean {
  const distance = getDistance(entity1.position, entity2.position)

  const baseDistance = 0.005
  const rangeBonus = 0.002
  
  const maxRange = Math.max(entity1.range || 0, entity2.range || 0)
  const combatDistance = baseDistance + (maxRange * rangeBonus)
  
  return distance < combatDistance
}

export function resolveCombat(entity1: Entity, entity2: Entity): {
  entity1: Entity
  entity2: Entity
  combatLog: string | null
} {
  if (entity1.faction === entity2.faction) {
    return { entity1, entity2, combatLog: null }
  }

  const distance = getDistance(entity1.position, entity2.position)
  const baseRange = 0.005
  const rangeIncrement = 0.002
  
  const entity1Range = baseRange + ((entity1.range || 0) * rangeIncrement)
  const entity2Range = baseRange + ((entity2.range || 0) * rangeIncrement)
  
  const entity1CanHit = distance <= entity1Range
  const entity2CanHit = distance <= entity2Range
  
  const entity1DamageDealt = (entity1CanHit && entity1.ammunition > 0)
    ? Math.max(3, entity1.ammunition / 10)
    : 0
  const entity2DamageDealt = (entity2CanHit && entity2.ammunition > 0)
    ? Math.max(3, entity2.ammunition / 10)
    : 0

  let updated1 = { ...entity1 }
  let updated2 = { ...entity2 }

  if (entity1DamageDealt > 0) {

    updated2.damage = Math.min(100, updated2.damage + entity1DamageDealt)
  }

  if (entity2DamageDealt > 0) {
      updated1.damage = Math.min(100, updated1.damage + entity2DamageDealt)
  }

  if (entity1CanHit && entity1.ammunition > 0) {
    updated1.ammunition = Math.max(0, updated1.ammunition - 5)
  }
  if (entity2CanHit && entity2.ammunition > 0) {
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
  if (entity1CanHit && entity2CanHit) {
    combatLog = `${entity1.callSign} ⚔️ ${entity2.callSign} - Damage: ${entity1DamageDealt.toFixed(1)} / ${entity2DamageDealt.toFixed(1)}`
  } else if (entity1CanHit && !entity2CanHit) {
    combatLog = `${entity1.callSign} 🎯 ${entity2.callSign} (OUT OF RANGE) - Damage: ${entity1DamageDealt.toFixed(1)} / 0`
  } else if (!entity1CanHit && entity2CanHit) {
    combatLog = `${entity2.callSign} 🎯 ${entity1.callSign} (OUT OF RANGE) - Damage: ${entity2DamageDealt.toFixed(1)} / 0`
  }

  return { entity1: updated1, entity2: updated2, combatLog }
}