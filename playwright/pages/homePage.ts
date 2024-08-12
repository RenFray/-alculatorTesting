import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
    readonly getStartedButton: Locator;
    readonly searchButton: Locator;
    readonly searchInput: Locator;
    readonly installationHeader: Locator;
    readonly searchResults: Locator;
    readonly specificResult: Locator;
    readonly sidebarElements: Locator;
    readonly sidebar: Locator;
    readonly sidebarItem: Locator;

    constructor(page: Page) {
        super(page);
        this.getStartedButton = page.getByRole('link', { name: 'Get started' });
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.searchInput = page.getByPlaceholder('Search');
        this.installationHeader = page.locator('header', { hasText: 'Installation' });
        this.searchResults = page.locator('.DocSearch-Dropdown-Container');
        this.specificResult = page.locator('span.DocSearch-Hit-title', { hasText: 'Writing' });
        this.sidebarElements = page.locator('nav[aria-label="Docs sidebar"]');
        this.sidebar = page.getByRole('navigation', { name: 'Docs sidebar' });
        this.sidebarItem = page.getByRole('link', { name: 'Assertions', exact: true });

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
