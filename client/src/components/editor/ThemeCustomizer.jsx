import React, { useState } from 'react';
import {
  LayoutGrid,
  AlignJustify,
  Palette,
  Type,
  Check,
  Dices,
  Lock,
  Unlock,
  Sparkles,
  RotateCcw
} from 'lucide-react';

export default function ThemeCustomizer({ portfolio, onChange }) {
  const currentTemplate = portfolio.templateId || 'developer';
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

  // 6 Curated Templates
  const templates = [
    { id: 'minimal', name: 'Minimalist', desc: 'Spacious typography, clean borders, executive presence.' },
    { id: 'developer', name: 'Modern Developer', desc: 'Tech terminal, live GitHub indicators, code tags.' },
    { id: 'creative', name: 'Creative Bento', desc: 'Bento grid cards, visual highlights, expressive badges.' },
    { id: 'editorial', name: 'Editorial Essayist', desc: 'Magazine typography, narrative biography, case studies.' },
    { id: 'academic', name: 'Academic Research CV', desc: 'Structured research, citations, degrees, grants.' },
    { id: 'executive', name: 'Modern Executive', desc: 'Leadership trajectory, metric counters, corporate showcase.' }
  ];

  // Refined AMOLED & Monochrome Color Presets (No heavy blues)
  const colorPresets = [
    { name: 'AMOLED Pure White', hex: '#ffffff' },
    { name: 'Obsidian Black', hex: '#18181b' },
    { name: 'Stealth Silver', hex: '#e4e4e7' },
    { name: 'Emerald Minimal', hex: '#10b981' },
    { name: 'Amber Gold', hex: '#f59e0b' },
    { name: 'Crimson Minimal', hex: '#f43f5e' },
    { name: 'Slate Gray', hex: '#71717a' }
  ];

  // Curated Typography Pairings
  const fontPairings = [
    { id: 'inter', name: 'Inter (Modern Clean Sans)' },
    { id: 'fira', name: 'Fira Code (Developer Monospace)' },
    { id: 'space', name: 'Space Grotesk (Tech Geometric)' },
    { id: 'jakarta', name: 'Plus Jakarta Sans (Friendly Executive)' },
    { id: 'playfair', name: 'Playfair Display (Editorial Serif)' }
  ];

  // -------------------------------------------------------------------
  // RANDOM PORTFOLIO DESIGN GENERATOR ("Magic Randomizer")
  // -------------------------------------------------------------------
  const [lockTemplate, setLockTemplate] = useState(false);
  const [lockColor, setLockColor] = useState(false);
  const [lockLayout, setLockLayout] = useState(false);
  const [randomNotice, setRandomNotice] = useState('');

  const generateRandomDesign = () => {
    const updates = {};
    const newConfig = { ...themeConfig };

    // 1. Random Template
    if (!lockTemplate) {
      const randomTpl = templates[Math.floor(Math.random() * templates.length)].id;
      updates.templateId = randomTpl;
    }

    // 2. Random Layout (Grid or Flexbox)
    if (!lockLayout) {
      updates.layoutType = Math.random() > 0.5 ? 'grid' : 'flexbox';
    }

    // 3. Random Color
    if (!lockColor) {
      const randomCol = colorPresets[Math.floor(Math.random() * colorPresets.length)].hex;
      newConfig.primaryColor = randomCol;
    }

    // 4. Random Font
    const randomFont = fontPairings[Math.floor(Math.random() * fontPairings.length)].id;
    newConfig.fontFamily = randomFont;

    updates.themeConfig = JSON.stringify(newConfig);
    onChange(updates);

    setRandomNotice(`Procedural AMOLED design generated! (Template: ${updates.templateId || currentTemplate}, Layout: ${updates.layoutType || currentLayout})`);
    setTimeout(() => setRandomNotice(''), 3500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Magic Randomizer Banner */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', margin: 0, color: 'var(--text-primary)' }}>
              <Dices size={20} /> Magic Randomizer &amp; Design Generator
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '0.2rem 0 0' }}>
              Procedurally synthesize a compatible, aesthetically balanced AMOLED portfolio theme.
            </p>
          </div>

          <button
            type="button"
            onClick={generateRandomDesign}
            className="btn btn-primary"
            style={{ fontWeight: 700, gap: '6px' }}
          >
            <Sparkles size={16} /> Randomize Design
          </button>
        </div>

        {/* Lock options */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={lockTemplate}
              onChange={(e) => setLockTemplate(e.target.checked)}
            />
            {lockTemplate ? <Lock size={12} /> : <Unlock size={12} />} Lock Template
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={lockColor}
              onChange={(e) => setLockColor(e.target.checked)}
            />
            {lockColor ? <Lock size={12} /> : <Unlock size={12} />} Lock Color
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={lockLayout}
              onChange={(e) => setLockLayout(e.target.checked)}
            />
            {lockLayout ? <Lock size={12} /> : <Unlock size={12} />} Lock Layout
          </label>
        </div>

        {randomNotice && (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            {randomNotice}
          </div>
        )}
      </div>

      {/* 1. Template Choice */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>Select Portfolio Template</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Choose from 6 distinctive, fully responsive portfolio architectures. Content seamlessly transfers across templates.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.85rem' }}>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => onChange({ templateId: tpl.id })}
              style={{
                padding: '1.1rem',
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${currentTemplate === tpl.id ? 'var(--text-primary)' : 'var(--border-color)'}`,
                background: currentTemplate === tpl.id ? 'var(--bg-tertiary)' : 'var(--bg-card)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <strong style={{ fontSize: '0.92rem' }}>{tpl.name}</strong>
                {currentTemplate === tpl.id && <Check size={16} color="var(--text-primary)" />}
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                {tpl.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Project Layout System: Grid vs Flexbox (CO-2 Syllabus Requirement) */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem' }}>Project Layout</h3>
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
              background: currentLayout === 'grid' ? '#ffffff' : 'transparent',
              color: currentLayout === 'grid' ? '#000000' : 'var(--text-secondary)',
              fontWeight: 700,
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
              background: currentLayout === 'flexbox' ? '#ffffff' : 'transparent',
              color: currentLayout === 'flexbox' ? '#000000' : 'var(--text-secondary)',
              fontWeight: 700,
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
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Palette size={18} /> Accent Palette (AMOLED / Monochrome)
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Select the accent color for buttons, badges, and project highlights.
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
                border: themeConfig.primaryColor === c.hex ? '3px solid #ffffff' : '1px solid #333333',
                boxShadow: 'var(--shadow-sm)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: c.hex === '#ffffff' || c.hex === '#e4e4e7' ? '#000000' : '#ffffff'
              }}
              title={c.name}
            >
              {themeConfig.primaryColor === c.hex && <Check size={16} />}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Typography System */}
      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Type size={18} /> Typography System
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Select the typography personality for headings and body content.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {fontPairings.map((f) => (
            <div
              key={f.id}
              onClick={() => handleConfigChange('fontFamily', f.id)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                border: `1px solid ${themeConfig.fontFamily === f.id ? 'var(--text-primary)' : 'var(--border-color)'}`,
                background: themeConfig.fontFamily === f.id ? 'var(--bg-tertiary)' : 'var(--bg-card)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <span style={{ fontSize: '0.84rem', fontWeight: 600 }}>{f.name}</span>
              {themeConfig.fontFamily === f.id && <Check size={14} color="var(--text-primary)" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
