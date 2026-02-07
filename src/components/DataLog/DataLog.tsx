import './DataLog.css'

const DataLog = () => {
  return (
    <div className="panel data-log-panel">
      <div className="panel-header">Data Log</div>
      <div className="panel-content">
        <div className="log-entry">[00:00:00] Simulation initialized</div>
        <div className="log-entry">[00:00:01] Waiting for user input...</div>
      </div>
    </div>
  )
}

export default DataLog