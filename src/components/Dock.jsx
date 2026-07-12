import { useRef, useState, useEffect, useCallback } from 'react';
import { DOCK_ITEMS, DOCK_EXTERNALS } from '../data';
import { ICONS } from '../appIcons';

const BASE = 52;
const MAX_SCALE = 1.55;
const RANGE = 130;
/** Fixed dock tray height — icons grow above it; shelf never stretches vertically */
const TRAY_H = 70;

/** Cosine falloff — smooth macOS-style fish-eye */
function scaleFor(distance) {
  if (distance == null || distance >= RANGE) return 1;
  const t = 1 - distance / RANGE;
  const wave = 0.5 - 0.5 * Math.cos(Math.PI * t);
  return 1 + (MAX_SCALE - 1) * wave;
}

function Tile({ iconKey, gradient, label, isRunning, isBouncing, onClick, scale = 1, external }) {
  // Only width participates in layout (pushes neighbors / widens dock).
  // Height stays BASE — vertical growth is pure transform overflow above the tray.
  const slotW = BASE * scale;

  return (
    <div
      className="dock-tile"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: slotW,
        height: BASE,
        flexShrink: 0,
        transition: 'width 0.1s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'width',
      }}
    >
      <div className="dock-tooltip" aria-hidden="true">{label}</div>
      <button
        type="button"
        className={`dock-app${isBouncing ? ' bouncing' : ''}`}
        onClick={onClick}
        aria-label={external ? `${label} (opens in new tab)` : label}
        style={{
          width: BASE,
          height: BASE,
          borderRadius: 14,
          background: gradient,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 16px -4px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.28)',
          cursor: 'pointer',
          userSelect: 'none',
          border: 'none',
          padding: 0,
          flexShrink: 0,
          // Grow upward from the shelf — does not change layout height
          transform: `scale(${scale})`,
          transformOrigin: 'bottom center',
          transition: 'transform 0.1s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >
        <span aria-hidden="true" style={{ display: 'flex' }}>
          {ICONS[iconKey]}
        </span>
      </button>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -10,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 5, height: 5, borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)',
          opacity: isRunning ? 1 : 0,
          transition: 'opacity 0.25s',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

const Sep = () => (
  <div
    role="separator"
    aria-hidden="true"
    style={{
      width: 1,
      height: 36,
      background: 'rgba(255,255,255,0.16)',
      margin: '0 4px',
      alignSelf: 'center',
      flexShrink: 0,
    }}
  />
);

export default function Dock({ wins, bouncing, dockClick }) {
  const rowRef = useRef(null);
  const mouseXRef = useRef(null);
  const rafRef = useRef(0);
  const reduceMotionRef = useRef(false);
  const n = DOCK_ITEMS.length + DOCK_EXTERNALS.length;
  const [scales, setScales] = useState(() => Array(n).fill(1));

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotionRef.current = mq.matches;
    const onChange = () => { reduceMotionRef.current = mq.matches; };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const recompute = useCallback(() => {
    rafRef.current = 0;
    const mouseX = mouseXRef.current;
    if (mouseX == null || !rowRef.current || reduceMotionRef.current) {
      setScales(prev => (prev.every(s => s === 1) ? prev : Array(n).fill(1)));
      return;
    }

    const nodes = rowRef.current.querySelectorAll('[data-dock-item]');
    const centers = [];
    for (let i = 0; i < n; i++) {
      const el = nodes[i];
      if (!el) { centers.push(null); continue; }
      const r = el.getBoundingClientRect();
      centers.push(r.left + r.width / 2);
    }

    const next = centers.map((c) => (c == null ? 1 : scaleFor(Math.abs(mouseX - c))));
    setScales(prev => {
      for (let i = 0; i < n; i++) if (Math.abs(prev[i] - next[i]) > 0.008) return next;
      return prev;
    });
  }, [n]);

  const onMove = (e) => {
    mouseXRef.current = e.clientX;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(recompute);
  };

  const onLeave = () => {
    mouseXRef.current = null;
    if (!rafRef.current) rafRef.current = requestAnimationFrame(recompute);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <nav
      className="dock"
      aria-label="Dock"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'fixed',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9000,
        height: TRAY_H,
        boxSizing: 'border-box',
        background: 'rgba(32,28,48,0.82)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 22,
        padding: '0 14px 12px',
        boxShadow: '0 16px 48px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'flex-end',
        // Icons may paint above the tray; tray box itself never grows taller
        overflow: 'visible',
      }}
    >
      <div
        ref={rowRef}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 6,
          height: BASE,
          overflow: 'visible',
        }}
      >
        {DOCK_ITEMS.map((item, i) => (
          <div key={item.id} data-dock-item style={{ overflow: 'visible' }}>
            <Tile
              iconKey={item.id}
              gradient={item.gradient}
              label={item.label}
              isRunning={!!wins[item.id]?.open}
              isBouncing={bouncing.has(item.id)}
              onClick={() => dockClick(item.id)}
              scale={scales[i] ?? 1}
            />
          </div>
        ))}
        <Sep />
        {DOCK_EXTERNALS.map((ext, i) => (
          <div key={ext.label} data-dock-item style={{ overflow: 'visible' }}>
            <Tile
              iconKey={ext.label}
              gradient={ext.gradient}
              label={ext.label}
              isRunning={false}
              isBouncing={false}
              external
              onClick={() => window.open(ext.url, '_blank', 'noopener,noreferrer')}
              scale={scales[DOCK_ITEMS.length + i] ?? 1}
            />
          </div>
        ))}
      </div>
    </nav>
  );
}
