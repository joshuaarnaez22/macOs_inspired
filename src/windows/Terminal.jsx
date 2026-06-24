import { useState, useRef, useEffect } from 'react';
import { IDENTITY, JOBS, SKILLS, EDUCATION, PROJECTS } from '../data';

const MONO = "'JetBrains Mono', monospace";
const G = '#00e676';
const B = '#40c4ff';
const DIM = '#555';
const TEXT = '#b4b4c2';

/* ── static sub-components ───────────────────────── */

const Prompt = ({ cmd }) => (
  <div style={{ fontFamily: MONO, fontSize: 13, marginBottom: 3 }}>
    <span style={{ color: '#69ff47' }}>joshua@portfolio</span>
    <span style={{ color: DIM }}>:</span>
    <span style={{ color: B }}>~</span>
    <span style={{ color: '#777' }}> $ </span>
    <span style={{ color: '#f0f0f5' }}>{cmd}</span>
  </div>
);

const Chip = ({ label }) => (
  <span style={{
    display: 'inline-block', padding: '1px 8px', marginRight: 4, marginBottom: 4,
    background: 'rgba(255,255,255,0.05)', border: '1px solid #2a2a38',
    borderRadius: 4, color: '#aaa', fontSize: 10.5, fontFamily: MONO,
  }}>{label}</span>
);

/* ── interactive command outputs ─────────────────── */

const HelpOut = () => {
  const cmds = [
    ['whoami',        'show identity card'],
    ['ls',            'list apps'],
    ['skills',        'show tech skills'],
    ['experience',    'show work history'],
    ['education',     'show education'],
    ['projects',      'list projects'],
    ['open <app>',    'open app (terminal | projects | about | contact)'],
    ['mkdir <name>',  'create a folder'],
    ['touch <name>',  'create a file'],
    ['rm <name>',     'remove a file/folder'],
    ['tree',          'show created files'],
    ['date',          'current date / time'],
    ['echo <text>',   'print text'],
    ['git log',       'commit history'],
    ['neofetch',      'system info'],
    ['clear',         'clear terminal output'],
  ];
  return (
    <div>
      <div style={{ color: G, marginBottom: 6 }}>Available commands:</div>
      {cmds.map(([c, d]) => (
        <div key={c} style={{ display: 'flex', gap: 10, lineHeight: 1.8, flexWrap: 'wrap' }}>
          <span style={{ color: B, minWidth: 130, fontWeight: 600 }}>{c}</span>
          <span style={{ color: '#777', minWidth: 0 }}>— {d}</span>
        </div>
      ))}
    </div>
  );
};

const WhoamiOut = () => (
  <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: `2px solid ${G}`, borderRadius: '0 6px 6px 0', padding: '12px 16px' }}>
    <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 20, fontWeight: 700, color: '#f0f0f5' }}>{IDENTITY.name}</div>
    <div style={{ color: G, marginBottom: 3 }}>{IDENTITY.role}</div>
    <div style={{ color: DIM, fontSize: 12 }}>{IDENTITY.location}</div>
    <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
      <span style={{ color: '#28c840', fontSize: 12 }}>{IDENTITY.status}</span>
    </div>
  </div>
);

const LsOut = ({ files = [] }) => (
  <div style={{ color: B }}>
    <div>Applications/</div>
    {['terminal.app', 'projects.app', 'about-me.app', 'contact.app'].map((a, i, arr) => (
      <div key={a}>&nbsp;&nbsp;{i === arr.length - 1 ? '└──' : '├──'} {a}</div>
    ))}
    <div style={{ color: DIM, marginTop: 4 }}>resume.pdf &nbsp; skills.json &nbsp; experience.log</div>
    {files.length > 0 && (
      <div style={{ marginTop: 6 }}>
        {files.map(f => (
          <span key={f.name} style={{ color: f.type === 'dir' ? '#69c0ff' : TEXT, marginRight: 14 }}>
            {f.type === 'dir' ? `${f.name}/` : f.name}
          </span>
        ))}
      </div>
    )}
  </div>
);

const SkillsOut = () => (
  <div style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid #2a2a38', borderRadius: 6, padding: '10px 14px' }}>
    {SKILLS.map(s => (
      <div key={s.category} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 6, gap: 8, flexWrap: 'wrap' }}>
        <span style={{ color: DIM, minWidth: 90, flexShrink: 0, fontSize: 12 }}>&quot;{s.category}&quot;:</span>
        <div>{s.items.map(item => <Chip key={item} label={item} />)}</div>
      </div>
    ))}
  </div>
);

const ExperienceOut = () => (
  <div>
    {JOBS.map((job, i) => (
      <div key={i} style={{ borderLeft: `3px solid rgba(0,230,118,0.4)`, paddingLeft: 12, marginBottom: 14 }}>
        <div><span style={{ color: '#ddd', fontWeight: 600 }}>{job.role}</span><span style={{ color: DIM }}> @ </span><span style={{ color: G }}>{job.company}</span></div>
        <div style={{ color: DIM, fontSize: 11.5 }}>{job.period} · {job.location}</div>
        <ul style={{ listStyle: 'none', marginTop: 4 }}>
          {job.bullets.map((b, j) => (
            <li key={j} style={{ display: 'flex', gap: 6, color: '#a0a0b0', fontSize: 12, marginBottom: 2 }}>
              <span style={{ color: G, flexShrink: 0 }}>▹</span><span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const EducationOut = () => (
  <div>
    {EDUCATION.map((e, i) => (
      <div key={i} style={{ marginBottom: 6, fontSize: 12.5 }}>
        <span style={{ color: G }}>[{e.status}]</span>{' '}
        <span style={{ color: '#ddd' }}>{e.degree}</span>
        <span style={{ color: DIM }}> — {e.school}</span>
      </div>
    ))}
    <div style={{ color: '#777', fontSize: 12, marginTop: 4 }}>[LANGUAGES] English (Professional) · Filipino (Native)</div>
  </div>
);

const ProjectsOut = () => (
  <div>
    {PROJECTS.map(p => (
      <div key={p.name} style={{ display: 'flex', gap: 12, marginBottom: 4, lineHeight: 1.7, flexWrap: 'wrap' }}>
        <span style={{ color: B, minWidth: 40, fontWeight: 700 }}>{p.mark}</span>
        <span style={{ color: '#ddd' }}>{p.name}</span>
        <span style={{ color: DIM, fontSize: 11 }}>{p.kind}</span>
        <a href={p.repo} target="_blank" rel="noreferrer" style={{ color: '#777', fontSize: 11, textDecoration: 'none', marginLeft: 'auto' }}>→ GitHub</a>
      </div>
    ))}
  </div>
);

const NeofetchOut = () => (
  <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
    <pre style={{ color: G, lineHeight: 1.45, fontFamily: MONO, fontSize: 12.5, flexShrink: 0 }}>{`      ████
    ████████
   ██████████
  ████████████
  ████████████
   ██████████
    ████████
      ████`}</pre>
    <div style={{ fontSize: 12.5, lineHeight: 1.9 }}>
      <div><span style={{ color: B }}>joshua</span><span style={{ color: DIM }}>@</span><span style={{ color: B }}>portfolio</span></div>
      <div style={{ color: DIM }}>────────────────────</div>
      {[
        ['OS',      'macOS Sonoma 14.6'],
        ['Shell',   'zsh 5.9'],
        ['Node',    'v24.10.0'],
        ['Theme',   'Dark+ Pro'],
        ['CPU',     'Apple M3 Pro'],
        ['Memory',  '36 GB'],
        ['Skills',  '∞'],
      ].map(([k, v]) => (
        <div key={k}><span style={{ color: G }}>{k}:</span> <span style={{ color: TEXT }}>{v}</span></div>
      ))}
    </div>
  </div>
);

const GIT_LOG = [
  ['a1b2c3d', 'feat: voice-command interface → ~40% faster job-logging'],
  ['e4f5g6h', 'perf: optimize pgvector RAG latency by 45%'],
  ['i7j8k9l', 'feat: offline ONNX inference pipeline with feature parity'],
  ['m0n1o2p', 'feat: guild-chat — real-time WebSocket rooms'],
  ['q3r4s5t', 'feat: LMS platform with Stripe + Clerk auth'],
  ['u6v7w8x', 'chore: portfolio v2 — macOS desktop redesign'],
];
const GitLogOut = () => (
  <div>
    {GIT_LOG.map(([h, m]) => (
      <div key={h} style={{ display: 'flex', gap: 12, lineHeight: 1.8 }}>
        <span style={{ color: '#f7931a', flexShrink: 0 }}>{h}</span>
        <span style={{ color: TEXT, minWidth: 0 }}>{m}</span>
      </div>
    ))}
  </div>
);

/* ── command runner ───────────────────────────────── */

function runCommand(cmd, openApp, fs) {
  const lower = cmd.trim().toLowerCase();

  // ── interactive filesystem (mkdir / touch / rm / tree) ──
  const { files, setFiles } = fs;
  const arg = cmd.trim().slice(cmd.trim().indexOf(' ') + 1).trim();
  if (lower.startsWith('mkdir')) {
    if (!arg || arg === lower) return { output: 'mkdir: missing operand' };
    if (files.some(f => f.name === arg)) return { output: `mkdir: ${arg}: File exists` };
    setFiles([...files, { name: arg, type: 'dir' }]);
    return { output: `Created folder "${arg}/"` };
  }
  if (lower.startsWith('touch')) {
    if (!arg || arg === lower) return { output: 'touch: missing file operand' };
    if (files.some(f => f.name === arg)) return { output: '' };
    setFiles([...files, { name: arg, type: 'file' }]);
    return { output: `Created file "${arg}"` };
  }
  if (lower.startsWith('rm')) {
    const target = arg.replace(/^-rf?\s*/, '').replace(/\/$/, '');
    if (!files.some(f => f.name === target)) return { output: `rm: ${target}: No such file or directory` };
    setFiles(files.filter(f => f.name !== target));
    return { output: `Removed "${target}"` };
  }
  if (lower === 'tree') {
    return { output: (
      <div style={{ color: B }}>
        <div>.</div>
        {files.length === 0
          ? <div style={{ color: DIM }}>&nbsp;&nbsp;(empty — try: mkdir myfolder)</div>
          : files.map((f, i) => (
              <div key={f.name} style={{ color: f.type === 'dir' ? '#69c0ff' : TEXT }}>
                {i === files.length - 1 ? '└── ' : '├── '}{f.type === 'dir' ? `${f.name}/` : f.name}
              </div>
            ))}
      </div>
    ) };
  }

  switch (lower) {
    case 'help':                  return { output: <HelpOut /> };
    case 'whoami':
    case 'who am i':              return { output: <WhoamiOut /> };
    case 'ls':
    case 'ls -la':
    case 'ls -l':                 return { output: <LsOut files={files} /> };
    case 'skills':
    case 'cat skills.json':       return { output: <SkillsOut /> };
    case 'experience':
    case 'cat experience.log':    return { output: <ExperienceOut /> };
    case 'education':
    case 'cat education.md':      return { output: <EducationOut /> };
    case 'projects':
    case 'ls projects':           return { output: <ProjectsOut /> };
    case 'neofetch':              return { output: <NeofetchOut /> };
    case 'git log':
    case 'git log --oneline':     return { output: <GitLogOut /> };
    case 'date':                  return { output: new Date().toLocaleString() };
    case 'pwd':                   return { output: '/Users/joshua/portfolio' };
    case 'uname':
    case 'uname -a':              return { output: 'Darwin portfolio 23.6.0 Darwin Kernel Version 23.6.0; arm64' };
    case 'clear':                 return { clear: true };
    case 'sudo rm -rf /':
    case 'sudo rm -rf':           return { output: 'rm: "/": Operation not permitted\n(Nice try 😄)' };
    case 'exit':
    case 'logout':                return { output: 'Session closed. Reload to restart.' };
    default: break;
  }
  if (lower.startsWith('echo '))   return { output: cmd.slice(5) };
  if (lower.startsWith('sudo '))   return { output: `sudo: authentication required\n(${IDENTITY.name.split(' ')[0].toLowerCase()} is not in the sudoers file.)` };
  if (lower.startsWith('open ')) {
    const app = lower.slice(5).trim().replace('.app', '');
    const valid = ['terminal', 'projects', 'about', 'contact'];
    if (valid.includes(app)) {
      setTimeout(() => openApp(app), 80);
      return { output: `Opening ${app}... ✓` };
    }
    return { output: `open: "${app}" — application not found\nAvailable: ${valid.join(', ')}` };
  }
  if (lower.startsWith('git '))    return { output: `git: "${cmd.slice(4)}" is not a git command. Try: git log` };
  if (lower === 'cat resume.pdf')  return { output: 'Binary file. Opening in browser...', side: () => window.open(IDENTITY.resume, '_blank') };
  return { output: `bash: ${cmd}: command not found\nType "help" to see available commands.` };
}

/* ── static section ───────────────────────────────── */

function StaticContent({ openApp }) {
  return (
    <>
      <div style={{ color: DIM, fontSize: 11.5, marginBottom: 12 }}>
        Last login: {new Date().toDateString()} on ttys001
      </div>

      <Prompt cmd="whoami" />
      <div style={{ background: 'rgba(0,0,0,0.3)', borderLeft: `2px solid ${G}`, borderRadius: '0 6px 6px 0', padding: '14px 18px', marginBottom: 22 }}>
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 21, fontWeight: 700, color: '#f0f0f5', marginBottom: 2 }}>{IDENTITY.name}</div>
        <div style={{ color: G, marginBottom: 4 }}>{IDENTITY.role}</div>
        <div style={{ color: DIM, fontSize: 12 }}>{IDENTITY.location}</div>
        <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          <span style={{ color: '#28c840', fontSize: 12 }}>{IDENTITY.status}</span>
        </div>
      </div>

      <Prompt cmd="cat experience.log" />
      <div style={{ marginBottom: 22 }}>
        {JOBS.map((job, i) => (
          <div key={i} style={{ borderLeft: `3px solid rgba(0,230,118,0.45)`, paddingLeft: 14, marginBottom: 18 }}>
            <div style={{ fontSize: 13.5 }}>
              <span style={{ color: '#ddd', fontWeight: 600 }}>{job.role}</span>
              <span style={{ color: DIM }}> @ </span>
              <span style={{ color: G }}>{job.company}</span>
            </div>
            <div style={{ color: DIM, fontSize: 11.5 }}>{job.period} · {job.location}</div>
            <ul style={{ listStyle: 'none', marginTop: 6 }}>
              {job.bullets.map((b, j) => (
                <li key={j} style={{ display: 'flex', gap: 6, color: '#a0a0b0', fontSize: 12, marginBottom: 2 }}>
                  <span style={{ color: G, flexShrink: 0 }}>▹</span><span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <Prompt cmd="cat skills.json" />
      <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #2a2a38', borderRadius: 6, padding: '12px 16px', marginBottom: 22 }}>
        {SKILLS.map(s => (
          <div key={s.category} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 8, gap: 8, flexWrap: 'wrap' }}>
            <span style={{ color: DIM, minWidth: 90, flexShrink: 0, fontSize: 12 }}>&quot;{s.category}&quot;:</span>
            <div>{s.items.map(item => <Chip key={item} label={item} />)}</div>
          </div>
        ))}
      </div>

      <Prompt cmd="cat education.md" />
      <div style={{ marginBottom: 22 }}>
        {EDUCATION.map((e, i) => (
          <div key={i} style={{ marginBottom: 6, fontSize: 12.5 }}>
            <span style={{ color: G }}>[{e.status}]</span>{' '}
            <span style={{ color: '#ddd' }}>{e.degree}</span>
            <span style={{ color: DIM }}> — {e.school}</span>
          </div>
        ))}
        <div style={{ color: '#777', fontSize: 12, marginTop: 6 }}>[LANGUAGES] English (Professional) · Filipino (Native)</div>
      </div>

      <Prompt cmd='open ~/projects && open contact.app' />
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
        <button onClick={() => openApp('projects')} style={btn(G, '#0a1020')}>▤ View Projects</button>
        <button onClick={() => openApp('contact')}  style={btn(B, '#0a1020')}>✉ Contact Me</button>
        <button onClick={() => openApp('about')}    style={btn('transparent', '#aaa', '#555')}>Aa About Me</button>
      </div>
    </>
  );
}

function btn(bg, color, border) {
  return {
    padding: '6px 16px', borderRadius: 6, cursor: 'pointer', fontWeight: 600,
    fontFamily: MONO, fontSize: 12, background: bg, color,
    border: border ? `1px solid ${border}` : 'none',
  };
}

/* ── main Terminal component ─────────────────────── */

export default function Terminal({ open: openApp }) {
  const [history, setHistory] = useState([]);
  const [input, setInput]     = useState('');
  const [cmdLog, setCmdLog]   = useState([]);
  const [logIdx, setLogIdx]   = useState(-1);
  const [files, setFiles]     = useState([]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const submit = (e) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;
    const result = runCommand(cmd, openApp, { files, setFiles });
    if (result.side) result.side();
    if (result.clear) {
      setHistory([]);
    } else {
      setHistory(prev => [...prev, { cmd, output: result.output }]);
    }
    setCmdLog(prev => [cmd, ...prev]);
    setLogIdx(-1);
    setInput('');
  };

  const keyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(logIdx + 1, cmdLog.length - 1);
      setLogIdx(next);
      setInput(cmdLog[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(logIdx - 1, -1);
      setLogIdx(next);
      setInput(next === -1 ? '' : cmdLog[next]);
    }
  };

  return (
    <div
      className="term"
      style={{ flex: 1, background: '#15151c', padding: '20px 22px', overflowY: 'auto', overflowX: 'hidden', wordBreak: 'break-word', fontFamily: MONO, fontSize: 13, lineHeight: 1.7, color: TEXT, cursor: 'text' }}
      onClick={() => inputRef.current?.focus()}
    >
      <StaticContent openApp={openApp} />

      {/* interactive history */}
      {history.map((entry, i) => (
        <div key={i} style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: MONO, fontSize: 13 }}>
            <span style={{ color: '#69ff47' }}>joshua@portfolio</span>
            <span style={{ color: DIM }}>:</span>
            <span style={{ color: B }}>~</span>
            <span style={{ color: '#777' }}> $ </span>
            <span style={{ color: '#f0f0f5' }}>{entry.cmd}</span>
          </div>
          {entry.output != null && (
            <div style={{ marginTop: 4, marginLeft: 2 }}>
              {typeof entry.output === 'string'
                ? entry.output.split('\n').map((line, j) => <div key={j} style={{ color: TEXT }}>{line}</div>)
                : entry.output}
            </div>
          )}
        </div>
      ))}

      {/* live input */}
      <form onSubmit={submit} style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
        <span style={{ color: '#69ff47', whiteSpace: 'nowrap' }}>joshua@portfolio</span>
        <span style={{ color: DIM }}>:</span>
        <span style={{ color: B }}>~</span>
        <span style={{ color: '#777' }}>&nbsp;$&nbsp;</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={keyDown}
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            color: '#f0f0f5', fontFamily: MONO, fontSize: 13, caretColor: G,
          }}
        />
      </form>
      <div ref={bottomRef} />
    </div>
  );
}
