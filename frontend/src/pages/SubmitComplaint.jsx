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
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
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
    <div className="submit-obsidian">
      {/* Background Decoration */}
      <div className="bg-decor-wrapper">
        <div className="bg-decor submit-top-left"></div>
        <div className="bg-decor submit-bottom-right"></div>
      </div>

      <main className="submit-main">
        {/* Editorial Header */}
        <div className="submit-header">
          <span className="entry-portal-label">Entry Portal</span>
          <h1>Submit a Complaint</h1>
          <p>Initiate a formal record in the ledger. All entries are encrypted and chronologically indexed for regulatory compliance.</p>
        </div>

        {/* Form Container */}
        <div className="submit-container">
          <div className="glass-panel">
            <div className="glass-decor"></div>

            {status === 'success' && submittedComplaint ? (
              <div className="success-confirmation-card">
                <div className="success-header">
                  <span className="material-symbols-outlined success-icon">check_circle</span>
                  <h2>Complaint Submitted Successfully</h2>
                </div>
                
                <div className="confirmation-details">
                  <div className="detail-row">
                    <span className="detail-label">Complaint ID:</span>
                    <span className="detail-value highlight">#{submittedComplaint.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status:</span>
                    <span className="detail-value status-tag">{submittedComplaint.status || "NEW"}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Submitted By:</span>
                    <span className="detail-value">{submittedComplaint.submittedBy || "Anonymous"}</span>
                  </div>
                </div>

                <p className="confirmation-instructions">
                  Please save this Complaint ID for future tracking.
                </p>

                <div className="confirmation-actions">
                  <button 
                    className="action-btn track-btn"
                    onClick={() => navigate('/track')}
                  >
                    Track This Complaint
                  </button>
                  <button 
                    className="action-btn submit-more-btn"
                    onClick={() => {
                      setStatus(null);
                      setSubmittedComplaint(null);
                    }}
                  >
                    Submit Another Complaint
                  </button>
                </div>
              </div>
            ) : (
              <>
                {status === 'error' && (
                  <div className="status-msg error-msg">❌ Failed to log complaint. Please verify your connection.</div>
                )}

                <form onSubmit={handleSubmit} className="submit-form">

                  {/* Title */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="title">
                      <span className="dot dot-primary"></span> Complaint Subject
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className="form-input"
                      placeholder="Brief summary of the issue..."
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-row">
                    {/* Category */}
                    <div className="form-group flex-1">
                      <label className="form-label" htmlFor="category">
                        <span className="dot dot-tertiary"></span> Classification
                      </label>
                      <div className="select-wrapper">
                        <select
                          id="category"
                          name="category"
                          className="form-select"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          <option disabled value="">Select category</option>
                          <option value="technical">Technical Infrastructure</option>
                          <option value="financial">Financial Discrepancy</option>
                          <option value="personnel">Personnel Conduct</option>
                          <option value="compliance">Regulatory Compliance</option>
                          <option value="security">Data Security Breach</option>
                          <option value="other">Other</option>
                        </select>
                        <span className="material-symbols-outlined select-icon">expand_more</span>
                      </div>
                    </div>

                    {/* Priority */}
                    <div className="form-group flex-1">
                      <label className="form-label">
                        <span className="dot dot-secondary"></span> Priority Tier
                      </label>
                      <div className="priority-group">
                        {['low', 'medium', 'high'].map(p => (
                          <button
                            key={p}
                            type="button"
                            className={`priority-btn ${formData.priority === p ? 'active' : ''}`}
                            onClick={() => handlePriority(p)}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="description">
                      <span className="dot dot-primary"></span> Full Disclosure
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-textarea"
                      placeholder="Provide a detailed account of the incident..."
                      rows="5"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  {/* Attachment */}
                  <div className="attachment-dropzone">
                    <div className="upload-icon-wrap">
                      <span className="material-symbols-outlined upload-icon">upload_file</span>
                    </div>
                    <div className="upload-text">
                      <p className="primary-text">Supporting Documents</p>
                      <p className="secondary-text">Drag and drop or <span>browse</span> files (Max 10MB)</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="form-actions">
                    <div className="action-info">
                      <span className="material-symbols-outlined info-icon">info</span>
                      Reference ID will be generated upon submission
                    </div>
                    <div className="action-buttons">
                      <button
                        type="button"
                        className="discard-btn"
                        onClick={() => setFormData({ title: '', description: '', category: '', priority: 'medium' })}
                      >
                        Discard
                      </button>
                      <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? 'Processing...' : 'Log Complaint'}
                      </button>
                    </div>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Side Metadata Grid */}
          <div className="metadata-grid">
            <div className="meta-card status-card">
              <p className="meta-label">STATUS</p>
              <div className="meta-value system-online">
                <div className="pulse-dot"></div>
                System Online
              </div>
            </div>
            <div className="meta-card queue-card">
              <p className="meta-label">QUEUE DEPTH</p>
              <div className="meta-value">4 Minutes Average</div>
            </div>
            <div className="meta-card encrypt-card">
              <p className="meta-label">ENCRYPTION</p>
              <div className="meta-value verified">
                AES-256 <span className="material-symbols-outlined verified-icon">verified_user</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SubmitComplaint;