import React from 'react';
import { Helmet } from 'react-helmet';
import { Outlet, useParams } from 'react-router-dom';
import { ForumNav } from '../../components/forum';
import { AppProperty } from '../../constants/app';

const ForumCategoryPage: React.FC = () => {
    const params = useParams();
    const category = params.category;
    const postId = params.id;

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
                <main>
                    <aside>ForumCategoryPage Main</aside>
                    <section>
                        {!postId && <div>Want to write your own post?</div>}
                        {postId && <Outlet />}
                    </section>
                </main>
            </div>
        </>
    );
};

export default ForumCategoryPage;
