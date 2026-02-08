# Military Simulator Demo

A real-time tactical military simulation application built with React, TypeScript, and OpenLayers. This simulator visualizes military unit movements, combat interactions, and tactical operations on an interactive map.

## 🎯 Features

### Core Simulation
- **Real-time Unit Movement**: Units follow predefined routes with realistic speed calculations
- **Combat System**: Automatic engagement when opposing forces come within range
- **Damage & Status Tracking**: Units can be active, damaged, or destroyed based on combat
- **NATO Military Symbols**: Uses MilSymbol library for authentic military unit representation

### Interactive Map
- **OpenLayers Integration**: High-performance map rendering with zoom and pan controls
- **Unit Visualization**: Military units displayed with NATO symbology
- **Route Display**: Visual representation of unit movement paths
- **Real-time Updates**: Smooth 60 FPS animation of unit positions

### User Interface
- **Simulation Controls**: Play/Pause simulation with adjustable speed (1x-100x)
- **Entity Information Panel**: Detailed stats for selected units (position, damage, ammunition, etc.)
- **Combat Log**: Real-time feed of combat engagements and outcomes
- **Draggable Sidebar**: Reorder UI panels via drag-and-drop for customized layout

## 🚀 Getting Started

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd military-simulator-demo

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎮 How to Use

### Basic Controls
1. **Start/Pause**: Click the Play/Pause button to control simulation
2. **Adjust Speed**: Use the speed slider to change simulation speed (1x-100x)
3. **Select Units**: Click on any unit on the map to view detailed information
4. **Reset**: Click Reset to restore all units to initial positions and states

### Reordering Panels
- Hover over any sidebar panel to see the drag handle (⋮⋮)
- Click and drag the handle to reorder panels
- Drop on another panel to swap positions

### Understanding the Display
- **Blue Units**: Human forces
- **Red Units**: Alien forces
- **Lines**: Unit movement routes
- **Combat Log**: Shows engagement results with damage dealt

## 🔧 Technical Details

### State Management
- **Zustand**: Lightweight state management for simulation state, entities, and UI

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

### Performance Optimizations
- 60 FPS animation loop using setInterval
- Efficient entity updates with immutable state patterns
- Memoized map rendering
- Optimized collision detection

## 🛠️ Technologies Used

- **React 19.2** - UI framework
- **TypeScript 5.9** - Type safety
- **OpenLayers 10.7** - Map rendering
- **Zustand 5.0** - State management
- **MilSymbol 3.0** - NATO military symbols
- **Vite 7.2** - Build tool and dev server

## 📝 Key Algorithms

### Movement Algorithm
Units move along predefined routes by:
1. Calculating distance to travel based on speed and delta time
2. Moving toward the next waypoint
3. Advancing to the next waypoint when reached

### Combat Resolution
When units collide:
1. Check if units are from opposing factions
2. Calculate if each unit is within firing range
3. Apply damage based on ammunition levels
4. Consume ammunition
5. Update unit status based on damage
