import React, { useState } from 'react';
import { portfolioService } from '../../services/portfolio.service';
import { Plus, Trash2 } from 'lucide-react';

export default function SkillsManager({ portfolio, onReload }) {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [proficiency, setProficiency] = useState(85);

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    try {
      await portfolioService.addSkill(portfolio.id, {
        name: skillName.trim(),
        category,
        proficiency: Number(proficiency)
      });
      setSkillName('');
      onReload();
    } catch (err) {
      alert(err.message || 'Failed to add skill.');
    }
  };

  const handleDeleteSkill = async (skillId) => {
    try {
      await portfolioService.deleteSkill(portfolio.id, skillId);
      onReload();
    } catch (err) {
      alert(err.message || 'Failed to delete skill.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Technical Expertise &amp; Skills</h3>

      {/* Add Skill Form */}
      <form onSubmit={handleAddSkill} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr auto', gap: '0.75rem', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Skill Name</label>
          <input
            type="text"
            className="form-input"
            required
            placeholder="e.g. React, C++, Docker"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Category</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Languages">Languages</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Database">Database</option>
            <option value="DevOps &amp; Tools">DevOps &amp; Tools</option>
            <option value="Systems">Systems</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Proficiency ({proficiency}%)</label>
          <input
            type="range"
            min="10"
            max="100"
            step="5"
            value={proficiency}
            onChange={(e) => setProficiency(e.target.value)}
            style={{ width: '100%', marginTop: '0.4rem' }}
          />
        </div>

        <button type="submit" className="btn btn-primary btn-sm" style={{ height: 38 }}>
          <Plus size={15} /> Add
        </button>
      </form>

      {/* Skills Badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
        {portfolio.skills && portfolio.skills.length > 0 ? (
          portfolio.skills.map((skill) => (
            <span
              key={skill.id}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem'
              }}
            >
              <strong>{skill.name}</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>({skill.proficiency}%)</span>
              <button
                type="button"
                onClick={() => handleDeleteSkill(skill.id)}
                style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex' }}
                title="Remove skill"
              >
                &times;
              </button>
            </span>
          ))
        ) : (
          <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>No skills added yet.</div>
        )}
      </div>
    </div>
  );
}
