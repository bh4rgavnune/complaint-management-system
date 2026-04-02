import { useState } from 'react'
import axios from 'axios'
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
      const response = await axios.get(`/api/complaints/${complaintId}`)
      setComplaint(response.data)
    } catch (err) {
      setError(
        err.response?.status === 404
          ? 'No complaint found with that ID.'
          : 'Something went wrong. Please try again.'
      )
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
      case 'open':
        return { color: 'var(--tertiary)', glowColor: 'rgba(105, 156, 255, 0.3)', textShadow: '0 0 15px rgba(105, 156, 255, 0.3)' };
      case 'in-progress':
      case 'under review':
        return { color: 'var(--secondary)', glowColor: 'rgba(248, 160, 16, 0.3)', textShadow: '0 0 15px rgba(248, 160, 16, 0.3)' };
      case 'resolved':
      case 'closed':
        return { color: 'var(--primary)', glowColor: 'rgba(105, 246, 184, 0.3)', textShadow: '0 0 15px rgba(105, 246, 184, 0.3)' };
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
                placeholder="OL-7742-X"
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
              <p className="result-label">Current Status</p>
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
                  {complaint.status}
                </h2>
              </div>
              <p className="last-updated">
                Last updated: {new Date(complaint.lastUpdate || Date.now()).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TrackComplaint