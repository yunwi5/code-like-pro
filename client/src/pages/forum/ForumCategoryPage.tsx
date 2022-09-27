import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../../store/redux/store';
import useForumCategoryQuery from '../../hooks/forum-queries/useForumCategoryQuery';
import ForumPostsSidebar from '../../components/forum/sidebar/ForumPostsSidebar';
import { ForumNav } from '../../components/forum';
import { AppProperty } from '../../constants/app';
import { ForumCategory } from '../../models/enums';
import { getForumPostCreateLink } from '../../utils/links';
import { toastNotify } from '../../utils/notification';
import { forumActions } from '../../store/redux/forum-slice';

const ForumCategoryPage: React.FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const category = params.category;
    const postId = params.id;
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
                    {category} Forum | {AppProperty.APP_NAME}
                </title>
                <meta
                    name="description"
                    content={`Global discussion forum for ${category}, where users can make a post and make a comment on the post about ${category}`}
                />
            </Helmet>
            <div className="min-h-[max(35rem,83.5vh)] px-3 lg:px-8 xl:px-10 2xl:px-[5%] py-10">
                <ForumNav />
                <main className="flex gap-5 justify-around min-h-[82.5vh]">
                    <ForumPostsSidebar />
                    <section className="card min-h-[82.5vh] flex flex-col grow bg-gray-50">
                        {!postId && (
                            <DefaultContent category={category as ForumCategory} />
                        )}
                        {postId && <Outlet />}
                    </section>
                </main>
            </div>
        </>
    );
};

const DefaultContent: React.FC<{ category: ForumCategory }> = ({ category }) => (
    <div className="flex-1 flex-center flex-col gap-3">
        <h2 className="text-gray-600 text-2xl capitalize">Try writing your own posts!</h2>
        <Link
            to={getForumPostCreateLink(category)}
            className="btn bg-slate-200/80 hover:bg-slate-200 text-main-500 rounded !text-xl"
        >
            Make One!
        </Link>
    </div>
);

export default ForumCategoryPage;
