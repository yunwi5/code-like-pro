import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ForumNav } from '../../components/forum';
import GlobalForumMain from '../../components/forum/global-forum/GlobalForumMain';
import { AppProperty } from '../../constants/app';
import useForumQuery from '../../hooks/forum/useForumQuery';
import { forumActions } from '../../store/redux/forum-slice';
import { useAppDispatch } from '../../store/redux/store';
import { toastNotify } from '../../utils/notification';

const ForumsPage: React.FC = () => {
    const navigate = useNavigate();
    // To set forum posts globally in redux
    const dispatch = useAppDispatch();

    const { posts, error } = useForumQuery();

    // If there is an error while fetching posts, redirect to the home page.
    useEffect(() => {
        if (!!error) {
            toastNotify(`Oops, something went wrong while fetching posts...`, 'error');
            navigate('/');
        }
    }, [error]);

    // Set the forum posts globally when the posts array changes.
    useEffect(() => {
        if (posts) dispatch(forumActions.setPosts(posts));
    }, [posts, dispatch]);

    // When entering a new foroum page, clear the existing sorting and searching state.
    // Can be refactored to the custom hook.
    useEffect(() => {
        dispatch(forumActions.clear());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Global Forum | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Global discussion forum, where users can browse computer science and software engieering related posts, and create their own posts.`}
                />
            </Helmet>
            <div className="min-h-[max(35rem,83.5vh)] px-3 lg:px-8 xl:px-10 2xl:px-[5%] py-10">
                <ForumNav />
                <GlobalForumMain />
            </div>
        </>
    );
};

export default ForumsPage;
