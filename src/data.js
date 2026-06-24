export const IDENTITY = {
  name: 'Joshua Arnaez',
  role: 'Full-Stack Engineer · AI Integration Specialist',
  location: 'Bacolod City, Philippines · Remote · US/EU hours',
  status: 'Available for remote roles & freelance',
  email: 'joshuaarnaez22@gmail.com',
  phone: '+63 905 313 2911',
  github: 'https://github.com/joshuaarnaez22',
  linkedin: 'https://www.linkedin.com/in/joshua-arnaez-764b60143/',
  resume: 'https://drive.google.com/file/d/1I9TNw6n9uu4XhUvTwtRyCMBmPfRRf5PQ/view?usp=drive_link',
};

export const JOBS = [
  {
    role: 'Lead Mobile Developer',
    company: 'servicebay.ai',
    period: '2025 – 2026',
    location: 'Remote · USA',
    bullets: [
      'Led 5–10 eng team building AI-powered React Native (Expo) field-service platform.',
      'Architected hybrid AI: online (OpenAI + pgvector RAG) and fully offline (ONNX Runtime) with parity.',
      'Shipped voice-command interface (STT + LLM) for hands-free forms — ~40% faster job-logging.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Kite and Crest LLC',
    period: 'Mar 2024 – 2025',
    location: 'Freelance · Remote · USA',
    bullets: [
      'Delivered 10+ client apps: e-commerce, admin dashboards, internal tools.',
      'Designed Express.js microservices for multi-tenant SaaS.',
      'Cut API response times ~45% via Redis caching and indexed PostgreSQL.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Yondu',
    period: 'Nov 2022 – Jan 2024',
    location: 'Manila, Philippines',
    bullets: [
      'Built PIE.tv, an interactive second-screen companion for live programming.',
      'Drove TypeScript adoption and type-safety standards across repos.',
      'Re-architected frontend with code splitting — ~35% faster initial load.',
    ],
  },
  {
    role: 'Web Developer',
    company: 'Tinkertech',
    period: 'Aug 2019 – Oct 2022',
    location: 'Bacolod City, Philippines',
    bullets: [
      'Built internal inventory-tracking tools and admin dashboards.',
      'Developed full-stack web apps across the product line.',
    ],
  },
];

export const SKILLS = [
  { category: 'AI / ML',    items: ['OpenAI', 'Claude', 'Gemini', 'RAG', 'Embeddings', 'pgvector', 'ONNX'] },
  { category: 'Languages',  items: ['TypeScript', 'JavaScript', 'SQL'] },
  { category: 'Frontend',   items: ['React', 'Next.js', 'React Native', 'Vue', 'Tailwind', 'Three.js', 'Zustand'] },
  { category: 'Backend',    items: ['Node.js', 'Express', 'FastAPI', 'WebSockets', 'Socket.io', 'LiveKit'] },
  { category: 'Data',       items: ['PostgreSQL', 'MySQL', 'Supabase', 'Redis', 'Prisma', 'Drizzle'] },
  { category: 'Infra',      items: ['AWS', 'Docker', 'Vercel', 'GitHub Actions', 'Stripe', 'Clerk'] },
];

export const EDUCATION = [
  { status: 'IN PROGRESS', degree: 'Master of Information Technology', school: 'State University of Northern Negros' },
  { status: 'COMPLETED',   degree: 'BS Information Technology',         school: 'AMA Computer College, Bacolod' },
];

export const ABOUT_PARAS = [
  `Software engineer with <strong>6+ years</strong> shipping production web &amp; mobile apps; lately weaving LLMs, RAG, and on-device inference into real products.`,
  `Most recently led mobile at <strong>servicebay.ai</strong> — architected a hybrid AI system running online and fully offline; a voice-command interface cut job-logging time by ~40%.`,
  `Before that: delivered 10+ client apps freelancing, drove TypeScript adoption at <strong>Yondu</strong>, built internal tools in Bacolod City.`,
  `Cares about type-safe stacks, fast interfaces, and AI that's genuinely useful. Open to remote roles and freelance.`,
];

export const PROJECTS = [
  // full-stack apps first
  { mark: 'CS',  name: 'CryptoSage',   kind: 'AI · Web',     featured: true,  gradient: 'linear-gradient(150deg,#f7931a,#b8690a)', repo: 'https://github.com/joshuaarnaez22/CryptoSage' },
  { mark: 'HM',  name: 'HealthMind',   kind: 'AI · Health',  featured: true,  gradient: 'linear-gradient(150deg,#10b981,#047857)', repo: 'https://github.com/joshuaarnaez22/healthmind-ai' },
  { mark: 'GC',  name: 'Guild Chat',   kind: 'Real-time',    featured: true,  gradient: 'linear-gradient(150deg,#6366f1,#4338ca)', repo: 'https://github.com/joshuaarnaez22/guild-chat' },
  { mark: 'LMS', name: 'LMS Platform', kind: 'EdTech',       featured: true,  gradient: 'linear-gradient(150deg,#0ea5e9,#0369a1)', repo: 'https://github.com/joshuaarnaez22/lms-project' },
  { mark: 'SH',  name: 'Stream Hub',   kind: 'Streaming',                     gradient: 'linear-gradient(150deg,#ec4899,#a21caf)', repo: 'https://github.com/joshuaarnaez22/stream-hub' },
  { mark: 'TS',  name: 'Tattoo Studio', kind: 'AI · 3D',                      gradient: 'linear-gradient(150deg,#a855f7,#6d28d9)', repo: 'https://github.com/joshuaarnaez22/tatoo-studio' },
  { mark: 'RJ',  name: 'Jobs Scraper', kind: 'Automation',                   gradient: 'linear-gradient(150deg,#f43f5e,#be123c)', repo: 'https://github.com/joshuaarnaez22/job-scraper' },
  // client websites last
  { mark: 'CR',  name: 'Crowned',         kind: 'AI Website · Client', gradient: 'linear-gradient(150deg,#eab308,#a16207)', repo: 'https://github.com/joshuaarnaez22/crowned',         live: 'https://crowned-phi.vercel.app/' },
  { mark: 'CV',  name: 'CEV',             kind: 'AI Website · Client', gradient: 'linear-gradient(150deg,#14b8a6,#0f766e)', repo: 'https://github.com/joshuaarnaez22/cev',             live: 'https://cev-six.vercel.app/' },
  { mark: 'AA',  name: 'All Area Access', kind: 'AI Website · Client', gradient: 'linear-gradient(150deg,#f97316,#c2410c)', repo: 'https://github.com/joshuaarnaez22/all-area-access', live: 'https://all-area-access.vercel.app/' },
];

export const DOCK_ITEMS = [
  { id: 'terminal', label: 'Terminal', glyph: '>_',  glyphSize: 18, gradient: 'linear-gradient(150deg,#3a3a44,#1a1a20)', appTitle: 'Terminal' },
  { id: 'projects', label: 'Projects', glyph: '▤',   glyphSize: 24, gradient: 'linear-gradient(150deg,#2aa9ff,#0a63d6)', appTitle: 'Finder' },
  { id: 'about',    label: 'About Me', glyph: 'Aa',  glyphSize: 18, gradient: 'linear-gradient(150deg,#fdfdfd,#dcdce2)', appTitle: 'TextEdit' },
  { id: 'contact',  label: 'Contact',  glyph: '✉',   glyphSize: 24, gradient: 'linear-gradient(150deg,#00e676,#00b0ff)', appTitle: 'Contact' },
];

export const DOCK_EXTERNALS = [
  { label: 'GitHub', glyph: 'GH',  glyphSize: 18, gradient: 'linear-gradient(150deg,#444,#111)',       url: 'https://github.com/joshuaarnaez22' },
  { label: 'Resume', glyph: 'PDF', glyphSize: 13, gradient: 'linear-gradient(150deg,#ff5f57,#c1271f)', url: 'https://drive.google.com/file/d/1I9TNw6n9uu4XhUvTwtRyCMBmPfRRf5PQ/view?usp=drive_link' },
];

export const WALLPAPERS = [
  { name: 'Aurora',   bg: 'linear-gradient(165deg,#3a1f5c 0%,#241047 28%,#0e1f4a 62%,#0a2e44 100%)' },
  { name: 'Sequoia',  bg: 'linear-gradient(165deg,#1f3a5c 0%,#10243f 40%,#0a1828 100%)' },
  { name: 'Sonoma',   bg: 'linear-gradient(165deg,#5c1f3a 0%,#3a1030 45%,#1a0a24 100%)' },
  { name: 'Graphite', bg: 'linear-gradient(165deg,#2a2a32 0%,#1a1a20 50%,#0d0d12 100%)' },
  { name: 'Mojave',   bg: 'linear-gradient(165deg,#e08a3c 0%,#9c4a2c 45%,#3a1a2c 100%)' },
];

export const WIN_TITLES = {
  terminal: 'Terminal',
  projects: 'Finder',
  about:    'TextEdit',
  contact:  'Contact',
};

export const WIN_DIMS = {
  terminal: { w: 720, h: 600 },
  projects: { w: 600, h: 460 },
  about:    { w: 540, h: 480 },
  contact:  { w: 420, h: 470 },
};
