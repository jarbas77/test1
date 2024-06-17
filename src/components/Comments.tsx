import React, { useEffect, useState } from 'react';
import { useParams, } from 'react-router-dom';
import { fetchComments, createComment, updateComment, deleteComment } from '../api';

interface Comment {
    id: number;
    title: string;
    body: string;
}

interface CommentsProps {
    postId: number;
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({ title: '', body: '' });
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const params = useParams<{ postId: string }>();

    const effectivePostId = postId || Number(params.postId);

    useEffect(() => {
        if (effectivePostId) {
            fetchComments(effectivePostId)
                .then(setComments);
        }
    }, [effectivePostId]);

    const handleCreateComment = () => {
        if (!isNaN(effectivePostId)) {
            createComment(effectivePostId, newComment)
                .then((comment) => {
                    setComments([...comments, comment]);
                    setNewComment({ title: '', body: '' });
                });
        }
    };

    const handleUpdateComment = (commentId: number) => {
        if (!editingComment) return;
        updateComment(commentId, editingComment)
            .then((updatedComment) => {
                setComments(comments.map(comment => (comment.id === commentId ? updatedComment : comment)));
                setEditingComment(null);
            });
    };

    const handleDeleteComment = (commentId: number) => {
        deleteComment(commentId)
            .then(() => {
                setComments(comments.filter(comment => comment.id !== commentId));
            });
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8">Comments</h2>
            <ul>
                {comments.map(comment => (
                    <li key={comment.id}>
                        {editingComment?.id === comment.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editingComment.title}
                                    onChange={(e) => setEditingComment({ ...editingComment, title: e.target.value, body: editingComment.body })}
                                />
                                <textarea
                                    value={editingComment.body}
                                    onChange={(e) => setEditingComment({ ...editingComment, title: editingComment.title, body: e.target.value })}
                                />
                                <button onClick={() => handleUpdateComment(comment.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <h3>{comment.title}</h3>
                                <p>{comment.body}</p>
                                <button onClick={() => setEditingComment(comment)}>Edit</button>
                                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            <h3>New Comment</h3>
            <input 
                type="text"
                value={newComment.title}
                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
            />
            <p>
            <textarea 
                value={newComment.body}
                onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            />
            </p>
            <button onClick={handleCreateComment}>Create</button>
        </div>
    );
};

export default Comments;