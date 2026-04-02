import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <header className="home-top-nav">
      <nav className="home-nav-container">
        <div className="home-brand">Complaint System</div>
        <div className="home-links">
          <NavLink to="/" className={({ isActive }) => isActive ? "active-link" : ""}>Home</NavLink>
          <NavLink to="/submit" className={({ isActive }) => isActive ? "active-link" : ""}>Submit</NavLink>
          <NavLink to="/track" className={({ isActive }) => isActive ? "active-link" : ""}>Track</NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? "active-link" : ""}>Admin</NavLink>
          <NavLink to="/reports" className={({ isActive }) => isActive ? "active-link" : ""}>Reports</NavLink>
        </div>
        <div className="home-actions hidden-mobile">
          <button className="icon-btn">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="icon-btn">
            <span className="material-symbols-outlined">settings</span>
          </button>
          <div className="avatar">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-Ve0fsxdSh3HiWivndbMr6OtyZfUbDFp4kDHRIwwwSXR8NXjrv2bR9IzA_TfJtyS_XN6mTu5iK74y1MxqJ1HkceCMqRVsfQNUNbN5XZRy9Vw6DvAMau63RSBzRS4nwPK_OFp3IcS3mMj2YDN6ehJAMDmdWpkoo-gxD1iBUDxUBdI8hQ6dqDa69TC_0cix147YUv4uv_dEI2q-OgoG5MKpGeGZt6pA6-raAmZrlS1qZmpeO2H7bd7gaK-4CH0K1VwTFxt3_M3Xw3E" alt="Profile" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;