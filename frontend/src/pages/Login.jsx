import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, Eye } from 'lucide-react';
import GlowingEffect from '../components/GlowingEffect';
import Input from '../components/Input';
import { useAuth } from '../contexts/AuthContext';
import { RetroGrid } from '../components/RetroGrid';

const Login = () => {
    const [mode, setMode] = useState('login'); // 'login' or 'signup'
    const [role, setRole] = useState('student');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const navigate = useNavigate();

    const roles = [
        { value: 'student', label: 'Student', icon: GraduationCap, color: '#3b82f6' },
        { value: 'teacher', label: 'Teacher', icon: Users, color: '#8b5cf6' },
        { value: 'visitor', label: 'Visitor', icon: Eye, color: '#10b981' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'signup') {
            // Validation
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                setError('All fields are required');
                return;
            }
            
            // Email domain validation removed - any email works now
            
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            const result = await signup(formData.name, formData.email, formData.password, role);
            if (result.success) {
                navigate(getLandingPage(result.user.role));
            } else {
                setError(result.error);
            }
        } else {
            // Login
            if (!formData.email || !formData.password) {
                setError('Email and password are required');
                return;
            }

            const result = await login(formData.email, formData.password);
            if (result.success) {
                navigate(getLandingPage(result.user.role));
            } else {
                setError(result.error);
            }
        }
    };

    const getLandingPage = (userRole) => {
        // Route users based on their role
        if (userRole === 'teacher') {
            return '/dashboard';
        } else if (userRole === 'student') {
            return '/library';
        } else {
            return '/library'; // visitor goes to library
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setError('');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setRole('student');
    };

    return (
        <div style={{ 
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: 'var(--color-bg)',
            overflow: 'hidden'
        }}>
            <RetroGrid />

            <div
                className="glass-panel animate-fade-in"
                style={{
                    position: 'relative',
                    zIndex: 10,
                    width: '90%',
                    maxWidth: '28rem',
                    margin: '0 auto',
                    padding: '2rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '1rem',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}
            >
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={2}
                />

                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 className="text-gradient" style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                        Academic Hub
                    </h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        {mode === 'login' ? 'Welcome back!' : 'Join our community'}
                    </p>
                </div>

                {/* Mode Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                    <button
                        onClick={() => switchMode('login')}
                        style={{
                            flex: 1,
                            paddingBottom: '0.75rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            color: mode === 'login' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            borderBottom: mode === 'login' ? '2px solid var(--color-primary)' : 'none',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            if (mode !== 'login') {
                                e.target.style.color = 'var(--color-text)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (mode !== 'login') {
                                e.target.style.color = 'var(--color-text-muted)';
                            }
                        }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => switchMode('signup')}
                        style={{
                            flex: 1,
                            paddingBottom: '0.75rem',
                            fontSize: '0.875rem',
                            fontWeight: 600,
                            transition: 'all 0.2s',
                            color: mode === 'signup' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            borderBottom: mode === 'signup' ? '2px solid var(--color-primary)' : 'none',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                            if (mode !== 'signup') {
                                e.target.style.color = 'var(--color-text)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (mode !== 'signup') {
                                e.target.style.color = 'var(--color-text-muted)';
                            }
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {mode === 'signup' && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>
                            I am a:
                        </label>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                            {roles.map((r) => {
                                const Icon = r.icon;
                                const isSelected = role === r.value;
                                return (
                                    <button
                                        key={r.value}
                                        onClick={() => setRole(r.value)}
                                        style={{
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            border: `2px solid ${isSelected ? r.color : 'var(--color-border)'}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '0.5rem',
                                            transition: 'all 0.2s',
                                            backgroundColor: isSelected ? `${r.color}15` : 'transparent',
                                            color: isSelected ? r.color : 'var(--color-text-muted)',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.borderColor = 'var(--color-primary)';
                                                e.currentTarget.style.borderColor = `${r.color}80`;
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (!isSelected) {
                                                e.currentTarget.style.borderColor = 'var(--color-border)';
                                            }
                                        }}
                                    >
                                        <Icon size={24} />
                                        <span style={{ fontSize: '0.75rem', fontWeight: 500 }}>{r.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {mode === 'signup' && (
                        <Input
                            label="Full Name"
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                        />
                    )}

                    <Input
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                    <Input
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />

                    {mode === 'signup' && (
                        <Input
                            label="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                        />
                    )}

                    {error && (
                        <div style={{
                            padding: '0.75rem',
                            marginBottom: '1rem',
                            fontSize: '0.875rem',
                            color: '#ef4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.2)',
                            borderRadius: '0.5rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', padding: '0.75rem 1rem' }}
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                {mode === 'login' && (
                    <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        Don't have an account?{' '}
                        <button
                            onClick={() => switchMode('signup')}
                            style={{
                                color: 'var(--color-primary)',
                                fontWeight: 600,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                textDecoration: 'underline'
                            }}
                        >
                            Sign up
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;
