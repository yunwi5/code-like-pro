'use client';
import React, { useContext, useEffect, useState } from 'react';
import useDefaultCategory from '@/hooks/utils/useDefaultCategory';
import { patchForumPost, postForumPost } from '../../apis/forum.api';
import useLocalStorage from '../../hooks/utils/useLocalStorage';
import { ForumCategory, ForumPostType } from '../../models/enums';
import { IForumPostProps, IForumPost, IForumPostPopulated } from '../../models/interfaces';
import { toastNotify } from '../../utils/notification.util';
import useAuth from '@/hooks/utils/useAuth';

interface IPostCreationContext {
  name: string;
  setName: (name: string) => void;
  postType: ForumPostType;
  setPostType: (type: ForumPostType) => void;
  category: ForumCategory;
  setCategory: (cat: ForumCategory) => void;
  content: string;
  setContent: (content: string) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
  isLoading: boolean;
  saveDraft: () => void;
  savePost: () => void;
  createdPost: IForumPost | IForumPostPopulated | null;
}

export const PostCreationContext = React.createContext<IPostCreationContext>({
  name: '',
  setName: () => {},
  postType: ForumPostType.QUESTION,
  setPostType: () => {},
  category: ForumCategory.GENERAL,
  setCategory: () => {},
  content: '',
  setContent: () => {},
  tags: [],
  setTags: () => {},
  isLoading: false,
  saveDraft: () => {},
  savePost: () => {},
  createdPost: null,
});

export const usePostCreationContext = () => useContext(PostCreationContext);

interface Props {
  children: React.ReactNode;
  post?: IForumPost | IForumPostPopulated; // initial post (if in edit mode)
}

const DRAFT_LOCAL_STORATE_KEY = 'post_creation_draft';

export const PostCreationContextProvider: React.FC<Props> = ({ children, post: initialPost }) => {
  useAuth();
  const [name, setName] = useState(initialPost?.name ?? '');
  const [postType, setPostType] = useState<ForumPostType>(
    initialPost?.postType ?? ForumPostType.QUESTION,
  );

  const defaultCategory = useDefaultCategory();
  const [category, setCategory] = useState<ForumCategory>(
    initialPost?.category ?? defaultCategory ?? ForumCategory.GENERAL,
  );

  const draftKey = `${DRAFT_LOCAL_STORATE_KEY}${initialPost ? `-${initialPost._id}` : ''}`;
  const [postDraft, setPostDraft] = useLocalStorage<IForumPostProps | ''>(draftKey, '');
  const [content, setContent] = useState(initialPost?.content ?? '');
  const [tags, setTags] = useState<string[]>(initialPost?.tags || []);

  const [createdPost, setCreatedPost] = useState<IForumPost | IForumPostPopulated | null>(
    initialPost ?? null,
  );
  const [isLoading, setIsLoading] = useState(false);

  const createPostObject = (): IForumPostProps => ({
    name,
    postType,
    category,
    content,
    tags,
  });

  // Save currently unsaved work on post so that users do not lose their intermediate process.
  const saveDraft = () => {
    if (createdPost == null) {
      setPostDraft(createPostObject());
      toastNotify('Saved Draft Locally!', 'success');
    }
  };

  const savePost = async () => {
    const postProps = createPostObject();
    // Send HTTP Post request to create a postProps

    setIsLoading(true);
    const promise = createdPost
      ? patchForumPost(createdPost._id, postProps)
      : postForumPost(postProps);
    const { ok, data, message } = await promise;
    setIsLoading(false);

    if (ok && data) {
      toastNotify('New post published!', 'success');
      setCreatedPost(data);
      setPostDraft(''); // clear post draft, once the post is published
    } else {
      toastNotify(`Oops, ${message}`, 'error');
    }
  };

  useEffect(() => {
    if (!postDraft) return;
    if (createdPost) return;

    setName(postDraft.name);
    setPostType(postDraft.postType);
    setCategory(postDraft.category);
    setContent(postDraft.content);
    setTags(postDraft.tags);
  }, [postDraft, createdPost]);

  const value = {
    name,
    setName,
    postType,
    setPostType,
    category,
    setCategory,
    content,
    setContent,
    tags,
    setTags,
    isLoading,
    saveDraft,
    savePost,
    createdPost,
  };

  return <PostCreationContext.Provider value={value}>{children}</PostCreationContext.Provider>;
};
