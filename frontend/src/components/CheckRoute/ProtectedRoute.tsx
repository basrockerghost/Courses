import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    const parsedUser = JSON.parse(user);

    if (allowedRoles && !allowedRoles.includes(parsedUser.role)) {
        if (parsedUser.role === 'admin') return <Navigate to="/dashboard" replace />;
        if (parsedUser.role === 'teacher') return <Navigate to="/homeT" replace />;
        if (parsedUser.role === 'student') return <Navigate to="/home" replace />;
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute