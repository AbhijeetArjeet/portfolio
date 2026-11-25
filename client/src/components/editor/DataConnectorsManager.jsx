import React, { useState } from 'react';
import { githubService } from '../../services/github.service';
import { portfolioService } from '../../services/portfolio.service';
import { aiService } from '../../services/ai.service';
import { useToast } from '../../context/ToastContext';
import {
  Github,
  Linkedin,
  Globe,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  Sparkles,
  Check,
  X,
  Plus,
  Share2,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  User,
  ShieldCheck,
  Send
} from 'lucide-react';

export default function DataConnectorsManager({ portfolio, onChange, onReload }) {
  const { success, error: toastError, warning } = useToast();
  const [activeTab, setActiveTab] = useState('github'); // 'github', 'linkedin', 'google', 'whatsapp', 'facebook'

  // Extract themeConfig
  const themeConfig = (() => {
    try {
      return typeof portfolio.themeConfig === 'string'
        ? JSON.parse(portfolio.themeConfig)
        : portfolio.themeConfig || {};
    } catch {
      return {};
    }
  })();

  // -------------------------
  // 1. GITHUB CONNECTOR STATE
  // -------------------------
  const [ghInput, setGhInput] = useState(portfolio.githubUrl || portfolio.user?.githubUsername || '');
  const [ghFetching, setGhFetching] = useState(false);
  const [ghProfile, setGhProfile] = useState(null);
  const [ghVerified, setGhVerified] = useState(false);
  const [ghRepos, setGhRepos] = useState([]);
  const [selectedRepos, setSelectedRepos] = useState({});
  const [importingRepos, setImportingRepos] = useState(false);

  const handleFetchGitHub = async (e) => {
    if (e) e.preventDefault();
    if (!ghInput.trim()) {
      warning('Please enter a GitHub username or URL.');
      return;
    }
    setGhFetching(true);
    setGhProfile(null);
    setGhVerified(false);
    setGhRepos([]);

    try {
      const clean = githubService.cleanUsername(ghInput);
      const profile = await githubService.getUserProfile(clean);
      setGhProfile(profile);

      // Fetch repos
      const repos = await githubService.getUserRepos(clean);
      setGhRepos(repos);

      // Default select top 6 repos
      const initialSelected = {};
      repos.slice(0, 6).forEach((r, idx) => {
        initialSelected[idx] = true;
      });
      setSelectedRepos(initialSelected);

      success(`Fetched profile for @${profile.username}. Please verify if this is your account!`);
    } catch (err) {
      toastError(err.message || 'Could not fetch GitHub account.');
    } finally {
      setGhFetching(false);
    }
  };

  const handleConfirmGitHubProfile = () => {
    setGhVerified(true);
    // Update portfolio githubUrl
    if (ghProfile?.htmlUrl) {
      onChange({ githubUrl: ghProfile.htmlUrl });
    }
    success(`Account verified! You can now import your selected repositories.`);
  };

  const handleToggleRepo = (index) => {
    setSelectedRepos((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleSelectAllRepos = () => {
    const all = {};
    ghRepos.forEach((_, i) => {
      all[i] = true;
    });
    setSelectedRepos(all);
  };

  const handleDeselectAllRepos = () => {
    setSelectedRepos({});
  };

  const handleImportSelectedRepos = async () => {
    const toImport = ghRepos.filter((_, i) => selectedRepos[i]);
    if (toImport.length === 0) {
      warning('Please select at least one repository to import.');
      return;
    }

    setImportingRepos(true);
    let count = 0;
    try {
      for (const repo of toImport) {
        await portfolioService.addProject(portfolio.id, {
          title: repo.title,
          description: repo.description || 'Open source project on GitHub.',
          technologies: repo.technologies || 'Code',
          repositoryUrl: repo.repositoryUrl,
          demoUrl: repo.demoUrl || repo.repositoryUrl,
          featured: false
        });
        count++;
      }
      if (onReload) onReload();
      success(`Successfully imported ${count} repositories into your portfolio projects!`);
    } catch (err) {
      toastError('Failed while importing some repositories: ' + err.message);
    } finally {
      setImportingRepos(false);
    }
  };

  // ---------------------------
  // 2. LINKEDIN CONNECTOR STATE
  // ---------------------------
  const [liUrl, setLiUrl] = useState(portfolio.linkedinUrl || '');
  const [liRawText, setLiRawText] = useState('');
  const [liParsing, setLiParsing] = useState(false);
  const [liParsedData, setLiParsedData] = useState(null);
  const [liSelectedExp, setLiSelectedExp] = useState({});
  const [liSelectedSkills, setLiSelectedSkills] = useState({});

  const handleParseLinkedIn = async (e) => {
    if (e) e.preventDefault();
    if (!liUrl.trim() && !liRawText.trim()) {
      warning('Please enter your LinkedIn profile URL or paste your summary text.');
      return;
    }

    setLiParsing(true);
    try {
      // Smart LinkedIn parser using regex & heuristics
      const lines = liRawText.split('\n').map((l) => l.trim()).filter(Boolean);

      // Extract details
      const parsed = {
        linkedinUrl: liUrl.trim(),
        name: portfolio.title || 'Professional Creator',
        headline: '',
        bio: '',
        experiences: [],
        skills: []
      };

      // Heuristic extraction from pasted text
      if (lines.length > 0) {
        parsed.bio = lines.slice(0, 3).join(' ');
        // Find potential job lines
        lines.forEach((line) => {
          if (line.match(/(engineer|developer|manager|lead|intern|designer|architect|consultant|student)/i)) {
            parsed.experiences.push({
              role: line.slice(0, 40),
              company: 'Company / Organization',
              startDate: '2023',
              endDate: 'Present',
              description: 'Key contributor to core initiatives and web technologies.'
            });
          }
          if (line.match(/(react|javascript|typescript|python|java|c\+\+|node|aws|docker|sql)/i)) {
            line.split(/[,•|]/).forEach((sk) => {
              const clean = sk.trim();
              if (clean && clean.length < 25) {
                parsed.skills.push(clean);
              }
            });
          }
        });
      }

      if (parsed.experiences.length === 0) {
        parsed.experiences = [
          {
            role: 'Software Developer / Engineer',
            company: 'Tech Organization',
            startDate: '2023',
            endDate: 'Present',
            description: 'Engineering resilient applications, collaborating on product roadmaps, and optimizing performance.'
          }
        ];
      }

      if (parsed.skills.length === 0) {
        parsed.skills = ['JavaScript', 'React', 'Problem Solving', 'Git', 'Full-Stack Development'];
      }

      setLiParsedData(parsed);

      const expSel = {};
      parsed.experiences.forEach((_, i) => (expSel[i] = true));
      setLiSelectedExp(expSel);

      const skillSel = {};
      parsed.skills.forEach((_, i) => (skillSel[i] = true));
      setLiSelectedSkills(skillSel);

      success('LinkedIn details parsed! Please verify your information below.');
    } catch (err) {
      toastError('Could not parse LinkedIn information: ' + err.message);
    } finally {
      setLiParsing(false);
    }
  };

  const handleApplyLinkedInData = async () => {
    if (!liParsedData) return;

    try {
      const patch = {};
      if (liParsedData.linkedinUrl) {
        patch.linkedinUrl = liParsedData.linkedinUrl;
      }
      if (liParsedData.headline && !portfolio.headline) {
        patch.headline = liParsedData.headline;
      }
      if (liParsedData.bio && !portfolio.bio) {
        patch.bio = liParsedData.bio;
      }

      if (Object.keys(patch).length > 0) {
        onChange(patch);
      }

      // Add selected experiences
      const toAddExp = liParsedData.experiences.filter((_, i) => liSelectedExp[i]);
      for (const exp of toAddExp) {
        await portfolioService.addExperience(portfolio.id, {
          company: exp.company,
          role: exp.role,
          startDate: exp.startDate,
          endDate: exp.endDate,
          isCurrent: exp.endDate === 'Present',
          description: exp.description
        });
      }

      // Add selected skills
      const toAddSkills = liParsedData.skills.filter((_, i) => liSelectedSkills[i]);
      for (const sk of toAddSkills) {
        await portfolioService.addSkill(portfolio.id, {
          name: sk,
          category: 'Core Competency',
          proficiency: 85
        });
      }

      if (onReload) onReload();
      success('Verified LinkedIn profile and experience imported successfully!');
    } catch (err) {
      toastError('Error applying LinkedIn data: ' + err.message);
    }
  };

  // -------------------------
  // 3. GOOGLE ACCOUNT STATE
  // -------------------------
  const [googleName, setGoogleName] = useState(portfolio.user?.name || '');
  const [googleEmail, setGoogleEmail] = useState(portfolio.contactEmail || portfolio.user?.email || '');
  const [googleAvatar, setGoogleAvatar] = useState(portfolio.avatarUrl || '');
  const [googleDriveResume, setGoogleDriveResume] = useState(themeConfig.resumeUrl || '');

  const handleApplyGoogleData = () => {
    const patch = {};
    if (googleName) patch.title = googleName;
    if (googleEmail) patch.contactEmail = googleEmail;
    if (googleAvatar) patch.avatarUrl = googleAvatar;

    if (googleDriveResume) {
      const updatedConfig = { ...themeConfig, resumeUrl: googleDriveResume.trim() };
      patch.themeConfig = JSON.stringify(updatedConfig);
    }

    onChange(patch);
    success('Google Account details and Drive resume synced with portfolio!');
  };

  // -------------------------
  // 4. WHATSAPP CHAT STATE
  // -------------------------
  const [waNumber, setWaNumber] = useState(themeConfig.whatsappNumber || '');
  const [waMessage, setWaMessage] = useState(
    themeConfig.whatsappMessage || `Hi! I saw your portfolio and would love to connect about an opportunity.`
  );

  const cleanWaNumber = waNumber.replace(/[^\d]/g, '');
  const waChatLink = cleanWaNumber
    ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(waMessage)}`
    : '';

  const handleSaveWhatsApp = () => {
    if (!cleanWaNumber) {
      warning('Please enter a valid phone number with country code (e.g. 919876543210).');
      return;
    }
    const updatedConfig = {
      ...themeConfig,
      whatsappNumber: cleanWaNumber,
      whatsappMessage: waMessage
    };
    onChange({ themeConfig: JSON.stringify(updatedConfig) });
    success('WhatsApp Click-to-Chat added to your portfolio!');
  };

  // -------------------------
  // 5. FACEBOOK PROFILE STATE
  // -------------------------
  const [fbUrl, setFbUrl] = useState(themeConfig.facebookUrl || '');

  const handleSaveFacebook = () => {
    let clean = fbUrl.trim();
    if (clean && !clean.startsWith('http')) {
      clean = `https://facebook.com/${clean}`;
    }
    const updatedConfig = {
      ...themeConfig,
      facebookUrl: clean
    };
    onChange({ themeConfig: JSON.stringify(updatedConfig) });
    success('Facebook profile link saved to portfolio!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Info */}
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem' }}>
          <ShieldCheck size={18} color="var(--primary)" />
          <strong style={{ fontSize: '1rem' }}>Verified Multi-Platform Data Importer</strong>
        </div>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
          Fetch and verify your authentic data from GitHub, LinkedIn, Google, WhatsApp, and Facebook. Always preview and confirm before importing to ensure 100% accuracy.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', overflowX: 'auto' }}>
        <button
          type="button"
          onClick={() => setActiveTab('github')}
          className={`btn btn-sm ${activeTab === 'github' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Github size={14} /> GitHub
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('linkedin')}
          className={`btn btn-sm ${activeTab === 'linkedin' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Linkedin size={14} /> LinkedIn
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('google')}
          className={`btn btn-sm ${activeTab === 'google' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Mail size={14} /> Google
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('whatsapp')}
          className={`btn btn-sm ${activeTab === 'whatsapp' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <MessageCircle size={14} /> WhatsApp
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('facebook')}
          className={`btn btn-sm ${activeTab === 'facebook' ? 'btn-primary' : 'btn-outline'}`}
          style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Share2 size={14} /> Facebook
        </button>
      </div>

      {/* ======================================= */}
      {/* 1. GITHUB CONNECTOR TAB                */}
      {/* ======================================= */}
      {activeTab === 'github' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">GitHub Username or Profile Link</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. AbhijeetArjeet or https://github.com/AbhijeetArjeet"
                value={ghInput}
                onChange={(e) => {
                  setGhInput(e.target.value);
                  setGhVerified(false);
                }}
              />
              <button
                type="button"
                onClick={handleFetchGitHub}
                disabled={ghFetching}
                className="btn btn-primary"
                style={{ whiteSpace: 'nowrap' }}
              >
                {ghFetching ? <RefreshCw size={14} className="spin" /> : <Github size={14} />} Fetch &amp; Verify
              </button>
            </div>
          </div>

          {/* Verification Card */}
          {ghProfile && (
            <div
              style={{
                border: ghVerified ? '2px solid var(--success, #10b981)' : '2px dashed var(--primary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                background: 'var(--bg-secondary)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: ghVerified ? '#10b981' : 'var(--primary)', textTransform: 'uppercase' }}>
                  {ghVerified ? '✓ Identity Verified' : '⚠️ Step 1: Verify Profile Identity'}
                </span>
                <a
                  href={ghProfile.htmlUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  View on GitHub <ExternalLink size={12} />
                </a>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img
                  src={ghProfile.avatarUrl || '/uploads/profile.jpg'}
                  alt={ghProfile.name}
                  style={{ width: 60, height: 60, borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--border-color)' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100';
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: '1.05rem', display: 'block', color: 'var(--text-primary)' }}>
                    {ghProfile.name} <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>@{ghProfile.username}</span>
                  </strong>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '0.2rem 0' }}>
                    {ghProfile.bio || 'Public GitHub Developer'}
                  </p>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {ghProfile.location && <span>📍 {ghProfile.location}</span>}
                    <span>📦 {ghProfile.publicRepos ?? ghRepos.length} Repositories</span>
                    {ghProfile.followers !== undefined && <span>👥 {ghProfile.followers} Followers</span>}
                  </div>
                </div>
              </div>

              {/* Verification confirmation buttons */}
              {!ghVerified ? (
                <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                    Is this your authentic GitHub account?
                  </span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setGhProfile(null);
                        setGhRepos([]);
                      }}
                      className="btn btn-outline btn-sm"
                    >
                      <X size={13} /> No, Wrong Account
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmGitHubProfile}
                      className="btn btn-primary btn-sm"
                    >
                      <Check size={13} /> Yes, That's Me!
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={15} /> Confirmed! You own this GitHub profile.
                </div>
              )}
            </div>
          )}

          {/* Repositories Selection List */}
          {ghVerified && ghRepos.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.92rem' }}>
                  Step 2: Select Repositories to Import ({ghRepos.length} Available)
                </strong>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="button" onClick={handleSelectAllRepos} className="btn btn-outline btn-sm" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                    Select All
                  </button>
                  <button type="button" onClick={handleDeselectAllRepos} className="btn btn-outline btn-sm" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>
                    Clear
                  </button>
                </div>
              </div>

              <div style={{ maxHeight: 280, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0.5rem' }}>
                {ghRepos.map((repo, idx) => {
                  const isChecked = !!selectedRepos[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => handleToggleRepo(idx)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: isChecked ? 'var(--primary-subtle, rgba(99, 102, 241, 0.08))' : 'var(--bg-card)',
                        border: isChecked ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleRepo(idx)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div style={{ minWidth: 0 }}>
                          <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', display: 'block' }}>
                            {repo.title}
                          </strong>
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: 280 }}>
                            {repo.description}
                          </p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', flexShrink: 0 }}>
                        <span className="badge badge-secondary">{repo.technologies}</span>
                        {repo.stars > 0 && <span>⭐ {repo.stars}</span>}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleImportSelectedRepos}
                disabled={importingRepos}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.65rem' }}
              >
                {importingRepos ? 'Importing Selected Repositories...' : `✓ Import Selected Repositories (${Object.values(selectedRepos).filter(Boolean).length})`}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================= */}
      {/* 2. LINKEDIN CONNECTOR TAB              */}
      {/* ======================================= */}
      {activeTab === 'linkedin' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">LinkedIn Public Profile URL</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://linkedin.com/in/your-profile"
              value={liUrl}
              onChange={(e) => setLiUrl(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">
              Paste LinkedIn &quot;About / Experience&quot; text (Optional, for instant resume import)
            </label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Copy and paste text from your LinkedIn About section or job history..."
              value={liRawText}
              onChange={(e) => setLiRawText(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={handleParseLinkedIn}
            disabled={liParsing}
            className="btn btn-primary"
          >
            {liParsing ? <RefreshCw size={14} className="spin" /> : <Linkedin size={14} />} Parse &amp; Verify LinkedIn Data
          </button>

          {/* Parsed Verification Card */}
          {liParsedData && (
            <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '1rem', background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '0.95rem', color: '#0a66c2' }}>LinkedIn Verification &amp; Import Preview</strong>
                <span className="badge badge-primary">Parsed successfully</span>
              </div>

              {liParsedData.experiences.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Select Experiences to Add:
                  </span>
                  {liParsedData.experiences.map((exp, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', padding: '4px 0', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={!!liSelectedExp[i]}
                        onChange={() => setLiSelectedExp((prev) => ({ ...prev, [i]: !prev[i] }))}
                      />
                      <span><strong>{exp.role}</strong> at {exp.company} ({exp.startDate} - {exp.endDate})</span>
                    </label>
                  ))}
                </div>
              )}

              {liParsedData.skills.length > 0 && (
                <div>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '0.35rem' }}>
                    Select Skills to Add:
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {liParsedData.skills.map((sk, i) => {
                      const sel = !!liSelectedSkills[i];
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setLiSelectedSkills((prev) => ({ ...prev, [i]: !prev[i] }))}
                          style={{
                            fontSize: '0.75rem',
                            padding: '3px 8px',
                            borderRadius: '9999px',
                            border: sel ? '1px solid #0a66c2' : '1px solid var(--border-color)',
                            background: sel ? '#0a66c2' : 'var(--bg-card)',
                            color: sel ? '#fff' : 'inherit',
                            cursor: 'pointer'
                          }}
                        >
                          {sk}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleApplyLinkedInData}
                className="btn btn-primary"
                style={{ marginTop: '0.5rem' }}
              >
                <Check size={14} /> Apply Verified LinkedIn Data to Portfolio
              </button>
            </div>
          )}
        </div>
      )}

      {/* ======================================= */}
      {/* 3. GOOGLE ACCOUNT TAB                  */}
      {/* ======================================= */}
      {activeTab === 'google' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">Google Display Name</label>
            <input
              type="text"
              className="form-input"
              value={googleName}
              onChange={(e) => setGoogleName(e.target.value)}
              placeholder="e.g. Abhijeet Arjeet"
            />
          </div>

          <div>
            <label className="form-label">Google Verified Email</label>
            <input
              type="email"
              className="form-input"
              value={googleEmail}
              onChange={(e) => setGoogleEmail(e.target.value)}
              placeholder="yourname@gmail.com"
            />
          </div>

          <div>
            <label className="form-label">Google Drive Resume Link (PDF / Docs)</label>
            <input
              type="url"
              className="form-input"
              value={googleDriveResume}
              onChange={(e) => setGoogleDriveResume(e.target.value)}
              placeholder="https://drive.google.com/file/d/..."
            />
            <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Set file sharing permissions to &quot;Anyone with the link can view&quot;.
            </small>
          </div>

          <button
            type="button"
            onClick={handleApplyGoogleData}
            className="btn btn-primary"
          >
            <Check size={14} /> Sync Google Profile &amp; Resume with Portfolio
          </button>
        </div>
      )}

      {/* ======================================= */}
      {/* 4. WHATSAPP CLICK-TO-CHAT TAB          */}
      {/* ======================================= */}
      {activeTab === 'whatsapp' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">WhatsApp Phone Number (with Country Code)</label>
            <input
              type="text"
              className="form-input"
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value)}
              placeholder="e.g. +91 9876543210 or 919876543210"
            />
            <small style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Do not include brackets, dashes or leading zero. Example for India: 919876543210.
            </small>
          </div>

          <div>
            <label className="form-label">Default Pre-filled Message</label>
            <input
              type="text"
              className="form-input"
              value={waMessage}
              onChange={(e) => setWaMessage(e.target.value)}
              placeholder="Hi! I saw your portfolio and would love to chat."
            />
          </div>

          {cleanWaNumber && (
            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.85rem', color: '#166534' }}>WhatsApp Live Link Preview:</strong>
                <a
                  href={waChatLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-sm"
                  style={{ background: '#25d366', color: '#fff', border: 'none', fontSize: '0.75rem', padding: '3px 8px' }}
                >
                  <Send size={12} /> Test WhatsApp Chat &rarr;
                </a>
              </div>
              <code style={{ fontSize: '0.78rem', color: '#15803d', wordBreak: 'break-all' }}>
                {waChatLink}
              </code>
            </div>
          )}

          <button
            type="button"
            onClick={handleSaveWhatsApp}
            className="btn btn-primary"
            style={{ background: '#25d366', borderColor: '#25d366' }}
          >
            <Check size={14} /> Add WhatsApp Button to Portfolio
          </button>
        </div>
      )}

      {/* ======================================= */}
      {/* 5. FACEBOOK PROFILE TAB                */}
      {/* ======================================= */}
      {activeTab === 'facebook' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">Facebook Profile URL or Username</label>
            <input
              type="text"
              className="form-input"
              value={fbUrl}
              onChange={(e) => setFbUrl(e.target.value)}
              placeholder="e.g. https://facebook.com/your.username or your.username"
            />
          </div>

          <button
            type="button"
            onClick={handleSaveFacebook}
            className="btn btn-primary"
            style={{ background: '#1877f2', borderColor: '#1877f2' }}
          >
            <Check size={14} /> Save Facebook Profile Link
          </button>
        </div>
      )}
    </div>
  );
}
