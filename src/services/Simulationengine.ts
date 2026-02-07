import type { Entity } from '../types/entities'

export function moveEntity(
  entity: Entity,
  deltaTime: number,
  speedMultiplier: number
): Entity {
  if (!entity.route || entity.route.length < 2) {
    return entity
  }

  const speedKmPerSec = (entity.speed * speedMultiplier) / 3600
  const distanceDegrees = speedKmPerSec / 111
  let remainingDistance = distanceDegrees * deltaTime

  let currentPos = [...entity.position] as [number, number]
  let currentSegmentIndex = findCurrentSegment(currentPos, entity.route)

  let iterations = 0
  const maxIterations = 100 // Safety limit

  while (remainingDistance > 0.00001 && iterations < maxIterations) {
    iterations++

    const segmentEnd = entity.route[currentSegmentIndex + 1]

    if (!segmentEnd) {
      currentPos = entity.route[entity.route.length - 1]
      break
    }

    const dx = segmentEnd[0] - currentPos[0]
    const dy = segmentEnd[1] - currentPos[1]
    const distanceToEnd = Math.sqrt(dx * dx + dy * dy)

    if (remainingDistance >= distanceToEnd) {
      currentPos = [...segmentEnd] as [number, number]
      remainingDistance -= distanceToEnd
      currentSegmentIndex++

      if (currentSegmentIndex >= entity.route.length - 1) {
        break
      }
    } else {
      const ratio = remainingDistance / distanceToEnd
      currentPos = [
        currentPos[0] + dx * ratio,
        currentPos[1] + dy * ratio
      ]
      remainingDistance = 0
    }
  }

  return { ...entity, position: currentPos }
}

function findCurrentSegment(currentPos: [number, number], route: [number, number][]): number {
  let closestSegment = 0
  let minDistance = Infinity

  for (let i = 0; i < route.length - 1; i++) {
    const segmentStart = route[i]
    const segmentEnd = route[i + 1]
    
    const distToStart = getDistance(currentPos, segmentStart)
    const distToEnd = getDistance(currentPos, segmentEnd)
    const segmentLength = getDistance(segmentStart, segmentEnd)
    
    const totalDist = distToStart + distToEnd
    const diff = Math.abs(totalDist - segmentLength)
    
    if (diff < 0.001) {
      return i
    }

    if (distToStart < minDistance) {
      minDistance = distToStart
      closestSegment = i
    }
  }

  return closestSegment
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
  
  const finalWaypoint = entity.route[entity.route.length - 1]
  const distance = getDistance(entity.position, finalWaypoint)
  
  return distance < 0.0001
}

export function checkCollision(entity1: Entity, entity2: Entity): boolean {
  const distance = getDistance(entity1.position, entity2.position)
  
  const collisionDistance = 0.005
  
  return distance < collisionDistance
}

export function resolveCombat(entity1: Entity, entity2: Entity): {
  entity1: Entity
  entity2: Entity
  combatLog: string | null
} {
  if (entity1.faction === entity2.faction) {
    return { entity1, entity2, combatLog: null }
  }

  const entity1DamageDealt = entity1.ammunition > 0 
    ? Math.min(15, Math.max(3, entity1.ammunition / 10))
    : 0
  const entity2DamageDealt = entity2.ammunition > 0
    ? Math.min(15, Math.max(3, entity2.ammunition / 10))
    : 0

  let updated1 = { ...entity1 }
  let updated2 = { ...entity2 }

  if (entity1DamageDealt > 0) {
    if (updated2.shields !== undefined && updated2.shields > 0) {
      updated2.shields = Math.max(0, updated2.shields - entity1DamageDealt)
      if (updated2.shields === 0) {
        const overflow = entity1DamageDealt - (entity2.shields || 0)
        if (overflow > 0) {
          updated2.damage = Math.min(100, updated2.damage + overflow)
        }
      }
    } else {
      updated2.damage = Math.min(100, updated2.damage + entity1DamageDealt)
    }
  }

  if (entity2DamageDealt > 0) {
    if (updated1.shields !== undefined && updated1.shields > 0) {
      updated1.shields = Math.max(0, updated1.shields - entity2DamageDealt)
      if (updated1.shields === 0) {
        const overflow = entity2DamageDealt - (entity1.shields || 0)
        if (overflow > 0) {
          updated1.damage = Math.min(100, updated1.damage + overflow)
        }
      }
    } else {
      updated1.damage = Math.min(100, updated1.damage + entity2DamageDealt)
    }
  }

  updated1.ammunition = Math.max(0, updated1.ammunition - 2)
  updated2.ammunition = Math.max(0, updated2.ammunition - 2)

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

  const combatLog = `${entity1.callSign} engaged ${entity2.callSign}! Damage dealt: ${entity1DamageDealt.toFixed(1)} / ${entity2DamageDealt.toFixed(1)}`

  return { entity1: updated1, entity2: updated2, combatLog }
}