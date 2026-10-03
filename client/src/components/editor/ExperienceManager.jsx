import React, { useState } from 'react';
import { portfolioService } from '../../services/portfolio.service';
import { Plus, Trash2, Briefcase, GraduationCap } from 'lucide-react';

export default function ExperienceManager({ portfolio, onReload }) {
  const [expCompany, setExpCompany] = useState('');
  const [expRole, setExpRole] = useState('');
  const [expStart, setExpStart] = useState('');
  const [expEnd, setExpEnd] = useState('');
  const [expDesc, setExpDesc] = useState('');

  const [eduInst, setEduInst] = useState('');
  const [eduDegree, setEduDegree] = useState('');
  const [eduStart, setEduStart] = useState('');
  const [eduEnd, setEduEnd] = useState('');
  const [eduDesc, setEduDesc] = useState('');

  const handleAddExperience = async (e) => {
    e.preventDefault();
    if (!expCompany || !expRole) return;
    try {
      await portfolioService.addExperience(portfolio.id, {
        company: expCompany,
        role: expRole,
        startDate: expStart,
        endDate: expEnd,
        description: expDesc
      });
      setExpCompany('');
      setExpRole('');
      setExpStart('');
      setExpEnd('');
      setExpDesc('');
      onReload();
    } catch (err) {
      alert(err.message || 'Failed to add experience.');
    }
  };

  const handleAddEducation = async (e) => {
    e.preventDefault();
    if (!eduInst || !eduDegree) return;
    try {
      await portfolioService.addEducation(portfolio.id, {
        institution: eduInst,
        degree: eduDegree,
        startDate: eduStart,
        endDate: eduEnd,
        description: eduDesc
      });
      setEduInst('');
      setEduDegree('');
      setEduStart('');
      setEduEnd('');
      setEduDesc('');
      onReload();
    } catch (err) {
      alert(err.message || 'Failed to add education.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Experience */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Briefcase size={18} /> Experience &amp; Positions
        </h3>

        <form onSubmit={handleAddExperience} className="card" style={{ background: 'var(--bg-secondary)', marginBottom: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input
              type="text"
              className="form-input"
              required
              placeholder="Role / Title (e.g. Lead Systems Architect)"
              value={expRole}
              onChange={(e) => setExpRole(e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              required
              placeholder="Company / Organization (e.g. Smart India Hackathon)"
              value={expCompany}
              onChange={(e) => setExpCompany(e.target.value)}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Start Date (e.g. Aug 2024)"
              value={expStart}
              onChange={(e) => setExpStart(e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              placeholder="End Date (e.g. Present or Dec 2024)"
              value={expEnd}
              onChange={(e) => setExpEnd(e.target.value)}
            />
          </div>
          <textarea
            className="form-textarea"
            rows={2}
            placeholder="Brief description of contributions and achievements..."
            value={expDesc}
            onChange={(e) => setExpDesc(e.target.value)}
            style={{ marginBottom: '0.75rem' }}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={14} /> Add Experience
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {portfolio.experience?.map((exp) => (
            <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong>{exp.role}</strong> &bull; {exp.company}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{exp.startDate} - {exp.endDate}</div>
              </div>
              <button
                type="button"
                onClick={async () => { await portfolioService.deleteExperience(portfolio.id, exp.id); onReload(); }}
                className="btn btn-outline btn-sm"
                style={{ color: 'var(--danger)', padding: '2px 6px' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <GraduationCap size={18} /> Academic History &amp; Education
        </h3>

        <form onSubmit={handleAddEducation} className="card" style={{ background: 'var(--bg-secondary)', marginBottom: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input
              type="text"
              className="form-input"
              required
              placeholder="Degree (e.g. B.Tech Computer Science)"
              value={eduDegree}
              onChange={(e) => setEduDegree(e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              required
              placeholder="Institution (e.g. Engineering College)"
              value={eduInst}
              onChange={(e) => setEduInst(e.target.value)}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Start Year (e.g. 2022)"
              value={eduStart}
              onChange={(e) => setEduStart(e.target.value)}
            />
            <input
              type="text"
              className="form-input"
              placeholder="End Year (e.g. 2026)"
              value={eduEnd}
              onChange={(e) => setEduEnd(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={14} /> Add Education
          </button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {portfolio.education?.map((edu) => (
            <div key={edu.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <div>
                <strong>{edu.degree}</strong> &bull; {edu.institution}
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{edu.startDate} - {edu.endDate}</div>
              </div>
              <button
                type="button"
                onClick={async () => { await portfolioService.deleteEducation(portfolio.id, edu.id); onReload(); }}
                className="btn btn-outline btn-sm"
                style={{ color: 'var(--danger)', padding: '2px 6px' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
