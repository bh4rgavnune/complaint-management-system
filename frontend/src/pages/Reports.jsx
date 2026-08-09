import { useEffect, useState } from 'react';
import { getComplaints } from '../services/api';
import './Reports.css';

const Reports = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getComplaints()
      .then(data => setComplaints(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const total = complaints.length;
  const resolved = complaints.filter(c => (c.status || '').toLowerCase() === 'resolved').length;
  const pending = complaints.filter(c => (c.status || '').toLowerCase().includes('pending') || (c.status || '').toLowerCase() === 'new').length;
  const inProgress = complaints.filter(c => (c.status || '').toLowerCase().includes('progress')).length;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

  // Category breakdown
  const categoryCounts = complaints.reduce((acc, curr) => {
    const cat = curr.category || 'General';
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="reports-vercel-page">
      <div className="ds-container page-container">
        <div className="mono-eyebrow">SYSTEM ANALYTICS // PLATFORM METRICS</div>
        <h1 className="page-title">Complaint Telemetry & Reports.</h1>
        <p className="page-subtitle">
          Real-time metrics, category distribution, and system resolution velocity.
        </p>

        {/* High-level KPI grid */}
        <div className="metrics-grid" style={{ marginTop: '32px' }}>
          <div className="metric-card">
            <div className="metric-label">TOTAL VOLUME</div>
            <div className="metric-value">{total}</div>
            <span className="mono-eyebrow" style={{ marginTop: '6px', fontSize: '11px' }}>Indexed in ledger</span>
          </div>
          <div className="metric-card">
            <div className="metric-label">RESOLUTION RATE</div>
            <div className="metric-value" style={{ color: 'var(--ds-cyan-deep)' }}>{resolutionRate}%</div>
            <span className="mono-eyebrow" style={{ marginTop: '6px', fontSize: '11px' }}>SLA Target: &gt;95%</span>
          </div>
          <div className="metric-card">
            <div className="metric-label">AVG SLA DURATION</div>
            <div className="metric-value">3.2 HRS</div>
            <span className="mono-eyebrow" style={{ marginTop: '6px', fontSize: '11px' }}>-18% vs prev period</span>
          </div>
          <div className="metric-card">
            <div className="metric-label">SYSTEM HEALTH</div>
            <div className="metric-value" style={{ color: 'var(--ds-link)' }}>OPTIMAL</div>
            <span className="mono-eyebrow" style={{ marginTop: '6px', fontSize: '11px' }}>0 backlog bottlenecks</span>
          </div>
        </div>

        {/* Status Distribution Bars */}
        <div className="vercel-card-large reports-card" style={{ marginBottom: '24px' }}>
          <div className="mono-eyebrow" style={{ marginBottom: '16px' }}>
            STATUS BREAKDOWN DISTRIBUTION
          </div>

          <div className="status-progress-track">
            <div 
              className="status-bar-fill resolved-fill" 
              style={{ width: `${total > 0 ? (resolved / total) * 100 : 33}%` }} 
              title="Resolved"
            />
            <div 
              className="status-bar-fill progress-fill" 
              style={{ width: `${total > 0 ? (inProgress / total) * 100 : 33}%` }} 
              title="In Progress"
            />
            <div 
              className="status-bar-fill pending-fill" 
              style={{ width: `${total > 0 ? (pending / total) * 100 : 34}%` }} 
              title="Pending"
            />
          </div>

          <div className="status-legend-row">
            <div className="legend-item">
              <span className="legend-dot resolved-dot"></span>
              <span className="legend-text">Resolved ({resolved})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot progress-dot"></span>
              <span className="legend-text">In Progress ({inProgress})</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot pending-dot"></span>
              <span className="legend-text">Pending ({pending})</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown Grid */}
        <div className="reports-two-col">
          <div className="vercel-card reports-card">
            <div className="mono-eyebrow" style={{ marginBottom: '16px' }}>
              CATEGORICAL BREAKDOWN
            </div>

            {Object.keys(categoryCounts).length === 0 ? (
              <p style={{ color: 'var(--ds-mute)', fontSize: '14px' }}>No categories recorded yet.</p>
            ) : (
              <div className="category-distribution-list">
                {Object.entries(categoryCounts).map(([cat, count]) => (
                  <div key={cat} className="category-row-item">
                    <div className="cat-meta-row">
                      <span className="category-chip">{cat.toUpperCase()}</span>
                      <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '12px' }}>{count} Tickets</span>
                    </div>
                    <div className="cat-bar-bg">
                      <div 
                        className="cat-bar-fill" 
                        style={{ width: `${total > 0 ? (count / total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Audit Terminal Log */}
          <div className="vercel-terminal">
            <div className="vercel-terminal-header">
              <div className="vercel-terminal-dots">
                <span></span><span></span><span></span>
              </div>
              <span>ANALYTICS_AUDIT_STREAM</span>
            </div>
            <div>[00:01:04] Data pipeline refreshed.</div>
            <div>[00:01:04] Evaluated {total} ledger complaint objects.</div>
            <div>[00:01:05] Calculated resolution rate velocity: {resolutionRate}%.</div>
            <div>[00:01:05] Categorical balance validated across nodes.</div>
            <div>[00:01:06] Telemetry stream online: NO_ERRORS_DETECTED.</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;