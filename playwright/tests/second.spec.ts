import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { HomePage } from '../pages/homePage';
import { BASE_URL } from '../utils/constants';

   test.describe('Docs Page Tests', () => {

        test.beforeEach(async ({ page }) => {
            const basePage = new BasePage(page);
            await basePage.goto('/docs/intro');
        });

        test('should navigate to the docs page', async ({ page }) => {
            const homePage = new HomePage(page);
            expect(page.url()).toBe(`${BASE_URL}/docs/intro`);
            await expect(homePage.installationHeader).toBeVisible();
        });

        test('should verify sidebar menu items', async ({ page }) => {
            const homePage = new HomePage(page);
            const items = ['Getting started - VS Code', 'Playwright Test', 'Guides'];
            for (const item of items) {
                const locator = homePage.sidebarElements.locator(`//a[text()='${item}']`);
                await expect(locator.first()).toBeVisible();
            }
        });

        test('should check for the presence of sidebar', async ({ page }) => {
            const homePage = new HomePage(page);
            await expect(homePage.sidebar).toBeVisible();
        });

        test('should find a specific document in the sidebar', async ({ page }) => {
            const homePage = new HomePage(page);
            await expect(homePage.sidebarItem).toBeVisible();
        });

        test('should click on the "Assertions" link in the sidebar', async ({ page }) => {
            const homePage = new HomePage(page);
            await homePage.sidebarItem.click();
            expect(page.url()).toContain('/docs/test-assertions');
        });
   });
