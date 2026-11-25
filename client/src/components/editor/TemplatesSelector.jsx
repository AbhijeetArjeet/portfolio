import React from 'react';
import { Check, Sparkles, Layout, Flame, Terminal, Zap, BookOpen, Cpu, Sun, Award, Layers } from 'lucide-react';

export const TEMPLATES_CATALOG = [
  {
    id: 'aura-lime',
    name: 'Aura Lime',
    badge: '🏆 Website of the Day',
    color: '#84cc16',
    bg: 'radial-gradient(circle, rgba(163, 230, 53, 0.35) 0%, #ffffff 80%)',
    textColor: '#4d7c0f',
    description: 'Luminous lime spotlight hero, awards laurel badge, greyscale portrait, and trusted brand ticker strip.'
  },
  {
    id: 'vibrant-card',
    name: 'Vibrant Pastel',
    badge: '🎨 Creative Agency',
    color: '#8b5cf6',
    bg: 'linear-gradient(135deg, #f5f3ff 0%, #fae8ff 100%)',
    textColor: '#7c3aed',
    description: 'Centered floating card with ambient lilac glow, internal nav bar, framed portrait, and vibrant action buttons.'
  },
  {
    id: 'warm-spotlight',
    name: 'Warm Spotlight',
    badge: '🔥 Creative Director',
    color: '#f97316',
    bg: '#09090b',
    textColor: '#ea580c',
    description: 'Obsidian dark theme with ambient burnt orange spotlight aura, bold uppercase creative director typography.'
  },
  {
    id: 'cyber-neon',
    name: 'Cyber Neon',
    badge: '⚡ Tech Architect',
    color: '#06b6d4',
    bg: '#060913',
    textColor: '#0891b2',
    description: 'Glowing cyan radar avatar ring, production metrics strip (repos, uptime, exp), and terminal sys logs.'
  },
  {
    id: 'crimson-bold',
    name: 'Crimson Bold',
    badge: '💥 High Impact',
    color: '#ef4444',
    bg: '#0e0e11',
    textColor: '#dc2626',
    description: 'Pure jet OLED canvas with electric scarlet highlights, stat callouts (10K+ users), and dynamic project cards.'
  },
  {
    id: 'editorial-mono',
    name: 'Editorial Mono',
    badge: '📰 High Fashion',
    color: '#18181b',
    bg: '#fbfbfb',
    textColor: '#18181b',
    description: 'High-fashion monochrome magazine styling, oversized outlined display headers, and archive lookbook grid.'
  },
  {
    id: 'brutalist-tech',
    name: 'Neo-Brutalist',
    badge: '📐 Blueprint',
    color: '#eab308',
    bg: '#fef08a',
    textColor: '#a16207',
    description: 'Industrial technical blueprint grid, monospaced typography, sharp black borders, and neon yellow stamps.'
  },
  {
    id: 'warm-playful',
    name: 'Warm Playful',
    badge: '☀️ Sunny Studio',
    color: '#f59e0b',
    bg: '#fefce8',
    textColor: '#b45309',
    description: 'Sunny golden yellow accents, welcoming organic curves, sticker tags, and friendly portfolio cards.'
  },
  {
    id: 'executive-cv',
    name: 'Executive CV',
    badge: '👔 Dossier',
    color: '#047857',
    bg: '#064e3b',
    textColor: '#065f46',
    description: 'Structured 2-column dossier, sage emerald banner, executive summary, and comprehensive career timeline.'
  },
  {
    id: 'glass-slate',
    name: 'Glass Slate',
    badge: '✨ Frosted Glass',
    color: '#6366f1',
    bg: '#0a0b10',
    textColor: '#4f46e5',
    description: 'Frosted glassmorphism over deep slate canvas, ambient purple & cyan glows, floating tech cards.'
  },
  {
    id: 'minimal',
    name: 'Minimal Professional',
    badge: '💼 Clean Swiss',
    color: '#2563eb',
    bg: 'var(--bg-tertiary)',
    textColor: '#2563eb',
    description: 'Clean, spacious typography-led layout tailored for software architects, managers, and consultants.'
  },
  {
    id: 'developer',
    name: 'Modern Developer',
    badge: '💻 Terminal Pro',
    color: '#2563eb',
    bg: '#0d1117',
    textColor: '#58a6ff',
    description: 'Interactive terminal window, live status pulses, repository badges, and technical skill matrices.'
  },
  {
    id: 'creative',
    name: 'Creative Bento',
    badge: '🍱 Bento Grid',
    color: '#ec4899',
    bg: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(236, 72, 153, 0.15))',
    textColor: '#db2777',
    description: 'Bento-grid showcase with dynamic card spans, media previews, and eye-catching portfolio visuals.'
  }
];

export default function TemplatesSelector({ portfolio, onChange }) {
  const currentTemplate = portfolio.templateId || 'minimal';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Sparkles size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Choose Your Portfolio Template</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Click any template architecture below. Your portfolio content immediately transforms in the live preview on the right.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem' }}>
        {TEMPLATES_CATALOG.map((tpl) => {
          const isSelected = currentTemplate === tpl.id;

          return (
            <div
              key={tpl.id}
              onClick={() => onChange({ templateId: tpl.id })}
              style={{
                borderRadius: 'var(--radius-lg)',
                border: `2px solid ${isSelected ? tpl.color : 'var(--border-color)'}`,
                background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-card)',
                boxShadow: isSelected ? `0 8px 20px ${tpl.color}25` : 'var(--shadow-sm)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Mini Preview Header Banner */}
              <div
                style={{
                  height: '80px',
                  background: tpl.bg,
                  padding: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: tpl.textColor,
                    background: 'rgba(255, 255, 255, 0.85)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    width: 'fit-content'
                  }}
                >
                  {tpl.badge}
                </span>
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: tpl.id === 'editorial-mono' || tpl.id === 'brutalist-tech' ? '#000' : (tpl.bg === '#09090b' || tpl.bg === '#060913' || tpl.bg === '#0e0e11' || tpl.bg === '#064e3b' || tpl.bg === '#0d1117' || tpl.bg === '#0a0b10' ? '#fff' : '#111') }}>
                  {tpl.name}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <strong style={{ fontSize: '0.92rem', color: isSelected ? tpl.color : 'var(--text-primary)' }}>
                    {tpl.name}
                  </strong>
                  {isSelected && (
                    <span
                      style={{
                        background: tpl.color,
                        color: '#ffffff',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.85rem', flex: 1 }}>
                  {tpl.description}
                </p>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onChange({ templateId: tpl.id });
                  }}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                  style={{
                    width: '100%',
                    fontSize: '0.75rem',
                    padding: '0.4rem',
                    borderColor: isSelected ? tpl.color : undefined,
                    background: isSelected ? tpl.color : undefined
                  }}
                >
                  {isSelected ? '✓ Active Template' : 'Apply Template'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
