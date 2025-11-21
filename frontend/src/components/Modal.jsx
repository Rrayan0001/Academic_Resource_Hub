import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import GlowingEffect from './GlowingEffect';

const Modal = ({ isOpen, onClose, title, message }) => {
    if (!isOpen) return null;

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
                    maxWidth: '400px',
                    padding: '2rem',
                    textAlign: 'center',
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
                        transition: 'color 0.2s'
                    }}
                >
                    <X size={20} />
                </button>

                <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem'
                }}>
                    <AlertCircle size={24} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>{message}</p>

                <button
                    className="btn btn-primary"
                    onClick={onClose}
                    style={{ width: '100%' }}
                >
                    Okay
                </button>
            </div>
        </div>
    );
};

export default Modal;
