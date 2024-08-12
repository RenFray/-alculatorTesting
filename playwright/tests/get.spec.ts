import { test, expect } from '@playwright/test';
import { BaseApi } from '../pages/baseApi';

test.describe('GET Requests', () => {

    test('GET all posts', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.get('/posts');
        expect(response.status()).toBe(200);
        const posts = await response.json();
        expect(posts.length).toBeGreaterThan(0);
    });

    test('GET a specific post', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.get('/posts/1');
        expect(response.status()).toBe(200);
        const post = await response.json();
        expect(post.id).toBe(1);
    });

    test('GET comments for a post', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.get('/posts/1/comments');
        expect(response.status()).toBe(200);
        const comments = await response.json();
        expect(comments.length).toBeGreaterThan(0);
    });

    test('GET a non-existent post', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.get('/posts/9999');
        expect(response.status()).toBe(404);
    });

    test('GET all users', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.get('/users');
        expect(response.status()).toBe(200);
        const users = await response.json();
        expect(users.length).toBeGreaterThan(0);
    });

});
