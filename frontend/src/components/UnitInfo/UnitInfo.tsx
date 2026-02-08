import { useSimulationStore } from '../../store/SimulationStore'
import './UnitInfo.css'

const UnitInfo = () => {
  const selectedUnit = useSimulationStore((state) => state.selectedUnit)
  const units = useSimulationStore((state) => state.units)

  const currentUnit = selectedUnit 
    ? units.find(e => e.id === selectedUnit.id) || selectedUnit
    : null

  if (!currentUnit) {
    return (
      <div className="panel unit-info-panel">
        <div className="panel-header">Unit Information</div>
        <div className="panel-content">
          <div className="no-selection">
            <p>Click on a unit to view details</p>
          </div>
        </div>
      </div>
    )
  }

  const isAlien = currentUnit.faction === 'alien'
  const factionColor = isAlien ? '#ff0066' : '#0066ff'

  return (
    <div className="panel unit-info-panel">
      <div className="panel-header" style={{ borderBottom: `2px solid ${factionColor}` }}>
        Unit Information
      </div>
      <div className="panel-content unit-info-content">
        <div className="unit-header">
          <h3 style={{ color: factionColor }}>
            {currentUnit.callSign}
          </h3>
          <span className={`faction-badge ${currentUnit.faction}`}>
            {currentUnit.faction === 'human' ? '🔵 HUMAN' : '🔴 ALIEN'}
          </span>
        </div>

        <div className="unit-details">
          <div className="detail-row">
            <span className="label">Type:</span>
            <span className="value">{currentUnit.type}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`value status-${currentUnit.status}`}>
              {currentUnit.status.toUpperCase()}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Task:</span>
            <span className="value task">{currentUnit.task}</span>
          </div>

          <div className="detail-section">
            <h4>Combat Stats</h4>
            <div className="detail-row">
              <span className="label">Speed:</span>
              <span className="value">{currentUnit.speed} km/h</span>
            </div>

            <div className="detail-row">
              <span className="label">Ammunition:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill ammo"
                  style={{ width: `${currentUnit.ammunition}%` }}
                />
                <span className="progress-text">{currentUnit.ammunition}%</span>
              </div>
            </div>

            <div className="detail-row">
              <span className="label">Damage:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill damage"
                  style={{ width: `${currentUnit.damage}%` }}
                />
                <span className="progress-text">{currentUnit.damage}%</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h4>Position</h4>
            <div className="detail-row">
              <span className="label">Coordinates:</span>
              <span className="value coordinates">
                {currentUnit.position[1].toFixed(4)}°N, {currentUnit.position[0].toFixed(4)}°E
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnitInfo