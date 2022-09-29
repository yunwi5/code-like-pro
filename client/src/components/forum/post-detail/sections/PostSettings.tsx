import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteForumPost } from '../../../../apis/forum';
import { IForumPostPopulated } from '../../../../models/interfaces';
import { getForumPostEditLink } from '../../../../utils/links';
import { toastNotify } from '../../../../utils/notification';
import SettingsButton from '../../../ui/buttons/SettingsButton';
import DeleteModal from '../../../ui/modals/variations/DeleteModal';

// Post edit and deleting settings for post author control
const PostSettings: React.FC<{ post: IForumPostPopulated }> = ({ post }) => {
    const navigate = useNavigate();

    // State for poping up the delete modal for the delete action.
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    if (!post) return null;

    const handleDeleteAction = () => {
        navigate('/browse');
        toastNotify(`Successfully delete post ${post.name}`);
    };

    return (
        <>
            <SettingsButton
                className="ml-auto"
                onEdit={() => navigate(getForumPostEditLink(post?._id))}
                onDelete={() => setShowDeleteModal(true)}
            />

            {/* Show delete warning modal if the user clicks the delete action */}
            {showDeleteModal && (
                <DeleteModal
                    onClose={() => setShowDeleteModal(false)}
                    deleteFunction={deleteForumPost.bind(null, post._id)}
                    onDelete={handleDeleteAction}
                    item={`Forum Post ${post.name}`}
                />
            )}
        </>
    );
};

export default PostSettings;
