import { IDENTITY } from '../data';

const ROWS = [
  {
    label: 'Email',
    value: IDENTITY.email,
    href: `mailto:${IDENTITY.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: IDENTITY.phone,
    href: `tel:${IDENTITY.phone}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 4.5 5.5a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'joshuaarnaez22',
    href: IDENTITY.github,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'joshua-arnaez',
    href: IDENTITY.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  return (
    <div style={{
      flex: 1, background: 'linear-gradient(165deg,#1b2238,#141a2c)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '32px 30px', overflowY: 'auto',
    }}>
      {/* avatar */}
      <div aria-hidden="true" style={{
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
      <div style={{ color: '#9aabcc', fontSize: 13, fontFamily: "'Inter', sans-serif", marginBottom: 24, textAlign: 'center' }}>
        Full-Stack Engineer · AI Integration Specialist
      </div>

      {/* contact rows */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {ROWS.map(row => (
          <a
            key={row.label}
            href={row.href}
            target={row.href.startsWith('http') ? '_blank' : undefined}
            rel={row.href.startsWith('http') ? 'noreferrer' : undefined}
            aria-label={row.href.startsWith('http') ? `${row.label}: ${row.value} (opens in new tab)` : `${row.label}: ${row.value}`}
            className="contact-row"
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '13px 16px',
              textDecoration: 'none',
              color: '#9eb0d4',
            }}
          >
            <span className="contact-row-icon" style={{ flexShrink: 0, display: 'flex', color: '#7dd3fc' }}>{row.icon}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#7d8aa8', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>{row.label}</div>
              <div style={{ color: '#c8d4f0', fontSize: 13, fontFamily: "'Inter', sans-serif" }}>{row.value}</div>
            </div>
            <span className="contact-row-chevron" style={{ color: '#7d8aa8', fontSize: 14, transition: 'transform 0.18s ease, color 0.18s ease' }}>↗</span>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 24, color: '#8a94b0', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
        {IDENTITY.location}
      </div>
    </div>
  );
}
