import React from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useEffect } from 'react';

function Home() {
    const user = authService.getCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [navigate, user]);

    return (
        <div>
            <h1>Home Page</h1>
            <p>Welcome to our 3D Furniture Store!</p>
        </div>
    );
}

export default Home;