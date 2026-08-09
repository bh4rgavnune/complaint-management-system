function Footer() {
  return (
    <footer className="ds-footer">
      <div className="ds-footer-inner">
        <div className="ds-footer-brand">
          <svg viewBox="0 0 75 65" height="14" fill="currentColor">
            <path d="M37.5 0L75 65H0z" />
          </svg>
          <span>Complaint Management System Platform © {new Date().getFullYear()}</span>
        </div>
        <div style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '12px', color: 'var(--ds-mute)' }}>
          SYSTEM STATUS: <span style={{ color: 'var(--ds-cyan-deep)' }}>● OPERATIONAL</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
