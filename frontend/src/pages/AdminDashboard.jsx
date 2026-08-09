import { getComplaints, updateComplaintStatus } from "../services/api";
import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
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

  const [complaints, setComplaints] = useState([]);

  const fetchData = async () => {
    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateComplaintStatus(id, newStatus);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComplaints().then(setComplaints).catch(console.error);
  }, []);

  // ✅ Stats (clean + safe)
  const total = complaints.length;
  const newCount = complaints.filter(c => !c.status || c.status.toUpperCase().replace(/[-_]/g, ' ') === "NEW").length;
  const inProgressCount = complaints.filter(c => c.status && c.status.toUpperCase().replace(/[-_]/g, ' ') === "IN PROGRESS").length;
  const pendingCount = complaints.filter(c => c.status && c.status.toUpperCase().replace(/[-_]/g, ' ') === "PENDING").length;
  const resolvedCount = complaints.filter(c => c.status && c.status.toUpperCase().replace(/[-_]/g, ' ') === "RESOLVED").length;

  return (
    <div className="obsidian-theme">


      {/* Main */}
      <main className="main-content">

        {/* Stats Cards */}
        <section className="bento-filter">

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

          <div className="bento-box new-box">
            <h4>{newCount}</h4>
            <p>New</p>
          </div>

          <div className="bento-box combined-box">
            <h4>{inProgressCount}</h4>
            <p>In Progress / {pendingCount} Pending</p>
          </div>

          <div className="bento-box resolved-box">
            <h4>{resolvedCount}</h4>
            <p>Resolved</p>
          </div>

        </section>

        {/* Section Title */}
        <h2 className="section-title">New Complaints</h2>

        {/* Complaint Grid */}
        <div className="complaint-grid">
          {complaints.length === 0 ? (
            <p>No complaints found.</p>
          ) : (
            complaints.map((c) => (
              <div key={c.id} className="card">

                <div className="card-header-row">
                  <p className="card-id">ID: #{c.id ? String(c.id).padStart(4, "0") : "REG-000"}</p>
                  <span className="card-category">{c.category || "General"}</span>
                </div>
                <h3>{c.title}</h3>
                <p className="card-desc">{c.description}</p>

                <div className="card-status-row">
                  <span className="status-label">Status:</span>
                  <div className="select">
                    <div className="selected" data-default="New" data-one="In Progress" data-two="Pending" data-three="Resolved">
                      <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                      </svg>
                    </div>
                    <div className="options">
                      <div title="New">
                        <input id={`new-${c.id}`} name={`option-${c.id}`} type="radio" className="opt-default" checked={!c.status || c.status.toUpperCase().replace(/[-_]/g, ' ') === "NEW"} onChange={() => handleStatusChange(c.id, "New")} />
                        <label className="option" htmlFor={`new-${c.id}`} data-txt="New" />
                      </div>
                      <div title="In Progress">
                        <input id={`inprogress-${c.id}`} name={`option-${c.id}`} type="radio" className="opt-one" checked={c.status && c.status.toUpperCase().replace(/[-_]/g, ' ') === "IN PROGRESS"} onChange={() => handleStatusChange(c.id, "In Progress")} />
                        <label className="option" htmlFor={`inprogress-${c.id}`} data-txt="In Progress" />
                      </div>
                      <div title="Pending">
                        <input id={`pending-${c.id}`} name={`option-${c.id}`} type="radio" className="opt-two" checked={c.status && c.status.toUpperCase().replace(/[-_]/g, ' ') === "PENDING"} onChange={() => handleStatusChange(c.id, "Pending")} />
                        <label className="option" htmlFor={`pending-${c.id}`} data-txt="Pending" />
                      </div>
                      <div title="Resolved">
                        <input id={`resolved-${c.id}`} name={`option-${c.id}`} type="radio" className="opt-three" checked={c.status && c.status.toUpperCase().replace(/[-_]/g, ' ') === "RESOLVED"} onChange={() => handleStatusChange(c.id, "Resolved")} />
                        <label className="option" htmlFor={`resolved-${c.id}`} data-txt="Resolved" />
                      </div>
                    </div>
                  </div>
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

    </div>
  );
}

export default AdminDashboard;