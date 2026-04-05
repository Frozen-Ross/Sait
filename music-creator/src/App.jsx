import { useState, useEffect } from 'react'
import './App.css'

const GENRES = [
  'Pop', 'Rock', 'Hip Hop', 'Electronic', 'Jazz', 'Classical', 
  'R&B', 'Country', 'Reggae', 'Metal', 'Folk', 'Ambient'
]

const MOODS = [
  'Happy', 'Sad', 'Energetic', 'Calm', 'Romantic', 
  'Dark', 'Uplifting', 'Melancholic', 'Aggressive', 'Peaceful'
]

function App() {
  const [prompt, setPrompt] = useState('')
  const [genre, setGenre] = useState('Pop')
  const [mood, setMood] = useState('Happy')
  const [duration, setDuration] = useState(30)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedTracks, setGeneratedTracks] = useState([])
  const [activeTab, setActiveTab] = useState('create')
  const [currentTrack, setCurrentTrack] = useState(null)

  // Simulate track generation
  const handleGenerate = () => {
    if (!prompt.trim()) return
    
    setIsGenerating(true)
    setProgress(0)
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 2
      })
    }, 100)

    setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      
      const newTrack = {
        id: Date.now(),
        title: prompt.slice(0, 30) + (prompt.length > 30 ? '...' : ''),
        genre,
        mood,
        duration,
        createdAt: new Date().toLocaleDateString(),
        waveform: generateWaveform(),
        audioUrl: null // In real app, this would be the generated audio URL
      }
      
      setGeneratedTracks(prev => [newTrack, ...prev])
      setIsGenerating(false)
      setPrompt('')
    }, 5000)
  }

  const generateWaveform = () => {
    return Array.from({ length: 50 }, () => Math.random() * 100)
  }

  const handlePlay = (track) => {
    setCurrentTrack(track)
  }

  const handleDelete = (trackId) => {
    setGeneratedTracks(prev => prev.filter(t => t.id !== trackId))
    if (currentTrack?.id === trackId) {
      setCurrentTrack(null)
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">🎵</span>
          <h1>Music Creator</h1>
        </div>
        <nav className="nav">
          <button 
            className={`nav-btn ${activeTab === 'create' ? 'active' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create
          </button>
          <button 
            className={`nav-btn ${activeTab === 'library' ? 'active' : ''}`}
            onClick={() => setActiveTab('library')}
          >
            Library ({generatedTracks.length})
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeTab === 'create' && (
          <div className="create-section">
            <div className="creation-card">
              <h2>Create Your Music</h2>
              <p className="subtitle">Describe the music you want to create</p>
              
              <div className="input-group">
                <label>Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A catchy pop song about summer vibes with upbeat tempo..."
                  rows={4}
                />
              </div>

              <div className="options-grid">
                <div className="input-group">
                  <label>Genre</label>
                  <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                    {GENRES.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Mood</label>
                  <select value={mood} onChange={(e) => setMood(e.target.value)}>
                    {MOODS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div className="input-group">
                  <label>Duration (seconds)</label>
                  <input
                    type="range"
                    min="15"
                    max="120"
                    step="15"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                  <span className="duration-value">{duration}s</span>
                </div>
              </div>

              <button 
                className={`generate-btn ${isGenerating ? 'generating' : ''}`}
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
              >
                {isGenerating ? (
                  <span className="generating-text">
                    🎹 Generating... {progress}%
                  </span>
                ) : (
                  <span>✨ Generate Music</span>
                )}
              </button>

              {isGenerating && (
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              )}
            </div>

            {generatedTracks.length > 0 && (
              <div className="recent-tracks">
                <h3>Recent Tracks</h3>
                <div className="tracks-list">
                  {generatedTracks.slice(0, 3).map(track => (
                    <div key={track.id} className="track-item">
                      <div className="track-info">
                        <h4>{track.title}</h4>
                        <p>{track.genre} • {track.mood} • {track.duration}s</p>
                      </div>
                      <div className="track-actions">
                        <button onClick={() => handlePlay(track)}>▶️ Play</button>
                        <button onClick={() => handleDelete(track.id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'library' && (
          <div className="library-section">
            <h2>Your Library</h2>
            {generatedTracks.length === 0 ? (
              <div className="empty-library">
                <p>No tracks yet. Start creating!</p>
                <button onClick={() => setActiveTab('create')}>Create Track</button>
              </div>
            ) : (
              <div className="tracks-grid">
                {generatedTracks.map(track => (
                  <div key={track.id} className="track-card">
                    <div className="track-waveform">
                      {track.waveform.map((height, i) => (
                        <div 
                          key={i} 
                          className="waveform-bar"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                    <div className="track-details">
                      <h4>{track.title}</h4>
                      <p className="track-meta">
                        {track.genre} • {track.mood}
                      </p>
                      <p className="track-date">{track.createdAt}</p>
                    </div>
                    <div className="track-controls">
                      <button 
                        className="play-btn"
                        onClick={() => handlePlay(track)}
                      >
                        ▶️ Play
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(track.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {currentTrack && (
        <div className="player-bar">
          <div className="player-info">
            <h4>{currentTrack.title}</h4>
            <p>{currentTrack.genre} • {currentTrack.mood}</p>
          </div>
          <div className="player-controls">
            <button>⏮️</button>
            <button className="play-pause">⏸️</button>
            <button>⏭️</button>
          </div>
          <div className="player-progress">
            <span>0:00</span>
            <div className="progress-track">
              <div className="progress-current" style={{ width: '30%' }} />
            </div>
            <span>{currentTrack.duration}s</span>
          </div>
          <button 
            className="close-player"
            onClick={() => setCurrentTrack(null)}
          >
            ✕
          </button>
        </div>
      )}

      <footer className="footer">
        <p>Music Creator - AI-Powered Music Generation</p>
        <p>Built with React</p>
      </footer>
    </div>
  )
}

export default App
