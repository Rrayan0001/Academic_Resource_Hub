import React from 'react';

const Input = ({ label, id, type = 'text', className = '', ...props }) => {
    return (
        <div className={`input-group ${className}`} style={{ marginBottom: '1rem' }}>
            {label && (
                <label
                    htmlFor={id}
                    style={{
                        display: 'block',
                        marginBottom: '0.5rem',
                        fontWeight: 500,
                        color: 'var(--color-text-muted)'
                    }}
                >
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    outline: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--color-primary)';
                    e.target.style.boxShadow = '0 0 0 2px rgba(59, 130, 246, 0.2)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--color-border)';
                    e.target.style.boxShadow = 'none';
                }}
                {...props}
            />
        </div>
    );
};

export default Input;
