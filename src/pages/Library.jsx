import React, { useState } from 'react';
import { Search, Filter, Sparkles } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/mockData';
import { MatrixText } from '../components/MatrixText';

const Library = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDept, setSelectedDept] = useState('All');

    const departments = ['All', ...new Set(projects.map(p => p.department))];

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesDept = selectedDept === 'All' || project.department === selectedDept;
        return matchesSearch && matchesDept;
    });

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Content Wrapper */}
            <div style={{ position: 'relative', zIndex: 1 }}>

                {/* Hero Section - Title Only */}
                <section style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    paddingBottom: '15vh' // Shift content up slightly
                }}>
                    {/* Matrix Animated Title */}
                    <div className="hero-title" style={{
                        fontSize: 'clamp(4rem, 15vw, 12rem)',
                        fontWeight: 800,
                        lineHeight: 1,
                        textAlign: 'center'
                    }}>
                        <MatrixText
                            text="PROJECTS"
                            initialDelay={200}
                            letterAnimationDuration={800}
                            className="text-gradient"
                        />
                    </div>
                </section>

                {/* Scrollable Content Section */}
                <section className="container" style={{
                    padding: '4rem 1rem 6rem',
                    position: 'relative',
                    minHeight: '100vh'
                }}>
                    {/* Subtitle & Search Header */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginBottom: '4rem'
                    }}>
                        <p style={{
                            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                            color: 'var(--color-text-muted)',
                            textAlign: 'center',
                            maxWidth: '600px',
                            marginBottom: '3rem'
                        }}>
                            Explore innovative student engineering projects
                        </p>

                        {/* Aesthetic Search Bar */}
                        <div style={{
                            width: '100%',
                            maxWidth: '800px',
                            position: 'relative'
                        }}>
                            <div className="glass-panel" style={{
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-full)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.5)'
                            }}>
                                <div style={{
                                    padding: '0.75rem',
                                    borderRadius: '50%',
                                    background: 'var(--color-accent)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Search size={20} />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Search for projects, topics, or technologies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        flex: 1,
                                        border: 'none',
                                        background: 'transparent',
                                        fontSize: '1.1rem',
                                        color: 'var(--color-text)',
                                        outline: 'none',
                                        padding: '0.5rem'
                                    }}
                                />

                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        style={{
                                            padding: '0.5rem',
                                            color: 'var(--color-text-muted)',
                                            background: 'transparent',
                                            border: 'none',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                            {/* Department Filters */}
                            <div style={{
                                display: 'flex',
                                gap: '0.75rem',
                                overflowX: 'auto',
                                padding: '1.5rem 0.5rem',
                                justifyContent: 'center',
                                flexWrap: 'wrap'
                            }}>
                                {departments.map(dept => (
                                    <button
                                        key={dept}
                                        onClick={() => setSelectedDept(dept)}
                                        className="glass-panel"
                                        style={{
                                            padding: '0.5rem 1.25rem',
                                            borderRadius: 'var(--radius-full)',
                                            border: '1px solid',
                                            borderColor: selectedDept === dept ? 'var(--color-accent)' : 'transparent',
                                            backgroundColor: selectedDept === dept ? 'rgba(59, 130, 246, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                                            color: selectedDept === dept ? 'var(--color-accent)' : 'var(--color-text-muted)',
                                            fontSize: '0.9rem',
                                            fontWeight: 500,
                                            cursor: 'pointer',
                                            transition: 'all 0.2s',
                                            whiteSpace: 'nowrap'
                                        }}
                                    >
                                        {dept}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {filteredProjects.length > 0 ? (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                            gap: '2.5rem'
                        }}>
                            {filteredProjects.map(project => (
                                <div key={project.id} style={{ backdropFilter: 'blur(4px)' }}>
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-panel" style={{
                            textAlign: 'center',
                            padding: '4rem',
                            color: 'var(--color-text-muted)',
                            borderRadius: 'var(--radius-lg)'
                        }}>
                            <Sparkles size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ fontSize: '1.25rem' }}>No projects found matching your criteria.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedDept('All'); }}
                                style={{
                                    marginTop: '1rem',
                                    color: 'var(--color-accent)',
                                    background: 'none',
                                    border: 'none',
                                    textDecoration: 'underline',
                                    cursor: 'pointer'
                                }}
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Library;

