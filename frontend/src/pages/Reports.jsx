import React from 'react';
import './Reports.css';

const Reports = () => {
  return (
    <div className="reports-page">
      {/* Background Decorative Elements */}
      <div className="bg-decor top-right"></div>
      <div className="bg-decor bottom-left"></div>

      <div className="reports-content">
        <div className="reports-badge">
          <span className="reports-badge-dot"></span>
          MODULE: REPORTS
        </div>
        <h1 className="reports-title">Coming Soon</h1>
        <p className="reports-subtitle">
          Advanced analytical engines and visual data<br />
          orchestration are currently under assembly.<br />
          Prepare for the next generation of intelligence.
        </p>
      </div>
    </div>
  );
};

export default Reports;