import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Upload, LayoutDashboard, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/library', label: 'Library', icon: BookOpen, roles: ['visitor', 'student', 'teacher'] },
    { path: '/upload', label: 'Upload', icon: Upload, roles: ['student', 'teacher'] },
    { path: '/dashboard', label: 'Faculty', icon: LayoutDashboard, roles: ['teacher'] },
  ];

  const visibleLinks = user
    ? navLinks.filter((link) => !link.roles || link.roles.includes(user.role))
    : navLinks.filter((link) => link.path === '/library');

  const [isHovered, setIsHovered] = React.useState(false);

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'student': return '#3b82f6';
      case 'teacher': return '#8b5cf6';
      case 'visitor': return '#10b981';
      default: return '#6b7280';
    }
  };

  const landingPath = () => {
    if (!user) return '/';
    return '/home'; // Logo always goes to landing page for authenticated users
  };

  return (
    <nav
      className="glass-panel"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'sticky',
        top: '1rem',
        zIndex: 50,
        marginBottom: '2rem',
        borderRadius: 'var(--radius-full)',
        padding: '0.5rem 1rem',
        maxWidth: isHovered ? '900px' : '220px',
        marginLeft: 'auto',
        marginRight: 'auto',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
        width: '100%'
      }}>
        <Link to={landingPath()} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 'bold', fontSize: '1.25rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: 'white', fontSize: '1.2rem' }}>A</span>
          </div>
          <span className="text-gradient">AcademicHub</span>
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            alignItems: 'center',
            opacity: isHovered ? 1 : 0,
            visibility: isHovered ? 'visible' : 'hidden',
            transform: isHovered ? 'translateX(0)' : 'translateX(-20px)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            pointerEvents: isHovered ? 'auto' : 'none'
          }}
          className="desktop-nav-items"
        >
          {visibleLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text)',
                fontWeight: isActive(link.path) ? 600 : 500,
                fontSize: '0.95rem',
                transition: 'all 0.2s',
                textDecoration: 'none'
              }}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = 'var(--color-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.color = 'var(--color-text)';
                }
              }}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}

          {/* Auth Section */}
          {isAuthenticated ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              border: '1px solid var(--color-border)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${getRoleBadgeColor(user?.role)}, var(--color-accent))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, lineHeight: 1 }}>
                    {user?.name}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: getRoleBadgeColor(user?.role),
                    fontWeight: 500,
                    lineHeight: 1,
                    textTransform: 'capitalize'
                  }}>
                    {user?.role}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                style={{
                  padding: '0.5rem',
                  borderRadius: '50%',
                  color: 'var(--color-text-muted)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.color = '#dc2626';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              className="btn btn-primary"
              style={{ padding: '0.5rem 1.5rem', borderRadius: 'var(--radius-full)' }}
              to="/"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          style={{ display: 'none', color: 'var(--color-text)' }}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          right: '0',
          marginTop: '0.5rem',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          borderRadius: 'var(--radius-lg)'
        }}>
          {visibleLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isActive(link.path) ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: isActive(link.path) ? 'var(--color-primary)' : 'var(--color-text)'
              }}
            >
              <link.icon size={20} />
              {link.label}
            </Link>
          ))}
        </div>
      )}
      <style>{`
        @media (min-width: 768px) {
          .mobile-toggle { display: none !important; }
        }
        @media (max-width: 767px) {
          .desktop-nav-items { display: none !important; }
          .mobile-toggle { display: block !important; }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
