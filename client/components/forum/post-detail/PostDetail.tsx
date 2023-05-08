'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { IForumPostPopulated } from '@/models/interfaces';

import useForumPostQuery from '../../../hooks/forum/forum-post/useForumPostQuery';
import { toastNotify } from '../../../utils/notification.util';

import PostBody from './sections/PostBody';
import PostComments from './sections/PostComments';

type PostDetailProps = {
  post: IForumPostPopulated;
};

const PostDetail: React.FC<PostDetailProps> = ({ post: initialPostData }) => {
  const router = useRouter();

  const { post = initialPostData, error } = useForumPostQuery(initialPostData._id, 1000);

  useEffect(() => {
    if (error) {
      router.replace('/');
      toastNotify('Somethine went wrong while loading the post...', 'error');
    }
  }, [error, router]);

  return (
    <section className="flex flex-col gap-5">
      <PostBody post={post} />
      <PostComments post={post} />
    </section>
  );
};

export default PostDetail;
