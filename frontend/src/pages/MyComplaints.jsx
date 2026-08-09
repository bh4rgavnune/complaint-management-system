import { useEffect, useState } from 'react';
import { getComplaints } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import './MyComplaints.css';

function MyComplaints() {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      window.location.href = "/login";
      return;
    }
    const parsedUser = JSON.parse(userStr);
    setUser(parsedUser);

    getComplaints()
      .then(data => {
        const filtered = data.filter(c => c.submittedBy === parsedUser.username);
        setComplaints(filtered);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const filteredComplaints = complaints.filter(c => 
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(c.id).includes(searchTerm)
  );

  if (!user) return null;

  return (
    <div className="my-complaints-vercel-page">
      <div className="ds-container page-container">
        <div className="user-profile-header">
          <div>
            <div className="mono-eyebrow">
              USER DASHBOARD // {user.role || 'CITIZEN'}
            </div>
            <h1 className="page-title">Welcome, {user.username}.</h1>
            <p className="page-subtitle">
              Manage your submitted complaints, track resolution progress, and view audit history.
            </p>
          </div>

          <button className="btn-secondary-sm" onClick={handleLogout}>
            Log Out
          </button>
        </div>

        {/* Metric Cards Summary */}
        <div className="metrics-grid" style={{ marginTop: '24px' }}>
          <div className="metric-card">
            <div className="metric-label">TOTAL SUBMITTED</div>
            <div className="metric-value">{complaints.length}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">IN PROGRESS</div>
            <div className="metric-value" style={{ color: 'var(--ds-link)' }}>
              {complaints.filter(c => (c.status || '').toLowerCase() === 'in progress' || (c.status || '').toLowerCase() === 'in_progress').length}
            </div>
          </div>
          <div className="metric-card">
            <div className="metric-label">RESOLVED TICKETS</div>
            <div className="metric-value" style={{ color: 'var(--ds-cyan-deep)' }}>
              {complaints.filter(c => (c.status || '').toLowerCase() === 'resolved').length}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="table-controls-bar">
          <input
            type="text"
            className="vercel-input mono-input"
            style={{ maxWidth: '360px' }}
            placeholder="Search by title, category or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Vercel Data Table Chrome */}
        <div className="vercel-table-container">
          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'var(--ds-font-mono)', fontSize: '13px', color: 'var(--ds-mute)' }}>
              LOADING_LEDGER_DATA...
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <div className="mono-eyebrow">NO ENTRIES FOUND</div>
              <p style={{ fontSize: '14px', color: 'var(--ds-mute)' }}>You have no active complaints matching your query.</p>
            </div>
          ) : (
            <table className="vercel-table">
              <thead>
                <tr>
                  <th>TICKET ID</th>
                  <th>SUBJECT / TITLE</th>
                  <th>CLASSIFICATION</th>
                  <th>PRIORITY</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '12px', fontWeight: 600 }}>
                      #{c.id}
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{c.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--ds-mute)', marginTop: '2px' }}>
                        {c.description ? (c.description.substring(0, 60) + '...') : ''}
                      </div>
                    </td>
                    <td>
                      <span className="category-chip">{c.category || 'GENERAL'}</span>
                    </td>
                    <td style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '12px' }}>
                      {c.priority ? c.priority.toUpperCase() : 'NORMAL'}
                    </td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyComplaints;
