import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { HomePage } from '../pages/homePage';
import { BASE_URL } from '../utils/constants';

test.describe('UI Tests for Playwright Documentation part 1', () => {

  test.describe('Home Page Tests', () => {

    test.beforeEach(async ({ page }) => {
      const basePage = new BasePage(page);
      await basePage.goto();
    });

    test('should navigate to the homepage', async ({ page }) => {
      const basePage = new BasePage(page);
      await basePage.goto();
      expect(page.url()).toBe(`${BASE_URL}/`);
    });

    test('should click on Get Started button', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickGetStarted();
      expect(page.url()).toContain('/docs/intro');
      await expect(homePage.installationHeader).toBeVisible();
    });

    test('should search for "test" in the search bar', async ({ page }) => {
      const homePage = new HomePage(page);
      await homePage.clickSearchButton();
      await homePage.searchFor('test');
      await expect(homePage.searchResults.first()).toBeVisible();
      await expect(homePage.specificResult).toBeVisible();
    });

    test('should verify the title of the homepage', async ({ page }) => {
      await expect(page).toHaveTitle(/Playwright/);
    });

    test('should check the presence of "Get Started" link', async ({ page }) => {
      const homePage = new HomePage(page);
      await expect(homePage.getStartedButton).toBeVisible();
    });
  });
});
