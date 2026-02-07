import { useState } from 'react'
import './MenuBar.css'

const MenuBar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  const toggleMenu = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  };

  return (
    <div className="menubar">
      <div className="menubar-title">Military Operations Simulator</div>
      
      <div className="menubar-items">
        <div className="menu-item">
          <button onClick={() => toggleMenu('file')}>File</button>
          {activeMenu === 'file' && (
            <div className="dropdown">
              <div className="dropdown-item">New Scenario</div>
              <div className="dropdown-item">Open Scenario</div>
              <div className="dropdown-item">Save</div>
              <div className="dropdown-separator"></div>
              <div className="dropdown-item">Exit</div>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button onClick={() => toggleMenu('view')}>View</button>
          {activeMenu === 'view' && (
            <div className="dropdown">
              <div className="dropdown-item">Reset Layout</div>
              <div className="dropdown-item">Toggle Fullscreen</div>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button onClick={() => toggleMenu('tools')}>Tools</button>
          {activeMenu === 'tools' && (
            <div className="dropdown">
              <div className="dropdown-item">Measure Distance</div>
              <div className="dropdown-item">Settings</div>
            </div>
          )}
        </div>

        <div className="menu-item">
          <button onClick={() => toggleMenu('help')}>Help</button>
          {activeMenu === 'help' && (
            <div className="dropdown">
              <div className="dropdown-item">Documentation</div>
              <div className="dropdown-item">About</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MenuBar