import StatusBadge from './StatusBadge'

function ComplaintCard({ title, category, priority, status }) {
  const getPriorityStyle = (priority) => {
    const map = {
      high:   { backgroundColor: '#2d0a0a', color: '#f87171' },
      medium: { backgroundColor: '#2d1a00', color: '#fb923c' },
      low:    { backgroundColor: '#052e16', color: '#4ade80' },
    }
    return map[priority?.toLowerCase()] || { backgroundColor: '#1e293b', color: '#f8fafc' }
  }

  const getPriorityIcon = (priority) => {
    const map = {
      high:   '🔴',
      medium: '🟠',
      low:    '🟢',
    }
    return map[priority?.toLowerCase()] || '⚪'
  }

  return (
    <div style={styles.card}>

      {/* Card Header — category top right */}
      <div style={styles.header}>
        <span style={styles.categoryBadge}>{category}</span>
      </div>

      {/* Title */}
      <h3 style={styles.title}>{title}</h3>

      <div style={styles.divider} />

      {/* Status & Priority */}
      <div style={styles.infoRow}>

        <div style={styles.infoBlock}>
          <span style={styles.label}>Status</span>
          <StatusBadge status={status} />
        </div>

        <div style={styles.infoBlock}>
          <span style={styles.label}>Priority</span>
          <span style={{ ...styles.priorityBadge, ...getPriorityStyle(priority) }}>
            {getPriorityIcon(priority)} {priority}
          </span>
        </div>

      </div>

    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#1e293b',
    borderRadius: '10px',
    padding: '1.25rem',
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.85rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
    transition: 'transform 0.15s, box-shadow 0.15s',
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  categoryBadge: {
    backgroundColor: '#312e81',
    color: '#a5b4fc',
    padding: '0.2rem 0.7rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  title: {
    color: '#f1f5f9',
    fontSize: '1rem',
    fontWeight: '600',
    margin: 0,
    lineHeight: '1.4',
  },
  divider: {
    height: '1px',
    backgroundColor: '#334155',
  },
  infoRow: {
    display: 'flex',
    gap: '2rem',
  },
  infoBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.35rem',
  },
  label: {
    color: '#64748b',
    fontSize: '0.75rem',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  priorityBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35rem',
    padding: '0.25rem 0.75rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'capitalize',
    width: 'fit-content',
  },
}

export default ComplaintCard