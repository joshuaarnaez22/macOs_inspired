import { useRef, useState } from 'react';
import { DOCK_ITEMS, DOCK_EXTERNALS } from '../data';
import { ICONS } from '../appIcons';

const BASE = 52;
const MAX_SCALE = 1.55;
const RANGE = 80; // px influence radius around cursor

function scaleFor(distance) {
  if (distance == null || distance > RANGE) return 1;
  const t = 1 - distance / RANGE;
  const s = t * t * (3 - 2 * t); // smoothstep
  return 1 + (MAX_SCALE - 1) * s;
}

function Tile({ iconKey, gradient, label, isRunning, isBouncing, onClick, scale = 1 }) {
  const size = BASE * scale;
  return (
    <div
      className="dock-tile"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        width: size,
        transition: 'width 0.08s linear',
      }}
    >
      <div className="dock-tooltip" aria-hidden>{label}</div>
      <div
        className={`dock-app${isBouncing ? ' bouncing' : ''}`}
        onClick={onClick}
        role="button"
        aria-label={label}
        style={{
          width: size,
          height: size,
          borderRadius: Math.round(13 + scale),
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px -4px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.28)',
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'width 0.08s linear, height 0.08s linear, border-radius 0.08s linear',
          marginBottom: (size - BASE) * 0.35,
        }}
      >
        <span style={{
          display: 'flex',
          transform: `scale(${0.92 + (scale - 1) * 0.12})`,
          transition: 'transform 0.08s linear',
        }}>
          {ICONS[iconKey]}
        </span>
      </div>
      <div style={{
        width: 5, height: 5, borderRadius: '50%',
        background: 'rgba(255,255,255,0.9)',
        opacity: isRunning ? 1 : 0,
        transition: 'opacity 0.25s',
        flexShrink: 0,
      }} />
    </div>
  );
}

const Sep = () => (
  <div style={{ width: 1, height: 38, background: 'rgba(255,255,255,0.16)', margin: '0 3px', alignSelf: 'center' }} />
);

export default function Dock({ wins, bouncing, dockClick }) {
  const rowRef = useRef(null);
  const [mouseX, setMouseX] = useState(null);

  const getScale = (index) => {
    if (mouseX == null || !rowRef.current) return 1;
    // Honor reduced motion via CSS class on html — keep scale flat
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 1;
    }
    const nodes = rowRef.current.querySelectorAll('[data-dock-item]');
    const el = nodes[index];
    if (!el) return 1;
    const r = el.getBoundingClientRect();
    return scaleFor(Math.abs(mouseX - (r.left + r.width / 2)));
  };

  return (
    <div
      className="dock"
      onMouseMove={(e) => setMouseX(e.clientX)}
      onMouseLeave={() => setMouseX(null)}
      style={{
        position: 'fixed', bottom: 10, left: '50%', transform: 'translateX(-50%)',
        zIndex: 9000,
        background: 'rgba(40,36,60,0.42)', backdropFilter: 'blur(32px) saturate(180%)',
        WebkitBackdropFilter: 'blur(32px) saturate(180%)',
        border: '1px solid rgba(255,255,255,0.14)', borderRadius: 22,
        padding: '10px 14px 6px', gap: 8,
        boxShadow: '0 16px 48px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'flex-end',
      }}
    >
      <div ref={rowRef} style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        {DOCK_ITEMS.map((item, i) => (
          <div key={item.id} data-dock-item>
            <Tile
              iconKey={item.id}
              gradient={item.gradient}
              label={item.label}
              isRunning={!!wins[item.id]?.open}
              isBouncing={bouncing.has(item.id)}
              onClick={() => dockClick(item.id)}
              scale={getScale(i)}
            />
          </div>
        ))}
        <Sep />
        {DOCK_EXTERNALS.map((ext, i) => (
          <div key={ext.label} data-dock-item>
            <Tile
              iconKey={ext.label}
              gradient={ext.gradient}
              label={ext.label}
              isRunning={false}
              isBouncing={false}
              onClick={() => window.open(ext.url, '_blank')}
              scale={getScale(DOCK_ITEMS.length + i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
