import {Navigate, Outlet} from 'react-router-dom';
import { useAuth } from '../provider/authProvider';

export const ProtectedRoute = () => {
    const {token} = useAuth();

    //Check if the user is authenticated
    if(!token){
        return <Navigate to = "/" />;
    }

    //If authenticated, render the child routes
    return <Outlet/>;

}