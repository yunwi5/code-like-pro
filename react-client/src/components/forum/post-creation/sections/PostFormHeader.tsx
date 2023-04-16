import React from 'react';
import { IoCreate } from 'react-icons/io5';
import BackButton from '../../../ui/buttons/BackButton';

const PostFormHeader: React.FC = React.memo(() => {
    return (
        <header className="flex justify-between items-center">
            <h1 className="flex-start gap-2 text-2xl lg:text-3xl text-gray-600">
                <IoCreate className="text-main-400 text-[1.2em]" /> Create{' '}
                <span className="hidden md:inline">Your Own</span> Post!
            </h1>
            {/* Button to go back to previous page */}
            <BackButton className="text-xl" />
        </header>
    );
});

export default PostFormHeader;
