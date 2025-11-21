import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            borderTop: '1px solid var(--color-border)',
            marginTop: '6rem',
            padding: '2rem 0',
            backgroundColor: 'var(--color-bg-secondary)'
        }}>
            <div className="container" style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
                <p>&copy; {new Date().getFullYear()} Academic Resource Hub. All rights reserved.</p>
                <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                    Designed for students and faculty to collaborate and innovate.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
