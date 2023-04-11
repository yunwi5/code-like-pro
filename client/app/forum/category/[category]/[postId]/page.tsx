import React from 'react';
import { notFound } from 'next/navigation';
import {
  getForumCategoryPostsData,
  getForumPostByIdData,
  getForumPostsData,
} from '@/apis/forum.api';
import CategoryForumPost from '@/components/forum/category-forum/CategoryForumPost';
import ForumPostsContainer from '@/components/forum/ForumPostsContainer';
import { getForumCategory } from '@/models/enums';
import { deslugify } from '@/utils/string-utils/url.util';
import { AppProperty } from '@/constants';
import PostDetail from '@/components/forum/post-detail/PostDetail';

type ForumCategoryPageProps = {
  params: { category: string; postId: string };
};

export async function generateMetadata({ params: { postId } }: ForumCategoryPageProps) {
  const post = await getForumPostByIdData(postId, {
    catchErrors: false,
    authDisabled: true,
  });

  if (post == null) notFound();

  return {
    title: `${post.name} | ${AppProperty.APP_NAME}`,
    description: `Forum post ${post.name}, where users can browse and create posts related to the category.`,
  };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getForumPostsData({ catchErrors: false, authDisabled: true });

  return (posts ?? []).map((post) => ({ category: post.category, postId: post._id }));
}

async function ForumCategoryPostPage({
  params: { category: categoryParam, postId },
}: ForumCategoryPageProps) {
  const category = getForumCategory(deslugify(categoryParam));
  if (category == null) notFound();

  const [forumPosts, currentPost] = await Promise.all([
    getForumCategoryPostsData(category, {
      catchErrors: false,
      authDisabled: true,
    }),
    getForumPostByIdData(postId, {
      catchErrors: false,
      authDisabled: true,
    }),
  ]);
  if (forumPosts == null) throw new Error('Failed to fetch forum posts data.');
  if (currentPost == null) notFound();

  return (
    <ForumPostsContainer posts={forumPosts} category={category}>
      <CategoryForumPost>
        <PostDetail post={currentPost} />
      </CategoryForumPost>
    </ForumPostsContainer>
  );
}

export default ForumCategoryPostPage;
