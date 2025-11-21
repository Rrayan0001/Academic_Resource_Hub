import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, paddingBottom: '4rem' }}>
            {children}
        </main>
        <Footer />
    </div>
);

export default Layout;
