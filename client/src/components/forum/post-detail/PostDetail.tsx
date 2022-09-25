import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import useForumPostQuery from '../../../hooks/forum-queries/useForumPostQuery';
import { toastNotify } from '../../../utils/notification';
import PostCard from './sections/PostCard';
import PostComments from './sections/PostComments';

const PostDetail: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const postId = params.id;

    const { post, error } = useForumPostQuery(postId || '', 1000);

    useEffect(() => {
        if (!!error) {
            navigate('/');
            toastNotify('Somethine went wrong while loading the post...', 'error');
        }
    }, [error, navigate]);

    return (
        <section className="flex flex-col gap-5">
            {!post && (
                <div className="flex-center mt-[10rem]">
                    <MoonLoader size={90} color="#5552e4" />
                </div>
            )}
            {post && (
                <>
                    <PostCard post={post} />
                    <PostComments post={post} />
                </>
            )}
        </section>
    );
};

export default PostDetail;
