import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../hooks/useAuthContext';
import { clientRoutes } from '../environments/clientRoutes.js';

export const RouteGuardPublic = ({ children }) => {
    const { isLoggedIn } = useAuthContext();

    if (isLoggedIn) {                                                                                   // If the user is logged in and wants to go where 
        return <Navigate to={clientRoutes.catalog} replace={true} />;                                   // they shouldn't be logged in, redirect to /catalog (login, register)
    }

    return children ? children : <Outlet />;
}; 