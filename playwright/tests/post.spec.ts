import { test, expect } from '@playwright/test';
import { BaseApi } from '../pages/baseApi';

test.describe('POST Requests', () => {

    test('Create a new post', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.post('/posts', {
            data: {
                title: 'foo',
                body: 'bar',
                userId: 1
            },
        });
        expect(response.status()).toBe(201);
        const post = await response.json();
        expect(post).toHaveProperty('data');
        expect(post.data.title).toBe('foo');
        expect(post.data.body).toBe('bar');
        expect(post.data.userId).toBe(1);
    });

    test('Create a new comment', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.post('/comments', {
            data: {
                postId: 1,
                name: 'My Comment',
                email: 'test@example.com',
                body: 'This is a test comment'
            },
        });
        expect(response.status()).toBe(201);
        const comment = await response.json();
        expect(comment).toHaveProperty('data');
        expect(comment.data.name).toBe('My Comment');
        expect(comment.data.email).toBe('test@example.com');
        expect(comment.data.body).toBe('This is a test comment');
        expect(comment.data.postId).toBe(1);
    });

    test('Create a new user', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.post('/users', {
            data: {
                name: 'John Doe',
                username: 'johndoe',
                email: 'john.doe@example.com'
            },
        });
        expect(response.status()).toBe(201);
        const user = await response.json();
        expect(user).toHaveProperty('data');
        expect(user.data.name).toBe('John Doe');
        expect(user.data.username).toBe('johndoe');
        expect(user.data.email).toBe('john.doe@example.com');
        expect(user.id).toBe(11);
    });

    test('Create a new todo', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.post('/todos', {
            data: {
                title: 'New Todo',
                completed: false,
                userId: 1
            },
        });
        expect(response.status()).toBe(201);
        const todo = await response.json();
        expect(todo).toHaveProperty('data');
        expect(todo.data.title).toBe('New Todo');
        expect(todo.data.completed).toBe(false);
        expect(todo.data.userId).toBe(1);
        expect(todo.id).toBe(201);
    });

    test('Create a new album', async ({ request }) => {
        const api = new BaseApi(request);
        const response = await api.post('/albums', {
            data: {
                title: 'New Album',
                userId: 1
            },
        });
        expect(response.status()).toBe(201);
        const album = await response.json();
        expect(album).toHaveProperty('data');
        expect(album.data.title).toBe('New Album');
        expect(album.data.userId).toBe(1);
        expect(album.id).toBe(101);
    });

});
