'use client';
import React, { useEffect } from 'react';
import useForumPostsQuery from '@/hooks/forum/useForumPostsQuery';
import { ForumCategory } from '@/models/enums';
import { IForumPost } from '@/models/interfaces';
import { forumActions } from '@/store/redux/forum-slice';
import { useAppDispatch } from '@/store/redux/store';

type ForumPostsContainerProps = {
  posts: IForumPost[];
  children: React.ReactNode;
  category?: ForumCategory;
};

const ForumPostsContainer = ({
  posts: initialPostsData,
  category,
  children,
}: ForumPostsContainerProps) => {
  const dispatch = useAppDispatch();

  const { posts = initialPostsData } = useForumPostsQuery({
    category,
    refetchInterval: 2000,
  });

  useEffect(() => {
    if (posts) dispatch(forumActions.setPosts(posts));
  }, [posts, dispatch]);

  useEffect(() => {
    dispatch(forumActions.clear());
  }, [dispatch]);

  return <>{children}</>;
};

export default ForumPostsContainer;
