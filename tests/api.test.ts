// @ts-ignore
import request from 'superagent';

interface SuperAgentError extends Error {
    status: number;
    response: {
        body: {
            error: string;
        };
    };
}

describe('API Tests', () => {
    const baseUrl = 'https://reqres.in/api';

    beforeAll(() => {
        console.log('Starting API tests...');
    });

    afterAll(() => {
        console.log('API tests completed.');
    });

    describe('GET requests', () => {
        test('GET /users', async () => {
            const response = await request.get(`${baseUrl}/users?page=2`);
            expect(response.status).toBe(200);
            expect(response.body.page).toBe(2);
            expect(response.body.per_page).toBe(6);
        });

        test('GET /users/2', async () => {
            const response = await request.get(`${baseUrl}/users/2`);
            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(2);
            expect(response.body.data.email).toBe('janet.weaver@reqres.in');
        });

        test('GET /unknown', async () => {
            const response = await request.get(`${baseUrl}/unknown`);
            expect(response.status).toBe(200);
        });

        test('GET /unknown/2', async () => {
            const response = await request.get(`${baseUrl}/unknown/2`);
            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(2);
            expect(response.body.data.name).toBe('fuchsia rose');
        });
    });

    describe('POST requests', () => {
        test('POST /users', async () => {
            const response = await request
                .post(`${baseUrl}/users`)
                .send({ name: 'morpheus', job: 'leader' });
            expect(response.status).toBe(201);
            expect(response.body.name).toBe('morpheus');
            expect(response.body.job).toBe('leader');
        });

        test('POST /login - successful', async () => {
            const response = await request
                .post(`${baseUrl}/login`)
                .send({ email: 'eve.holt@reqres.in', password: 'cityslicka' });
            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
        });

        test('POST /login - unsuccessful', async () => {
            try {
                await request
                    .post(`${baseUrl}/login`)
                    .send({ email: 'peter@klaven' });
            } catch (error) {
                const err = error as SuperAgentError;
                expect(err.status).toBe(400);
                expect(err.response.body.error).toBe('Missing password');
            }
        });

    });

    describe('PUT requests', () => {
        test('PUT /users/2', async () => {
            const response = await request
                .put(`${baseUrl}/users/2`)
                .send({ name: 'morpheus', job: 'zion resident' });
            expect(response.status).toBe(200);
            expect(response.body.name).toBe('morpheus');
            expect(response.body.job).toBe('zion resident');
        });
    });

    describe('PATCH requests', () => {
        test('PATCH /users/2', async () => {
            const response = await request
                .patch(`${baseUrl}/users/2`)
                .send({ name: 'morpheus', job: 'the one' });
            expect(response.status).toBe(200);
            expect(response.body.job).toBe('the one');
        });
    });

    describe('DELETE requests', () => {
        test('DELETE /users/2', async () => {
            const response = await request.delete(`${baseUrl}/users/2`);
            expect(response.status).toBe(204);
        });
    });
});
