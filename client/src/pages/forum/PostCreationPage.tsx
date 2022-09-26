import React from 'react';
import { Helmet } from 'react-helmet';
import { ForumNav } from '../../components/forum';
import PostCreationMain from '../../components/forum/post-creation/PostCreationMain';
import { AppProperty } from '../../constants/app';
import { PostCreationContextProvider } from '../../store/context/PostCreationContext';

/* Page for creating a new forum post */
const PostCreationPage: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Create Forum Post | {AppProperty.APP_NAME}</title>
                <meta
                    name="description"
                    content={`Create a new user post for ${AppProperty.APP_NAME} global discussion forum`}
                />
            </Helmet>
            <div className="min-h-[max(35rem,83.5vh)] px-3 lg:px-8 xl:px-10 2xl:px-[5%] pt-10 pb-14">
                <ForumNav />
                <PostCreationContextProvider>
                    <PostCreationMain />
                </PostCreationContextProvider>
            </div>
        </>
    );
};

export default PostCreationPage;
