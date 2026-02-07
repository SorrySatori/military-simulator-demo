import './SimulationControl.css'
import { useSimulationStore } from '../../store/SimulationStore'
import { useEffect, useRef } from 'react'



const SimulationControl = () => {

    const isRunning = useSimulationStore((state) => state.isRunning)
    const toggleRunning = useSimulationStore((state) => state.toggleRunning)
    const resetEntities = useSimulationStore((state) => state.resetEntities)
    const tick = useSimulationStore((state) => state.tick)
    
    const lastTickRef = useRef<number>(Date.now())
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  
    useEffect(() => {
      if (isRunning) {
        lastTickRef.current = Date.now()
        
        intervalRef.current = setInterval(() => {
          const now = Date.now()
          const deltaTime = (now - lastTickRef.current) / 1000
          lastTickRef.current = now
          
          tick(deltaTime)
        }, 1000 / 60)
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
  
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
        }
      }
    }, [isRunning, tick])
  
    const handleReset = () => {
      resetEntities()
      lastTickRef.current = Date.now()
    }

  return (
    <div className="panel simulation-control-panel">
      <div className="panel-header">Simulation Control</div>
      <div className="panel-content">
      <button 
            className={`control-btn ${isRunning ? 'pause' : 'play'}`}
            onClick={toggleRunning}
          >
            {isRunning ? '⏸ Pause' : '▶ Play'}
          </button>
          <button 
            className="control-btn reset"
            onClick={handleReset}
          >
            ↻ Reset
          </button>
      </div>
    </div>
  )
}

export default SimulationControl