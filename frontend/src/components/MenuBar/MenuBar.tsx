import { useState } from 'react'
import './MenuBar.css'
import { useSimulationStore } from '../../store/SimulationStore'

interface MenuBarProps {
  onAboutClick: () => void
  onMeasureDistanceClick: () => void
}

const MenuBar = ({ onAboutClick, onMeasureDistanceClick }: MenuBarProps) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  }
  const resetunits = useSimulationStore((state) => state.resetunits)
  
  return (
    <div className="menubar">
      <div className="menubar-title">Alien Invasion of Ostrava (based on true story)</div>
      
      <div className="menubar-items">
        <div className="menu-item">
          <button onClick={() => toggleMenu('file')}>File</button>
          {activeMenu === 'file' && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={() => resetunits()}>New Scenario</div>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button onClick={() => toggleMenu('tools')}>Tools</button>
          {activeMenu === 'tools' && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={() => {
                onMeasureDistanceClick()
                setActiveMenu(null)
              }}>Measure Distance</div>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button onClick={() => toggleMenu('help')}>Help</button>
          {activeMenu === 'help' && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={() => {
                onAboutClick()
                setActiveMenu(null)
              }}>About</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuBar