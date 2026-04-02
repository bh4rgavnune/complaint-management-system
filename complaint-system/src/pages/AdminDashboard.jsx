import { getComplaints, updateComplaintStatus } from "../services/api";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComplaints().then(setComplaints).catch(console.error);
  }, []);

  // ✅ Stats (clean + safe)
  const total = complaints.length;
  const newCount = complaints.filter(c => !c.status || c.status === "New").length;
  const inProgressCount = complaints.filter(c => c.status === "In Progress").length;
  const pendingCount = complaints.filter(c => c.status === "Pending").length;
  const resolvedCount = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div className="obsidian-theme">


      {/* Main */}
      <main className="main-content">

        {/* Header */}
        <header className="page-header">
          <div className="title-area">
            <h1>Complaint Registry</h1>
            <p>Real-time resolution oversight & data curation.</p>
          </div>

          <div className="header-stats">
            <div className="total-box">
              <p className="total-label">TOTAL COMPLAINTS</p>
              <div className="total-val">
                <span className="val-text">{total}</span>
                <span className="trend">+12% <span className="material-symbols-outlined trend-icon">trending_up</span></span>
              </div>
            </div>

            <button className="refresh-btn" onClick={fetchData}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="bento-filter">

          <div className="bento-box new-box">
            <h4>{newCount}</h4>
            <p>New</p>
          </div>

          <div className="bento-box inprogress-box">
            <h4>{inProgressCount}</h4>
            <p>In Progress</p>
          </div>

          <div className="bento-box pending-box">
            <h4>{pendingCount}</h4>
            <p>Pending</p>
          </div>

          <div className="bento-box resolved-box">
            <h4>{resolvedCount}</h4>
            <p>Resolved</p>
          </div>

        </section>

        {/* Complaint Grid */}
        <div className="complaint-grid">
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map((c) => (
              <div key={c.id} className="card">

                <p className="card-id">ID: #{c.id ? String(c.id).padStart(4, "0") : "REG-000"}</p>
                <h3>{c.title}</h3>
                <p className="card-desc">{c.description}</p>
                <div className="card-footer" style={{ paddingTop: '0', borderTop: 'none', marginBottom: '1rem' }}>
                  <div className="card-user">
                    <div className="user-icon">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <p className="user-name">{c.category || "General"}</p>
                      <p className="user-time">Just now</p>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--on-surface-variant)' }}>
                    <strong>Status:</strong>
                  </p>
                  <select
                    className="status-dropdown hover-show"
                    value={c.status || "New"}
                    onChange={async (e) => {
                      try {
                        await updateComplaintStatus(c.id, e.target.value);
                        fetchData();
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    <option>New</option>
                    <option>In Progress</option>
                    <option>Pending</option>
                    <option>Resolved</option>
                  </select>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="footer-bar">
          <p>Showing {total} complaints</p>
        </footer>

      </main>

      {/* Floating Button */}
      <button className="fab-btn">+</button>

    </div>
  );
}

export default AdminDashboard;