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
    <header className="home-top-nav">
      <nav className="home-nav-container">
        <div className="home-brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Complaint System
        </div>
        <div className="home-links">
          {user ? (
            user.role === "ADMIN" ? (
              <>
                <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink>
                <NavLink to="/submit" className={({ isActive }) => isActive ? "active-link" : ""}>Submit</NavLink>
                <NavLink to="/track" className={({ isActive }) => isActive ? "active-link" : ""}>Track</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/submit" className={({ isActive }) => isActive ? "active-link" : ""}>Submit</NavLink>
                <NavLink to="/track" className={({ isActive }) => isActive ? "active-link" : ""}>Track</NavLink>
                <NavLink to="/my-complaints" className={({ isActive }) => isActive ? "active-link" : ""}>My Complaints</NavLink>
              </>
            )
          ) : (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
              <NavLink to="/login" className={({ isActive }) => isActive ? "active-link" : ""}>Login</NavLink>
              <NavLink to="/track" className={({ isActive }) => isActive ? "active-link" : ""}>Track</NavLink>
            </>
          )}
        </div>
        <div className="home-actions">
          <button className="icon-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="icon-btn">
            <span className="material-symbols-outlined">settings</span>
          </button>
          
          {user ? (
            <button className="user-profile" onClick={handleLogout} title={`Log out (${user.username})`}>
              <div className="user-profile-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
                <span>Logout</span>
              </div>
            </button>
          ) : (
            <button className="user-profile" onClick={() => navigate("/login")}>
              <div className="user-profile-inner">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span>Login</span>
              </div>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;