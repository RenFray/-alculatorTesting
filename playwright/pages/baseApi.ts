import { APIRequestContext } from '@playwright/test';
import { BASE_URL_API } from '../utils/constants';

export class BaseApi {
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get(endpoint: string) {
        const response = await this.request.get(`${BASE_URL_API}${endpoint}`);
        return response;
    }

    async post(endpoint: string, data: any) {
        const response = await this.request.post(`${BASE_URL_API}${endpoint}`, {
            data,
        });
        return response;
    }

    async put(endpoint: string, data: any) {
        const response = await this.request.put(`${BASE_URL_API}${endpoint}`, {
            data,
        });
        return response;
    }

    async patch(endpoint: string, data: any) {
        const response = await this.request.patch(`${BASE_URL_API}${endpoint}`, {
            data,
        });
        return response;
    }

    async delete(endpoint: string) {
        const response = await this.request.delete(`${BASE_URL_API}${endpoint}`);
        return response;
    }

}
