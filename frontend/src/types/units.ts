export interface Unit {
    id: string
    type: string
    callSign: string
    position: [number, number]
    route: [number, number][]
    currentWaypointIndex: number
    task: string
    speed: number
    damage: number
    range: number
    ammunition: number
    natoCode: string
    faction: 'human' | 'alien'
    status: 'active' | 'damaged' | 'destroyed'
  }