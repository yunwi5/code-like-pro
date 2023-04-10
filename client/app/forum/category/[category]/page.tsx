import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getForumCategoryPostsData } from '@/apis/forum.api';
import CategoryForumPost from '@/components/forum/category-forum/CategoryForumPost';
import ForumPostsContainer from '@/components/forum/ForumPostsContainer';
import { ForumCategory, ForumCategoryList, getForumCategory } from '@/models/enums';
import { deslugify } from '@/utils/string-utils/url.util';
import { AppProperty } from '@/constants';
import { getForumPostCreateLink } from '@/utils/links.util';
import { capitalize } from '@/utils/string-utils/string-manipulation.util';

type ForumCategoryPageProps = {
  params: { category: string };
};

export async function generateMetadata({
  params: { category: categoryParam },
}: ForumCategoryPageProps) {
  const category = getForumCategory(deslugify(categoryParam));
  if (category == null) notFound();

  return {
    title: `${capitalize(category)} Forum | ${AppProperty.APP_NAME}`,
    description: `Forum page for a category ${category}, where users can browse and create posts related to the category.`,
  };
}

export const revalidate = 120;

export function generateStaticParams() {
  return ForumCategoryList.map((category) => ({ category }));
}

async function ForumCategoryPage({
  params: { category: categoryParam },
}: ForumCategoryPageProps) {
  const category = getForumCategory(deslugify(categoryParam));
  if (category == null) notFound();

  const forumPosts = await getForumCategoryPostsData(category, {
    catchErrors: false,
    authDisabled: true,
  });
  if (forumPosts == null) throw new Error('Failed to fetch forum posts data.');

  return (
    <ForumPostsContainer posts={forumPosts}>
      <CategoryForumPost>
        <DefaultContent category={category} />
      </CategoryForumPost>
    </ForumPostsContainer>
  );
}

const DefaultContent: React.FC<{ category: ForumCategory }> = ({ category }) => (
  <div className="flex-1 flex-center flex-col gap-3">
    <h2 className="text-gray-600 text-2xl capitalize">Try writing your own posts!</h2>
    <Link
      href={getForumPostCreateLink(category)}
      className="btn bg-slate-200/80 hover:bg-slate-200 text-main-500 rounded !text-xl"
    >
      Make One!
    </Link>
  </div>
);

export default ForumCategoryPage;
