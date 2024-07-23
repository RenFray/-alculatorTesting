import puppeteer, { Browser, Page } from 'puppeteer';
import HomePage from '../pages/HomePage';

describe('Home Page Tests', () => {
    let browser: Browser;
    let page: Page;
    let homePage: HomePage;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false }); // Запускаем браузер в видимом режиме
        page = await browser.newPage();
        homePage = new HomePage(page);
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Header should be visible', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const isVisible = await homePage.isHeaderVisible();
        expect(isVisible).toBe(true);
    }, 20000); // Увеличиваем таймаут до 20 секунд

    test('Search should return results', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        await homePage.search('телефон');
        const isSearchResultVisible = await homePage.isSearchResultVisible();
        expect(isSearchResultVisible).toBe(true);
    }, 30000); // Увеличиваем таймаут до 30 секунд

    test('Text content of a specific element should be as expected', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const text = await homePage.getText('a.logo__link span');
        expect(text.trim()).toBe('Onliner'); // Исправляем ожидаемое значение текста
    }, 20000); // Увеличиваем таймаут до 20 секунд

    test('Ensure presence of navigation menu', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const isNavVisible = await page.$('.b-main-navigation') !== null;
        expect(isNavVisible).toBe(true);
    }, 20000); // Увеличиваем таймаут до 20 секунд

    test('Footer should be visible', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const isFooterVisible = await page.$('footer') !== null;
        expect(isFooterVisible).toBe(true);
    }, 20000); // Увеличиваем таймаут до 20 секунд
});

