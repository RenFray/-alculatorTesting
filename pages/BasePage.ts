import { Page } from 'puppeteer';

export default class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async waitForSelector(selector: string) {
        await this.page.waitForSelector(selector);
    }

    async getText(selector: string): Promise<string> {
        await this.waitForSelector(selector);
        return await this.page.$eval(selector, element => element.textContent || '');
    }

    async click(selector: string) {
        await this.waitForSelector(selector);
        await this.page.click(selector);
    }
}
