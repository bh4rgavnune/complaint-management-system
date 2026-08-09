import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const features = [
    {
      eyebrow: "01 // SUBMISSION",
      title: "Submit Complaints in Seconds",
      desc: "Streamlined intake form with automatic category detection, priority tagging, and attachment support.",
      path: "/submit",
      actionText: "File Complaint →"
    },
    {
      eyebrow: "02 // TELEMETRY",
      title: "Real-Time Status Tracking",
      desc: "Live step timeline with instant status updates, auditor logs, and resolution estimates.",
      path: "/track",
      actionText: "Track Ticket →"
    },
    {
      eyebrow: "03 // DASHBOARD",
      title: "Enterprise Governance",
      desc: "Role-based operations control center with complaint assignment, SLA tracking, and audit history.",
      path: "/admin",
      actionText: "View Dashboard →"
    },
    {
      eyebrow: "04 // ANALYTICS",
      title: "Intelligence & Reports",
      desc: "Systemic metrics dashboard with category breakdowns, velocity charts, and resolution trends.",
      path: "/reports",
      actionText: "Explore Data →"
    }
  ];

  return (
    <div className="home-vercel-wrapper">
      {/* Hero Mesh Section */}
      <section className="hero-mesh-band mesh-gradient-container">
        <div className="mesh-gradient-backdrop"></div>
        <div className="ds-container hero-content-box">
          <div className="mono-eyebrow">
            COMPLAINT MANAGEMENT SYSTEM 3.0
          </div>
          
          <h1 className="hero-display-title">
            Build, track, and resolve complaints effortlessly.
          </h1>
          
          <p className="hero-lead-text">
            An enterprise resolution platform built for speed, transparency, and actionable governance.
          </p>

          <div className="hero-cta-cluster">
            <button className="btn-primary" onClick={() => navigate("/submit")}>
              Submit a Complaint
            </button>
            <button className="btn-secondary" onClick={() => navigate("/track")}>
              Track Existing Ticket
            </button>
          </div>

          {/* Telemetry Bar */}
          <div className="telemetry-bar">
            <div className="telemetry-item">
              <span className="telemetry-label">SYSTEM SLA</span>
              <span className="telemetry-val">&lt; 24 HOURS</span>
            </div>
            <div className="telemetry-divider"></div>
            <div className="telemetry-item">
              <span className="telemetry-label">RESOLUTION RATE</span>
              <span className="telemetry-val">98.4%</span>
            </div>
            <div className="telemetry-divider"></div>
            <div className="telemetry-item">
              <span className="telemetry-label">ACTIVE AUDIT TRAIL</span>
              <span className="telemetry-val">REALTIME</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section className="features-section">
        <div className="ds-container">
          <div className="section-head">
            <div className="mono-eyebrow">WORKFLOW PLATFORM</div>
            <h2 className="section-title">Designed for resolution efficiency.</h2>
            <p className="section-desc">Every layer crafted with stark precision and developer-grade execution.</p>
          </div>

          <div className="feature-card-grid">
            {features.map((feat, idx) => (
              <div 
                key={idx} 
                className="vercel-card feature-card"
                onClick={() => navigate(feat.path)}
              >
                <div className="feature-eyebrow">{feat.eyebrow}</div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-desc">{feat.desc}</p>
                <span className="feature-link">{feat.actionText}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Polarity-Flip Section */}
      <section className="dark-band dark-polarity-section">
        <div className="ds-container dark-content-box">
          <div className="mono-eyebrow">SECURITY & COMPLIANCE</div>
          <h2 className="dark-title">Built with strict enterprise safeguards.</h2>
          <p className="dark-desc">
            Role-based authorization guarantees user data privacy while enabling admins to manage resolutions at scale.
          </p>

          <div className="dark-pill-row">
            <span className="dark-tech-pill">JWT Authenticated</span>
            <span className="dark-tech-pill">Spring Boot Engine</span>
            <span className="dark-tech-pill">Vercel UI Chrome</span>
            <span className="dark-tech-pill">Audit Trail Logged</span>
          </div>
        </div>
      </section>
    </div>
  );
}