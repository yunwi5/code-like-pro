import React from 'react';
import { IoMdCreate } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { getForumPostCreateLink } from '../../../../utils/links';
import Button from '../../../ui/buttons/Button';
import Searchbar from '../../../ui/inputs/Searchbar';

const ForumPostsControl: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col gap-3 px-2 py-2 pb-4 border-b-2 border-gray-300">
            <div className="flex justify-between gap-3">
                <button className="text-main-500">Newest</button>
                <button className="text-gray-500">Most Votes</button>
                <Button
                    onClick={() => navigate(getForumPostCreateLink())}
                    mode="empty"
                    className="ml-auto !border-transparent !shadow-none flex-center gap-1"
                    size="small"
                >
                    <IoMdCreate /> New Post
                </Button>
            </div>
            <Searchbar searchKeys={['Title']} />
        </div>
    );
};

export default ForumPostsControl;
