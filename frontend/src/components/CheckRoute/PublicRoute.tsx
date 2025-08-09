import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const token = localStorage.getItem('token');

    if (token) {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.role === 'admin' || user.role === 'teacher') return <Navigate to="/dashboard" replace />;
        if (user.role === 'student') return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
};

export default PublicRoute;