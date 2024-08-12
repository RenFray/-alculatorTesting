import { Page } from '@playwright/test';
import { BASE_URL } from '../utils/constants';

export class BasePage {
    readonly page: Page;

    constructor (page: Page) {
        this.page = page;
    }

    async goto(url: string = '/') {
        await this.page.goto(`${BASE_URL}${url}`);
    }
}
