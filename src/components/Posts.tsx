import React from 'react';
import Comments from './Comments';

interface PostProps {
    postId: number;
}

const Posts: React.FC<PostProps> = ({postId}) => {
   

    return (
        <div>
            <Comments postId={postId} />
        </div>
    );
};


export default Posts;