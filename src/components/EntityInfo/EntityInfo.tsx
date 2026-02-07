import { useSimulationStore } from '../../store/SimulationStore'
import './EntityInfo.css'

const EntityInfo = () => {
  const selectedEntity = useSimulationStore((state) => state.selectedEntity)

  if (!selectedEntity) {
    return (
      <div className="panel entity-info-panel">
        <div className="panel-header">Entity Information</div>
        <div className="panel-content">
          <div className="no-selection">
            <p>Click on a unit to view details</p>
          </div>
        </div>
      </div>
    )
  }

  const isAlien = selectedEntity.faction === 'alien'
  const factionColor = isAlien ? '#ff0066' : '#0066ff'

  return (
    <div className="panel entity-info-panel">
      <div className="panel-header" style={{ borderBottom: `2px solid ${factionColor}` }}>
        Unit Information
      </div>
      <div className="panel-content entity-info-content">
        <div className="entity-header">
          <h3 style={{ color: factionColor }}>
            {selectedEntity.callSign}
          </h3>
          <span className={`faction-badge ${selectedEntity.faction}`}>
            {selectedEntity.faction === 'human' ? '🔵 HUMAN' : '🔴 ALIEN'}
          </span>
        </div>

        <div className="entity-details">
          <div className="detail-row">
            <span className="label">Type:</span>
            <span className="value">{selectedEntity.type}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`value status-${selectedEntity.status}`}>
              {selectedEntity.status.toUpperCase()}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Task:</span>
            <span className="value task">{selectedEntity.task}</span>
          </div>

          <div className="detail-section">
            <h4>Combat Stats</h4>
            <div className="detail-row">
              <span className="label">Speed:</span>
              <span className="value">{selectedEntity.speed} km/h</span>
            </div>

            <div className="detail-row">
              <span className="label">Ammunition:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill ammo"
                  style={{ width: `${selectedEntity.ammunition}%` }}
                />
                <span className="progress-text">{selectedEntity.ammunition}%</span>
              </div>
            </div>

            <div className="detail-row">
              <span className="label">Damage:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill damage"
                  style={{ width: `${selectedEntity.damage}%` }}
                />
                <span className="progress-text">{selectedEntity.damage}%</span>
              </div>
            </div>
          </div>

          {isAlien && (selectedEntity.shields !== undefined || selectedEntity.energy !== undefined) && (
            <div className="detail-section alien-stats">
              <h4>Alien Systems</h4>
              
              {selectedEntity.shields !== undefined && (
                <div className="detail-row">
                  <span className="label">Shields:</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill shields"
                      style={{ width: `${selectedEntity.shields}%` }}
                    />
                    <span className="progress-text">{selectedEntity.shields}%</span>
                  </div>
                </div>
              )}

              {selectedEntity.energy !== undefined && (
                <div className="detail-row">
                  <span className="label">Energy:</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill energy"
                      style={{ width: `${selectedEntity.energy}%` }}
                    />
                    <span className="progress-text">{selectedEntity.energy}%</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="detail-section">
            <h4>Position</h4>
            <div className="detail-row">
              <span className="label">Coordinates:</span>
              <span className="value coordinates">
                {selectedEntity.position[1].toFixed(4)}°N, {selectedEntity.position[0].toFixed(4)}°E
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityInfo