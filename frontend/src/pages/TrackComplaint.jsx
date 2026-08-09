import { useState } from 'react'
import { getComplaintById } from '../services/api'
import './TrackComplaint.css'

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState('')
  const [complaint, setComplaint] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async () => {
    if (!complaintId.trim()) return
    setLoading(true)
    setError(null)
    setComplaint(null)
    try {
      const data = await getComplaintById(complaintId.trim())
      setComplaint(data)
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Complaint not found')
      } else if (!err.response) {
        setError('Unable to connect to server')
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  // Helper for dynamic colors
  const getStatusVisuals = (status) => {
    const defaultVisuals = { color: 'var(--on-surface-variant)', glowColor: 'rgba(173, 170, 170, 0.2)' };
    if (!status) return defaultVisuals;

    switch (status.toLowerCase()) {
      case 'new':
        return { color: 'var(--tertiary, #69acff)', glowColor: 'rgba(105, 172, 255, 0.3)', textShadow: '0 0 15px rgba(105, 172, 255, 0.3)' };
      case 'in progress':
      case 'in-progress':
        return { color: 'var(--secondary, #f8a010)', glowColor: 'rgba(248, 160, 16, 0.3)', textShadow: '0 0 15px rgba(248, 160, 16, 0.3)' };
      case 'pending':
        return { color: '#ef4444', glowColor: 'rgba(239, 68, 68, 0.3)', textShadow: '0 0 15px rgba(239, 68, 68, 0.3)' };
      case 'resolved':
      case 'closed':
        return { color: 'var(--primary, #69f6b8)', glowColor: 'rgba(105, 246, 184, 0.3)', textShadow: '0 0 15px rgba(105, 246, 184, 0.3)' };
      default:
        return defaultVisuals;
    }
  }

  const statusVisuals = getStatusVisuals(complaint?.status);

  return (
    <div className="track-main">
      <div className="bg-accent"></div>

      <div className="track-container">
        {/* Header */}
        <div className="track-header">
          <h1>Track Complaint</h1>
          <p>Monitor your submission status securely on the <span>Complaint System</span>.</p>
        </div>

        {/* Tracking UI */}
        <div>
          <div className="search-section group">
            <label className="search-label">Complaint ID</label>
            <div className="search-input-group">
              <input
                type="text"
                className="search-input"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter Complaint ID (e.g. 1)"
              />
              <button
                className="search-btn"
                onClick={handleSearch}
                disabled={loading}
              >
                <span className="material-symbols-outlined">
                  {loading ? 'hourglass_empty' : 'search'}
                </span>
              </button>
            </div>
          </div>

          {error && <div className="error-message">❌ {error}</div>}

          {complaint && !error && (
            <div className="result-section">
              <p className="result-label">Tracking Information</p>
              
              <div className="tracking-card">
                <div className="tracking-card-header">
                  <span className="tracking-id">ID: #{complaint.id ? String(complaint.id).padStart(4, "0") : "0000"}</span>
                  <span className="tracking-category">{complaint.category || "General"}</span>
                </div>
                
                <h3 className="tracking-title">{complaint.title}</h3>
                <p className="tracking-desc">{complaint.description}</p>

                <div className="status-display-wrapper">
                  <p className="status-label">Current Status</p>
                  <div className="status-display">
                    <div
                      className="status-glow"
                      style={{ backgroundColor: statusVisuals.glowColor }}
                    ></div>
                    <h2
                      className="status-text"
                      style={{
                        color: statusVisuals.color,
                        textShadow: statusVisuals.textShadow
                      }}
                    >
                      {complaint.status || "New"}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrackComplaint