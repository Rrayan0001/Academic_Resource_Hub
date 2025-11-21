import React from 'react';
import GlowBackground from '../components/GlowBackground';
import { MatrixText } from '../components/MatrixText';

const Home = () => {
    const [animationKey, setAnimationKey] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setAnimationKey(prev => prev + 1);
        }, 20000); // Repeat animation every 20 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Section - Full Page Centered */}
            <section style={{
                minHeight: 'calc(100vh - 200px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '2rem'
            }}>
                {/* Background Glow */}
                <GlowBackground variant="center" />

                <div className="container" style={{
                    textAlign: 'center',
                    maxWidth: '1000px'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                        fontWeight: 800,
                        lineHeight: 1.3,
                        letterSpacing: '-0.02em',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                        alignItems: 'center'
                    }}>
                        <MatrixText
                            key={`line1-${animationKey}`}
                            text="Where Knowledge Meets"
                            initialDelay={200}
                            letterAnimationDuration={500}
                            letterInterval={100}
                        />
                        <MatrixText
                            key={`line2-${animationKey}`}
                            text="Innovation,"
                            initialDelay={2500}
                            letterAnimationDuration={500}
                            letterInterval={100}
                        />
                        <MatrixText
                            key={`line3-${animationKey}`}
                            text="and Learning Never Stops."
                            initialDelay={5000}
                            letterAnimationDuration={500}
                            letterInterval={100}
                        />
                    </h1>

                    <p style={{
                        marginTop: '2rem',
                        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                        color: 'var(--color-text-muted)',
                        maxWidth: '700px',
                        margin: '2rem auto 0',
                        lineHeight: 1.6
                    }}>
                        A collaborative platform where students showcase their projects,
                        share knowledge, and inspire the next generation of innovators.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;

