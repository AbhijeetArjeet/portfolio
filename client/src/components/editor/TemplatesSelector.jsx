import React, { useState } from 'react';
import { Check, Sparkles, Filter } from 'lucide-react';
import { TEMPLATES_CATALOG, TEMPLATE_CATEGORIES } from '../../data/templatesCatalog';

export default function TemplatesSelector({ portfolio, onChange }) {
  const currentTemplate = portfolio.templateId || 'minimal';
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates = selectedCategory === 'All'
    ? TEMPLATES_CATALOG
    : TEMPLATES_CATALOG.filter((tpl) => tpl.categories?.includes(selectedCategory));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <Sparkles size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Choose Your Portfolio Template</h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Select from 17 designer architectures grouped by discipline. Instant live preview on the right.
        </p>
      </div>

      {/* Category Filter Pills (matching user design) */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', flexWrap: 'wrap' }}>
        {TEMPLATE_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '6px 14px',
                borderRadius: '9999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border-color)'}`,
                background: isActive ? 'var(--primary)' : 'var(--bg-secondary)',
                color: isActive ? '#ffffff' : 'var(--text-primary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Template Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1rem' }}>
        {filteredTemplates.map((tpl) => {
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
                <span style={{ fontWeight: 800, fontSize: '0.95rem', color: tpl.id === 'editorial-mono' || tpl.id === 'brutalist-tech' || tpl.id === 'split-mono' ? '#000' : (tpl.bg?.includes('#09090b') || tpl.bg?.includes('#060913') || tpl.bg?.includes('#0e0e11') || tpl.bg?.includes('#064e3b') || tpl.bg?.includes('#0d1117') || tpl.bg?.includes('#0a0b10') ? '#fff' : '#111') }}>
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

                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {tpl.categories?.map((c) => (
                    <span key={c} style={{ fontSize: '0.68rem', background: 'var(--bg-secondary)', color: 'var(--text-muted)', padding: '1px 5px', borderRadius: '4px' }}>
                      {c}
                    </span>
                  ))}
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
