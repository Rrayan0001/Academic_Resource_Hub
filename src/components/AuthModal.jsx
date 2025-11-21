import React, { useState } from 'react';
import { X, GraduationCap, Users, Eye } from 'lucide-react';
import GlowingEffect from './GlowingEffect';
import Input from './Input';
import { useAuth } from '../contexts/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
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

    if (!isOpen) return null;

    const roles = [
        { value: 'student', label: 'Student', icon: GraduationCap, color: '#3b82f6' },
        { value: 'teacher', label: 'Teacher', icon: Users, color: '#8b5cf6' },
        { value: 'visitor', label: 'Visitor', icon: Eye, color: '#10b981' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (mode === 'signup') {
            // Validation
            if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
                setError('All fields are required');
                return;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (formData.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }

            const result = signup(formData.name, formData.email, formData.password, role);
            if (result.success) {
                onClose();
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            } else {
                setError(result.error);
            }
        } else {
            // Login
            if (!formData.email || !formData.password) {
                setError('Email and password are required');
                return;
            }

            const result = login(formData.email, formData.password, role);
            if (result.success) {
                onClose();
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            } else {
                setError(result.error);
            }
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
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        }}>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    backdropFilter: 'blur(4px)'
                }}
                onClick={onClose}
            />

            <div
                className="glass-panel animate-fade-in"
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '480px',
                    padding: '2rem',
                    border: '1px solid rgba(0, 0, 0, 0.1)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    overflow: 'hidden'
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

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        color: 'var(--color-text-muted)',
                        transition: 'color 0.2s',
                        zIndex: 10
                    }}
                >
                    <X size={20} />
                </button>

                {/* Mode Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '2rem',
                    borderBottom: '2px solid var(--color-border)'
                }}>
                    <button
                        onClick={() => switchMode('login')}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: mode === 'login' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            borderBottom: mode === 'login' ? '2px solid var(--color-primary)' : 'none',
                            marginBottom: '-2px',
                            transition: 'all 0.2s'
                        }}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => switchMode('signup')}
                        style={{
                            flex: 1,
                            padding: '0.75rem',
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: mode === 'signup' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            borderBottom: mode === 'signup' ? '2px solid var(--color-primary)' : 'none',
                            marginBottom: '-2px',
                            transition: 'all 0.2s'
                        }}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Role Selection */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{
                        display: 'block',
                        marginBottom: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--color-text)'
                    }}>
                        I am a:
                    </label>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '0.75rem'
                    }}>
                        {roles.map((r) => {
                            const Icon = r.icon;
                            const isSelected = role === r.value;
                            return (
                                <button
                                    key={r.value}
                                    onClick={() => setRole(r.value)}
                                    style={{
                                        padding: '1rem 0.5rem',
                                        borderRadius: 'var(--radius-md)',
                                        border: `2px solid ${isSelected ? r.color : 'var(--color-border)'}`,
                                        backgroundColor: isSelected ? `${r.color}15` : 'transparent',
                                        color: isSelected ? r.color : 'var(--color-text)',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s',
                                        fontWeight: isSelected ? 600 : 500,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    <Icon size={24} />
                                    {r.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
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
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            border: '1px solid rgba(239, 68, 68, 0.3)',
                            borderRadius: 'var(--radius-md)',
                            color: '#dc2626',
                            fontSize: '0.875rem'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '0.5rem' }}
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                {mode === 'login' && (
                    <p style={{
                        marginTop: '1.5rem',
                        textAlign: 'center',
                        color: 'var(--color-text-muted)',
                        fontSize: '0.875rem'
                    }}>
                        Don't have an account?{' '}
                        <button
                            onClick={() => switchMode('signup')}
                            style={{
                                color: 'var(--color-primary)',
                                fontWeight: 600,
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

export default AuthModal;
