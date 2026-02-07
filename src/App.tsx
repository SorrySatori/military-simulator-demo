import { useState } from 'react'
import ReactGridLayout from 'react-grid-layout'
import MenuBar from './components/MenuBar/MenuBar'
import MapPanel from './components/MapPanel/MapPanel'
import SimulationControl from './components/SimulationControl/SimulationControl'
import EntityInfo from './components/EntityInfo/EntityInfo'
import DataLog from './components/DataLog/DataLog'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import './components/Panel.css'
import './App.css'

function App() {
  const [layout] = useState([
    { i: 'map', x: 0, y: 0, w: 8, h: 12 },
    { i: 'controls', x: 8, y: 0, w: 4, h: 6 },
    { i: 'entity', x: 8, y: 6, w: 4, h: 6 },
    { i: 'log', x: 0, y: 12, w: 12, h: 6 }
  ])

  return (
    <div className="app">
      <MenuBar />
      <div key="map">
        <MapPanel />
      </div>
      {/* <div className="main-content">
        <ReactGridLayout
          className="layout"
          layout={layout}
          width={1200}
        >
          <div key="map">
            <MapPanel />
          </div>
          <div key="controls">
            <SimulationControl />
          </div>
          <div key="entity">
            <EntityInfo />
          </div>
          <div key="log">
            <DataLog />
          </div>
        </ReactGridLayout>
      </div> */}
    </div>
  )
}

export default App