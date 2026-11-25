import React from 'react';
import {
  FileText,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Code2,
  Globe,
  Github,
  Linkedin,
  Download
} from 'lucide-react';

export default function SocialAndResumeBar({ portfolio, style = {} }) {
  if (!portfolio) return null;

  const themeConfig = (() => {
    try {
      return typeof portfolio.themeConfig === 'string'
        ? JSON.parse(portfolio.themeConfig)
        : portfolio.themeConfig || {};
    } catch {
      return {};
    }
  })();

  const hasSocials =
    themeConfig.resumeUrl ||
    themeConfig.instagramUrl ||
    themeConfig.facebookUrl ||
    themeConfig.twitterUrl ||
    themeConfig.youtubeUrl ||
    themeConfig.leetcodeUrl ||
    themeConfig.dribbbleUrl ||
    portfolio.githubUrl ||
    portfolio.linkedinUrl;

  if (!hasSocials) return null;

  return (
    <div
      className="modern-social-resume-bar"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '0.65rem',
        marginTop: '1.25rem',
        ...style
      }}
    >
      {/* Resume Download Button */}
      {themeConfig.resumeUrl && (
        <a
          href={themeConfig.resumeUrl}
          target="_blank"
          rel="noreferrer"
          download
          className="btn btn-sm"
          style={{
            background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
            color: '#ffffff',
            fontWeight: 700,
            border: 'none',
            borderRadius: '9999px',
            padding: '0.5rem 1.15rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            textDecoration: 'none',
            boxShadow: '0 2px 8px rgba(16, 185, 129, 0.35)',
            fontSize: '0.85rem'
          }}
        >
          <FileText size={15} /> Download Resume
        </a>
      )}

      {/* Social Profiles */}
      {portfolio.githubUrl && (
        <a
          href={portfolio.githubUrl}
          target="_blank"
          rel="noreferrer"
          title="GitHub"
          style={socialIconStyle('#24292e')}
        >
          <Github size={15} />
        </a>
      )}

      {portfolio.linkedinUrl && (
        <a
          href={portfolio.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          title="LinkedIn"
          style={socialIconStyle('#0a66c2')}
        >
          <Linkedin size={15} />
        </a>
      )}

      {themeConfig.instagramUrl && (
        <a
          href={themeConfig.instagramUrl}
          target="_blank"
          rel="noreferrer"
          title="Instagram"
          style={socialIconStyle('#e1306c')}
        >
          <Instagram size={15} />
        </a>
      )}

      {themeConfig.facebookUrl && (
        <a
          href={themeConfig.facebookUrl}
          target="_blank"
          rel="noreferrer"
          title="Facebook"
          style={socialIconStyle('#1877f2')}
        >
          <Facebook size={15} />
        </a>
      )}

      {themeConfig.twitterUrl && (
        <a
          href={themeConfig.twitterUrl}
          target="_blank"
          rel="noreferrer"
          title="Twitter / X"
          style={socialIconStyle('#1da1f2')}
        >
          <Twitter size={15} />
        </a>
      )}

      {themeConfig.youtubeUrl && (
        <a
          href={themeConfig.youtubeUrl}
          target="_blank"
          rel="noreferrer"
          title="YouTube"
          style={socialIconStyle('#ff0000')}
        >
          <Youtube size={15} />
        </a>
      )}

      {themeConfig.leetcodeUrl && (
        <a
          href={themeConfig.leetcodeUrl}
          target="_blank"
          rel="noreferrer"
          title="LeetCode"
          style={socialIconStyle('#f59e0b')}
        >
          <Code2 size={15} />
        </a>
      )}

      {themeConfig.dribbbleUrl && (
        <a
          href={themeConfig.dribbbleUrl}
          target="_blank"
          rel="noreferrer"
          title="Dribbble / Portfolio"
          style={socialIconStyle('#ea4c89')}
        >
          <Globe size={15} />
        </a>
      )}
    </div>
  );
}

function socialIconStyle(accentColor) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.9)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    color: accentColor,
    textDecoration: 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
  };
}
