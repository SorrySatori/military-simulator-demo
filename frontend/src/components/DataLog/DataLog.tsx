import { useEffect, useRef } from 'react'
import { useSimulationStore } from '../../store/SimulationStore'
import './DataLog.css'

const DataLog = () => {
  const combatLogs = useSimulationStore((state) => state.combatLogs)
  const clearCombatLogs = useSimulationStore((state) => state.clearCombatLogs)
  const logContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight
    }
  }, [combatLogs])

  const formatTime = () => {
    const now = new Date()
    return now.toLocaleTimeString('cs-CZ')
  }

  return (
    <div className="panel data-log-panel">
      <div className="panel-header">
        Combat Log
        {combatLogs.length > 0 && (
          <button 
            onClick={clearCombatLogs}
            style={{
              marginLeft: 'auto',
              padding: '4px 8px',
              fontSize: '12px',
              cursor: 'pointer',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '4px'
            }}
          >
            Clear
          </button>
        )}
      </div>
      <div className="panel-content" ref={logContainerRef} style={{ overflowY: 'auto', maxHeight: '200px' }}>
        {combatLogs.length === 0 ? (
          <>
            <div className="log-entry">[{formatTime()}] Simulation initialized</div>
            <div className="log-entry">[{formatTime()}] Waiting for combat...</div>
          </>
        ) : (
          combatLogs.map((log, index) => (
            <div key={index} className="log-entry" style={{ 
              color: log.includes('destroyed') ? '#e74c3c' : '#ecf0f1',
              fontWeight: log.includes('destroyed') ? 'bold' : 'normal'
            }}>
              [{formatTime()}] {log}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default DataLog