import React from 'react';

import PostCreationMain from '@/components/forum/post-creation/PostCreationMain';
import { AppProperty } from '@/constants';
import { PostCreationContextProvider } from '@/store/context/PostCreationContext';

export const metadata = {
  title: `Create Forum Post | ${AppProperty.APP_NAME}`,
  description: `Create a new user post for ${AppProperty.APP_NAME} global discussion forum`,
};

async function ForumPostCreationPage() {
  return (
    <PostCreationContextProvider>
      <PostCreationMain />
    </PostCreationContextProvider>
  );
}

export default ForumPostCreationPage;
