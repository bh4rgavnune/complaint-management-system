import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const userStr = localStorage.getItem("user");
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="vercel-navbar">
      <div className="vercel-nav-container">
        <div className="vercel-brand" onClick={() => navigate("/")}>
          <div className="vercel-logo-mark">
            <svg viewBox="0 0 75 65" height="18" fill="currentColor">
              <path d="M37.5 0L75 65H0z" />
            </svg>
          </div>
          <span className="vercel-brand-text">Complaint System</span>
          <span className="vercel-brand-badge">PRO</span>
        </div>

        <nav className="vercel-nav-links">
          {user ? (
            user.role === "ADMIN" ? (
              <>
                <NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Dashboard</NavLink>
                <NavLink to="/submit" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Submit</NavLink>
                <NavLink to="/track" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Track</NavLink>
                <NavLink to="/reports" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Reports</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                <NavLink to="/submit" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Submit</NavLink>
                <NavLink to="/track" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Track</NavLink>
                <NavLink to="/my-complaints" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>My Complaints</NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Overview</NavLink>
              <NavLink to="/submit" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Submit</NavLink>
              <NavLink to="/track" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Track Ticket</NavLink>
              <NavLink to="/reports" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Analytics</NavLink>
            </>
          )}
        </nav>

        <div className="vercel-nav-actions">
          {user ? (
            <div className="user-nav-group">
              <span className="user-mono-tag">
                <span className="online-dot"></span>
                {user.username}
              </span>
              <button className="nav-cta-dark" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          ) : (
            <>
              <button className="nav-cta-ghost" onClick={() => navigate("/login")}>
                Log In
              </button>
              <button className="nav-cta-dark" onClick={() => navigate("/register")}>
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;