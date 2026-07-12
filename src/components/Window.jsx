export default function Window({ id, title, titleBarStyle, titleColor = '#9a9aa6', isActive, style, onFocus, onClose, onMinimize, onMaximize, startDrag, children }) {
  const lights = [
    { color: '#ff5f57', symbol: '×', label: 'Close', action: onClose },
    { color: '#febc2e', symbol: '−', label: 'Minimize', action: onMinimize },
    { color: '#28c840', symbol: '+', label: 'Maximize', action: onMaximize },
  ];
  const titleId = `win-title-${id}`;

  return (
    <div
      role="dialog"
      aria-labelledby={titleId}
      aria-modal="false"
      style={style}
      onMouseDown={onFocus}
    >
      <div
        onMouseDown={startDrag}
        style={{
          display: 'flex', alignItems: 'center', padding: '11px 14px',
          cursor: 'grab', flexShrink: 0, position: 'relative',
          borderBottom: '1px solid #16161c', userSelect: 'none',
          ...titleBarStyle,
        }}
      >
        <div className="tl-group">
          {lights.map(({ color, symbol, label, action }) => (
            <button
              key={symbol}
              type="button"
              className="tl"
              aria-label={label}
              title={label}
              style={{ background: isActive ? color : '#4d4d4d' }}
              onClick={e => { e.stopPropagation(); action(); }}
            >
              <span className="tl-symbol" aria-hidden="true">{symbol}</span>
            </button>
          ))}
        </div>
        <span
          id={titleId}
          style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: titleColor,
            fontWeight: 500, whiteSpace: 'nowrap',
          }}
        >
          {title}
        </span>
      </div>
      <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {children}
      </div>
    </div>
  );
}
