import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Code } from 'lucide-react';
import GlowingEffect from './GlowingEffect';

const ProjectCard = ({ project }) => {
    return (
        <div
            className="glass-panel card-hover"
            style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s'
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
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
                <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(4px)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                    border: '1px solid rgba(0, 0, 0, 0.1)'
                }}>
                    {project.department}
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', lineHeight: 1.4 }}>
                    {project.title}
                </h3>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Calendar size={14} />
                        <span>{project.year}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Code size={14} />
                        <span>{project.techStack.slice(0, 2).join(', ')}</span>
                    </div>
                </div>

                <Link
                    to={`/project/${project.id}`}
                    className="btn btn-outline"
                    style={{ marginTop: 'auto', width: '100%', justifyContent: 'space-between' }}
                >
                    View Details
                    <ArrowRight size={16} />
                </Link>
            </div>
        </div>
    );
};

export default ProjectCard;
