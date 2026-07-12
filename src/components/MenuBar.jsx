import { useState } from 'react';
import { WIN_TITLES, WALLPAPERS, IDENTITY } from '../data';

const WifiIcon = () => (
  <svg width="14" height="11" viewBox="0 0 20 15" fill="currentColor" aria-hidden="true">
    <path d="M10 12.5a2 2 0 110-4 2 2 0 010 4z"/>
    <path d="M10 8C7.6 8 5.4 9 3.8 10.7L2.3 9.2A9.95 9.95 0 0110 6c2.9 0 5.5 1.2 7.4 3.1l-1.5 1.5A7.98 7.98 0 0010 8z"/>
    <path d="M10 4C6.1 4 2.7 5.6.3 8.1L-1.2 6.6A13.93 13.93 0 0110 2c4 0 7.6 1.7 10.2 4.4l-1.5 1.5A11.93 11.93 0 0010 4z"/>
  </svg>
);

const BatteryIcon = () => (
  <svg width="20" height="11" viewBox="0 0 28 13" fill="currentColor" aria-hidden="true">
    <rect x="0" y="1" width="24" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    <rect x="24.5" y="4" width="2.5" height="5" rx="1" fill="currentColor" opacity="0.5"/>
    <rect x="2" y="3" width="18" height="7" rx="1.5" fill="currentColor"/>
  </svg>
);

function buildMenus({ activeId, wins, wallpaper, actions }) {
  const sep = { divider: true };
  return {
    '': [
      { label: 'About This Mac', onClick: () => actions.open('about') },
      sep,
      { label: 'Reset Desktop…', onClick: actions.reset },
    ],
    File: [
      { label: 'Open Terminal', onClick: () => actions.open('terminal') },
      { label: 'Open Projects', onClick: () => actions.open('projects') },
      { label: 'Open About Me', onClick: () => actions.open('about') },
      { label: 'Open Contact', onClick: () => actions.open('contact') },
      sep,
      { label: 'Close Window', onClick: () => actions.close(activeId) },
    ],
    Edit: [
      { label: 'Undo', disabled: true },
      { label: 'Redo', disabled: true },
      sep,
      { label: 'Cut', disabled: true },
      { label: 'Copy', disabled: true },
      { label: 'Paste', disabled: true },
    ],
    View: WALLPAPERS.map(w => ({
      label: `Wallpaper — ${w.name}`,
      checked: wallpaper === w.bg,
      onClick: () => actions.setWallpaper(w.bg),
    })),
    Window: [
      { label: 'Minimize', onClick: () => actions.minimize(activeId) },
      sep,
      ...Object.keys(WIN_TITLES).map(id => ({
        label: WIN_TITLES[id],
        checked: activeId === id,
        onClick: () => (wins[id]?.open ? actions.focus(id) : actions.open(id)),
      })),
    ],
    Help: [
      { label: 'Portfolio on GitHub', onClick: () => window.open(IDENTITY.github, '_blank', 'noopener,noreferrer') },
      { label: 'Email Joshua', onClick: () => { window.location.href = `mailto:${IDENTITY.email}`; } },
    ],
  };
}

function Dropdown({ items, onPick, id }) {
  return (
    <div
      className="menu-pop"
      role="menu"
      id={id}
      style={{
        position: 'absolute', top: 26, left: 0, minWidth: 200,
        background: 'rgba(36,32,52,0.96)',
        border: '1px solid rgba(255,255,255,0.16)', borderRadius: 8, padding: 5,
        boxShadow: '0 14px 44px -8px rgba(0,0,0,0.6)',
      }}
    >
      {items.map((it, i) =>
        it.divider ? (
          <div key={i} role="separator" style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '5px 8px' }} />
        ) : (
          <button
            key={i}
            type="button"
            role="menuitem"
            disabled={it.disabled}
            aria-checked={it.checked || undefined}
            onClick={it.disabled ? undefined : () => { it.onClick(); onPick(); }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '5px 12px',
              borderRadius: 5, fontSize: 13, fontFamily: "'Inter', sans-serif",
              color: it.disabled ? 'rgba(255,255,255,0.45)' : '#f0f0f5',
              cursor: it.disabled ? 'default' : 'pointer',
              background: 'transparent', border: 'none', width: '100%', textAlign: 'left',
            }}
            onMouseEnter={e => { if (!it.disabled) e.currentTarget.style.background = 'rgba(120,120,255,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            <span style={{ width: 12, flexShrink: 0 }} aria-hidden="true">{it.checked ? '✓' : ''}</span>
            {it.label}
          </button>
        )
      )}
    </div>
  );
}

export default function MenuBar({ activeId, clock, wins, wallpaper, actions }) {
  const [openMenu, setOpenMenu] = useState(null);
  const appName = WIN_TITLES[activeId] || 'Finder';
  const menus = buildMenus({ activeId, wins, wallpaper, actions });
  const labels = ['', 'File', 'Edit', 'View', 'Window', 'Help'];

  return (
    <>
      {openMenu && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 8999 }} onClick={() => setOpenMenu(null)} aria-hidden="true" />
      )}
      <nav
        aria-label="Menu bar"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: 30, zIndex: 9000,
          background: 'rgba(20,16,34,0.88)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center',
          padding: '0 8px', gap: 4,
          color: 'rgba(255,255,255,0.92)', fontSize: 13,
          fontFamily: "'Inter', sans-serif",
          userSelect: 'none',
        }}
      >
        {labels.map((label, i) => {
          const isApple = i === 0;
          const open = openMenu === label;
          const menuId = `menu-${i}`;
          return (
            <div key={label} style={{ position: 'relative' }}>
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-controls={open ? menuId : undefined}
                aria-label={isApple ? 'Apple menu' : label}
                onClick={() => setOpenMenu(open ? null : label)}
                onMouseEnter={() => openMenu && setOpenMenu(label)}
                style={{
                  display: 'inline-block', padding: '4px 9px', borderRadius: 5, cursor: 'pointer',
                  fontSize: isApple ? 16 : 13, lineHeight: 1,
                  fontWeight: i === 1 ? 700 : 400,
                  opacity: isApple ? 1 : 0.85,
                  background: open ? 'rgba(120,120,255,0.45)' : 'transparent',
                  border: 'none', color: 'inherit', fontFamily: 'inherit',
                }}
              >
                {isApple ? '' : label}
              </button>
              {isApple && <span style={{ fontWeight: 700, padding: '0 6px' }}>{appName}</span>}
              {open && <Dropdown id={menuId} items={menus[label]} onPick={() => setOpenMenu(null)} />}
            </div>
          );
        })}

        <div style={{
          marginLeft: 'auto', display: 'flex', gap: 14, alignItems: 'center',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
          color: 'rgba(255,255,255,0.85)', paddingRight: 8,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><WifiIcon /> WiFi</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}><BatteryIcon /> 100%</span>
          <time dateTime={new Date().toISOString()} style={{ fontWeight: 500 }}>{clock}</time>
        </div>
      </nav>
    </>
  );
}
