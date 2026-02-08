# Military Simulator Demo

A real-time tactical military simulation application with WebSocket-powered backend and interactive map visualization. Built with React, TypeScript, Node.js, and OpenLayers, this simulator provides authentic military unit movements, combat interactions, and tactical operations.

## 🎯 Features

### Backend Architecture
- **WebSocket Server**: Real-time communication between clients and server
- **TypeScript Backend**: Fully typed Node.js server with type safety
- **Centralized Unit Management**: All initial unit data stored on backend

### Core Simulation
- **Real-time Unit Movement**: Units follow predefined routes with speed calculations
- **Combat System**: Automatic engagement when opposing forces come within range
- **Damage & Status Tracking**: Units can be active, damaged, or destroyed based on combat
- **NATO Military Symbols**: Uses MilSymbol library for authentic military unit representation
- **Simulation End Detection**: Automatically detects when simulation completes

### Interactive Map
- **OpenLayers Integration**: High-performance map rendering with zoom and pan controls
- **Unit Visualization**: Military units displayed with NATO symbology
- **Route Display**: Visual representation of unit movement paths
- **Distance Measurement Tool**: Click two units to measure distance between them

### User Interface
- **Loading Screen**: Loading experience with progress indicator
- **Simulation Controls**: Play/Pause simulation with adjustable speed (1x-100x)
- **Unit Information Panel**: Detailed stats for selected units (position, damage, ammunition, etc.)
- **Combat Log**: Real-time feed of combat engagements and outcomes
- **Draggable Sidebar**: Reorder UI panels via drag-and-drop for customized layout
- **End-of-Simulation Modal**: Shows winner, statistics, and survival rates
- **About Modal**: Project information and controls reference

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd military-simulator-demo

# Install backend dependencies
cd backend
pnpm install

# Install frontend dependencies
cd ../frontend
pnpm install
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
pnpm start        # Production mode
# or
pnpm dev          # Development mode with auto-reload
```
Backend will run on `ws://localhost:8080`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
pnpm dev
```
Frontend will be available at `http://localhost:5173`

### Build for Production

**Frontend:**
```bash
cd frontend
pnpm build
pnpm preview
```

**Backend:**
```bash
cd backend
pnpm start
```

## 🎮 How to Use

### Basic Controls
1. **Start/Pause**: Click the Play/Pause button to control simulation
2. **Adjust Speed**: Use the speed slider to change simulation speed (1x-100x)
3. **Select Units**: Click on any unit on the map to view detailed information
4. **Reset**: Click Reset to restore all units to initial positions and states (fetches fresh data from backend)

### Menu Bar Features
- **Tools → Measure Distance**: Click two units to measure distance between them in kilometers
- **Help → About**: View project information, features, and controls

### Reordering Panels
- Hover over any sidebar panel to see the drag handle (⋮⋮)
- Click and drag the handle to reorder panels
- Drop on another panel to swap positions

### Understanding the Display
- **Blue Units**: Human forces
- **Red Units**: Alien forces
- **Lines**: Unit movement routes
- **Combat Log**: Shows engagement results with damage dealt
- **End Modal**: Appears when simulation completes with winner and statistics

## 🔧 Technical Details

### Architecture

**Backend (Node.js + TypeScript):**
- WebSocket server using `ws` library
- TypeScript with full type safety
- Message-based communication protocol
- Runs with `tsx` for direct TypeScript execution

**Frontend (React + TypeScript):**
- React 19 with TypeScript
- Zustand for state management
- WebSocket client service with auto-reconnection
- OpenLayers for map rendering

### WebSocket Communication

**Message Types:**
- `connection` - Server confirms client connection
- `units_data` - Server sends unit data to client
- `get_units` - Client requests current units
- `reset_units` - Client requests unit reset

**Flow:**
1. Client connects to WebSocket server
2. Server automatically sends units after 1 second
3. Client displays loading screen until units received
4. On reset, client requests fresh units from server
5. Server broadcasts updates to all connected clients

### State Management
- **Zustand**: Lightweight state management for simulation state, units, and UI
- **Backend State**: Units stored on server, sent to clients on demand
- **Frontend State**: Local simulation state, synchronized with backend

### Simulation Engine
- **Movement System**: 
  - Waypoint-based navigation with smooth interpolation
  - Speed calculated in km/h converted to degrees per second
  - Tracks current waypoint index to prevent oscillation bugs
  
- **Combat System**:
  - Range-based engagement detection
  - Ammunition consumption
  - Damage accumulation with status changes (active → damaged → destroyed)
  - Faction-based targeting (human vs alien)

## 🛠️ Technologies Used

### Frontend
- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **OpenLayers 10.7** - Map rendering
- **Zustand 5.0** - State management
- **MilSymbol 3.0** - NATO military symbols
- **Vite 7.2** - Build tool and dev server

### Backend
- **Node.js 18+** - Runtime environment
- **TypeScript 5.x** - Type safety
- **ws 8.18** - WebSocket server library
- **tsx 4.19** - TypeScript execution
- **@types/node** - Node.js type definitions
- **@types/ws** - WebSocket type definitions

## 📝 Key Algorithms

### Movement Algorithm
Units move along predefined routes by:
1. Calculating distance to travel based on speed and delta time
2. Moving toward the next waypoint
3. Advancing to the next waypoint when reached
4. Marking as reached destination when route complete

### Combat Resolution
When units collide:
1. Check if units are from opposing factions
2. Calculate if each unit is within firing range
3. Apply damage based on ammunition levels
4. Consume ammunition
5. Update unit status based on damage
6. Log combat events to combat log

### Simulation End Detection
1. Check if all units have reached destination or are destroyed
2. Calculate statistics for each faction
3. Determine winner based on destroyed units count
4. Display end-of-simulation modal with results

## 📁 Project Structure

```
military-simulator-demo/
├── backend/
│   ├── server.ts          # WebSocket server
│   ├── units.ts           # Unit data and types
│   ├── package.json       # Backend dependencies
│   └── tsconfig.json      # TypeScript config
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # WebSocket service
│   │   ├── store/         # Zustand state management
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # Entry point
│   ├── package.json       # Frontend dependencies
│   └── vite.config.ts     # Vite configuration
└── README.md
```

## 📄 License

MIT
