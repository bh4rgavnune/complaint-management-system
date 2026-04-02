function StatusBadge({ status }) {
  const statusMap = {
    // Latest statuses
    pending:       { backgroundColor: '#431407', color: '#fb923c', label: 'Pending'     },
    'in-progress': { backgroundColor: '#1e3a5f', color: '#60a5fa', label: 'In Progress' },
    resolved:      { backgroundColor: '#052e16', color: '#4ade80', label: 'Resolved'    },
    escalated:     { backgroundColor: '#2d0a0a', color: '#f87171', label: 'Escalated'   },
    // Previously used statuses (kept for compatibility)
    open:          { backgroundColor: '#1e3a5f', color: '#60a5fa', label: 'Open'        },
    closed:        { backgroundColor: '#1f1f1f', color: '#94a3b8', label: 'Closed'      },
  }

  const current = statusMap[status?.toLowerCase()] || {
    backgroundColor: '#1e293b',
    color: '#94a3b8',
    label: status || 'Unknown',
  }

  return (
    <span style={{ ...styles.badge, backgroundColor: current.backgroundColor, color: current.color }}>
      <span style={styles.dot(current.color)} />
      {current.label}
    </span>
  )
}

const styles = {
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.4rem',
    padding: '0.3rem 0.8rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    width: 'fit-content',
  },
  dot: (color) => ({
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    backgroundColor: color,
    display: 'inline-block',
    flexShrink: 0,
  }),
}

export default StatusBadge