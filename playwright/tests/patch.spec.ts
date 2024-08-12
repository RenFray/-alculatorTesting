import { test, expect } from '@playwright/test';
import { BaseApi } from '../pages/baseApi';

test.describe('PATCH Requests', () => {

    test('Partially update a post title', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.patch('/posts/1', {
            data: {
                title: 'Partially Updated Title'
            },
        });
        expect(response.status()).toBe(200);
        const post = await response.json();
        expect(post).toHaveProperty('data');
        expect(post.data.title).toBe('Partially Updated Title');
        expect(post.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
    });

    test('Partially update a user email', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.patch('/users/1', {
            data: {
                email: 'partial@example.com'
            },
        });
        expect(response.status()).toBe(200);
        const user = await response.json();
        expect(user).toHaveProperty('data');
        expect(user.data.email).toBe('partial@example.com');
        expect(user.email).toBe('Sincere@april.biz');
    });

    test('Partially update a todo status', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.patch('/todos/1', {
            data: {
                completed: false
            },
        });
        expect(response.status()).toBe(200);
        const todo = await response.json();
        expect(todo.completed).toBe(false);
    });

    test('Partially update a comment body', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.patch('/comments/1', {
            data: {
                body: 'Partially updated comment'
            },
        });
        expect(response.status()).toBe(200);
        const comment = await response.json();
        expect(comment).toHaveProperty('data');
        expect(comment.data.body).toBe('Partially updated comment');
        expect(comment.body).toBe('laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium');
    });

    test('Partially update an album title', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.patch('/albums/1', {
            data: {
                title: 'Partially Updated Album'
            },
        });
        expect(response.status()).toBe(200);
        const album = await response.json();
        expect(album).toHaveProperty('data');
        expect(album.data.title).toBe('Partially Updated Album');
        expect(album.title).toBe('quidem molestiae enim');
    });

});
