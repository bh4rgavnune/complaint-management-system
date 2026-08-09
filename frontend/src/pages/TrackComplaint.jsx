import { useState } from 'react';
import { getComplaintById } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import './TrackComplaint.css';

function TrackComplaint() {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!complaintId.trim()) return;
    setLoading(true);
    setError(null);
    setComplaint(null);
    try {
      const data = await getComplaintById(complaintId.trim());
      setComplaint(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Ticket ID not found in the platform ledger.');
      } else if (!err.response) {
        setError('Unable to connect to telemetry service.');
      } else {
        setError('An unexpected error occurred while fetching ticket status.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="track-vercel-page">
      <div className="ds-container page-container">
        <div className="mono-eyebrow">TELEMETRY // REAL-TIME LOOKUP</div>
        <h1 className="page-title">Track a ticket.</h1>
        <p className="page-subtitle">
          Query real-time audit logs and resolution progress for any active complaint.
        </p>

        <div className="track-search-card vercel-card-large">
          <div className="vercel-form-group">
            <label className="vercel-form-label" htmlFor="ticket-input">
              ENTER COMPLAINT REFERENCE ID
            </label>
            <div className="search-input-flex">
              <input
                id="ticket-input"
                type="text"
                className="vercel-input mono-input"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="E.g. 1"
              />
              <button
                className="btn-primary"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading ? 'Querying...' : 'Query Ticket →'}
              </button>
            </div>
          </div>

          {error && (
            <div className="form-error-banner" style={{ marginTop: '16px' }}>
              ❌ {error}
            </div>
          )}
        </div>

        {complaint && !error && (
          <div className="track-result-container">
            <div className="vercel-card-large track-detail-card">
              <div className="track-header-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="mono-eyebrow" style={{ margin: 0 }}>
                    TICKET REF #{complaint.id}
                  </span>
                  <span className="category-chip">{complaint.category || 'GENERAL'}</span>
                </div>
                <StatusBadge status={complaint.status} />
              </div>

              <h2 className="track-complaint-title">{complaint.title}</h2>
              <p className="track-complaint-body">{complaint.description}</p>

              <div className="track-divider"></div>

              {/* Progress Stepper */}
              <div className="track-stepper">
                <div className={`step-item ${complaint ? 'completed' : ''}`}>
                  <div className="step-dot"></div>
                  <div className="step-label">01 // RECEIVED</div>
                </div>
                <div className={`step-line ${complaint.status?.toLowerCase() !== 'pending' ? 'active' : ''}`}></div>
                <div className={`step-item ${complaint.status?.toLowerCase() !== 'pending' ? 'completed' : ''}`}>
                  <div className="step-dot"></div>
                  <div className="step-label">02 // UNDER REVIEW</div>
                </div>
                <div className={`step-line ${complaint.status?.toLowerCase() === 'resolved' ? 'active' : ''}`}></div>
                <div className={`step-item ${complaint.status?.toLowerCase() === 'resolved' ? 'completed' : ''}`}>
                  <div className="step-dot"></div>
                  <div className="step-label">03 // RESOLVED</div>
                </div>
              </div>

              {/* Terminal Log Audit Mockup */}
              <div className="vercel-terminal" style={{ marginTop: '32px' }}>
                <div className="vercel-terminal-header">
                  <div className="vercel-terminal-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span>AUDIT_LOG_TRACE</span>
                </div>
                <div>[SYS_LOG] Ticket #{complaint.id} initialized by user "{complaint.submittedBy || 'Anonymous'}".</div>
                <div>[STATUS] Current status evaluated as "{complaint.status || 'NEW'}".</div>
                <div>[PRIORITY] System priority set to "{complaint.priority || 'NORMAL'}".</div>
                <div>[GATEWAY] Encrypted audit trail verified on node ledger.</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackComplaint;