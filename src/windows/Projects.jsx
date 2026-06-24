import { useState } from 'react';
import { PROJECTS, IDENTITY } from '../data';

const VIEWS = [
  { id: 'github',   label: 'GitHub',   icon: '🐙' },
  { id: 'featured', label: 'Featured', icon: '⭐' },
  { id: 'live',     label: 'Live',     icon: '🌐' },
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
                padding: '5px 14px', fontSize: 12.5, cursor: 'pointer',
                color: active ? '#40c4ff' : '#aaa',
                background: active ? 'rgba(64,196,255,0.18)' : 'transparent',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              {v.icon} {v.label}
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
                padding: '5px 14px', fontSize: 12, cursor: 'pointer',
                color: active ? '#40c4ff' : '#888',
                background: active ? 'rgba(64,196,255,0.14)' : 'transparent',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
            >
              🏷 {t}
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
