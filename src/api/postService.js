// src/api/postService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// 文章相关的 API 请求
export const postService = {
    // 获取所有文章
    getPosts: async () => {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
            throw new Error('获取文章列表失败');
        }
        return response.json();
    },

    // 获取单篇文章
    getPostById: async (id) => {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`);
        if (!response.ok) {
            throw new Error('获取文章详情失败');
        }
        return response.json();
    },

    // 创建新文章
    createPost: async (postData, token) => {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '创建文章失败');
        }

        return response.json();
    },

    // 更新文章
    updatePost: async (id, postData, token) => {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '更新文章失败');
        }

        return response.json();
    },

    // 删除文章
    deletePost: async (id, token) => {
        const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || '删除文章失败');
        }

        return response.json();
    }
};