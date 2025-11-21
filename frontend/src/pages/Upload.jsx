import React, { useState } from 'react';
import { Upload as UploadIcon, FileText, Github } from 'lucide-react';
import Input from '../components/Input';
import Button from '../components/Button';
import Modal from '../components/Modal';

const Upload = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem 1rem', maxWidth: '800px' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Upload Project</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Share your engineering masterpiece with the world.</p>
            </div>

            <div className="glass-panel" style={{ padding: '2rem' }}>
                <form onSubmit={handleSubmit}>
                    <Input label="Project Title" id="title" placeholder="e.g., Autonomous Drone Navigation" required />

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>
                            Description
                        </label>
                        <textarea
                            rows="4"
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                border: '1px solid var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-text)',
                                outline: 'none',
                                fontFamily: 'inherit'
                            }}
                            placeholder="Describe your project..."
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <Input label="Department" id="department" placeholder="e.g., Computer Science" required />
                        <Input label="Year" id="year" placeholder="e.g., 2024" required />
                    </div>

                    <Input label="Tech Stack (comma separated)" id="tech" placeholder="e.g., React, Python, AWS" required />

                    <Input label="GitHub Repository URL" id="github" placeholder="https://github.com/username/repo" icon={Github} />

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, color: 'var(--color-text-muted)' }}>
                            Project Files
                        </label>
                        <div style={{
                            border: '2px dashed var(--color-border)',
                            borderRadius: 'var(--radius-lg)',
                            padding: '2rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            transition: 'border-color 0.2s'
                        }}
                            className="hover:border-primary"
                        >
                            <UploadIcon size={32} style={{ margin: '0 auto 1rem', color: 'var(--color-text-muted)' }} />
                            <p style={{ fontWeight: 500 }}>Click to upload or drag and drop</p>
                            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>PDF, JPG, PNG (Max 10MB)</p>
                        </div>
                    </div>

                    <Button type="submit" size="lg" style={{ width: '100%' }}>
                        Submit Project
                    </Button>
                </form>
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Demo Mode: Backend Disconnected"
                message="Your frontend is working perfectly! Backend connection is not available in this demo. No files were actually uploaded."
            />
        </div>
    );
};

export default Upload;
