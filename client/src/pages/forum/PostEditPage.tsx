import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';

import { ForumNav } from '../../components/forum';
import PostCreationMain from '../../components/forum/post-creation/PostCreationMain';
import { AppProperty } from '../../constants/app';
import useForumPostQuery from '../../hooks/forum-queries/useForumPostQuery';
import { PostCreationContextProvider } from '../../store/context/PostCreationContext';
import { toastNotify } from '../../utils/notification';

/* Page for editing an existing forum post written by the current user. */
const PostEditPage: React.FC = () => {
    const navigate = useNavigate();
    const postId = useParams().id;

    const { post, error } = useForumPostQuery(postId || '');

    useEffect(() => {
        // If there is an error, redirect to the home page.
        if (!!error || !postId) {
            toastNotify(`Oops, something went wrong while loading your post...`, 'error');
            navigate('/');
        }
    }, [error, postId, navigate]);

    return (
        <>
            <Helmet>
                <title>Edit Forum Post | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Create a new user post for ${AppProperty.APP_NAME} global discussion forum`}
                />
            </Helmet>
            <div className="min-h-[max(35rem,83.5vh)] px-3 lg:px-8 xl:px-10 2xl:px-[5%] pt-10 pb-14">
                <ForumNav />
                {!post && (
                    <div className="mt-[20vh] flex-center">
                        <MoonLoader size={150} color="#5552e4" />{' '}
                    </div>
                )}
                {post && (
                    <PostCreationContextProvider post={post}>
                        <PostCreationMain />
                    </PostCreationContextProvider>
                )}
            </div>
        </>
    );
};

export default PostEditPage;
