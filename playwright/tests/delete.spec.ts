import { test, expect } from '@playwright/test';
import { BaseApi } from '../pages/baseApi';

test.describe('DELETE Requests', () => {

    test('Delete a post', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.delete('/posts/1');
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    test('Delete a user', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.delete('/users/1');
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    test('Delete a todo', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.delete('/todos/1');
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    test('Delete a comment', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.delete('/comments/1');
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

    test('Delete an album', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.delete('/albums/1');
        expect(response.status()).toBe(200);
        expect(response.ok()).toBeTruthy();
    });

});
