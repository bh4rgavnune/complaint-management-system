import { useEffect, useState } from 'react';
import { getComplaints } from '../services/api';
import './MyComplaints.css';

function MyComplaints() {
  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      window.location.href = "/login";
      return;
    }
    const parsedUser = JSON.parse(userStr);
    setUser(parsedUser);

    // Fetch and filter user complaints
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

  // Helper for dynamic status colors
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

  if (!user) return null; // Avoid flashing while redirecting

  return (
    <div className="my-complaints-obsidian">
      <div className="bg-decor-wrapper">
        <div className="bg-decor top-right"></div>
        <div className="bg-decor bottom-left"></div>
      </div>

      <main className="my-complaints-main">
        <header className="page-header">
          <div className="title-area">
            <h1>Welcome, {user.username}</h1>
            <p className="role-tag">Role: <span className="highlight-role">{user.role}</span></p>
          </div>
          <button className="my-logout-btn" onClick={handleLogout}>
            <span className="material-symbols-outlined">logout</span> Log Out
          </button>
        </header>

        <section className="complaints-section glass-panel">
          <h2>My Complaints</h2>
          
          {loading ? (
            <div className="placeholder-content">
              <span className="material-symbols-outlined placeholder-icon rotating">sync</span>
              <p>Loading your complaints ledger...</p>
            </div>
          ) : complaints.length === 0 ? (
            <div className="placeholder-content">
              <span className="material-symbols-outlined placeholder-icon">folder_open</span>
              <p>(No complaints yet)</p>
            </div>
          ) : (
            <div className="complaints-grid">
              {complaints.map(c => {
                const statusStyle = getStatusVisuals(c.status);
                return (
                  <div key={c.id} className="user-complaint-card">
                    <div className="card-header-row">
                      <span className="card-id">ID: #{String(c.id).padStart(4, "0")}</span>
                      <span className="card-category">{c.category || "General"}</span>
                    </div>
                    <h3 className="card-title">{c.title}</h3>
                    <p className="card-desc">{c.description}</p>
                    <div className="card-status-footer">
                      <span className="status-lbl">Status</span>
                      <span 
                        className="status-val" 
                        style={{ color: statusStyle.color, textShadow: statusStyle.textShadow }}
                      >
                        {c.status || "NEW"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default MyComplaints;
