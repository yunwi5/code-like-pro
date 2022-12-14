import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../../store/redux/store';
import { forumActions } from '../../store/redux/forum-slice';
import useForumCategoryQuery from '../../hooks/forum/useForumCategoryQuery';
import { AppProperty } from '../../constants/app';
import { ForumCategory } from '../../models/enums';
import { toastNotify } from '../../utils/notification';
import { capitalizeString } from '../../utils/string-utils/string-manipulation';
import CategoryForumMain from '../../components/forum/category-forum/CategoryForumMain';

const ForumCategoryPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const category = params.category;
    // To set forum posts globally in redux
    const dispatch = useAppDispatch();

    const { posts, error } = useForumCategoryQuery(category as ForumCategory);

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
        else dispatch(forumActions.setLoading(true));
    }, [posts, dispatch]);

    // When entering a new foroum page, clear the existing sorting and searching state.
    // Can be refactored to the custom hook.
    useEffect(() => {
        dispatch(forumActions.clear());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>
                    {capitalizeString(category || '')} Forum | {AppProperty.APP_NAME}
                </title>
                <meta
                    name="description"
                    content={`Global discussion forum for ${category}, where users can make a post and make a comment on the post about ${category}`}
                />
            </Helmet>
            <CategoryForumMain category={category as ForumCategory} />
        </>
    );
};

export default ForumCategoryPage;
