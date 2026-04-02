import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Submit Complaint",
      desc: "Report a new issue or feedback",
      icon: "add",
      path: "/submit"
    },
    {
      title: "Track Complaint",
      desc: "Check the status of existing tickets",
      icon: "search",
      path: "/track"
    },
    {
      title: "Admin Dashboard",
      desc: "Manage systemic operations and users",
      icon: "settings",
      path: "/admin"
    },
    {
      title: "Reports",
      desc: "Visualize complaint trends and metrics",
      icon: "bar_chart",
      path: "/reports"
    },
  ];

  return (
    <div className="home-obsidian">
      {/* Background Decorative Elements */}
      <div className="bg-decor top-right"></div>
      <div className="bg-decor bottom-left"></div>



      {/* Main Content Area */}
      <main className="home-main">
        {/* Hero Section */}
        <div className="hero-section">
          <h1>
            Complaint Management <span>System</span>
          </h1>
          <p>Submit, track and manage complaints efficiently.</p>
        </div>

        {/* Action Cards Grid */}
        <div className="action-grid">
          {actions.map((item, index) => (
            <div
              key={index}
              className="action-card group"
              onClick={() => navigate(item.path)}
            >
              <div className="card-icon-wrap hover-scale">
                <span className="material-symbols-outlined card-icon">{item.icon}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom Visual Anchor */}
        <div className="bottom-visual">
          <div className="glow-line"></div>
        </div>
      </main>
    </div>
  );
}