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

    // No need to bootstrap session - user is already loaded from localStorage
    useEffect(() => {
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiFetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Login failed' };
            }

            persistSession(data.user, data.token);
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, error: 'Network error' };
        }
    };

    const signup = async (name, email, password, role) => {
        try {
            const response = await apiFetch('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify({ name, email, password, role }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error || 'Signup failed' };
            }

            persistSession(data.user, data.token);
            return { success: true, user: data.user };
        } catch (error) {
            console.error('Signup error:', error);
            return { success: false, error: 'Network error' };
        }
    };

    const logout = () => {
        clearSession();
    };

    const value = {
        user,
        token,
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
