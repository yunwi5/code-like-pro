import Link from 'next/link';
import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import { usePostCreationContext } from '../../../../store/context/PostCreationContext';
import { getForumPostLink } from '../../../../utils/links.util';
import Button from '../../../ui/buttons/Button';

const PostFormActions: React.FC = () => {
  const { saveDraft, savePost, isLoading, createdPost } = usePostCreationContext();

  return (
    <section className="flex flex-col gap-3 sm:flex-row justify-between">
      {!isLoading && !createdPost && (
        <Button onClick={saveDraft} mode="empty">
          Save Draft
        </Button>
      )}
      {!isLoading && createdPost && (
        <Link
          href={getForumPostLink(createdPost)}
          className="btn btn-empty"
          onClick={savePost}
        >
          Published Post
        </Link>
      )}
      {!isLoading && (
        <Button className="sm:ml-auto" onClick={savePost} mode="fill">
          Save Post
        </Button>
      )}
      {isLoading && (
        <div className="sm:ml-auto">
          <MoonLoader size={50} color="#5552e4" />
        </div>
      )}
    </section>
  );
};

export default PostFormActions;
