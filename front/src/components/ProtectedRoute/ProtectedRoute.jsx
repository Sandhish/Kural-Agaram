import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ adminOnly }) => {
    const { isAuthenticated, isAdmin } = useAuth();

    if (adminOnly && !isAdmin) {
        return <Navigate to="/login" replace />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
