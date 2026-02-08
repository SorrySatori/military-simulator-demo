import Modal from './Modal'
import './ModalSimulationEnd.css'

interface SimulationStats {
  totalUnits: number
  active: number
  damaged: number
  destroyed: number
  reachedDestination: number
}

interface ModalSimulationEndProps {
  isOpen: boolean
  onClose: () => void
  humanStats: SimulationStats
  alienStats: SimulationStats
}

const ModalSimulationEnd = ({ isOpen, onClose, humanStats, alienStats }: ModalSimulationEndProps) => {
  const humanSurvivalRate = ((humanStats.active + humanStats.damaged) / humanStats.totalUnits * 100).toFixed(1)
  const alienSurvivalRate = ((alienStats.active + alienStats.damaged) / alienStats.totalUnits * 100).toFixed(1)
  
  const winner = humanStats.destroyed < alienStats.destroyed ? 'Human' : 
                 alienStats.destroyed < humanStats.destroyed ? 'Alien' : 'Draw'

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Simulation Complete">
      <div className="simulation-end-content">
        <div className="winner-announcement">
          {winner === 'Draw' ? (
            <h2>⚔️ Tactical Draw</h2>
          ) : (
            <h2>{winner} Forces Victory!</h2>
          )}
        </div>

        <div className="stats-container">
          <div className="faction-stats human-stats">
            <h3>Human Forces</h3>
            <div className="stat-row">
              <span>Total Units:</span>
              <span className="stat-value">{humanStats.totalUnits}</span>
            </div>
            <div className="stat-row">
              <span>Active:</span>
              <span className="stat-value active">{humanStats.active}</span>
            </div>
            <div className="stat-row">
              <span>Damaged:</span>
              <span className="stat-value damaged">{humanStats.damaged}</span>
            </div>
            <div className="stat-row">
              <span>Destroyed:</span>
              <span className="stat-value destroyed">{humanStats.destroyed}</span>
            </div>
            <div className="stat-row">
              <span>Reached Destination:</span>
              <span className="stat-value">{humanStats.reachedDestination}</span>
            </div>
            <div className="stat-row survival-rate">
              <span>Survival Rate:</span>
              <span className="stat-value">{humanSurvivalRate}%</span>
            </div>
          </div>

          <div className="faction-stats alien-stats">
            <h3>Alien Forces</h3>
            <div className="stat-row">
              <span>Total Units:</span>
              <span className="stat-value">{alienStats.totalUnits}</span>
            </div>
            <div className="stat-row">
              <span>Active:</span>
              <span className="stat-value active">{alienStats.active}</span>
            </div>
            <div className="stat-row">
              <span>Damaged:</span>
              <span className="stat-value damaged">{alienStats.damaged}</span>
            </div>
            <div className="stat-row">
              <span>Destroyed:</span>
              <span className="stat-value destroyed">{alienStats.destroyed}</span>
            </div>
            <div className="stat-row">
              <span>Reached Destination:</span>
              <span className="stat-value">{alienStats.reachedDestination}</span>
            </div>
            <div className="stat-row survival-rate">
              <span>Survival Rate:</span>
              <span className="stat-value">{alienSurvivalRate}%</span>
            </div>
          </div>
        </div>

        <div className="end-actions">
          <button className="restart-btn" onClick={onClose}>
            Start New Simulation
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSimulationEnd
