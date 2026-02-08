import { useState, useEffect } from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import MapPanel from './components/MapPanel/MapPanel'
import SimulationControl from './components/SimulationControl/SimulationControl'
import UnitInfo from './components/UnitInfo/UnitInfo'
import DataLog from './components/DataLog/DataLog'
import Loading from './components/Loading/Loading'
import './components/Panel.css'
import './App.css'
import ModalAboutInfo from './components/Modal/ModalAboutInfo'
import ModalSimulationEnd from './components/Modal/ModalSimulationEnd'
import { useSimulationStore } from './store/SimulationStore'
import { wsService } from './services/WebSocketService'

type PanelType = 'controls' | 'unit' | 'log'

function App() {
  const [panelOrder, setPanelOrder] = useState<PanelType[]>(['controls', 'unit', 'log'])
  const [draggedPanel, setDraggedPanel] = useState<PanelType | null>(null)
  const [dragOverPanel, setDragOverPanel] = useState<PanelType | null>(null)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [measurementMode, setMeasurementMode] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingError, setLoadingError] = useState<string | null>(null)
  
  const simulationEnded = useSimulationStore((state) => state.simulationEnded)
  const units = useSimulationStore((state) => state.units)
  const resetunits = useSimulationStore((state) => state.resetunits)
  const setSimulationEnded = useSimulationStore((state) => state.setSimulationEnded)
  const setunits = useSimulationStore((state) => state.setunits)

  useEffect(() => {
    const initializeApp = async () => {
      let connectionTimeout: number | null = null
      let unitsReceived = false

      try {
        setLoadingProgress(20)
        await wsService.connect()
        setLoadingProgress(50)

        wsService.on('units_data', (message) => {
          unitsReceived = true
          if (connectionTimeout) clearTimeout(connectionTimeout)
          setunits(message.data)
          setLoadingProgress(100)
          setTimeout(() => setIsLoading(false), 500)
        })

        wsService.on('connection', () => {
          setLoadingProgress(70)
        })

        connectionTimeout = setTimeout(() => {
          if (!unitsReceived) {
            console.error('Connection timeout - no units received from backend')
            setTimeout(() => setIsLoading(false), 2000)
          }
        }, 5000)
      } catch (error) {
      }
    }

    initializeApp()

    return () => {
      wsService.disconnect()
    }
  }, [])

  useEffect(() => {
    if (simulationEnded && !showEndModal) {
      setShowEndModal(true)
    }
  }, [simulationEnded, showEndModal])

  const calculateStats = (faction: 'human' | 'alien') => {
    const factionUnits = units.filter(u => u.faction === faction)
    return {
      totalUnits: factionUnits.length,
      active: factionUnits.filter(u => u.status === 'active').length,
      damaged: factionUnits.filter(u => u.status === 'damaged').length,
      destroyed: factionUnits.filter(u => u.status === 'destroyed').length,
      reachedDestination: factionUnits.filter(u => u.currentWaypointIndex >= u.route.length - 1 && u.status !== 'destroyed').length
    }
  }

  const handleEndModalClose = () => {
    setShowEndModal(false)
    setSimulationEnded(false)
    resetunits()
  }

  const handleDragStart = (panel: PanelType) => {
    setDraggedPanel(panel)
  }

  const handleDragOver = (event: React.DragEvent, panel: PanelType) => {
    event.preventDefault()
    if (draggedPanel && draggedPanel !== panel) {
      setDragOverPanel(panel)
    }
  }

  const handleDragLeave = () => {
    setDragOverPanel(null)
  }

  const handleDrop = (targetPanel: PanelType) => {
    if (!draggedPanel || draggedPanel === targetPanel) {
      setDraggedPanel(null)
      setDragOverPanel(null)
      return
    }

    const newOrder = [...panelOrder]
    const draggedIndex = newOrder.indexOf(draggedPanel)
    const targetIndex = newOrder.indexOf(targetPanel)

    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedPanel)

    setPanelOrder(newOrder)
    setDraggedPanel(null)
    setDragOverPanel(null)
  }

  const handleDragEnd = () => {
    setDraggedPanel(null)
    setDragOverPanel(null)
  }

  const renderPanel = (panelType: PanelType) => {
    const panelComponents = {
      controls: <SimulationControl />,
      unit: <UnitInfo />,
      log: <DataLog />
    }

    return (
      <div
        key={panelType}
        className={`draggable-panel 
          ${draggedPanel === panelType ? 'dragging' : ''} 
          ${dragOverPanel === panelType ? 'drag-over' : ''}`}
        onDragOver={(event: React.DragEvent) => handleDragOver(event, panelType)}
        onDragLeave={handleDragLeave}
        onDrop={() => handleDrop(panelType)}
      >
        <div 
          className="drag-handle"
          draggable
          onDragStart={() => handleDragStart(panelType)}
          onDragEnd={handleDragEnd}
        >
          <span className="drag-icon">⋮⋮</span>
        </div>
        {panelComponents[panelType]}
      </div>
    )
  }

  if (isLoading) {
    return (
      <Loading 
        message={loadingError || "Connecting to server..."} 
        progress={loadingError ? undefined : loadingProgress} 
      />
    )
  }

  return (
    <div className="app">
      <MenuBar 
        onAboutClick={() => setShowAboutModal(true)}
        onMeasureDistanceClick={() => setMeasurementMode(prev => !prev)}
      />
      <div className="content-container">
        <div key="map">
          <MapPanel 
            measurementMode={measurementMode} 
            onCloseMeasurement={() => setMeasurementMode(false)}
          />
        </div>
        <div className="sidebar">
          {panelOrder.map(panel => renderPanel(panel))}
        </div>
      </div>

      <ModalAboutInfo 
        showAboutModal={showAboutModal} 
        setShowAboutModal={() => setShowAboutModal(false)}
      />

      <ModalSimulationEnd
        isOpen={showEndModal}
        onClose={handleEndModalClose}
        humanStats={calculateStats('human')}
        alienStats={calculateStats('alien')}
      />
    </div>
  )
}

export default App