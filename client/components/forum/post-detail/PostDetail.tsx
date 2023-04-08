import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import useForumPostQuery from '../../../hooks/forum/forum-post/useForumPostQuery';
import { toastNotify } from '../../../utils/notification.util';
import PostBody from './sections/PostBody';
import PostComments from './sections/PostComments';

/* Post browsing on the right side of the forum page */
const PostDetail: React.FC = () => {
  const router = useRouter();
  const postId = useParams().id;

  const { post, error } = useForumPostQuery(postId || '', 1000);

  useEffect(() => {
    // If there is an error, redirect to the home page.
    if (!!error) {
      router.replace('/');
      toastNotify('Somethine went wrong while loading the post...', 'error');
    }
  }, [error, router]);

  return (
    <section className="flex flex-col gap-5">
      {!post && (
        <div className="flex-center mt-[10rem]">
          <MoonLoader size={90} color="#5552e4" />
        </div>
      )}
      {post && (
        <>
          <PostBody post={post} />
          <PostComments post={post} />
        </>
      )}
    </section>
  );
};

export default PostDetail;
