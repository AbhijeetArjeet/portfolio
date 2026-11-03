import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useToast } from '../../context/ToastContext';
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
  LayoutDashboard,
  Edit3
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { success } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    success('You have been logged out.');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

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
          onClick={closeMobileMenu}
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
          <a href="/#templates" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.92rem' }}>
            Templates
          </a>
          <a href="/#features" style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.92rem' }}>
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
                <Link to="/admin" className="btn btn-sm" style={{ background: 'var(--success-bg)', color: 'var(--success-text)', border: '1px solid var(--success-border)' }}>
                  <ShieldCheck size={14} /> Faculty Admin
                </Link>
              )}
              <Link to="/dashboard" className="btn btn-secondary btn-sm">
                Dashboard
              </Link>
              <Link to="/editor" className="btn btn-primary btn-sm">
                <Edit3 size={14} /> Editor
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-outline btn-sm"
              style={{ padding: '0.4rem', borderRadius: '50%', width: 34, height: 34 }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-outline btn-sm"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer animate-fade-in"
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            backgroundColor: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-xl)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 49
          }}
        >
          <Link
            to="/"
            onClick={closeMobileMenu}
            style={{ color: 'var(--text-primary)', fontWeight: 600, padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}
          >
            Home
          </Link>
          <a
            href="/#templates"
            onClick={closeMobileMenu}
            style={{ color: 'var(--text-secondary)', fontWeight: 500, padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}
          >
            Portfolio Templates
          </a>
          <a
            href="/#features"
            onClick={closeMobileMenu}
            style={{ color: 'var(--text-secondary)', fontWeight: 500, padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}
          >
            Features
          </a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.5rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
              Live Student Portfolios
            </span>
            <Link to="/u/abhijeet-arjeet" onClick={closeMobileMenu} style={{ color: 'var(--primary)', fontWeight: 500, fontSize: '0.9rem' }}>
              &bull; Abhijeet Arjeet (Developer Template)
            </Link>
            <Link to="/u/hritik-kumar" onClick={closeMobileMenu} style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
              &bull; Hritik Kumar (Minimal Template)
            </Link>
            <Link to="/u/dsri-sarvagna" onClick={closeMobileMenu} style={{ color: 'var(--text-secondary)', fontWeight: 500, fontSize: '0.9rem' }}>
              &bull; D. Sri Sarvagna (Creative Bento)
            </Link>
          </div>

          {isAuthenticated ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '0.5rem' }}>
              {isAdmin && (
                <Link to="/admin" onClick={closeMobileMenu} className="btn btn-sm" style={{ background: 'var(--success-bg)', color: 'var(--success-text)', border: '1px solid var(--success-border)', justifyContent: 'flex-start' }}>
                  <ShieldCheck size={16} /> Faculty Admin Portal
                </Link>
              )}
              <Link to="/dashboard" onClick={closeMobileMenu} className="btn btn-secondary btn-sm" style={{ justifyContent: 'flex-start' }}>
                <LayoutDashboard size={16} /> Dashboard
              </Link>
              <Link to="/editor" onClick={closeMobileMenu} className="btn btn-primary btn-sm" style={{ justifyContent: 'flex-start' }}>
                <Edit3 size={16} /> Visual Editor
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn btn-outline btn-sm"
                style={{ justifyContent: 'flex-start', color: 'var(--danger)' }}
              >
                <LogOut size={16} /> Sign Out ({user?.name})
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '0.5rem' }}>
              <Link to="/login" onClick={closeMobileMenu} className="btn btn-outline btn-sm" style={{ flex: 1 }}>
                Sign In
              </Link>
              <Link to="/register" onClick={closeMobileMenu} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                Create Portfolio
              </Link>
            </div>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </header>
  );
}
