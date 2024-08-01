import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { DocsPage } from '../pages/docsPage';
import { BASE_URL } from '../utils/constants';

test.describe('UI Tests for Playwright Documentation', () => {

  test.describe('Home Page Tests', () => {

    test.beforeEach(async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
    });

    test('should navigate to the homepage', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.goto();
      expect(page.url()).toBe(`${BASE_URL}/`);
    });

    test('should click on Get Started button', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickGetStarted();
      expect(page.url()).toContain('/docs/intro');
    });

    test('should search for "test" in the search bar', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSearchButton();
      await homePage.searchFor('test');
      const results = page.locator('.DocSearch-Dropdown-Container');
      await expect(results.first()).toBeVisible();
    });

    test('should verify the title of the homepage', async ({ page }) => {
      await expect(page).toHaveTitle(/Playwright/);
    });

    test('should check the presence of "Get Started" link', async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.getStartedButton).toBeVisible();
    });
  });

  test.describe('Docs Page Tests', () => {

    test.beforeEach(async ({ page }) => {
      const docsPage = new DocsPage(page);
      await docsPage.goto();
    });

    test('should navigate to the docs page', async ({ page }) => {
      expect(page.url()).toBe(`${BASE_URL}/docs/intro`);
    });

    test('should verify sidebar menu items', async ({ page }) => {
      const sidebar = page.locator('nav[aria-label="Docs sidebar"]');
      const items = ['Getting started - VS Code', 'Playwright Test', 'Guides'];
      for (const item of items) {
        const locator = sidebar.locator(`//a[text()='${item}']`);
        await expect(locator.first()).toBeVisible();
      }
    });

    test('should check for the presence of sidebar', async ({ page }) => {
      const sidebar = page.getByRole('navigation', { name: 'Docs sidebar' });
      await expect(sidebar).toBeVisible();
    });

    test('should find a specific document in the sidebar', async ({ page }) => {
      const sidebarItem = page.getByRole('link', { name: 'Assertions', exact: true });
      await expect(sidebarItem).toBeVisible();
    });

    test('should click on the "Assertions" link in the sidebar', async ({ page }) => {
      const sidebarItem = page.getByRole('link', { name: 'Assertions', exact: true });
      await sidebarItem.click();
      expect(page.url()).toContain('/docs/test-assertions');
    });

  });
});
