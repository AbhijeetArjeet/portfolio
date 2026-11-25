import React from 'react';
import { LayoutGrid, AlignJustify, Palette, Type, Check } from 'lucide-react';

export default function ThemeCustomizer({ portfolio, onChange }) {
  const currentTemplate = portfolio.templateId || 'minimal';
  const currentLayout = portfolio.layoutType || 'grid';

  const themeConfig = (() => {
    try {
      return typeof portfolio.themeConfig === 'string'
        ? JSON.parse(portfolio.themeConfig)
        : portfolio.themeConfig || {};
    } catch {
      return {};
    }
  })();

  const handleConfigChange = (key, value) => {
    const updated = { ...themeConfig, [key]: value };
    onChange({ themeConfig: JSON.stringify(updated) });
  };

  const colorPresets = [
    { name: 'Royal Blue', hex: '#2563eb' },
    { name: 'Emerald Green', hex: '#059669' },
    { name: 'Indigo Purple', hex: '#6366f1' },
    { name: 'Cyberpunk Teal', hex: '#0d9488' },
    { name: 'Sunset Amber', hex: '#d97706' },
    { name: 'Crimson Rose', hex: '#e11d48' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 1. Template Choice */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Select Portfolio Template</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Choose from 13 distinctive, fully responsive portfolio architectures. Content seamlessly transfers across templates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem' }}>
          {/* Template 1: Minimal */}
          <div
            onClick={() => onChange({ templateId: 'minimal' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'minimal' ? 'var(--primary)' : 'var(--border-color)'}`,
              background: currentTemplate === 'minimal' ? 'var(--primary-subtle)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>Minimal Professional</strong>
              {currentTemplate === 'minimal' && <Check size={16} color="var(--primary)" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Spacious typography, clean borders, executive presence.
            </p>
          </div>

          {/* Template 2: Developer */}
          <div
            onClick={() => onChange({ templateId: 'developer' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'developer' ? 'var(--primary)' : 'var(--border-color)'}`,
              background: currentTemplate === 'developer' ? 'var(--primary-subtle)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>Modern Developer</strong>
              {currentTemplate === 'developer' && <Check size={16} color="var(--primary)" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Interactive terminal, live GitHub indicators, code tags.
            </p>
          </div>

          {/* Template 3: Creative */}
          <div
            onClick={() => onChange({ templateId: 'creative' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'creative' ? 'var(--primary)' : 'var(--border-color)'}`,
              background: currentTemplate === 'creative' ? 'var(--primary-subtle)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>Creative Bento</strong>
              {currentTemplate === 'creative' && <Check size={16} color="var(--primary)" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Bento grid cards, gradient accents, media highlights.
            </p>
          </div>

          {/* Template 4: Aura Lime */}
          <div
            onClick={() => onChange({ templateId: 'aura-lime' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'aura-lime' ? '#84cc16' : 'var(--border-color)'}`,
              background: currentTemplate === 'aura-lime' ? 'rgba(132, 204, 22, 0.12)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#4d7c0f' }}>Aura Lime</strong>
              {currentTemplate === 'aura-lime' && <Check size={16} color="#84cc16" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Luminous lime aura, awards laurel, client logos, capsule CTAs.
            </p>
          </div>

          {/* Template 5: Vibrant Card */}
          <div
            onClick={() => onChange({ templateId: 'vibrant-card' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'vibrant-card' ? '#8b5cf6' : 'var(--border-color)'}`,
              background: currentTemplate === 'vibrant-card' ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#7c3aed' }}>Vibrant Pastel</strong>
              {currentTemplate === 'vibrant-card' && <Check size={16} color="#8b5cf6" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Centered floating card, purple gradient glow, framed avatar.
            </p>
          </div>

          {/* Template 6: Warm Spotlight */}
          <div
            onClick={() => onChange({ templateId: 'warm-spotlight' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'warm-spotlight' ? '#f97316' : 'var(--border-color)'}`,
              background: currentTemplate === 'warm-spotlight' ? 'rgba(249, 115, 22, 0.12)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#ea580c' }}>Warm Spotlight</strong>
              {currentTemplate === 'warm-spotlight' && <Check size={16} color="#f97316" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Dark obsidian backdrop, amber spotlight aura, bold creative titles.
            </p>
          </div>

          {/* Template 7: Cyber Neon */}
          <div
            onClick={() => onChange({ templateId: 'cyber-neon' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'cyber-neon' ? '#06b6d4' : 'var(--border-color)'}`,
              background: currentTemplate === 'cyber-neon' ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#0891b2' }}>Cyber Neon</strong>
              {currentTemplate === 'cyber-neon' && <Check size={16} color="#06b6d4" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Cyan glowing avatar ring, developer stats strip, terminal logs.
            </p>
          </div>

          {/* Template 8: Crimson Bold */}
          <div
            onClick={() => onChange({ templateId: 'crimson-bold' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'crimson-bold' ? '#ef4444' : 'var(--border-color)'}`,
              background: currentTemplate === 'crimson-bold' ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#dc2626' }}>Crimson Bold</strong>
              {currentTemplate === 'crimson-bold' && <Check size={16} color="#ef4444" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Electric scarlet red accents, dark OLED theme, impact metrics.
            </p>
          </div>

          {/* Template 9: Editorial Mono */}
          <div
            onClick={() => onChange({ templateId: 'editorial-mono' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'editorial-mono' ? '#18181b' : 'var(--border-color)'}`,
              background: currentTemplate === 'editorial-mono' ? 'rgba(24, 24, 27, 0.08)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem' }}>Editorial Mono</strong>
              {currentTemplate === 'editorial-mono' && <Check size={16} color="#18181b" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              High-fashion monochrome magazine layout, luxury typography.
            </p>
          </div>

          {/* Template 10: Brutalist Tech */}
          <div
            onClick={() => onChange({ templateId: 'brutalist-tech' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'brutalist-tech' ? '#eab308' : 'var(--border-color)'}`,
              background: currentTemplate === 'brutalist-tech' ? 'rgba(234, 179, 8, 0.15)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#a16207' }}>Brutalist Tech</strong>
              {currentTemplate === 'brutalist-tech' && <Check size={16} color="#eab308" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Industrial wireframe grid, crosshairs [ + ], neon yellow stamps.
            </p>
          </div>

          {/* Template 11: Warm Playful */}
          <div
            onClick={() => onChange({ templateId: 'warm-playful' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'warm-playful' ? '#f59e0b' : 'var(--border-color)'}`,
              background: currentTemplate === 'warm-playful' ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#b45309' }}>Warm Playful</strong>
              {currentTemplate === 'warm-playful' && <Check size={16} color="#f59e0b" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Sunny cream & yellow organic curves, friendly rounded cards.
            </p>
          </div>

          {/* Template 12: Executive CV */}
          <div
            onClick={() => onChange({ templateId: 'executive-cv' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'executive-cv' ? '#047857' : 'var(--border-color)'}`,
              background: currentTemplate === 'executive-cv' ? 'rgba(4, 120, 87, 0.12)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#065f46' }}>Executive CV</strong>
              {currentTemplate === 'executive-cv' && <Check size={16} color="#047857" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Structured 2-column dossier, emerald banner, executive summary.
            </p>
          </div>

          {/* Template 13: Glass Slate */}
          <div
            onClick={() => onChange({ templateId: 'glass-slate' })}
            style={{
              padding: '1.25rem',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${currentTemplate === 'glass-slate' ? '#6366f1' : 'var(--border-color)'}`,
              background: currentTemplate === 'glass-slate' ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-card)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong style={{ fontSize: '0.95rem', color: '#4f46e5' }}>Glass Slate</strong>
              {currentTemplate === 'glass-slate' && <Check size={16} color="#6366f1" />}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Frosted glassmorphism, glowing purple & cyan ambient lights.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Project Layout System: Grid vs Flexbox (As shown in teacher instructions / screenshot) */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>Project Layout</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Switch between responsive multi-column CSS Grid and vertical CSS Flexbox arrangement.
        </p>

        <div style={{ display: 'inline-flex', background: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={() => onChange({ layoutType: 'grid' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: currentLayout === 'grid' ? 'var(--primary)' : 'transparent',
              color: currentLayout === 'grid' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <LayoutGrid size={16} /> Grid Layout
          </button>
          <button
            type="button"
            onClick={() => onChange({ layoutType: 'flexbox' })}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0.5rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: 'none',
              background: currentLayout === 'flexbox' ? 'var(--primary)' : 'transparent',
              color: currentLayout === 'flexbox' ? '#ffffff' : 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            <AlignJustify size={16} /> Flexbox Rows
          </button>
        </div>
      </div>

      {/* 3. Primary Color Palette */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={18} /> Accent Color
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Select the primary brand color for buttons, badges, and project highlights.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {colorPresets.map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => handleConfigChange('primaryColor', c.hex)}
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                backgroundColor: c.hex,
                border: themeConfig.primaryColor === c.hex ? '3px solid #000' : '2px solid #fff',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}
              title={c.name}
            >
              {themeConfig.primaryColor === c.hex && <Check size={16} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
