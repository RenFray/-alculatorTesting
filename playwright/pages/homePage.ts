import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly getStartedButton: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchInput = page.getByPlaceholder('Search');
    }

    async goto() {
        await this.page.goto('/');
    }

    async clickGetStarted() {
        await this.getStartedButton.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async searchFor(query: string) {
        await this.searchInput.fill(query);
    }
}
