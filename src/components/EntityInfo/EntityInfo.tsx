import { useSimulationStore } from '../../store/SimulationStore'
import './EntityInfo.css'

const EntityInfo = () => {
  const selectedEntity = useSimulationStore((state) => state.selectedEntity)
  const entities = useSimulationStore((state) => state.entities)

  const currentEntity = selectedEntity 
    ? entities.find(e => e.id === selectedEntity.id) || selectedEntity
    : null

  if (!currentEntity) {
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

  const isAlien = currentEntity.faction === 'alien'
  const factionColor = isAlien ? '#ff0066' : '#0066ff'

  return (
    <div className="panel entity-info-panel">
      <div className="panel-header" style={{ borderBottom: `2px solid ${factionColor}` }}>
        Unit Information
      </div>
      <div className="panel-content entity-info-content">
        <div className="entity-header">
          <h3 style={{ color: factionColor }}>
            {currentEntity.callSign}
          </h3>
          <span className={`faction-badge ${currentEntity.faction}`}>
            {currentEntity.faction === 'human' ? '🔵 HUMAN' : '🔴 ALIEN'}
          </span>
        </div>

        <div className="entity-details">
          <div className="detail-row">
            <span className="label">Type:</span>
            <span className="value">{currentEntity.type}</span>
          </div>

          <div className="detail-row">
            <span className="label">Status:</span>
            <span className={`value status-${currentEntity.status}`}>
              {currentEntity.status.toUpperCase()}
            </span>
          </div>

          <div className="detail-row">
            <span className="label">Task:</span>
            <span className="value task">{currentEntity.task}</span>
          </div>

          <div className="detail-section">
            <h4>Combat Stats</h4>
            <div className="detail-row">
              <span className="label">Speed:</span>
              <span className="value">{currentEntity.speed} km/h</span>
            </div>

            <div className="detail-row">
              <span className="label">Ammunition:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill ammo"
                  style={{ width: `${currentEntity.ammunition}%` }}
                />
                <span className="progress-text">{currentEntity.ammunition}%</span>
              </div>
            </div>

            <div className="detail-row">
              <span className="label">Damage:</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill damage"
                  style={{ width: `${currentEntity.damage}%` }}
                />
                <span className="progress-text">{currentEntity.damage}%</span>
              </div>
            </div>
          </div>

          {isAlien && (currentEntity.shields !== undefined || currentEntity.energy !== undefined) && (
            <div className="detail-section alien-stats">
              <h4>Alien Systems</h4>
              
              {currentEntity.shields !== undefined && (
                <div className="detail-row">
                  <span className="label">Shields:</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill shields"
                      style={{ width: `${currentEntity.shields}%` }}
                    />
                    <span className="progress-text">{currentEntity.shields}%</span>
                  </div>
                </div>
              )}

              {currentEntity.energy !== undefined && (
                <div className="detail-row">
                  <span className="label">Energy:</span>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill energy"
                      style={{ width: `${currentEntity.energy}%` }}
                    />
                    <span className="progress-text">{currentEntity.energy}%</span>
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
                {currentEntity.position[1].toFixed(4)}°N, {currentEntity.position[0].toFixed(4)}°E
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntityInfo