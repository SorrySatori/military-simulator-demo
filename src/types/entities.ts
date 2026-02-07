export interface Entity {
    id: string
    type: string
    callSign: string
    position: [number, number]
    route: [number, number][]
    task: string
    speed: number
    damage: number
    ammunition: number
    natoCode: string
  }
  
  export const mockEntities: Entity[] = [
    {
      id: 'unit-1',
      type: 'Infantry Squad',
      callSign: 'Alpha-1',
      position: [18.315031623126444, 49.839447794058735],
      route: [
        [18.315031623126444, 49.839447794058735],
        [18.315031623126444, 49.849447794058735,],
        [18.315031623126444, 49.859447794058735]
      ],
      task: 'Patrol sector A',
      speed: 5,
      damage: 0,
      ammunition: 100,
      natoCode: 'SFG-UCI----D'
    },
    {
      id: 'unit-2',
      type: 'Tank Platoon',
      callSign: 'Bravo-2',
      position: [18.324473977285248, 49.8457614117048],
      route: [
        [18.324473977285248, 49.8457614117048],
        [18.324473977285248, 49.9457614117048],
        [18.324473977285248, 49.9957614117048]
      ],
      task: 'Defend position',
      speed: 15,
      damage: 10,
      ammunition: 80,
      natoCode: 'SFG-UCAT---D'
    },
    {
      id: 'unit-3',
      type: 'Artillery Battery',
      callSign: 'Charlie-3',
      position: [18.319554013802502, 49.83983240348779],
      route: [
        [18.319554013802502, 49.83983240348779],
        [18.419554013802502, 49.93983240348779]
      ],
      task: 'Fire support',
      speed: 8,
      damage: 5,
      ammunition: 60,
      natoCode: 'SFG-UCFH---D'
    }
  ]