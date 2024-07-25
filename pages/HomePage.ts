import BasePage from './BasePage';

export default class HomePage extends BasePage {
    private headerSelector: string = '.g-top';
    private searchBoxSelector: string = 'input.fast-search__input';
    private searchResultListSelector: string = 'ul.search__results';
    private listItemSelector: string = 'ul.search__results li';


    async isHeaderVisible(): Promise<boolean> {
        await this.waitForSelector(this.headerSelector);
        const header = await this.page.$(this.headerSelector);
        return header !== null;
    }

    async search(text: string) {
        await this.waitForSelector(this.searchBoxSelector);
        await this.page.type(this.searchBoxSelector, text, { delay: 100 });
        await this.page.evaluate(() => new Promise(resolve => setTimeout(resolve, 5000)));
        await this.waitForSelector(this.searchResultListSelector, { timeout: 30000 });
    }

    async areListItemsVisible(): Promise<boolean> {
        await this.waitForSelector(this.listItemSelector, { timeout: 20000 }); // Увеличиваем таймаут до 20 секунд
        const listItems = await this.page.$$(this.listItemSelector);
        return listItems.length > 0;
    }

    async waitForSelector(selector: string, options = { timeout: 10000 }) {
        await this.page.waitForSelector(selector, options);
    }

    async getHref(selector: string): Promise<string> {
        await this.waitForSelector(selector, { timeout: 5000 });
        return await this.page.$eval(selector, element => (element as HTMLAnchorElement).href);
    }

}
