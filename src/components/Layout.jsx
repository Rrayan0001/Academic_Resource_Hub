import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AuthModal from './AuthModal';

// Create context for auth modal
export const AuthModalContext = React.createContext();

const Layout = ({ children }) => {
    const [showAuthModal, setShowAuthModal] = React.useState(false);

    return (
        <AuthModalContext.Provider value={{ showAuthModal, setShowAuthModal }}>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                <Navbar />
                <main style={{ flex: 1, paddingBottom: '4rem' }}>
                    {children}
                </main>
                <Footer />

                {/* Auth Modal - Renders on page level */}
                <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
            </div>
        </AuthModalContext.Provider>
    );
};

export default Layout;
