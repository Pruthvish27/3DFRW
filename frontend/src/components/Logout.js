import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        authService.logout();
        navigate('/login'); // Redirect to login page after logout
    }, [navigate]);

    return (
        <div>
            <h1>Logging Out...</h1>
        </div>
    );
}

export default Logout;