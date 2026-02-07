import './SimulationControl.css'
import { useSimulationStore } from '../../store/SimulationStore'
import { useEffect, useRef } from 'react'



const SimulationControl = () => {

    const isRunning = useSimulationStore((state) => state.isRunning)
    const toggleRunning = useSimulationStore((state) => state.toggleRunning)
    const resetEntities = useSimulationStore((state) => state.resetEntities)
    const tick = useSimulationStore((state) => state.tick)
    
    const lastTickRef = useRef<number>(Date.now())
    const animationFrameRef = useRef<number>()
  
    useEffect(() => {
      const animate = () => {
        const now = Date.now(   )
        const deltaTime = (now - lastTickRef.current) / 100
        lastTickRef.current = now
  
        if (isRunning) {
          tick(deltaTime)
        }
  
        animationFrameRef.current = requestAnimationFrame(animate)
      }
  
      animationFrameRef.current = requestAnimationFrame(animate)
  
      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
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