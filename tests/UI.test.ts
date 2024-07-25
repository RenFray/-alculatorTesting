import puppeteer, { Browser, Page } from 'puppeteer';
import HomePage from '../pages/HomePage';

describe('Home Page Tests', () => {
    let browser: Browser;
    let page: Page;
    let homePage: HomePage;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized'],
            defaultViewport: null
        });
        page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        homePage = new HomePage(page);
    });

    afterAll(async () => {
        await browser.close();
    });

    test('Хедер виден', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const isVisible = await homePage.isHeaderVisible();
        expect(isVisible).toBe(true);
    }, 10000);

    test('Поиск возвращает результаты', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        await homePage.search('телефон');
        const areListItemsVisible = await homePage.areListItemsVisible();
        expect(areListItemsVisible).toBe(true);
    }, 50000);

    test('Ссылка в логотипе содержить необходимый текст', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const href = await homePage.getHref('.b-top-logo a[href]');
        expect(href).toContain('www.onliner.by');
    }, 5000);

    test('Навигационное меню отображается', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const isNavVisible = await page.$('.b-main-navigation') !== null;
        expect(isNavVisible).toBe(true);
    }, 5000);

    test('Футер отображается', async () => {
        await page.goto('https://onliner.by', { waitUntil: 'networkidle0' });
        const isFooterVisible = await page.$('footer.g-bottom') !== null;
        expect(isFooterVisible).toBe(true);
    }, 5000);
});

