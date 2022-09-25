import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
    const params = useParams();
    const postId = params.id;

    return <div>PostDetail {postId}</div>;
};

export default PostDetail;
