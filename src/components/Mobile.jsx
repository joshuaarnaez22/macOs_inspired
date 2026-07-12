import { useState, lazy, Suspense } from 'react';
import { DOCK_ITEMS, DOCK_EXTERNALS, IDENTITY, WIN_TITLES } from '../data';
import { ICONS } from '../appIcons';

const Terminal = lazy(() => import('../windows/Terminal'));
const Projects = lazy(() => import('../windows/Projects'));
const About = lazy(() => import('../windows/About'));
const Contact = lazy(() => import('../windows/Contact'));

const APPS = { terminal: Terminal, projects: Projects, about: About, contact: Contact };

function HomeIcon({ iconKey, gradient, label, onClick, index = 0, external }) {
  return (
    <button type="button" onClick={onClick} aria-label={external ? `Open ${label} (opens in new tab)` : `Open ${label}`} className="home-icon"
      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, animationDelay: `${index * 0.045}s` }}>
      <span aria-hidden="true" style={{
        width: 62, height: 62, borderRadius: 16, background: gradient,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 16px -4px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
      }}>
        {ICONS[iconKey]}
      </span>
      <span style={{ color: '#fff', fontSize: 12, fontFamily: "'Inter', sans-serif", textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>{label}</span>
    </button>
  );
}

export default function Mobile({ wallpaper }) {
  const [app, setApp] = useState(null);

  if (app) {
    const Comp = APPS[app];
    return (
      <div className="mobile-app" style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', flexDirection: 'column', background: '#15151c' }}>
        <div style={{
          flexShrink: 0, height: 48, display: 'flex', alignItems: 'center', padding: '0 12px',
          background: 'rgba(20,16,34,0.92)', borderBottom: '1px solid rgba(255,255,255,0.1)',
          color: '#f0f0f5', fontFamily: "'Inter', sans-serif",
        }}>
          <button type="button" onClick={() => setApp(null)} aria-label="Back to home" style={{ background: 'none', border: 'none', color: '#40c4ff', fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
            ‹ Home
          </button>
          <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontWeight: 600, fontSize: 15 }}>{WIN_TITLES[app]}</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <Suspense fallback={null}>
            <Comp open={setApp} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-home" style={{ position: 'fixed', inset: 0, zIndex: 99999, background: wallpaper, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
      <div style={{ padding: '46px 24px 10px', textAlign: 'center' }}>
        <div aria-hidden="true" style={{
          width: 84, height: 84, borderRadius: '50%', margin: '0 auto 14px',
          background: 'linear-gradient(140deg,#00e676,#00b0ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 30, fontWeight: 700, color: '#0a1020',
          boxShadow: '0 8px 24px -6px rgba(0,0,0,0.5)',
        }}>JA</div>
        <h1 style={{ color: '#fff', fontSize: 22, fontWeight: 700, fontFamily: "'Inter', sans-serif", textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>{IDENTITY.name}</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginTop: 4, fontFamily: "'Inter', sans-serif" }}>{IDENTITY.role}</p>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11.5, marginTop: 3, fontFamily: "'JetBrains Mono', monospace" }}>{IDENTITY.location}</p>
      </div>

      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px 8px', padding: '24px 20px', alignContent: 'start' }}>
        {DOCK_ITEMS.map((item, i) => (
          <HomeIcon key={item.id} index={i} iconKey={item.id} gradient={item.gradient} label={item.label} onClick={() => setApp(item.id)} />
        ))}
        {DOCK_EXTERNALS.map((ext, i) => (
          <HomeIcon key={ext.label} index={DOCK_ITEMS.length + i} iconKey={ext.label} gradient={ext.gradient} label={ext.label} external onClick={() => window.open(ext.url, '_blank', 'noopener,noreferrer')} />
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '8px 0 18px', color: 'rgba(255,255,255,0.7)', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>
        tap an app to open
      </div>
    </div>
  );
}
