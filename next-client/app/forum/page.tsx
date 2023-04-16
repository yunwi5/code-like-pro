import { getForumPostsData } from '@/apis/forum.api';
import ForumPostsContainer from '@/components/forum/ForumPostsContainer';
import GlobalForum from '@/components/forum/global-forum/GlobalForum';
import { AppProperty } from '@/constants';

export const metadata = {
  title: `Global Forum | ${AppProperty.APP_NAME}`,
  description:
    'Global discussion forum, where users can browse computer science and software engieering related posts, and create their own posts.',
};

export const revalidate = 60;

async function ForumPage() {
  const forumPosts = await getForumPostsData({ catchErrors: false, authDisabled: true });
  if (forumPosts == null) throw new Error('Failed to fetch forum posts data.');

  return (
    <ForumPostsContainer posts={forumPosts}>
      <GlobalForum />
    </ForumPostsContainer>
  );
}

export default ForumPage;
