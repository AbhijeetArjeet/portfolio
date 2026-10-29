import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Sparkles,
  Sun,
  Moon,
  ShieldCheck,
  User,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Layers,
  Building2,
  Lock
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
        backdropFilter: 'blur(12px)',
        height: 'var(--header-height)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            color: 'var(--text-primary)',
            fontWeight: 800,
            fontSize: '1.25rem',
            fontFamily: 'var(--font-heading)'
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: '8px',
              backgroundColor: '#18181b',
              border: '1px solid #27272a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Sparkles size={18} />
          </div>
          <span>Portfolio<span style={{ color: '#a1a1aa' }}>Forge</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem'
          }}
          className="desktop-nav"
        >
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: 500, fontSize: '0.9rem' }}>
            Home
          </Link>

          {/* Module Badges / Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--bg-card)', padding: '3px 10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <Link
              to="/dashboard"
              style={{
                fontSize: '0.8rem',
                color: location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/editor') ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Student & Creator Module"
            >
              <User size={13} /> User Module
            </Link>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <Link
              to="/admin"
              style={{
                fontSize: '0.8rem',
                color: location.pathname === '/admin' ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Faculty Evaluation & Admin Module"
            >
              <ShieldCheck size={13} /> Admin Module
            </Link>
            <span style={{ color: 'var(--border-color)' }}>|</span>
            <Link
              to="/u/abhijeet-arjeet"
              style={{
                fontSize: '0.8rem',
                color: location.pathname.startsWith('/u/') ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Organisation Read-Only Viewer Link"
            >
              <Building2 size={13} /> Org View
            </Link>
          </div>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.4rem', borderRadius: '50%', width: 34, height: 34 }}
            title={`Switch to ${theme === 'light' ? 'AMOLED Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Auth State Controls */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              {isAdmin && (
                <Link to="/admin" className="btn btn-sm" style={{ background: '#18181b', color: '#f4f4f5', border: '1px solid #27272a' }}>
                  <ShieldCheck size={14} /> Evaluator Portal
                </Link>
              )}
              <Link to="/dashboard" className="btn btn-secondary btn-sm">
                Dashboard
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
                title="Log Out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Link to="/login" className="btn btn-outline btn-sm">
                Sign In
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu toggle */}
        <div style={{ display: 'none' }} className="mobile-toggle">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-outline btn-sm"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{ padding: '1rem', background: 'var(--bg-primary)', borderBottom: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>User Module (Dashboard)</Link>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin Module (Portal)</Link>
          <Link to="/u/abhijeet-arjeet" onClick={() => setMobileMenuOpen(false)}>Organisation View</Link>
          {isAuthenticated ? (
            <button type="button" onClick={handleLogout} className="btn btn-danger btn-sm">Log Out</button>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline btn-sm">Sign In</Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
