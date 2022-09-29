import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../store/context/UserContext';

function useAuth() {
    const navigate = useNavigate();
    const { user, isLoading } = useUserContext();
    const isLoggedIn = !!user;

    // // If the user is not logged in, redirect to the login page.
    useEffect(() => {
        if (!isLoading && !isLoggedIn) navigate('/login');
    }, [isLoggedIn, isLoading]);

    return { user };
}

export default useAuth;
