import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComplaint } from "../services/api";
import "./SubmitComplaint.css";

function SubmitComplaint() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
  });
  const [status, setStatus] = useState(null);
  const [submittedComplaint, setSubmittedComplaint] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePriority = (priority) => {
    setFormData({ ...formData, priority });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setSubmittedComplaint(null);
    try {
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      const submittedBy = user ? user.username : 'Anonymous';

      const payload = {
        ...formData,
        submittedBy
      };

      const responseData = await createComplaint(payload);
      setSubmittedComplaint(responseData);
      setStatus('success');
      setFormData({ title: '', description: '', category: '', priority: 'medium' });
    } catch (error) {
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-vercel-page">
      <div className="ds-container page-container">
        <div className="mono-eyebrow">ENTRY PORTAL // VERIFIED INTAKE</div>
        <h1 className="page-title">File a complaint.</h1>
        <p className="page-subtitle">
          Submit a formal ticket to the ledger. All complaints are encrypted and indexed for tracking.
        </p>

        <div className="submit-layout-grid">
          <div className="vercel-card-large submit-form-card">
            {status === 'success' && submittedComplaint ? (
              <div className="vercel-success-receipt">
                <div className="mono-eyebrow" style={{ color: 'var(--ds-cyan-deep)' }}>
                  ✓ SUBMISSION CONFIRMED
                </div>
                <h2>Ticket Created Successfully.</h2>
                <p style={{ color: 'var(--ds-body)', marginBottom: '24px' }}>
                  Your ticket has been recorded in the platform ledger. Save your Reference ID below for tracking.
                </p>

                <div className="vercel-terminal" style={{ marginBottom: '24px' }}>
                  <div className="vercel-terminal-header">
                    <div className="vercel-terminal-dots">
                      <span></span><span></span><span></span>
                    </div>
                    <span>TICKET_RECEIPT_V3</span>
                  </div>
                  <div>TICKET ID    : #{submittedComplaint.id}</div>
                  <div>SUBMITTED BY : {submittedComplaint.submittedBy || "Anonymous"}</div>
                  <div>CATEGORY     : {submittedComplaint.category || "GENERAL"}</div>
                  <div>STATUS       : {submittedComplaint.status || "NEW"}</div>
                  <div>TIMESTAMP    : {new Date().toISOString()}</div>
                </div>

                <div className="receipt-actions">
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/track')}
                  >
                    Track Ticket Status →
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setStatus(null);
                      setSubmittedComplaint(null);
                    }}
                  >
                    Submit Another Ticket
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="vercel-submit-form">
                {status === 'error' && (
                  <div className="form-error-banner">
                    ⚠️ Failed to submit complaint. Please check your backend connection.
                  </div>
                )}

                <div className="vercel-form-group">
                  <label className="vercel-form-label" htmlFor="title">
                    01 // COMPLAINT SUBJECT
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="vercel-input"
                    placeholder="E.g. Database connection timeout in production cluster"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-two-col">
                  <div className="vercel-form-group">
                    <label className="vercel-form-label" htmlFor="category">
                      02 // CLASSIFICATION
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="vercel-select"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      <option disabled value="">Select Category</option>
                      <option value="technical">Technical Infrastructure</option>
                      <option value="financial">Financial Discrepancy</option>
                      <option value="personnel">Personnel Conduct</option>
                      <option value="compliance">Regulatory Compliance</option>
                      <option value="security">Data Security Breach</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="vercel-form-group">
                    <label className="vercel-form-label">
                      03 // PRIORITY LEVEL
                    </label>
                    <div className="priority-pill-selector">
                      {['low', 'medium', 'high'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          className={`tab-ghost ${formData.priority === p ? 'active' : ''}`}
                          onClick={() => handlePriority(p)}
                        >
                          {p.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="vercel-form-group">
                  <label className="vercel-form-label" htmlFor="description">
                    04 // DETAILED DISCLOSURE
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="vercel-textarea"
                    placeholder="Provide full step-by-step account of the issue, affected systems, and expected behavior..."
                    rows="6"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <div className="vercel-dropzone-box">
                  <div className="dropzone-mono">ATTACHMENTS // DRAG & DROP</div>
                  <div className="dropzone-sub">PNG, JPG, PDF, TXT supported up to 10MB</div>
                </div>

                <div className="form-submit-footer">
                  <div className="footer-mono-note">
                    🔒 AES-256 Encrypted ledger submission
                  </div>
                  <div className="footer-btn-group">
                    <button
                      type="button"
                      className="btn-secondary-sm"
                      onClick={() => setFormData({ title: '', description: '', category: '', priority: 'medium' })}
                    >
                      Reset Form
                    </button>
                    <button type="submit" className="btn-primary" disabled={loading}>
                      {loading ? 'Logging Ticket...' : 'Submit Complaint →'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar System Telemetry */}
          <div className="submit-sidebar">
            <div className="metric-card">
              <div className="metric-label">SYSTEM AVAILABILITY</div>
              <div className="metric-value" style={{ color: 'var(--ds-cyan-deep)' }}>99.98%</div>
              <span className="mono-eyebrow" style={{ marginTop: '8px', fontSize: '11px' }}>
                All nodes operational
              </span>
            </div>

            <div className="metric-card">
              <div className="metric-label">AVG SLA INTAKE</div>
              <div className="metric-value">&lt; 4 MINS</div>
              <span className="mono-eyebrow" style={{ marginTop: '8px', fontSize: '11px' }}>
                Auto-assigned to queue
              </span>
            </div>

            <div className="metric-card">
              <div className="metric-label">ENCRYPTION ENGINE</div>
              <div className="metric-value" style={{ fontSize: '20px' }}>TLS 1.3 / AES</div>
              <span className="mono-eyebrow" style={{ marginTop: '8px', fontSize: '11px' }}>
                Zero-knowledge audit
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitComplaint;