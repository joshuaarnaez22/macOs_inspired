import { IDENTITY, ABOUT_PARAS } from '../data';

export default function About() {
  return (
    <div style={{ background: '#fdfdfb', flex: 1, padding: '30px 36px', color: '#2a2a2a', fontSize: 14, lineHeight: 1.75, overflowY: 'auto' }}>
      <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: 24, fontWeight: 700, color: '#1a1a1a', marginBottom: 6 }}>
        Hey, I&apos;m Joshua. 👋
      </h2>
      <p style={{ color: '#888', fontSize: 13, marginBottom: 24 }}>Full-stack engineer who builds AI-powered products.</p>

      {ABOUT_PARAS.map((p, i) => (
        <p key={i} style={{ marginBottom: 16, fontFamily: "'Inter', sans-serif" }} dangerouslySetInnerHTML={{ __html: p }} />
      ))}

      <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '24px 0' }} />

      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
        <a href={`mailto:${IDENTITY.email}`} style={linkStyle}>✉ Email</a>
        <a href={IDENTITY.github} target="_blank" rel="noreferrer" style={linkStyle}>🐙 GitHub</a>
        <a href={IDENTITY.linkedin} target="_blank" rel="noreferrer" style={linkStyle}>💼 LinkedIn</a>
      </div>
    </div>
  );
}

const linkStyle = {
  color: '#0a6cff', fontSize: 13, textDecoration: 'none', fontFamily: "'Inter', sans-serif",
};
