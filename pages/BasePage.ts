import { Page } from 'puppeteer';

export default class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector);
    }

}
