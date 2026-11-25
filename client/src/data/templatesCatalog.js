export const TEMPLATE_CATEGORIES = [
  'All',
  'Creative',
  'Web design',
  'Minimal',
  'Agency',
  'Modern',
  'Tech & Dev'
];

export const TEMPLATES_CATALOG = [
  // 1. Aura Lime
  {
    id: 'aura-lime',
    name: 'Aura Lime',
    categories: ['Modern', 'Creative', 'Web design'],
    badge: '🏆 Website of the Day',
    color: '#84cc16',
    bg: 'radial-gradient(circle, rgba(163, 230, 53, 0.35) 0%, #ffffff 80%)',
    textColor: '#4d7c0f',
    description: 'Luminous lime spotlight hero, awards laurel badge, greyscale portrait, and trusted brand ticker strip.'
  },
  // 2. UX Case Study (Inspired by Figma / Dribbble popular)
  {
    id: 'ux-case-study',
    name: 'UX Case Study',
    categories: ['Web design', 'Modern'],
    badge: '🔬 UX Research & Wireframes',
    color: '#0284c7',
    bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    textColor: '#0369a1',
    description: 'Clean clinical wireframe blueprint, structured research stages, problem-solution statements, and user journey metrics.'
  },
  // 3. Product Designer (Inspired by Jenny / Jayesh Patil)
  {
    id: 'product-designer',
    name: 'Product Designer',
    categories: ['Creative', 'Modern', 'Web design'],
    badge: '🎨 Interactive Prototyping',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    textColor: '#b45309',
    description: 'Warm floating hero with glassmorphism badges, prototype launch links, design systems showcase, and availability pills.'
  },
  // 4. Split Monochrome (Inspired by Tomasz Gajda)
  {
    id: 'split-mono',
    name: 'Split Monochrome',
    categories: ['Minimal', 'Modern', 'Tech & Dev'],
    badge: '⚡ Minimalist Split Hero',
    color: '#0f172a',
    bg: 'linear-gradient(90deg, #0f172a 50%, #ffffff 50%)',
    textColor: '#0f172a',
    description: 'High-contrast 50/50 split black & white canvas, large clean side portrait, bold left typography, and monospace skill tags.'
  },
  // 5. Design Agency (Inspired by Modern Web Agency)
  {
    id: 'design-agency',
    name: 'Design Agency',
    categories: ['Agency', 'Web design', 'Modern'],
    badge: '🚀 Studio & Growth',
    color: '#10b981',
    bg: 'linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)',
    textColor: '#047857',
    description: 'Fresh mint-green aesthetic, client satisfaction metrics, comprehensive service offerings, and partner logo strips.'
  },
  // 6. Vibrant Pastel
  {
    id: 'vibrant-card',
    name: 'Vibrant Pastel',
    categories: ['Creative', 'Web design'],
    badge: '🎨 Creative Agency',
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, #f5f3ff 0%, #fae8ff 100%)',
    textColor: '#7c3aed',
    description: 'Centered floating card with ambient lilac glow, internal nav bar, framed portrait card, and vibrant gradient buttons.'
  },
  // 7. Warm Spotlight
  {
    id: 'warm-spotlight',
    name: 'Warm Spotlight',
    categories: ['Creative', 'Modern'],
    badge: '🔥 Creative Director',
    color: '#f97316',
    bg: '#09090b',
    textColor: '#ea580c',
    description: 'Obsidian dark theme with ambient burnt orange spotlight aura, bold uppercase creative director typography.'
  },
  // 8. Cyber Neon
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    categories: ['Tech & Dev', 'Modern'],
    badge: '⚡ Tech Architect',
    color: '#06b6d4',
    bg: '#060913',
    textColor: '#0891b2',
    description: 'Glowing cyan radar avatar ring, production metrics strip (repos, uptime, exp), and terminal sys logs.'
  },
  // 9. Crimson Bold
  {
    id: 'crimson-bold',
    name: 'Crimson Bold',
    categories: ['Modern', 'Creative'],
    badge: '💥 High Impact',
    color: '#ef4444',
    bg: '#0e0e11',
    textColor: '#dc2626',
    description: 'Pure jet OLED canvas with electric scarlet highlights, stat callouts (10K+ users), and dynamic project cards.'
  },
  // 10. Editorial Mono
  {
    id: 'editorial-mono',
    name: 'Editorial Mono',
    categories: ['Minimal', 'Modern'],
    badge: '📰 High Fashion',
    color: '#18181b',
    bg: '#fbfbfb',
    textColor: '#18181b',
    description: 'High-fashion monochrome magazine styling, oversized outlined display headers, and archive lookbook grid.'
  },
  // 11. Neo-Brutalist
  {
    id: 'brutalist-tech',
    name: 'Neo-Brutalist',
    categories: ['Tech & Dev', 'Modern'],
    badge: '📐 Blueprint Grid',
    color: '#eab308',
    bg: '#fef08a',
    textColor: '#a16207',
    description: 'Industrial technical blueprint grid, monospaced typography, sharp black borders, and neon yellow stamps.'
  },
  // 12. Warm Playful
  {
    id: 'warm-playful',
    name: 'Warm Playful',
    categories: ['Creative', 'Modern'],
    badge: '☀️ Sunny Studio',
    color: '#f59e0b',
    bg: '#fefce8',
    textColor: '#b45309',
    description: 'Sunny golden yellow accents, welcoming organic curves, sticker tags, and friendly portfolio cards.'
  },
  // 13. Executive CV
  {
    id: 'executive-cv',
    name: 'Executive CV',
    categories: ['Minimal', 'Agency'],
    badge: '👔 Executive Dossier',
    color: '#047857',
    bg: '#064e3b',
    textColor: '#065f46',
    description: 'Structured 2-column dossier, sage emerald banner, executive summary, and comprehensive career timeline.'
  },
  // 14. Glass Slate
  {
    id: 'glass-slate',
    name: 'Glass Slate',
    categories: ['Modern', 'Creative'],
    badge: '✨ Frosted Glass',
    color: '#6366f1',
    bg: '#0a0b10',
    textColor: '#4f46e5',
    description: 'Frosted glassmorphism over deep slate canvas, ambient purple & cyan glows, floating tech cards.'
  },
  // 15. Minimal Professional
  {
    id: 'minimal',
    name: 'Minimal Professional',
    categories: ['Minimal'],
    badge: '💼 Clean Swiss',
    color: '#2563eb',
    bg: 'var(--bg-tertiary)',
    textColor: '#2563eb',
    description: 'Clean, spacious typography-led layout tailored for software architects, managers, and consultants.'
  },
  // 16. Modern Developer
  {
    id: 'developer',
    name: 'Modern Developer',
    categories: ['Tech & Dev'],
    badge: '💻 Terminal Pro',
    color: '#2563eb',
    bg: '#0d1117',
    textColor: '#58a6ff',
    description: 'Interactive terminal window, live status pulses, repository badges, and technical skill matrices.'
  },
  // 17. Creative Bento
  {
    id: 'creative',
    name: 'Creative Bento',
    categories: ['Creative', 'Modern'],
    badge: '🍱 Bento Grid',
    color: '#ec4899',
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
    textColor: '#db2777',
    description: 'Bento-grid showcase with dynamic card spans, media previews, and eye-catching portfolio visuals.'
  }
];
