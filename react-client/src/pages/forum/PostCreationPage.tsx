import React from 'react';
import { Helmet } from 'react-helmet';
import { useSearchParams } from 'react-router-dom';
import { ForumNav } from '../../components/forum';
import PostCreationMain from '../../components/forum/post-creation/PostCreationMain';
import { AppProperty } from '../../constants/app';
import { ForumCategory, ForumCategoryList } from '../../models/enums';
import { PostCreationContextProvider } from '../../store/context/PostCreationContext';
import useAuth from '../../hooks/useAuth';

const PostCreationPage: React.FC = () => {
    useAuth();
    const [searchParams, _] = useSearchParams();
    const defaultCategory = getDefaultCategory(searchParams);

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
                <PostCreationContextProvider defaultCategory={defaultCategory}>
                    <PostCreationMain />
                </PostCreationContextProvider>
            </div>
        </>
    );
};

function getDefaultCategory(searchParams: URLSearchParams) {
    const categoryQueryString = searchParams.get('default-category');
    if (ForumCategoryList.includes(categoryQueryString as any))
        return categoryQueryString as ForumCategory;
    return undefined;
}

export default PostCreationPage;
