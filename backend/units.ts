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

export const humanForces: Unit[] = [
  {
    id: 'human-1',
    type: 'Infantry Squad',
    callSign: 'Alpha-1',
    position: [18.320000, 49.835000],
    route: [
      [18.320000, 49.835000],
      [18.320500, 49.837500],
      [18.321000, 49.840000],
      [18.321500, 49.842500],
      [18.322000, 49.845000],
      [18.322500, 49.847500],
      [18.323000, 49.850000],
      [18.323500, 49.852500],
      [18.324000, 49.855000],
      [18.324500, 49.857500],
      [18.325000, 49.860000],
      [18.325500, 49.862500],
      [18.326000, 49.865000],
      [18.326500, 49.867500],
      [18.327000, 49.870000],
      [18.327500, 49.872500],
      [18.328000, 49.875000],
      [18.328500, 49.877500],
      [18.329000, 49.880000]
    ],
    currentWaypointIndex: 0,
    task: 'Advance north - Engage alien forces',
    speed: 5,
    damage: 0,
    ammunition: 100,
    range: 1,
    natoCode: 'SFG-UCI----D',
    faction: 'human',
    status: 'active'
  },
  {
    id: 'human-2',
    type: 'Infantry Squad',
    callSign: 'Alpha-2',
    position: [18.325000, 49.836000],
    route: [
      [18.325000, 49.836000],
      [18.325500, 49.838500],
      [18.326000, 49.841000],
      [18.326500, 49.843500],
      [18.327000, 49.846000],
      [18.327500, 49.848500],
      [18.328000, 49.851000],
      [18.328500, 49.853500],
      [18.329000, 49.856000],
      [18.329500, 49.858500],
      [18.330000, 49.861000],
      [18.330500, 49.863500],
      [18.331000, 49.866000],
      [18.331500, 49.868500],
      [18.332000, 49.871000],
      [18.332500, 49.873500],
      [18.333000, 49.876000],
      [18.333500, 49.878500],
      [18.334000, 49.881000]
    ],
    currentWaypointIndex: 0,
    task: 'Advance north - Support Alpha-1',
    speed: 5,
    damage: 15,
    ammunition: 85,
    range: 1,
    natoCode: 'SFG-UCI----D',
    faction: 'human',
    status: 'active'
  },
  {
    id: 'human-3',
    type: 'Main Battle Tank',
    callSign: 'Bravo-1',
    position: [18.315000, 49.840000],
    route: [
      [18.315000, 49.840000],
      [18.315500, 49.842500],
      [18.316000, 49.845000],
      [18.317000, 49.847500],
      [18.318000, 49.850000],
      [18.319000, 49.852500],
      [18.320000, 49.855000],
      [18.321000, 49.857500],
      [18.322000, 49.860000],
      [18.323000, 49.862500],
      [18.324000, 49.865000],
      [18.325000, 49.867500],
      [18.326000, 49.870000],
      [18.327000, 49.872500],
      [18.328000, 49.875000],
      [18.329000, 49.877500],
      [18.330000, 49.880000]
    ],
    currentWaypointIndex: 0,
    task: 'Armored advance - Seek and destroy',
    speed: 20,
    damage: 10,
    ammunition: 80,
    range: 2,
    natoCode: 'SFG-UCAT---D',
    faction: 'human',
    status: 'active'
  },
  {
    id: 'human-4',
    type: 'Tank Platoon',
    callSign: 'Bravo-2',
    position: [18.330000, 49.838000],
    route: [
      [18.330000, 49.838000],
      [18.330500, 49.840500],
      [18.331000, 49.843000],
      [18.331500, 49.845500],
      [18.332000, 49.848000],
      [18.332500, 49.850500],
      [18.333000, 49.853000],
      [18.333500, 49.855500],
      [18.334000, 49.858000],
      [18.334500, 49.860500],
      [18.335000, 49.863000],
      [18.335500, 49.865500],
      [18.336000, 49.868000],
      [18.336500, 49.870500],
      [18.337000, 49.873000],
      [18.337500, 49.875500],
      [18.338000, 49.878000],
      [18.338500, 49.880500],
      [18.339000, 49.883000]
    ],
    currentWaypointIndex: 0,
    task: 'Advance north - Flank security',
    speed: 18,
    damage: 25,
    ammunition: 80,
    range: 2,
    natoCode: 'SFG-UCAT---D',
    faction: 'human',
    status: 'damaged'
  },
  {
    id: 'human-5',
    type: 'Self-Propelled Howitzer',
    callSign: 'Charlie-1',
    position: [18.310000, 49.835000],
    route: [
      [18.310000, 49.835000],
      [18.311000, 49.838000],
      [18.312000, 49.841000],
      [18.313000, 49.844000],
      [18.314000, 49.847000],
      [18.315000, 49.850000],
      [18.316000, 49.853000],
      [18.317000, 49.856000],
      [18.318000, 49.859000],
      [18.319000, 49.862000],
      [18.320000, 49.865000],
      [18.321000, 49.868000],
      [18.322000, 49.871000],
      [18.323000, 49.874000],
      [18.324000, 49.877000],
      [18.325000, 49.880000]
    ],
    currentWaypointIndex: 0,
    task: 'Fire support - Priority targets',
    speed: 12,
    damage: 5,
    ammunition: 70,
    range: 3,
    natoCode: 'SFG-UCFH---D',
    faction: 'human',
    status: 'active'
  },
  {
    id: 'human-6',
    type: 'Rocket Artillery',
    callSign: 'Charlie-2',
    position: [18.335000, 49.833000],
    route: [
      [18.335000, 49.833000],
      [18.335500, 49.836000],
      [18.336000, 49.839000],
      [18.336500, 49.842000],
      [18.337000, 49.845000],
      [18.337500, 49.848000],
      [18.338000, 49.851000],
      [18.338500, 49.854000],
      [18.339000, 49.857000],
      [18.339500, 49.860000],
      [18.340000, 49.863000],
      [18.340500, 49.866000],
      [18.341000, 49.869000],
      [18.341500, 49.872000],
      [18.342000, 49.875000],
      [18.342500, 49.878000],
      [18.343000, 49.881000]
    ],
    currentWaypointIndex: 0,
    task: 'Area denial',
    speed: 14,
    damage: 0,
    ammunition: 65,
    range: 3,
    natoCode: 'SFG-UCFR---D',
    faction: 'human',
    status: 'active'
  },
  {
    id: 'human-7',
    type: 'Air Defense System',
    callSign: 'Delta-1',
    position: [18.318000, 49.832000],
    route: [
      [18.318000, 49.832000],
      [18.319000, 49.835000],
      [18.320000, 49.838000],
      [18.321000, 49.841000],
      [18.322000, 49.844000],
      [18.323000, 49.847000],
      [18.324000, 49.850000],
      [18.325000, 49.853000],
      [18.326000, 49.856000],
      [18.327000, 49.859000],
      [18.328000, 49.862000],
      [18.329000, 49.865000],
      [18.330000, 49.868000],
      [18.331000, 49.871000],
      [18.332000, 49.874000],
      [18.333000, 49.877000],
      [18.334000, 49.880000]
    ],
    currentWaypointIndex: 0,
    task: 'Air defense coverage',
    speed: 16,
    damage: 0,
    ammunition: 90,
    range: 3,
    natoCode: 'SFG-UCAD---D',
    faction: 'human',
    status: 'active'
  },
  {
    id: 'human-8',
    type: 'Field Hospital',
    callSign: 'Medic-1',
    position: [18.312000, 49.830000],
    route: [
      [18.312000, 49.830000],
      [18.313000, 49.833000],
      [18.314000, 49.836000],
      [18.315000, 49.839000],
      [18.316000, 49.842000],
      [18.317000, 49.845000],
      [18.318000, 49.848000],
      [18.319000, 49.851000],
      [18.320000, 49.854000],
      [18.321000, 49.857000],
      [18.322000, 49.860000],
      [18.323000, 49.863000],
      [18.324000, 49.866000],
      [18.325000, 49.869000],
      [18.326000, 49.872000],
      [18.327000, 49.875000],
      [18.328000, 49.878000]
    ],
    currentWaypointIndex: 0,
    task: 'Medical support',
    speed: 10,
    damage: 0,
    ammunition: 0,
    range: 0,
    natoCode: 'SFG-UH-----D',
    faction: 'human',
    status: 'active'
  }
]

export const alienForces: Unit[] = [
  {
    id: 'alien-1',
    type: 'Scout Drone',
    callSign: 'Recon-Alpha-1',
    position: [18.345000, 49.875000],
    route: [
      [18.345000, 49.875000],
      [18.343000, 49.870000],
      [18.341000, 49.865000],
      [18.339000, 49.860000],
      [18.337000, 49.855000],
      [18.335000, 49.850000],
      [18.333000, 49.845000],
      [18.331000, 49.840000],
      [18.329000, 49.835000]
    ],
    currentWaypointIndex: 0,
    task: 'Scout south - Locate human forces',
    speed: 30,
    damage: 0,
    ammunition: 70,
    range: 1,
    natoCode: 'SHG-UCI----H',
    faction: 'alien',
    status: 'active'
  },
  {
    id: 'alien-2',
    type: 'Shock Trooper',
    callSign: 'Assault-Beta-1',
    position: [18.338000, 49.872000],
    route: [
      [18.338000, 49.872000],
      [18.337000, 49.867000],
      [18.336000, 49.862000],
      [18.335000, 49.857000],
      [18.334000, 49.852000],
      [18.333000, 49.847000],
      [18.332000, 49.842000],
      [18.331000, 49.837000],
      [18.330000, 49.832000]
    ],
    currentWaypointIndex: 0,
    task: 'Attack south - Electronic warfare',
    speed: 28,
    damage: 10,
    ammunition: 65,
    range: 1,
    natoCode: 'SHG-UCIW---H',
    faction: 'alien',
    status: 'active'
  },
  {
    id: 'alien-3',
    type: 'War Machine',
    callSign: 'Assault-Beta-2',
    position: [18.342000, 49.868000],
    route: [
      [18.342000, 49.868000],
      [18.340000, 49.863000],
      [18.338000, 49.858000],
      [18.336000, 49.853000],
      [18.334000, 49.848000],
      [18.332000, 49.843000],
      [18.330000, 49.838000],
      [18.328000, 49.833000]
    ],
    currentWaypointIndex: 0,
    task: 'Attack south - Destroy human armor',
    speed: 22,
    damage: 20,
    ammunition: 85,
    range: 2,
    natoCode: 'SHG-UCAT---H',
    faction: 'alien',
    status: 'damaged'
  },
  {
    id: 'alien-4',
    type: 'Assault Walker',
    callSign: 'Heavy-Gamma-3',
    position: [18.348000, 49.865000],
    route: [
      [18.348000, 49.865000],
      [18.345000, 49.860000],
      [18.342000, 49.855000],
      [18.339000, 49.850000],
      [18.336000, 49.845000],
      [18.333000, 49.840000],
      [18.330500, 49.852500],
      [18.331000, 49.850000],
      [18.331500, 49.847500],
      [18.332000, 49.845000],
      [18.332500, 49.842500],
      [18.333000, 49.840000],
      [18.333500, 49.837500],
      [18.334000, 49.835000]
    ],
    currentWaypointIndex: 0,
    task: 'Attack south - Hunter-killer protocol',
    speed: 24,
    damage: 0,
    ammunition: 90,
    range: 3,
    natoCode: 'SHG-UCAW---H',
    faction: 'alien',
    status: 'active'
  },
  {
    id: 'alien-5',
    type: 'Devastator Mech',
    callSign: 'Heavy-Gamma-1',
    position: [18.350000, 49.870000],
    route: [
      [18.350000, 49.870000],
      [18.343000, 49.864000],
      [18.336000, 49.858000],
      [18.329000, 49.852000]
    ],
    currentWaypointIndex: 0,
    task: 'Area bombardment',
    speed: 16,
    damage: 15,
    ammunition: 95,
    range: 3,
    natoCode: 'SHG-UCFH---H',
    faction: 'alien',
    status: 'active'
  },
  {
    id: 'alien-6',
    type: 'Siege Platform',
    callSign: 'Heavy-Gamma-2',
    position: [18.355000, 49.868000],
    route: [
      [18.355000, 49.868000],
      [18.348000, 49.862000],
      [18.341000, 49.856000],
      [18.334000, 49.850000]
    ],
    currentWaypointIndex: 0,
    task: 'Breach defensive lines',
    speed: 14,
    damage: 30,
    ammunition: 80,
    range: 3,
    natoCode: 'SHG-UCFR---H',
    faction: 'alien',
    status: 'damaged'
  },
  {
    id: 'alien-7',
    type: 'Energy Harvester',
    callSign: 'Support-Delta-4',
    position: [18.328000, 49.878000],
    route: [
      [18.328000, 49.878000],
      [18.329000, 49.870000],
      [18.330000, 49.862000],
      [18.331000, 49.854000]
    ],
    currentWaypointIndex: 0,
    task: 'Energy collection and distribution',
    speed: 10,
    damage: 0,
    ammunition: 0,
    range: 0,
    natoCode: 'SHG-UCS----H',
    faction: 'alien',
    status: 'active'
  },
  {
    id: 'alien-8',
    type: 'Interceptor',
    callSign: 'Air-Epsilon-1',
    position: [18.315000, 49.880000],
    route: [
      [18.315000, 49.880000],
      [18.320000, 49.870000],
      [18.325000, 49.860000],
      [18.330000, 49.850000],
      [18.335000, 49.840000]
    ],
    currentWaypointIndex: 0,
    task: 'Air superiority',
    speed: 40,
    damage: 5,
    ammunition: 95,
    range: 3,
    natoCode: 'SHA-MFF----H',
    faction: 'alien',
    status: 'active'
  },
  {
    id: 'alien-9',
    type: 'Bomber Craft',
    callSign: 'Air-Epsilon-3',
    position: [18.340000, 49.882000],
    route: [
      [18.340000, 49.882000],
      [18.338000, 49.872000],
      [18.336000, 49.862000],
      [18.334000, 49.852000],
      [18.332000, 49.842000]
    ],
    currentWaypointIndex: 0,
    task: 'Strategic bombardment',
    speed: 35,
    damage: 0,
    ammunition: 100,
    range: 3,
    natoCode: 'SHA-MFB----H',
    faction: 'alien',
    status: 'active'
  },
  {
    id: 'alien-10',
    type: 'Command Nexus',
    callSign: 'Overmind',
    position: [18.328000, 49.885000],
    route: [
      [18.328000, 49.885000],
      [18.329000, 49.875000],
      [18.330000, 49.865000],
      [18.331000, 49.855000]
    ],
    currentWaypointIndex: 0,
    task: 'Hive coordination',
    speed: 8,
    damage: 0,
    ammunition: 0,
    range: 0,
    natoCode: 'SHG-UH-----H',
    faction: 'alien',
    status: 'active'
  }
]

export const getAllUnits = (): Unit[] => {
  return JSON.parse(JSON.stringify([...humanForces, ...alienForces]))
}

export const getUnitsByFaction = (faction: 'human' | 'alien'): Unit[] => {
  return getAllUnits().filter(unit => unit.faction === faction)
}

export const getActiveUnits = (): Unit[] => {
  return getAllUnits().filter(unit => unit.status === 'active')
}

export const getUnitById = (id: string): Unit | undefined => {
  return getAllUnits().find(unit => unit.id === id)
}
