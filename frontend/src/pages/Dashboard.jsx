import React, { useState } from 'react';
import { BarChart, PieChart, CheckCircle, XCircle, Users, FileText, TrendingUp } from 'lucide-react';
import GlowingEffect from '../components/GlowingEffect';
import { facultyStats, pendingReviews } from '../data/mockData';
import Modal from '../components/Modal';
import Button from '../components/Button';
import GlowBackground from '../components/GlowBackground';

const Dashboard = () => {
    const [modalInfo, setModalInfo] = useState({ isOpen: false, action: '' });

    const handleAction = (action) => {
        setModalInfo({ isOpen: true, action });
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem', position: 'relative' }}>
            <GlowBackground variant="top" style={{ opacity: 0.6 }} />
            <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Faculty Dashboard</h1>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: 'var(--color-primary)' }}>
                        <FileText size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Total Projects</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{facultyStats.totalProjects}</p>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', color: 'var(--color-accent)' }}>
                        <Users size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Pending Reviews</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{facultyStats.pendingReviews}</p>
                    </div>
                </div>
                <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative', overflow: 'hidden' }}>
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div style={{ padding: '1rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10B981' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Avg Rating</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700 }}>{facultyStats.avgRating}</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                {/* Pending Reviews */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Pending Reviews</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {pendingReviews.map(review => (
                            <div key={review.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '1rem',
                                background: 'rgba(0, 0, 0, 0.03)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-border)'
                            }}>
                                <div>
                                    <p style={{ fontWeight: 600 }}>{review.title}</p>
                                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>by {review.student} • {review.date}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => handleAction('Approve')}
                                        style={{ color: 'var(--color-accent-secondary)', padding: '0.5rem', borderRadius: 'var(--radius-md)', hover: { background: 'rgba(45, 212, 191, 0.1)' } }}
                                        title="Approve"
                                    >
                                        <CheckCircle size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleAction('Reject')}
                                        style={{ color: '#ef4444', padding: '0.5rem', borderRadius: 'var(--radius-md)', hover: { background: 'rgba(239, 68, 68, 0.1)' } }}
                                        title="Reject"
                                    >
                                        <XCircle size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mock Charts (Visual Representation using CSS) */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Department Distribution</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {facultyStats.departments.map(dept => (
                            <div key={dept.name}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
                                    <span>{dept.name}</span>
                                    <span>{dept.count}</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: 'rgba(0, 0, 0, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                    <div style={{
                                        width: `${(dept.count / 50) * 100}%`,
                                        height: '100%',
                                        background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
                                        borderRadius: '4px'
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalInfo.isOpen}
                onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
                title="Demo Mode: Backend Disconnected"
                message={`Action "${modalInfo.action}" simulated. Backend review system not connected.`}
            />
        </div>
    );
};

export default Dashboard;
