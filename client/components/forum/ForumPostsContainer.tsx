'use client';
import { IForumPost } from '@/models/interfaces';
import { forumActions } from '@/store/redux/forum-slice';
import { useAppDispatch } from '@/store/redux/store';
import React, { useEffect } from 'react';

type ForumPostsContainerProps = {
  posts: IForumPost[];
  children: React.ReactNode;
};

const ForumPostsContainer = ({ posts, children }: ForumPostsContainerProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (posts) dispatch(forumActions.setPosts(posts));
  }, [posts, dispatch]);

  useEffect(() => {
    dispatch(forumActions.clear());
  }, [dispatch]);

  return <>{children}</>;
};

export default ForumPostsContainer;
