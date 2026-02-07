import './SimulationControl.css'

const SimulationControl = () => {
  return (
    <div className="panel simulation-control-panel">
      <div className="panel-header">Simulation Control</div>
      <div className="panel-content">
        <button>▶ Play</button>
        <button>⏸ Pause</button>
        <button>⏭ Step</button>
        <button>⏹ Stop</button>
      </div>
    </div>
  )
}

export default SimulationControl