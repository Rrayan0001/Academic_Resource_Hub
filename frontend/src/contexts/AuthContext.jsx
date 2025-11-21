/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_KEYS = {
    user: 'academicHub_user',
    users: 'academicHub_users', // Store all registered users
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

    const login = async (email, password) => {
        // Frontend-only login - any email/password works
        try {
            const normalizedEmail = email.toLowerCase();
            
            // Check if user exists in stored users
            const storedUsers = localStorage.getItem(STORAGE_KEYS.users);
            let userData = null;
            
            if (storedUsers) {
                try {
                    const users = JSON.parse(storedUsers);
                    userData = users.find(u => u.email === normalizedEmail);
                } catch (e) {
                    console.error('Failed to parse stored users:', e);
                }
            }
            
            // If user doesn't exist, create new one with visitor role
            if (!userData) {
                userData = {
                    id: `user_${Date.now()}`,
                    name: normalizedEmail.split('@')[0],
                    email: normalizedEmail,
                    role: 'visitor', // Default role for new logins
                    createdAt: new Date().toISOString(),
                };
                
                // Save to users list
                const users = storedUsers ? JSON.parse(storedUsers) : [];
                users.push(userData);
                localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
            }

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
            const normalizedEmail = email.toLowerCase();
            
            // Check if user already exists
            const storedUsers = localStorage.getItem(STORAGE_KEYS.users);
            if (storedUsers) {
                try {
                    const users = JSON.parse(storedUsers);
                    const existing = users.find(u => u.email === normalizedEmail);
                    if (existing) {
                        return { success: false, error: 'Email already registered' };
                    }
                } catch (e) {
                    console.error('Failed to parse stored users:', e);
                }
            }
            
            const userData = {
                id: `user_${Date.now()}`,
                name: name,
                email: normalizedEmail,
                role: role || 'visitor',
                createdAt: new Date().toISOString(),
            };

            // Save to users list
            const users = storedUsers ? JSON.parse(storedUsers) : [];
            users.push(userData);
            localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));

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
