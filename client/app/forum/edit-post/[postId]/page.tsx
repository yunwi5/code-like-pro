import React from 'react';
import { redirect } from 'next/navigation';
import { getForumPostByIdData, getForumPostsData } from '@/apis/forum.api';
import PostCreationMain from '@/components/forum/post-creation/PostCreationMain';
import { AppProperty } from '@/constants';
import { PostCreationContextProvider } from '@/store/context/PostCreationContext';
import { getForumLink } from '@/utils/links.util';

export const metadata = {
  title: `Edit Forum Post | ${AppProperty.APP_NAME}`,
  description: `Create a new user post for ${AppProperty.APP_NAME} global discussion forum`,
};

export const revalidate = 120;

type ForumCategoryPageProps = {
  params: { postId: string };
};

export async function generateStaticParams() {
  const posts = await getForumPostsData({ catchErrors: false, authDisabled: true });

  return (posts ?? []).map((post) => ({ category: post.category, postId: post._id }));
}

async function ForumPostEditPage({ params: { postId } }: ForumCategoryPageProps) {
  const forumPost = await getForumPostByIdData(postId, {
    catchErrors: false,
    authDisabled: true,
  });
  if (forumPost == null) redirect(getForumLink());

  return (
    <PostCreationContextProvider post={forumPost}>
      <PostCreationMain />
    </PostCreationContextProvider>
  );
}

export default ForumPostEditPage;
