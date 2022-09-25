import React from 'react';
import { Helmet } from 'react-helmet';
import { ForumNav } from '../../components/forum';
import PostCreateMain from '../../components/forum/post-create/PostCreateMain';
import { AppProperty } from '../../constants/app';

const PostCreatePage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Create Forum Post | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Create a new user post for ${AppProperty.APP_NAME} global discussion forum`}
                />
            </Helmet>
            <div className="min-h-[max(35rem,83.5vh)] px-3 lg:px-8 xl:px-10 2xl:px-[5%] py-10">
                <ForumNav />
                <PostCreateMain />
            </div>
        </>
    );
};

export default PostCreatePage;
