import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-bg-main text-text-primary p-8 text-center">
            <h1 className="text-6xl font-bold font-playfair mb-4 text-tech-blue">404</h1>
            <h2 className="text-2xl font-bold mb-8 font-inter">Object of Access Denied</h2>
            <p className="text-text-secondary mb-12 max-w-[500px]">
                The page you're looking for has been moved or doesn't exist in this judicial system.
            </p>
            <Link to="/" className="btn btn-primary">
                Return to Home
            </Link>
        </div>
    );
};

export default NotFound;
