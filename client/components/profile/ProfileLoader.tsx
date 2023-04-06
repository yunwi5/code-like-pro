import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const ProfileLoader = () => {
    return (
        <div className="w-full px-5 py-10 flex-center">
            <ClipLoader size={200} color="#5552e4" />
        </div>
    );
};

export default ProfileLoader;
