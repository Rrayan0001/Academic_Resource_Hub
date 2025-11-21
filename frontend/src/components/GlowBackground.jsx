import React from 'react';

const GlowBackground = ({ variant = 'top', className = '', style = {} }) => {
    const getPositionStyle = () => {
        switch (variant) {
            case 'top': return { top: 0 };
            case 'bottom': return { bottom: 0 };
            case 'center': return { top: '50%', transform: 'translateY(-50%)' };
            default: return { top: 0 };
        }
    };

    return (
        <div
            className={`glow-background ${className}`}
            style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                pointerEvents: 'none',
                zIndex: -1,
                ...getPositionStyle(),
                ...style
            }}
        >
            {/* Primary Glow */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: variant === 'bottom' ? 'auto' : (variant === 'center' ? '50%' : '0'),
                    bottom: variant === 'bottom' ? '0' : 'auto',
                    transform: `translate(-50%, ${variant === 'bottom' ? '50%' : (variant === 'center' ? '-50%' : '-50%')}) scale(2.5)`,
                    width: '60%',
                    height: '256px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(59, 130, 246, 0.15) 10%, rgba(255, 255, 255, 0) 60%)',
                    filter: 'blur(40px)',
                }}
            />

            {/* Secondary Glow */}
            <div
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: variant === 'bottom' ? 'auto' : (variant === 'center' ? '50%' : '0'),
                    bottom: variant === 'bottom' ? '0' : 'auto',
                    transform: `translate(-50%, ${variant === 'bottom' ? '50%' : (variant === 'center' ? '-50%' : '-50%')}) scale(2)`,
                    width: '40%',
                    height: '128px',
                    borderRadius: '50%',
                    background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.1) 10%, rgba(255, 255, 255, 0) 60%)',
                    filter: 'blur(40px)',
                }}
            />
        </div>
    );
};

export default GlowBackground;
