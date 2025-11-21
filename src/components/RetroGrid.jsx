import React from 'react';

export function RetroGrid({
    className = '',
    angle = 70,
}) {
    return (
        <div
            className={`pointer-events-none absolute size-full overflow-hidden opacity-70 ${className}`}
            style={{
                perspective: '500px',
                '--grid-angle': `${angle}deg`
            }}
        >
            {/* Grid */}
            <div
                className="absolute inset-0"
                style={{ transform: 'rotateX(var(--grid-angle))' }}
            >
                <div
                    className="animate-grid"
                    style={{
                        backgroundRepeat: 'repeat',
                        backgroundSize: '60px 60px',
                        height: '300vh',
                        inset: '0% 0px',
                        marginLeft: '-50%',
                        transformOrigin: '100% 0 0',
                        width: '600vw',
                        backgroundImage: 'linear-gradient(to right, rgba(59, 130, 246, 0.4) 1px, transparent 0), linear-gradient(to bottom, rgba(59, 130, 246, 0.4) 1px, transparent 0)'
                    }}
                />
            </div>

            {/* Background Gradient */}
            <div
                className="absolute inset-0"
                style={{
                    background: 'linear-gradient(to top, rgba(255, 255, 255, 0.8) 0%, transparent 60%)'
                }}
            />
        </div>
    );
}
