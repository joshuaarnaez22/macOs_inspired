import { IDENTITY } from '../data';

const ROWS = [
  { glyph: '✉', label: 'Email',    value: IDENTITY.email,    href: `mailto:${IDENTITY.email}` },
  { glyph: '📞', label: 'Phone',    value: IDENTITY.phone,    href: `tel:${IDENTITY.phone}` },
  { glyph: '🐙', label: 'GitHub',   value: 'joshuaarnaez22',  href: IDENTITY.github },
  { glyph: '💼', label: 'LinkedIn', value: 'joshua-arnaez',   href: IDENTITY.linkedin },
];

export default function Contact() {
  return (
    <div style={{
      flex: 1, background: 'linear-gradient(165deg,#1b2238,#141a2c)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '32px 30px', overflowY: 'auto',
    }}>
      {/* avatar */}
      <div style={{
        width: 78, height: 78, borderRadius: '50%',
        background: 'linear-gradient(140deg,#00e676,#00b0ff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 700, color: '#0a1020',
        marginBottom: 14, flexShrink: 0,
      }}>
        JA
      </div>

      <div style={{ color: '#f0f4ff', fontSize: 20, fontWeight: 700, fontFamily: "'Inter', sans-serif", marginBottom: 4 }}>
        {IDENTITY.name}
      </div>
      <div style={{ color: '#7d8aa8', fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 24, textAlign: 'center' }}>
        Full-Stack Engineer · AI Integration Specialist
      </div>

      {/* contact rows */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROWS.map(row => (
          <a
            key={row.label}
            href={row.href}
            target={row.href.startsWith('http') ? '_blank' : undefined}
            rel="noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '13px 16px',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.09)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <span style={{ fontSize: 18, flexShrink: 0 }}>{row.glyph}</span>
            <div style={{ flex: 1 }}>
              <div style={{ color: '#7d8aa8', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{row.label}</div>
              <div style={{ color: '#c8d4f0', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{row.value}</div>
            </div>
            <span style={{ color: '#7d8aa8', fontSize: 14 }}>↗</span>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 24, color: '#3a4460', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
        {IDENTITY.location}
      </div>
    </div>
  );
}
