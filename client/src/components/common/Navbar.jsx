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
  Layers
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
        backdropFilter: 'blur(8px)',
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
              backgroundColor: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <Sparkles size={18} />
          </div>
          <span>Portfolio<span style={{ color: 'var(--primary)' }}>Forge</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.75rem'
          }}
          className="desktop-nav"
        >
          <Link to="/" style={{ color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 500, fontSize: '0.92rem' }}>
            Home
          </Link>
          <a href="#templates" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.92rem' }}>
            Templates
          </a>
          <a href="#features" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.92rem' }}>
            Features
          </a>
          <Link to="/u/abhijeet-arjeet" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Live Example <ExternalLink size={13} />
          </Link>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.4rem', borderRadius: '50%', width: 34, height: 34 }}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* Auth State Controls */}
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {isAdmin && (
                <Link to="/admin" className="btn btn-sm" style={{ background: '#ecfdf5', color: '#047857', border: '1px solid #a7f3d0' }}>
                  <ShieldCheck size={14} /> Faculty Admin
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
                Create Portfolio
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

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
