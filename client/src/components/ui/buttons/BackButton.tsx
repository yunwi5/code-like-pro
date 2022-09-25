import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const BackButton: React.FC<{ className?: string }> = ({ className = '' }) => {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate(-1)}
            className={`px-3 py-2 rounded-full flex gap-3 items-center md:translate-y-2 transition-all hover:bg-gray-600 hover:text-gray-50 hover:shadow-lg ${className}`}
        >
            <FiArrowLeft size="25" />
            <span className="hidden md:inline">Go Back</span>
        </button>
    );
};

export default BackButton;
