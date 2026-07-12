// Shared SVG app icons, keyed by dock id / external label. Used by Dock (desktop) and Mobile.
// Filled, macOS-style glyphs sized for 52px dock / 62px mobile tiles.

const base = { width: 30, height: 30, viewBox: '0 0 32 32', 'aria-hidden': true };

export const ICONS = {
  terminal: (
    <svg {...base}>
      {/* green prompt glyph without font dependency */}
      <path d="M7 10l5 4-5 4" fill="none" stroke="#39d353" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 18h9" fill="none" stroke="#39d353" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  ),

  projects: (
    <svg {...base}>
      {/* Finder-style smiling face */}
      <circle cx="11" cy="13.5" r="2.1" fill="#fff" />
      <circle cx="21" cy="13.5" r="2.1" fill="#fff" />
      <path
        d="M9.5 20c1.6 2.4 4 3.6 6.5 3.6S20.9 22.4 22.5 20"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  ),

  about: (
    <svg {...base}>
      {/* TextEdit: dark ink on light paper tile */}
      <text
        x="5" y="21"
        fill="#2a2a32"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="16"
        fontWeight="700"
      >Aa</text>
      <path d="M20 9h6M20 14h6M20 19h4" stroke="#6a6a76" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),

  contact: (
    <svg {...base}>
      {/* Mail envelope with flap */}
      <rect x="3.5" y="8" width="25" height="17" rx="2.5" fill="#fff" opacity="0.95" />
      <path
        d="M3.5 10.5L16 18.5 28.5 10.5"
        fill="none"
        stroke="#00a0c8"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 23.5L12.5 16M28.5 23.5L19.5 16"
        fill="none"
        stroke="#00a0c8"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.45"
      />
    </svg>
  ),

  GitHub: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  ),

  Resume: (
    <svg {...base}>
      {/* Document + PDF label */}
      <path
        d="M8 4h11l5 5v17a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
        fill="#fff"
        opacity="0.95"
      />
      <path d="M19 4v5h5" fill="#ffc9c6" />
      <rect x="10" y="15" width="12" height="8" rx="1.5" fill="#c1271f" />
      <text
        x="16" y="21"
        textAnchor="middle"
        fill="#fff"
        fontFamily="'Inter', system-ui, sans-serif"
        fontSize="5.5"
        fontWeight="800"
        letterSpacing="0.4"
      >PDF</text>
    </svg>
  ),
};
