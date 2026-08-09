function StatusBadge({ status }) {
  const normStatus = (status || '').toLowerCase().replace('_', '-');

  const statusMap = {
    pending:       { classKey: 'pending', label: 'PENDING' },
    'in-progress': { classKey: 'in-progress', label: 'IN_PROGRESS' },
    in_progress:   { classKey: 'in-progress', label: 'IN_PROGRESS' },
    resolved:      { classKey: 'resolved', label: 'RESOLVED' },
    rejected:      { classKey: 'rejected', label: 'REJECTED' },
    escalated:     { classKey: 'rejected', label: 'ESCALATED' },
    open:          { classKey: 'in-progress', label: 'OPEN' },
    closed:        { classKey: 'resolved', label: 'CLOSED' },
  };

  const current = statusMap[normStatus] || { classKey: 'pending', label: (status || 'UNKNOWN').toUpperCase() };

  return (
    <span className={`status-badge-mono ${current.classKey}`}>
      [{current.label}]
    </span>
  );
}

export default StatusBadge;