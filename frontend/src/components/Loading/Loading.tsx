import './Loading.css'

interface LoadingProps {
  message?: string
  progress?: number
}

const Loading = ({ message = 'Loading...', progress }: LoadingProps) => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <h2>{message}</h2>
        {progress !== undefined && (
          <div className="loading-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="progress-text">{progress}%</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Loading
