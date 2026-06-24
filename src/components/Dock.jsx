import { DOCK_ITEMS, DOCK_EXTERNALS } from '../data';
import { ICONS } from '../appIcons';

function Tile({ iconKey, gradient, label, isRunning, isBouncing, onClick }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div
        className={`dock-app${isBouncing ? ' bouncing' : ''}`}
        onClick={onClick}
        role="button"
        aria-label={label}
        title={label}
        style={{
          width: 52, height: 52, borderRadius: 14,
          background: gradient,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 6px 16px -4px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25)',
          cursor: 'pointer', userSelect: 'none',
        }}
      >
        {ICONS[iconKey]}
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
  return (
    <div style={{
      position: 'fixed', bottom: 10, left: '50%', transform: 'translateX(-50%)',
      zIndex: 9000,
      background: 'rgba(40,36,60,0.42)', backdropFilter: 'blur(32px) saturate(180%)',
      WebkitBackdropFilter: 'blur(32px) saturate(180%)',
      border: '1px solid rgba(255,255,255,0.14)', borderRadius: 22,
      padding: '10px 14px', gap: 10,
      boxShadow: '0 16px 48px -8px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      {DOCK_ITEMS.map(item => (
        <Tile
          key={item.id}
          iconKey={item.id}
          gradient={item.gradient}
          label={item.label}
          isRunning={wins[item.id]?.open}
          isBouncing={bouncing.has(item.id)}
          onClick={() => dockClick(item.id)}
        />
      ))}

      <Sep />

      {DOCK_EXTERNALS.map(ext => (
        <Tile
          key={ext.label}
          iconKey={ext.label}
          gradient={ext.gradient}
          label={ext.label}
          isRunning={false}
          isBouncing={false}
          onClick={() => window.open(ext.url, '_blank')}
        />
      ))}
    </div>
  );
}
