import React from 'react';
import { useParams } from 'react-router-dom';
import { projects } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProjectDetails = () => {
    const { id } = useParams();
    const project = projects.find(p => p.id === Number(id));

    if (!project) {
        return (
            <div className="container" style={{ padding: '2rem' }}>
                <p>Project not found.</p>
                <Link to="/library" className="btn btn-outline">
                    <ArrowLeft size={16} /> Back to Library
                </Link>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800 }}>{project.title}</h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>{project.coverImageDescription}</p>
            </div>

            {/* Image */}
            <div style={{ marginBottom: '2rem' }}>
                <img src={project.image} alt={project.title} style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} />
            </div>

            {/* Basic Info */}
            <div className="glass-panel" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                <p><strong>Department:</strong> {project.department}</p>
                <p><strong>Year:</strong> {project.year}</p>
                <p><strong>Technologies:</strong> {project.techStack.join(', ')}</p>
            </div>

            {/* Summary */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Summary</h2>
                <p>{project.summary}</p>
            </section>

            {/* Problem Statement */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Problem Statement</h2>
                <p>{project.problemStatement}</p>
            </section>

            {/* Proposed Solution */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Proposed Solution</h2>
                <p>{project.proposedSolution}</p>
            </section>

            {/* Development Stages */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Development Stages</h2>
                {project.developmentStages && project.developmentStages.map((stageObj, idx) => (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                        <h3>{stageObj.stage}</h3>
                        <p>{stageObj.description}</p>
                        {stageObj.mistakes && (
                            <ul style={{ marginTop: '0.5rem' }}>
                                {stageObj.mistakes.map((mistake, mIdx) => (
                                    <li key={mIdx}>
                                        <strong>{mistake.title}:</strong> {mistake.discovery} <em>Correction:</em> {mistake.correction}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </section>

            {/* Architecture */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Architecture / Workflow Explanation</h2>
                <p>{project.architecture}</p>
            </section>

            {/* Team */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Team Members</h2>
                <ul>
                    {project.teamMembers && project.teamMembers.map((member, i) => (
                        <li key={i}>{member}</li>
                    ))}
                </ul>
                <p><strong>Supervisor:</strong> {project.supervisor}</p>
            </section>

            {/* Downloads */}
            <section style={{ marginBottom: '2rem' }}>
                <h2>Downloadable Links</h2>
                <ul>
                    {project.downloads && project.downloads.map((dl, i) => (
                        <li key={i}>
                            <a href={dl.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginRight: '0.5rem' }}>
                                {dl.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </section>

            <Link to="/library" className="btn btn-outline" style={{ marginTop: '2rem' }}>
                <ArrowLeft size={16} /> Back to Library
            </Link>
        </div>
    );
};

export default ProjectDetails;
