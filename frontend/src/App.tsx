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
import { usePanelDragDrop } from './hooks/usePanelDragDrop'
import { calculateFactionStats } from './utils/statsCalculator'

type PanelType = 'controls' | 'unit' | 'log'

function App() {
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [measurementMode, setMeasurementMode] = useState(false)
  const [showEndModal, setShowEndModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  
  const simulationEnded = useSimulationStore((state) => state.simulationEnded)
  const units = useSimulationStore((state) => state.units)
  const resetunits = useSimulationStore((state) => state.resetunits)
  const setSimulationEnded = useSimulationStore((state) => state.setSimulationEnded)
  const setunits = useSimulationStore((state) => state.setunits)

  const {
    panelOrder,
    draggedPanel,
    dragOverPanel,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  } = usePanelDragDrop()

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



  const handleEndModalClose = () => {
    setShowEndModal(false)
    setSimulationEnded(false)
    resetunits()
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
        message={"Connecting to server..."} 
        progress={loadingProgress} 
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
        humanStats={calculateFactionStats(units, 'human')}
        alienStats={calculateFactionStats(units, 'alien')}
      />
    </div>
  )
}

export default App