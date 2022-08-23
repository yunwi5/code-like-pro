import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CreationHeader = () => {
    const navigate = useNavigate();

    return (
        <header className="flex justify-between items-center">
            <h1 className="text-3xl">Create Your Own Challenge</h1>
            <div
                onClick={() => navigate(-1)}
                className="px-3 py-2 rounded-full flex gap-3 text-xl items-center translate-y-2 transition-all hover:bg-gray-600 hover:text-gray-50 hover:shadow-lg cursor-pointer"
            >
                <FiArrowLeft size="25" /> Go Back
            </div>
        </header>
    );
};

export default CreationHeader;
