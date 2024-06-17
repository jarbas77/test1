const API_URL = 'https://jsonplaceholder.typicode.com';

export const getPosts = async () => {
    const response = await fetch(`${API_URL}/posts`);
    return response.json();
};

export const fetchComments = async (postId: number) => {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`);
    return response.json();
};

export const createComment = async (postId: number, commentData: { title: string, body: string }) => {
    const response = await fetch(`${API_URL}/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return response.json();
};

export const updateComment = async (commentId: number, commentData: { title: string, body: string }) => {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'PUT',
        body: JSON.stringify(commentData),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    return response.json();
}

export const deleteComment = async (commentId: number) => {
    const response = await fetch(`${API_URL}/comments/${commentId}`, {
        method: 'DELETE',
    });
    return response.json();
}