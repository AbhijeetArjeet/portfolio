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
          Choose from 3 distinctive, fully responsive portfolio architectures. Content seamlessly transfers across templates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {/* Template A: Minimal */}
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

          {/* Template B: Developer */}
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

          {/* Template C: Creative */}
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
