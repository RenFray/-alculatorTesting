import BasePage from './BasePage';

export default class HomePage extends BasePage {
    private headerSelector: string = 'header';
    private searchBoxSelector: string = 'input.fast-search__input';
    private searchResultItemSelector: string = '.search__result';
    private searchResultContainerSelector: string = '.search__results';

    async isHeaderVisible(): Promise<boolean> {
        await this.waitForSelector(this.headerSelector);
        const header = await this.page.$(this.headerSelector);
        return header !== null;
    }

    async search(text: string) {
        await this.waitForSelector(this.searchBoxSelector);
        await this.page.type(this.searchBoxSelector, text, { delay: 100 });
        await this.page.keyboard.press('Enter');
        await this.waitForSelector(this.searchResultContainerSelector, { timeout: 30000 }); // Увеличиваем таймаут до 30 секунд
    }

    async isSearchResultVisible(): Promise<boolean> {
        const resultItem = await this.page.$(this.searchResultItemSelector);
        return resultItem !== null;
    }

    async waitForSelector(selector: string, options = { timeout: 10000 }) {
        await this.page.waitForSelector(selector, options);
    }

    async getText(selector: string): Promise<string> {
        await this.waitForSelector(selector, { timeout: 20000 }); // Увеличиваем таймаут до 20 секунд
        return await this.page.$eval(selector, element => element.textContent?.trim() || '');
    }
}
