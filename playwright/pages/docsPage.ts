import { Page, Locator } from '@playwright/test';

export class DocsPage {
    readonly page: Page;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByRole('heading', { name: 'Getting started' });
    }

    async goto() {
        await this.page.goto('/docs/intro');
    }
}
