import { useQueryClient } from '@tanstack/react-query';
import { IForumPost, IForumPostPopulated, IVote } from '../../../models/interfaces';
import { deleteForumPostVote, postForumPostVote } from '../../../apis/forum.api';
import { getForumPostKey, getForumPostsQueryKey } from '../keys';

function useForumPostMutation({ _id: postId, category }: IForumPostPopulated) {
  const queryClient = useQueryClient();
  const postQueryKey = getForumPostKey(postId);
  const forumPostsQueryKey = getForumPostsQueryKey(category);

  const updateCommentVotes = async (newVotes: IVote[]) => {
    // Update individual post
    queryClient.setQueryData(
      [postQueryKey],
      (oldPostData: { data: IForumPostPopulated } | undefined) => {
        if (!oldPostData) return oldPostData;

        const newPost: IForumPostPopulated = {
          ...oldPostData.data,
          votes: newVotes,
        };
        return { ...oldPostData, data: newPost };
      },
    );

    // Update category posts
    queryClient.setQueryData([forumPostsQueryKey], (oldPostList: IForumPost[] | undefined) => {
      if (!oldPostList) return oldPostList;

      const newPostList = [...oldPostList];
      const postIndex = newPostList.findIndex((p) => p._id === postId);
      if (postIndex < 0) return oldPostList;

      const newPost: IForumPost = {
        ...newPostList[postIndex],
        votes: newVotes,
      };

      newPostList[postIndex] = newPost;
      return newPostList;
    });

    refetchPost();
    refetchCategoryPosts();
  };

  const postVote = async (type: 'up' | 'down') => {
    const { data: updatedPost } = await postForumPostVote(postId, { type });
    if (!updatedPost) return;
    updateCommentVotes(updatedPost.votes);
  };

  const deleteVote = async () => {
    const { data: updatedPost } = await deleteForumPostVote(postId);
    if (!updatedPost) return;
    updateCommentVotes(updatedPost.votes);
  };

  const refetchPost = () => queryClient.refetchQueries([postQueryKey]);

  const refetchCategoryPosts = () => queryClient.refetchQueries([forumPostsQueryKey]);

  return { postVote, deleteVote };
}

export default useForumPostMutation;
