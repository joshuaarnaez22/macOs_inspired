import { useState } from 'react';
import { PROJECTS, IDENTITY } from '../data';

const Icon = ({ children }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }} aria-hidden>
    {children}
  </svg>
);

const VIEW_ICONS = {
  github: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),
  featured: (
    <Icon>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="currentColor" stroke="none" />
    </Icon>
  ),
  live: (
    <Icon>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
    </Icon>
  ),
};

const TagIcon = () => (
  <Icon>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <circle cx="7" cy="7" r="1.2" fill="currentColor" stroke="none" />
  </Icon>
);

const VIEWS = [
  { id: 'github',   label: 'GitHub' },
  { id: 'featured', label: 'Featured' },
  { id: 'live',     label: 'Live' },
];

const TAGS = ['AI', 'Client', 'Real-time', '3D'];

export default function Projects() {
  // single active filter across both Favorites and Tags, e.g. 'view:github' or 'tag:AI'
  const [sel, setSel] = useState('view:github');
  // sidebar collapses by default on narrow screens; toggleable everywhere
  const [sideOpen, setSideOpen] = useState(window.innerWidth >= 768);
  const [kind, value] = sel.split(':');
  const selLabel = kind === 'tag' ? value : (VIEWS.find(v => v.id === value)?.label ?? value);

  let list = PROJECTS;
  if (kind === 'view' && value === 'featured') list = list.filter(p => p.featured);
  if (kind === 'view' && value === 'live') list = list.filter(p => p.live);
  if (kind === 'tag') list = list.filter(p => p.kind.toLowerCase().includes(value.toLowerCase()));

  const pick = (s) => { setSel(s); if (window.innerWidth < 768) setSideOpen(false); };

  return (
    <div style={{ display: 'flex', flex: 1, background: '#1f1f27', overflow: 'hidden' }}>
      {/* sidebar — width animates so collapse/expand is smooth */}
      <div style={{ width: sideOpen ? 150 : 0, flexShrink: 0, overflow: 'hidden', transition: 'width 0.26s cubic-bezier(0.22,1,0.36,1)' }}>
      <div style={{ width: 150, height: '100%', background: 'rgba(0,0,0,0.25)', borderRight: '1px solid #14141a', padding: '16px 0' }}>
        <div style={{ color: '#555', fontSize: 10, fontWeight: 700, padding: '0 14px', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>Favorites</div>
        {VIEWS.map(v => {
          const active = sel === `view:${v.id}`;
          return (
            <div key={v.id}
              onClick={() => pick(`view:${v.id}`)}
              style={{
                padding: '6px 14px', fontSize: 12.5, cursor: 'pointer',
                color: active ? '#40c4ff' : '#aaa',
                background: active ? 'rgba(64,196,255,0.18)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              {VIEW_ICONS[v.id]}
              {v.label}
            </div>
          );
        })}
        <div style={{ color: '#555', fontSize: 10, fontWeight: 700, padding: '12px 14px 6px', textTransform: 'uppercase', letterSpacing: 1 }}>Tags</div>
        {TAGS.map(t => {
          const active = sel === `tag:${t}`;
          return (
            <div key={t}
              onClick={() => pick(active ? 'view:github' : `tag:${t}`)}
              style={{
                padding: '6px 14px', fontSize: 12, cursor: 'pointer',
                color: active ? '#40c4ff' : '#888',
                background: active ? 'rgba(64,196,255,0.14)' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              <TagIcon />
              {t}
            </div>
          );
        })}
      </div>
      </div>

      {/* main grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 20px', minWidth: 0 }}>
        {/* sticky header with sidebar toggle + active filter */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 1, display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 16px', background: '#1f1f27', borderBottom: '1px solid #14141a',
        }}>
          <button
            onClick={() => setSideOpen(o => !o)}
            title={sideOpen ? 'Hide sidebar' : 'Show sidebar'}
            style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid #2a2a38', borderRadius: 6,
              color: '#aaa', width: 30, height: 26, cursor: 'pointer', fontSize: 14, flexShrink: 0,
            }}
          >
            ☰
          </button>
          <span style={{ color: '#e8e8ee', fontSize: 12.5, fontFamily: "'JetBrains Mono', monospace" }}>{selLabel}</span>
          <span style={{ color: '#555', fontSize: 11.5, marginLeft: 'auto', fontFamily: "'JetBrains Mono', monospace" }}>{list.length} {list.length === 1 ? 'item' : 'items'}</span>
        </div>

        <div style={{ padding: '20px 18px' }}>
        {list.length === 0 ? (
          <div style={{ color: '#666', fontSize: 12.5, textAlign: 'center', marginTop: 40, fontFamily: "'JetBrains Mono', monospace" }}>
            No projects match this filter.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(105px,1fr))', gap: '16px 10px' }}>
            {list.map(p => (
              <div key={p.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <a
                  href={sel === 'view:live' && p.live ? p.live : p.repo}
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: 'none', display: 'block', width: '100%' }}
                >
                  <div style={{
                    borderRadius: 10, padding: '10px 6px 8px',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(64,196,255,0.14)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: 60, height: 60, borderRadius: 14,
                        background: p.gradient,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'JetBrains Mono', monospace", fontSize: 17, fontWeight: 700, color: '#fff',
                        boxShadow: '0 6px 16px -4px rgba(0,0,0,0.5)',
                      }}>
                        {p.mark}
                      </div>
                      {p.live && (
                        <span title="Has live site" style={{
                          position: 'absolute', top: -3, right: -3, width: 14, height: 14, borderRadius: '50%',
                          background: '#28c840', border: '2px solid #1f1f27',
                        }} />
                      )}
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ color: '#e8e8ee', fontSize: 11.5, fontWeight: 600, lineHeight: 1.3 }}>{p.name}</div>
                      <div style={{ color: '#777', fontSize: 9.5, marginTop: 2 }}>{p.kind}</div>
                    </div>
                  </div>
                </a>
                {/* both links always reachable */}
                <div style={{ display: 'flex', gap: 8, fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace", marginTop: 1 }}>
                  <a href={p.repo} target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none' }}>code</a>
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" style={{ color: '#28c840', textDecoration: 'none' }}>live ↗</a>}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <a href={IDENTITY.github} target="_blank" rel="noreferrer"
            style={{ color: '#40c4ff', fontSize: 12, textDecoration: 'none', fontFamily: "'JetBrains Mono', monospace" }}>
            → view all on GitHub
          </a>
        </div>
        </div>
      </div>
    </div>
  );
}
