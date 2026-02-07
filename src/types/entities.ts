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
    faction: 'human' | 'alien'
    status: 'active' | 'damaged' | 'destroyed'
    shields?: number
    energy?: number
  }
  
  // Human Conventional Forces
  export const humanForces: Entity[] = [
    {
      id: 'human-1',
      type: 'Infantry Squad',
      callSign: 'Alpha-1',
      position: [18.315031623126444, 49.839447794058735],
      route: [
        [18.315031623126444, 49.839447794058735],
        [18.320031623126444, 49.844447794058735],
        [18.325031623126444, 49.849447794058735]
      ],
      task: 'Patrol sector A - Contact expected',
      speed: 5,
      damage: 0,
      ammunition: 100,
      natoCode: 'SFG-UCI----D',
      faction: 'human',
      status: 'active'
    },
    {
      id: 'human-2',
      type: 'Infantry Squad',
      callSign: 'Alpha-2',
      position: [18.318031623126444, 49.841447794058735],
      route: [
        [18.318031623126444, 49.841447794058735],
        [18.323031623126444, 49.846447794058735],
        [18.328031623126444, 49.851447794058735]
      ],
      task: 'Support Alpha-1',
      speed: 5,
      damage: 15,
      ammunition: 85,
      natoCode: 'SFG-UCI----D',
      faction: 'human',
      status: 'active'
    },
    
    {
      id: 'human-3',
      type: 'Main Battle Tank',
      callSign: 'Bravo-1',
      position: [18.324473977285248, 49.8457614117048],
      route: [
        [18.324473977285248, 49.8457614117048],
        [18.329473977285248, 49.8507614117048],
        [18.334473977285248, 49.8557614117048]
      ],
      task: 'Armored spearhead',
      speed: 15,
      damage: 10,
      ammunition: 80,
      natoCode: 'SFG-UCAT---D',
      faction: 'human',
      status: 'active'
    },
    {
      id: 'human-4',
      type: 'Tank Platoon',
      callSign: 'Bravo-2',
      position: [18.327473977285248, 49.8437614117048],
      route: [
        [18.327473977285248, 49.8437614117048],
        [18.332473977285248, 49.8487614117048],
        [18.337473977285248, 49.8537614117048]
      ],
      task: 'Flank security',
      speed: 14,
      damage: 25,
      ammunition: 60,
      natoCode: 'SFG-UCAT---D',
      faction: 'human',
      status: 'damaged'
    },
  
    {
      id: 'human-5',
      type: 'Artillery Battery',
      callSign: 'Charlie-1',
      position: [18.319554013802502, 49.83983240348779],
      route: [
        [18.319554013802502, 49.83983240348779],
        [18.322554013802502, 49.84283240348779],
        [18.325554013802502, 49.84583240348779]
      ],
      task: 'Fire support - Priority targets',
      speed: 8,
      damage: 5,
      ammunition: 60,
      natoCode: 'SFG-UCFH---D',
      faction: 'human',
      status: 'active'
    },
    {
      id: 'human-6',
      type: 'MLRS Battery',
      callSign: 'Charlie-2',
      position: [18.316554013802502, 49.83783240348779],
      route: [
        [18.316554013802502, 49.83783240348779],
        [18.319554013802502, 49.84083240348779]
      ],
      task: 'Area denial',
      speed: 10,
      damage: 0,
      ammunition: 45,
      natoCode: 'SFG-UCFR---D',
      faction: 'human',
      status: 'active'
    },
  
    {
      id: 'human-7',
      type: 'SAM Battery',
      callSign: 'Delta-1',
      position: [18.312554013802502, 49.83583240348779],
      route: [
        [18.312554013802502, 49.83583240348779]
      ],
      task: 'Air defense - Alien craft detected',
      speed: 12,
      damage: 0,
      ammunition: 90,
      natoCode: 'SFG-UCAD---D',
      faction: 'human',
      status: 'active'
    },
  
    {
      id: 'human-8',
      type: 'Mobile HQ',
      callSign: 'Warhammer-6',
      position: [18.308554013802502, 49.83283240348779],
      route: [
        [18.308554013802502, 49.83283240348779]
      ],
      task: 'Command and Control',
      speed: 6,
      damage: 0,
      ammunition: 0,
      natoCode: 'SFG-UH-----D',
      faction: 'human',
      status: 'active'
    }
  ]
  
  // Alien Invasion Forces
  export const alienForces: Entity[] = [
    {
      id: 'alien-1',
      type: 'Scout Drone',
      callSign: 'Recon-Beta-7',
      position: [18.335031623126444, 49.854447794058735],
      route: [
        [18.335031623126444, 49.854447794058735],
        [18.330031623126444, 49.849447794058735],
        [18.325031623126444, 49.844447794058735],
        [18.320031623126444, 49.839447794058735]
      ],
      task: 'Reconnaissance - Human positions',
      speed: 25,
      damage: 0,
      ammunition: 50,
      natoCode: 'SHG-UCI----H',
      faction: 'alien',
      status: 'active',
      shields: 100,
      energy: 100
    },
    {
      id: 'alien-2',
      type: 'Scout Drone',
      callSign: 'Recon-Beta-9',
      position: [18.338031623126444, 49.857447794058735],
      route: [
        [18.338031623126444, 49.857447794058735],
        [18.333031623126444, 49.852447794058735],
        [18.328031623126444, 49.847447794058735]
      ],
      task: 'Electronic warfare',
      speed: 25,
      damage: 10,
      ammunition: 45,
      natoCode: 'SHG-UCIW---H',
      faction: 'alien',
      status: 'active',
      shields: 85,
      energy: 90
    },
  
    {
      id: 'alien-3',
      type: 'Assault Walker',
      callSign: 'Strike-Alpha-3',
      position: [18.340473977285248, 49.8607614117048],
      route: [
        [18.340473977285248, 49.8607614117048],
        [18.335473977285248, 49.8557614117048],
        [18.330473977285248, 49.8507614117048],
        [18.325473977285248, 49.8457614117048]
      ],
      task: 'Seek and destroy armor',
      speed: 18,
      damage: 20,
      ammunition: 75,
      natoCode: 'SHG-UCAT---H',
      faction: 'alien',
      status: 'damaged',
      shields: 60,
      energy: 80
    },
    {
      id: 'alien-4',
      type: 'Assault Walker',
      callSign: 'Strike-Alpha-5',
      position: [18.343473977285248, 49.8637614117048],
      route: [
        [18.343473977285248, 49.8637614117048],
        [18.338473977285248, 49.8587614117048],
        [18.333473977285248, 49.8537614117048]
      ],
      task: 'Hunter-killer protocol',
      speed: 18,
      damage: 0,
      ammunition: 90,
      natoCode: 'SHG-UCAW---H',
      faction: 'alien',
      status: 'active',
      shields: 100,
      energy: 95
    },
  
    {
      id: 'alien-5',
      type: 'Devastator Mech',
      callSign: 'Heavy-Gamma-1',
      position: [18.345554013802502, 49.86583240348779],
      route: [
        [18.345554013802502, 49.86583240348779],
        [18.340554013802502, 49.86083240348779],
        [18.335554013802502, 49.85583240348779],
        [18.330554013802502, 49.85083240348779]
      ],
      task: 'Area bombardment',
      speed: 12,
      damage: 15,
      ammunition: 85,
      natoCode: 'SHG-UCFH---H',
      faction: 'alien',
      status: 'active',
      shields: 90,
      energy: 75
    },
    {
      id: 'alien-6',
      type: 'Siege Platform',
      callSign: 'Heavy-Gamma-2',
      position: [18.348554013802502, 49.86883240348779],
      route: [
        [18.348554013802502, 49.86883240348779],
        [18.343554013802502, 49.86383240348779],
        [18.338554013802502, 49.85883240348779]
      ],
      task: 'Breach defensive lines',
      speed: 8,
      damage: 30,
      ammunition: 70,
      natoCode: 'SHG-UCFR---H',
      faction: 'alien',
      status: 'damaged',
      shields: 55,
      energy: 60
    },
  
    {
      id: 'alien-7',
      type: 'Energy Harvester',
      callSign: 'Support-Delta-4',
      position: [18.352554013802502, 49.87283240348779],
      route: [
        [18.352554013802502, 49.87283240348779],
        [18.350554013802502, 49.87083240348779]
      ],
      task: 'Energy collection and distribution',
      speed: 6,
      damage: 0,
      ammunition: 0,
      natoCode: 'SHG-UCS----H',
      faction: 'alien',
      status: 'active',
      shields: 80,
      energy: 100
    },
  
    {
      id: 'alien-8',
      type: 'Interceptor',
      callSign: 'Air-Epsilon-1',
      position: [18.346031623126444, 49.867447794058735],
      route: [
        [18.346031623126444, 49.867447794058735],
        [18.340031623126444, 49.861447794058735],
        [18.334031623126444, 49.855447794058735],
        [18.328031623126444, 49.849447794058735]
      ],
      task: 'Air superiority',
      speed: 35,
      damage: 5,
      ammunition: 95,
      natoCode: 'SHA-MFF----H',
      faction: 'alien',
      status: 'active',
      shields: 95,
      energy: 90
    },
    {
      id: 'alien-9',
      type: 'Bomber Craft',
      callSign: 'Air-Epsilon-3',
      position: [18.349031623126444, 49.870447794058735],
      route: [
        [18.349031623126444, 49.870447794058735],
        [18.343031623126444, 49.864447794058735],
        [18.337031623126444, 49.858447794058735],
        [18.331031623126444, 49.852447794058735]
      ],
      task: 'Strategic bombardment',
      speed: 30,
      damage: 0,
      ammunition: 100,
      natoCode: 'SHA-MFB----H',
      faction: 'alien',
      status: 'active',
      shields: 100,
      energy: 85
    },
  
    {
      id: 'alien-10',
      type: 'Command Nexus',
      callSign: 'Overmind',
      position: [18.355554013802502, 49.87583240348779],
      route: [
        [18.355554013802502, 49.87583240348779]
      ],
      task: 'Hive coordination',
      speed: 4,
      damage: 0,
      ammunition: 0,
      natoCode: 'SHG-UH-----H',
      faction: 'alien',
      status: 'active',
      shields: 100,
      energy: 100
    }
  ]
  
  export const mockEntities: Entity[] = [...humanForces, ...alienForces]
  
  export const getEntitiesByFaction = (faction: 'human' | 'alien'): Entity[] => {
    return mockEntities.filter(entity => entity.faction === faction)
  }
  
  export const getActiveEntities = (): Entity[] => {
    return mockEntities.filter(entity => entity.status === 'active')
  }
  
  export const getEntityById = (id: string): Entity | undefined => {
    return mockEntities.find(entity => entity.id === id)
  }