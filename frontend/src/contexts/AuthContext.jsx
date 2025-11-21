/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
    user: 'academicHub_user',
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem(STORAGE_KEYS.user);
        if (!storedUser) {
            return null;
        }

        try {
            return JSON.parse(storedUser);
        } catch (error) {
            console.error('Failed to parse stored user:', error);
            localStorage.removeItem(STORAGE_KEYS.user);
            return null;
        }
    });
    const [loading, setLoading] = useState(false);

    const persistSession = (nextUser) => {
        setUser(nextUser);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));
    };

    const clearSession = () => {
        setUser(null);
        localStorage.removeItem(STORAGE_KEYS.user);
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    const login = async (email, password, role = 'visitor') => {
        // Frontend-only login - any email/password works
        try {
            // Generate a simple user object
            const userData = {
                id: `user_${Date.now()}`,
                name: email.split('@')[0], // Use email prefix as name
                email: email.toLowerCase(),
                role: role || 'visitor', // Use selected role
                createdAt: new Date().toISOString(),
            };

            persistSession(userData);
            return { success: true, user: userData };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Login failed' };
        }
    };

    const signup = async (name, email, password, role) => {
        // Frontend-only signup - any email/password works
        try {
            const userData = {
                id: `user_${Date.now()}`,
                name: name,
                email: email.toLowerCase(),
                role: role || 'visitor',
                createdAt: new Date().toISOString(),
            };

            persistSession(userData);
            return { success: true, user: userData };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Signup failed' };
        }
    };

    const logout = () => {
        clearSession();
    };

    const value = {
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        isStudent: user?.role === 'student',
        isTeacher: user?.role === 'teacher',
        isVisitor: user?.role === 'visitor'
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
