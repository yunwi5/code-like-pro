import { lazy } from 'react';
export { default as ForumNav } from './ForumNav';

const PostDetail = lazy(() => import('./post-detail/PostDetail'));
export default { PostDetail };
