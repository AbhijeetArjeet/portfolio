import React, { useState } from 'react';
import { aiService } from '../../services/ai.service';
import { useToast } from '../../context/ToastContext';
import {
  Sparkles,
  Key,
  X,
  Check,
  ArrowRight,
  Bot,
  Zap,
  Info,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

export default function AiPortfolioModal({ isOpen, onClose, onApplyPortfolio }) {
  const { success, error: toastError } = useToast();
  const [apiKey, setApiKey] = useState(aiService.getApiKey());
  const [showKeyInput, setShowKeyInput] = useState(!aiService.getApiKey());
  const [userPrompt, setUserPrompt] = useState('');
  const [style, setStyle] = useState('auto');
  const [generating, setGenerating] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);

  if (!isOpen) return null;

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    aiService.setApiKey(apiKey);
    success('Google Gemini API Key saved locally!');
    setShowKeyInput(false);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!userPrompt.trim()) return;

    setGenerating(true);
    setGeneratedResult(null);

    try {
      const result = await aiService.generateFullPortfolio(userPrompt, style);
      setGeneratedResult(result);
      success(`Generated full portfolio via ${result.source}!`);
    } catch (err) {
      toastError(err.message || 'Failed to generate portfolio.');
    } finally {
      setGenerating(false);
    }
  };

  const handleApply = () => {
    if (!generatedResult) return;
    onApplyPortfolio(generatedResult);
    success('Portfolio updated with AI generated content!');
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: 680,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '2rem',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>AI Magic Portfolio Builder</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Powered by Google Gemini 1.5 Flash (1M Context Window)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* API Key Configuration Pill */}
        <div style={{ marginBottom: '1.25rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.75rem 1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
              <Key size={14} color="var(--primary)" />
              <span>
                Gemini API Key:{' '}
                <strong>{aiService.getApiKey() ? '••••••••' + aiService.getApiKey().slice(-4) : 'Not configured (using smart fallback)'}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowKeyInput(!showKeyInput)}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.75rem', padding: '2px 8px' }}
            >
              {showKeyInput ? 'Close' : 'Change Key'}
            </button>
          </div>

          {showKeyInput && (
            <div style={{ marginTop: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="password"
                  className="form-input"
                  style={{ flex: 1, fontSize: '0.82rem' }}
                  placeholder="Paste your Gemini API key (AIzaSy...)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <button type="button" onClick={handleSaveApiKey} className="btn btn-primary btn-sm">
                  Save Key
                </button>
              </div>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem', margin: '4px 0 0' }}>
                💡 Don&apos;t have a key? Get one for free at{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                  Google AI Studio <ExternalLink size={10} />
                </a>{' '}
                (100% free with student or Google account, 15 RPM, 1M context window).
              </p>
            </div>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {!generatedResult ? (
            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">
                  Tell AI about yourself (or paste your resume notes) *
                </label>
                <textarea
                  className="form-textarea"
                  rows={5}
                  required
                  placeholder="e.g. I am a 3rd year CS student at university. I build full stack React and Node.js applications, love Python, built a low-latency USB display utility and an AI transcription platform. I want a dark developer portfolio with projects and skills..."
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                  <label style={{ fontWeight: 600 }}>Design Vibe:</label>
                  <select
                    className="form-input"
                    style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                  >
                    <option value="auto">Auto-detect Best</option>
                    <option value="developer">Developer &amp; Tech (Cyber Neon)</option>
                    <option value="creative">Creative &amp; Design (Aura Lime)</option>
                    <option value="executive">Executive &amp; Corporate (Emerald CV)</option>
                    <option value="minimal">Minimal &amp; Clean (Swiss Mono)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={generating || !userPrompt.trim()}
                  className="btn btn-primary"
                  style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Sparkles size={16} />
                  {generating ? 'Generating Portfolio...' : 'Generate Full Portfolio'}
                </button>
              </div>
            </form>
          ) : (
            /* Review & Apply Generated Result */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={13} /> Generated via {generatedResult.source}
                </span>
                <button
                  type="button"
                  onClick={() => setGeneratedResult(null)}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.78rem' }}
                >
                  <RefreshCw size={12} /> Re-generate
                </button>
              </div>

              {/* Preview Cards */}
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-primary)' }}>
                  {generatedResult.title}
                </strong>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, display: 'block', marginBottom: '0.5rem' }}>
                  {generatedResult.headline}
                </span>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  {generatedResult.bio?.slice(0, 180)}...
                </p>
                <div style={{ marginTop: '0.75rem', fontSize: '0.78rem', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span className="badge badge-primary">Template: {generatedResult.templateId}</span>
                  <span className="badge badge-secondary">{generatedResult.projects?.length || 0} Projects</span>
                  <span className="badge badge-secondary">{generatedResult.skills?.length || 0} Skills</span>
                  <span className="badge badge-secondary">{generatedResult.experience?.length || 0} Positions</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setGeneratedResult(null)} className="btn btn-outline">
                  Back
                </button>
                <button type="button" onClick={handleApply} className="btn btn-primary">
                  <Check size={16} /> Apply to My Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
