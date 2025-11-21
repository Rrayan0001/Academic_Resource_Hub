import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('academicHub_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Failed to parse stored user:', error);
                localStorage.removeItem('academicHub_user');
            }
        }
        setLoading(false);
    }, []);

    const login = (email, password, role) => {
        // In a real app, this would make an API call
        // For now, we'll simulate authentication
        const storedUsers = JSON.parse(localStorage.getItem('academicHub_users') || '[]');
        const foundUser = storedUsers.find(
            u => u.email === email && u.password === password && u.role === role
        );

        if (foundUser) {
            const userWithoutPassword = { ...foundUser };
            delete userWithoutPassword.password;
            setUser(userWithoutPassword);
            localStorage.setItem('academicHub_user', JSON.stringify(userWithoutPassword));
            return { success: true };
        }

        return { success: false, error: 'Invalid credentials' };
    };

    const signup = (name, email, password, role) => {
        // In a real app, this would make an API call
        const storedUsers = JSON.parse(localStorage.getItem('academicHub_users') || '[]');

        // Check if user already exists
        if (storedUsers.find(u => u.email === email)) {
            return { success: false, error: 'User already exists' };
        }

        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In real app, this would be hashed on backend
            role,
            createdAt: new Date().toISOString()
        };

        storedUsers.push(newUser);
        localStorage.setItem('academicHub_users', JSON.stringify(storedUsers));

        // Auto-login after signup
        const userWithoutPassword = { ...newUser };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        localStorage.setItem('academicHub_user', JSON.stringify(userWithoutPassword));

        return { success: true };
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('academicHub_user');
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
