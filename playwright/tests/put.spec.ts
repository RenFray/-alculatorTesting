import { test, expect } from '@playwright/test';
import { BaseApi } from '../pages/baseApi';

test.describe('PUT Requests', () => {

    test('Update an existing post', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.put('/posts/1', {
            data: {
                id: 1,
                title: 'Updated Title',
                body: 'Updated Body',
                userId: 1
            },
        });
        expect(response.status()).toBe(200);
        const post = await response.json();
        expect(post).toHaveProperty('data');
        expect(post.data.id).toBe(1);
        expect(post.data.title).toBe('Updated Title');
        expect(post.data.body).toBe('Updated Body');
        expect(post.data.userId).toBe(1);
        expect(post.id).toBe(1);
    });

    test('Update a user', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.put('/users/1', {
            data: {
                id: 1,
                name: 'Jane Doe',
                username: 'janedoe',
                email: 'jane.doe@example.com'
            },
        });
        expect(response.status()).toBe(200);
        const user = await response.json();
        expect(user).toHaveProperty('data');
        expect(user.data.id).toBe(1);
        expect(user.data.name).toBe('Jane Doe');
        expect(user.data.username).toBe('janedoe');
        expect(user.data.email).toBe('jane.doe@example.com');
        expect(user.id).toBe(1);
    });

    test('Update a todo', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.put('/todos/1', {
            data: {
                id: 1,
                title: 'Updated Todo',
                completed: true,
                userId: 1
            },
        });
        expect(response.status()).toBe(200);
        const todo = await response.json();
        expect(todo).toHaveProperty('data');
        expect(todo.data.id).toBe(1);
        expect(todo.data.title).toBe('Updated Todo');
        expect(todo.data.completed).toBe(true);
        expect(todo.data.userId).toBe(1);
        expect(todo.id).toBe(1);
    });

    test('Update a comment', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.put('/comments/1', {
            data: {
                id: 1,
                postId: 1,
                name: 'Updated Comment',
                email: 'updated@example.com',
                body: 'This is an updated comment'
            },
        });
        expect(response.status()).toBe(200);
        const comment = await response.json();
        expect(comment).toHaveProperty('data');
        expect(comment.data.id).toBe(1);
        expect(comment.data.postId).toBe(1);
        expect(comment.data.name).toBe('Updated Comment');
        expect(comment.data.email).toBe('updated@example.com');
        expect(comment.data.body).toBe('This is an updated comment');
        expect(comment.id).toBe(1);
    });

    test('Update an album', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.put('/albums/1', {
            data: {
                id: 1,
                title: 'Updated Album',
                userId: 1
            },
        });
        expect(response.status()).toBe(200);
        const album = await response.json();
        expect(album).toHaveProperty('data');
        expect(album.data.id).toBe(1);
        expect(album.data.title).toBe('Updated Album');
        expect(album.data.userId).toBe(1);
        expect(album.id).toBe(1);
    });
});
