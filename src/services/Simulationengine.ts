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
    ? Math.max(3, entity1.ammunition / 10)
    : 0
  const entity2DamageDealt = entity2.ammunition > 0
    ? Math.max(3, entity2.ammunition / 10)
    : 0

  let updatedEntity1 = { ...entity1 }
  let updatedEntity2 = { ...entity2 }

  if (entity1DamageDealt > 0) {
    updatedEntity2.damage = Math.min(100, updatedEntity2.damage + entity1DamageDealt)
  }

  if (entity2DamageDealt > 0) {
    updatedEntity1.damage = Math.min(100, updatedEntity1.damage + entity2DamageDealt)
  }

  updatedEntity1.ammunition = Math.max(0, updatedEntity1.ammunition - 2)
  updatedEntity2.ammunition = Math.max(0, updatedEntity2.ammunition - 2)

  if (updatedEntity1.damage >= 100) {
    updatedEntity1.status = 'destroyed'
  } else if (updatedEntity1.damage >= 50) {
    updatedEntity1.status = 'damaged'
  }

  if (updatedEntity2.damage >= 100) {
    updatedEntity2.status = 'destroyed'
  } else if (updatedEntity2.damage >= 50) {
    updatedEntity2.status = 'damaged'
  }

  const combatLog = `${entity1.callSign} engaged ${entity2.callSign}! Damage dealt: ${entity1DamageDealt.toFixed(1)} / ${entity2DamageDealt.toFixed(1)}`

  return { entity1: updatedEntity1, entity2: updatedEntity2, combatLog }
}