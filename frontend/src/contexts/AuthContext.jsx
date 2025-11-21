/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, API_BASE_URL } from '../lib/api';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
    user: 'academicHub_user',
    token: 'academicHub_token',
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
    const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEYS.token));
    const [loading, setLoading] = useState(true);

    const persistSession = (nextUser, nextToken) => {
        setUser(nextUser);
        setToken(nextToken);
        localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(nextUser));
        localStorage.setItem(STORAGE_KEYS.token, nextToken);
    };

    const clearSession = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(STORAGE_KEYS.user);
        localStorage.removeItem(STORAGE_KEYS.token);
    };

    useEffect(() => {
        const bootstrapSession = async () => {
            const storedToken = localStorage.getItem(STORAGE_KEYS.token);

            if (!storedToken) {
                setLoading(false);
                return;
            }

            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

                const response = await apiFetch('/api/auth/me', {
                    headers: {
                        Authorization: `Bearer ${storedToken}`,
                    },
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error('Session expired');
                }

                const data = await response.json();
                persistSession(data.user, storedToken);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Failed to restore session:', error);
                }
                clearSession();
            } finally {
                setLoading(false);
            }
        };

        bootstrapSession();
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
