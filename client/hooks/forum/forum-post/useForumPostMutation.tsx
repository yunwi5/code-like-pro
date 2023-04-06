import { useQueryClient } from '@tanstack/react-query';
import { IForumPost, IForumPostPopulated, IVote } from '../../../models/interfaces';
import { deleteForumPostVote, postForumPostVote } from '../../../apis/forum.api';
import { getForumPostCategoryKey, getForumPostKey } from '../keys';

function useForumPostMutation({ _id: postId, category }: IForumPostPopulated) {
    const queryClient = useQueryClient();
    const postQueryKey = getForumPostKey(postId);
    const postCategoryQueryKey = getForumPostCategoryKey(category);

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

        // Update specific post item in the category posts
        queryClient.setQueryData(
            [postCategoryQueryKey],
            (oldPostListData: { data: IForumPost[] } | undefined) => {
                if (!oldPostListData) return oldPostListData;

                const newPostList = [...oldPostListData.data];
                const postIndex = newPostList.findIndex((p) => p._id === postId);
                if (postIndex < 0) return oldPostListData;

                const newPost: IForumPost = {
                    ...newPostList[postIndex],
                    votes: newVotes,
                };

                newPostList[postIndex] = newPost;
                return { ...oldPostListData, data: newPostList };
            },
        );

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

    const refetchCategoryPosts = () => queryClient.refetchQueries([postCategoryQueryKey]);

    return { postVote, deleteVote };
}

export default useForumPostMutation;
