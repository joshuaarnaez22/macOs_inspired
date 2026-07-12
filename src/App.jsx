import { useState, useEffect } from 'react';
import { useWindowManager } from './useWindowManager';
import { WALLPAPERS } from './data';
import MenuBar from './components/MenuBar';
import Dock from './components/Dock';
import Mobile from './components/Mobile';
import Window from './components/Window';
import Terminal from './windows/Terminal';
import Projects from './windows/Projects';
import About from './windows/About';
import Contact from './windows/Contact';

const WALLPAPER_OVERLAY = 'radial-gradient(circle at 78% 18%,rgba(255,170,90,0.22) 0%,transparent 38%), radial-gradient(circle at 22% 82%,rgba(90,120,255,0.18) 0%,transparent 45%)';

export default function App() {
  const wm = useWindowManager();
  const { wins, activeId, clock, bouncing, close, minimize, maximize, focus, dockClick, startDrag, winStyle } = wm;

  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem('desktop-wallpaper') || WALLPAPERS[0].bg);
  const [menu, setMenu] = useState(null); // { x, y } or null

  useEffect(() => { localStorage.setItem('desktop-wallpaper', wallpaper); }, [wallpaper]);

  const resetDesktop = () => { localStorage.clear(); window.location.reload(); };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const windowProps = (id) => ({
    id,
    isActive: activeId === id,
    style: winStyle(id),
    onFocus: () => focus(id),
    onClose: () => close(id),
    onMinimize: () => minimize(id),
    onMaximize: () => maximize(id),
    startDrag: startDrag(id),
  });

  if (isMobile) return <Mobile wallpaper={wallpaper} />;

  return (
    <>
      <div
        style={{ position: 'fixed', inset: 0, background: wallpaper, transition: 'background 0.4s' }}
        onContextMenu={(e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY }); }}
      />
      <div style={{ position: 'fixed', inset: 0, background: WALLPAPER_OVERLAY, pointerEvents: 'none' }} />

      {menu && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99997 }} onClick={() => setMenu(null)} onContextMenu={(e) => { e.preventDefault(); setMenu({ x: e.clientX, y: e.clientY }); }} />
      )}
      {menu && (
        <div
          className="menu-pop"
          style={{
            position: 'fixed', left: menu.x, top: menu.y, zIndex: 99998,
            background: 'rgba(40,36,60,0.72)', backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255,255,255,0.16)', borderRadius: 12, padding: 8,
            boxShadow: '0 12px 40px -8px rgba(0,0,0,0.6)', minWidth: 200,
          }}
        >
          <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: "'JetBrains Mono', monospace", padding: '4px 10px 8px' }}>Change Wallpaper</div>
          {WALLPAPERS.map(w => {
            const active = wallpaper === w.bg;
            return (
              <div
                key={w.name}
                onClick={() => { setWallpaper(w.bg); setMenu(null); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '8px 10px',
                  borderRadius: 8, cursor: 'pointer', color: '#f0f0f5', fontSize: 13,
                  fontFamily: 'Inter, sans-serif',
                  background: active ? 'rgba(120,120,255,0.35)' : 'transparent',
                }}
                onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
              >
                <span style={{
                  width: 28, height: 20, borderRadius: 5, background: w.bg,
                  border: active ? '1.5px solid rgba(255,255,255,0.7)' : '1px solid rgba(255,255,255,0.25)',
                  boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.25)',
                  flexShrink: 0,
                }} />
                <span style={{ flex: 1 }}>{w.name}</span>
                {active && (
                  <span style={{ color: '#7dd3fc', fontSize: 13, fontWeight: 700 }} aria-hidden>✓</span>
                )}
              </div>
            );
          })}
        </div>
      )}

      <MenuBar
        activeId={activeId}
        clock={clock}
        wins={wins}
        wallpaper={wallpaper}
        actions={{
          open: (id) => wm.open(id),
          focus,
          minimize,
          close,
          setWallpaper,
          reset: resetDesktop,
        }}
      />

      <div style={{
        position: 'fixed', top: 48, right: 24, zIndex: 100,
        textAlign: 'right', pointerEvents: 'none',
      }}>
        <h1 style={{ color: 'rgba(255,255,255,0.7)', fontWeight: 600, fontSize: 13, fontFamily: 'Inter, sans-serif', margin: 0 }}>Joshua Arnaez — Portfolio</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'JetBrains Mono', monospace", fontSize: 11, marginTop: 3 }}>double-click the dock to open apps</p>
      </div>

      {/* window layer */}
      <div style={{ position: 'absolute', top: 30, left: 0, right: 0, bottom: 0 }}>
        <Window
          {...windowProps('terminal')}
          title="joshua@portfolio — zsh"
          titleColor="#9a9aa6"
          titleBarStyle={{ background: '#2a2a32' }}
        >
          <Terminal open={(id) => wm.open(id)} />
        </Window>

        <Window
          {...windowProps('projects')}
          title="Projects"
          titleColor="#e8e8ee"
          titleBarStyle={{ background: 'linear-gradient(180deg,#3a3a44,#2c2c34)' }}
        >
          <Projects />
        </Window>

        <Window
          {...windowProps('about')}
          title="about-me.txt"
          titleColor="#444"
          titleBarStyle={{ background: 'linear-gradient(180deg,#f4f4f4,#e2e2e2)', borderBottom: '1px solid #c4c4c4' }}
        >
          <About />
        </Window>

        <Window
          {...windowProps('contact')}
          title="Contact"
          titleColor="#dfe6f5"
          titleBarStyle={{ background: 'linear-gradient(180deg,#2c3550,#1f2740)' }}
        >
          <Contact />
        </Window>
      </div>

      <Dock wins={wins} bouncing={bouncing} dockClick={dockClick} />
    </>
  );
}
