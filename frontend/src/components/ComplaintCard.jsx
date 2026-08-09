import StatusBadge from './StatusBadge';

function ComplaintCard({ id, title, category, priority, status, date, onClick }) {
  return (
    <div className="vercel-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <span className="category-chip">{category || 'GENERAL'}</span>
        {id && <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '11px', color: 'var(--ds-mute)' }}>#{id}</span>}
      </div>

      <h3 style={{ fontSize: '16px', lineHeight: '22px', fontWeight: 600, color: 'var(--ds-ink)', marginBottom: '16px' }}>
        {title}
      </h3>

      <div style={{ height: '1px', backgroundColor: 'var(--ds-hairline)', marginBottom: '14px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '10px', color: 'var(--ds-mute)', textTransform: 'uppercase' }}>
            STATUS
          </span>
          <StatusBadge status={status} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-end' }}>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '10px', color: 'var(--ds-mute)', textTransform: 'uppercase' }}>
            PRIORITY
          </span>
          <span style={{ fontFamily: 'var(--ds-font-mono)', fontSize: '11px', fontWeight: 500, color: priority?.toLowerCase() === 'high' ? 'var(--ds-error)' : 'var(--ds-ink)' }}>
            {priority || 'NORMAL'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ComplaintCard;