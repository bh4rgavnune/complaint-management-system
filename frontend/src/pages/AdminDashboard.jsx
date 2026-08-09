import { getComplaints, updateComplaintStatus } from "../services/api";
import { useEffect, useState } from "react";
import StatusBadge from "../components/StatusBadge";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      window.location.href = "/login";
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role !== "ADMIN") {
      window.location.href = "/my-complaints";
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const total = complaints.length;
  const inProgressCount = complaints.filter(c => (c.status || '').toLowerCase().includes('progress')).length;
  const pendingCount = complaints.filter(c => (c.status || '').toLowerCase().includes('pending') || (c.status || '').toLowerCase().includes('new')).length;
  const resolvedCount = complaints.filter(c => (c.status || '').toLowerCase().includes('resolved')).length;

  const filteredComplaints = complaints.filter(c => {
    if (filter === "all") return true;
    const st = (c.status || 'pending').toLowerCase();
    if (filter === "pending") return st.includes('pending') || st.includes('new');
    if (filter === "in_progress") return st.includes('progress');
    if (filter === "resolved") return st.includes('resolved');
    return true;
  });

  return (
    <div className="admin-vercel-page">
      <div className="ds-container page-container">
        <div className="admin-header-row">
          <div>
            <div className="mono-eyebrow">ADMINISTRATION CONTROL // ENTERPRISE OPERATIONS</div>
            <h1 className="page-title">Complaint Governance.</h1>
            <p className="page-subtitle">
              Monitor platform metrics, update complaint status, and manage resolution SLAs.
            </p>
          </div>

          <button className="btn-secondary-sm" onClick={fetchData}>
            🔄 Refresh Ledger
          </button>
        </div>

        {/* Vercel KPI Metrics Grid */}
        <div className="metrics-grid" style={{ marginTop: '32px' }}>
          <div className="metric-card">
            <div className="metric-label">TOTAL LEDGER COUNT</div>
            <div className="metric-value">{total}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">OPEN / PENDING</div>
            <div className="metric-value" style={{ color: 'var(--ds-warning)' }}>{pendingCount}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">IN PROGRESS</div>
            <div className="metric-value" style={{ color: 'var(--ds-link)' }}>{inProgressCount}</div>
          </div>
          <div className="metric-card">
            <div className="metric-label">RESOLVED TICKETS</div>
            <div className="metric-value" style={{ color: 'var(--ds-cyan-deep)' }}>{resolvedCount}</div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="tab-filters-row">
          <button className={`tab-ghost ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            ALL TICKETS ({total})
          </button>
          <button className={`tab-ghost ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>
            PENDING ({pendingCount})
          </button>
          <button className={`tab-ghost ${filter === 'in_progress' ? 'active' : ''}`} onClick={() => setFilter('in_progress')}>
            IN PROGRESS ({inProgressCount})
          </button>
          <button className={`tab-ghost ${filter === 'resolved' ? 'active' : ''}`} onClick={() => setFilter('resolved')}>
            RESOLVED ({resolvedCount})
          </button>
        </div>

        {/* Vercel Table Container */}
        <div className="vercel-table-container">
          {loading ? (
            <div style={{ padding: '32px', textAlign: 'center', fontFamily: 'var(--ds-font-mono)', fontSize: '13px', color: 'var(--ds-mute)' }}>
              FETCHING_ADMIN_LEDGER...
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div style={{ padding: '48px', textAlign: 'center' }}>
              <div className="mono-eyebrow">NO TICKETS IN FILTER</div>
              <p style={{ fontSize: '14px', color: 'var(--ds-mute)' }}>No records match the current filter selection.</p>
            </div>
          ) : (
            <table className="vercel-table">
              <thead>
                <tr>
                  <th>REF ID</th>
                  <th>SUBMITTED BY</th>
                  <th>TITLE / DETAILS</th>
                  <th>CATEGORY</th>
                  <th>STATUS</th>
                  <th>CHANGE STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontFamily: 'var(--ds-font-mono)', fontWeight: 600 }}>
                      #{c.id}
                    </td>
                    <td style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '12px' }}>
                      {c.submittedBy || 'Anonymous'}
                    </td>
                    <td>
                      <div style={{ fontWeight: 500 }}>{c.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--ds-mute)', marginTop: '2px' }}>
                        {c.description ? (c.description.substring(0, 50) + '...') : ''}
                      </div>
                    </td>
                    <td>
                      <span className="category-chip">{c.category || 'GENERAL'}</span>
                    </td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td>
                      <select
                        className="vercel-select"
                        style={{ height: '32px', fontSize: '12px', width: '130px', fontFamily: 'var(--ds-font-mono)' }}
                        value={c.status || 'Pending'}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      >
                        <option value="New">New</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
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

export default AdminDashboard;