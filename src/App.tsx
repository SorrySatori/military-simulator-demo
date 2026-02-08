import { useState } from 'react'
import MenuBar from './components/MenuBar/MenuBar'
import MapPanel from './components/MapPanel/MapPanel'
import SimulationControl from './components/SimulationControl/SimulationControl'
import EntityInfo from './components/EntityInfo/EntityInfo'
import DataLog from './components/DataLog/DataLog'
import './components/Panel.css'
import './App.css'
import ModalAboutInfo from './components/Modal/ModalAboutInfo'

type PanelType = 'controls' | 'entity' | 'log'

function App() {
  const [panelOrder, setPanelOrder] = useState<PanelType[]>(['controls', 'entity', 'log'])
  const [draggedPanel, setDraggedPanel] = useState<PanelType | null>(null)
  const [dragOverPanel, setDragOverPanel] = useState<PanelType | null>(null)
  const [showAboutModal, setShowAboutModal] = useState(false)
  const [measurementMode, setMeasurementMode] = useState(false)

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
      entity: <EntityInfo />,
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
    </div>
  )
}

export default App