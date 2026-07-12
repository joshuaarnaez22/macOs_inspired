import { useState, useEffect, useRef, useCallback } from 'react';
import { WIN_DIMS } from './data';

const INITIAL = {
  terminal: { open: true,  min: false, max: false, x: 70,  y: 40,  z: 5, animIn: false, animOut: false, animMin: false },
  projects: { open: false, min: false, max: false, x: 470, y: 70,  z: 1, animIn: false, animOut: false, animMin: false },
  about:    { open: false, min: false, max: false, x: 250, y: 60,  z: 1, animIn: false, animOut: false, animMin: false },
  contact:  { open: false, min: false, max: false, x: 560, y: 130, z: 1, animIn: false, animOut: false, animMin: false },
};

const STORAGE_KEY = 'desktop-state-v1';

// Load persisted state once at import; merge over INITIAL and drop transient anim flags.
function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!s?.wins) return null;
    const wins = {};
    for (const id of Object.keys(INITIAL)) {
      wins[id] = { ...INITIAL[id], ...s.wins[id], animIn: false, animOut: false, animMin: false };
    }
    return { wins, zTop: s.zTop ?? 5, activeId: s.activeId ?? 'terminal' };
  } catch { return null; }
}
const SAVED = loadState();

function fmtClock() {
  const d = new Date();
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const h = d.getHours(), m = d.getMinutes();
  const h12 = h % 12 || 12;
  const mm = String(m).padStart(2, '0');
  return `${days[d.getDay()]} ${h12}:${mm} ${h < 12 ? 'AM' : 'PM'}`;
}

export function useWindowManager() {
  const [wins, setWins] = useState(SAVED?.wins ?? INITIAL);
  const [zTop, setZTop] = useState(SAVED?.zTop ?? 5);
  const [activeId, setActiveId] = useState(SAVED?.activeId ?? 'terminal');
  const [clock, setClock] = useState(fmtClock);
  const [bouncing, setBouncing] = useState(new Set());
  const dragRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setClock(fmtClock()), 30000);
    return () => clearInterval(t);
  }, []);

  // Persist window state (debounced so dragging doesn't thrash localStorage).
  useEffect(() => {
    const t = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ wins, zTop, activeId }));
    }, 400);
    return () => clearTimeout(t);
  }, [wins, zTop, activeId]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current) return;
      dragRef.current.clientX = e.clientX;
      dragRef.current.clientY = e.clientY;
      if (dragRef.current.raf) return;
      dragRef.current.raf = requestAnimationFrame(() => {
        const d = dragRef.current;
        if (!d) return;
        d.raf = 0;
        const { id, sx, sy, ox, oy, clientX, clientY } = d;
        const MENUBAR = 30, DOCK_GUARD = 100;
        const layerW = window.innerWidth;
        const layerH = window.innerHeight - MENUBAR;
        const { w, h } = WIN_DIMS[id];
        const nx = Math.max(0, Math.min(ox + clientX - sx, layerW - w));
        const ny = Math.max(0, Math.min(oy + clientY - sy, layerH - DOCK_GUARD - h + MENUBAR));
        setWins(prev => ({ ...prev, [id]: { ...prev[id], x: nx, y: ny } }));
      });
    };
    const onUp = () => {
      if (!dragRef.current) return;
      if (dragRef.current.raf) cancelAnimationFrame(dragRef.current.raf);
      dragRef.current = null;
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const focus = useCallback((id) => {
    setZTop(z => {
      const nz = z + 1;
      setWins(prev => ({ ...prev, [id]: { ...prev[id], z: nz } }));
      return nz;
    });
    setActiveId(id);
  }, []);

  const open = useCallback((id) => {
    setZTop(z => {
      const nz = z + 1;
      setWins(prev => ({
        ...prev,
        [id]: { ...prev[id], open: true, min: false, z: nz, animIn: true, animOut: false, animMin: false },
      }));
      return nz;
    });
    setActiveId(id);
    setTimeout(() => setWins(prev => ({ ...prev, [id]: { ...prev[id], animIn: false } })), 380);
    setBouncing(prev => new Set([...prev, id]));
    setTimeout(() => setBouncing(prev => { const s = new Set(prev); s.delete(id); return s; }), 700);
  }, []);

  const close = useCallback((id) => {
    setWins(prev => {
      const w = prev[id];
      // skip animation if already hidden (minimized)
      if (!w.open || w.min) return { ...prev, [id]: { ...w, open: false, max: false } };
      return { ...prev, [id]: { ...w, animOut: true } };
    });
    setTimeout(() => {
      setWins(prev => ({ ...prev, [id]: { ...prev[id], open: false, max: false, animOut: false } }));
    }, 220);
  }, []);

  const minimize = useCallback((id) => {
    setWins(prev => ({ ...prev, [id]: { ...prev[id], animMin: true } }));
    setTimeout(() => {
      setWins(prev => ({ ...prev, [id]: { ...prev[id], min: true, animMin: false } }));
    }, 240);
  }, []);

  const maximize = useCallback((id) => {
    setWins(prev => ({ ...prev, [id]: { ...prev[id], max: !prev[id].max } }));
  }, []);

  const restore = useCallback((id) => {
    setZTop(z => {
      const nz = z + 1;
      setWins(prev => ({ ...prev, [id]: { ...prev[id], min: false, z: nz, animIn: true } }));
      return nz;
    });
    setActiveId(id);
    setTimeout(() => setWins(prev => ({ ...prev, [id]: { ...prev[id], animIn: false } })), 380);
  }, []);

  const dockClick = useCallback((id) => {
    const w = wins[id];
    if (!w) return;
    if (!w.open) return open(id);
    if (w.min) return restore(id);
    focus(id);
  }, [wins, open, restore, focus]);

  const startDrag = useCallback((id) => (e) => {
    if (e.target.closest('.tl') || e.target.closest('.tl-group')) return;
    focus(id);
    if (wins[id]?.max) return;
    dragRef.current = { id, sx: e.clientX, sy: e.clientY, ox: wins[id].x, oy: wins[id].y };
    document.body.style.cursor = 'grabbing';
    e.preventDefault();
  }, [wins, focus]);

  const winStyle = useCallback((id) => {
    const w = wins[id];
    const { w: wd, h: ht } = WIN_DIMS[id];
    const visible = (w.open && !w.min) || w.animOut || w.animMin;

    let animation;
    if (w.animIn)  animation = 'popIn 0.34s cubic-bezier(0.34,1.56,0.64,1) forwards';
    if (w.animOut) animation = 'popOut 0.22s ease-in forwards';
    if (w.animMin) animation = 'minOut 0.24s ease-in forwards';

    const base = {
      position: 'absolute',
      display: visible ? 'flex' : 'none',
      flexDirection: 'column',
      zIndex: w.z,
      borderRadius: '12px',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.5)',
      boxShadow: activeId === id
        ? '0 36px 90px -22px rgba(0,0,0,0.75)'
        : '0 22px 60px -22px rgba(0,0,0,0.6)',
      transition: 'box-shadow 0.15s',
      pointerEvents: (w.animOut || w.animMin) ? 'none' : undefined,
      ...(animation ? { animation } : {}),
    };
    if (w.max) return { ...base, left: '12px', top: '8px', right: '12px', bottom: '92px', width: 'auto', height: 'auto' };
    return { ...base, left: w.x + 'px', top: w.y + 'px', width: wd + 'px', height: ht + 'px' };
  }, [wins, activeId]);

  return { wins, activeId, clock, bouncing, open, close, minimize, maximize, restore, focus, dockClick, startDrag, winStyle };
}
