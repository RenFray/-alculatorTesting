import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './basePage';
import { searchProduct } from "../utils/constants";


export class CatalogPage extends BasePage {
    readonly cookiesButton: Locator;
    readonly accountButton: Locator;

    readonly catalogButton: Locator;
    readonly catalogHeader: Locator;
    readonly catalogItem: Locator;
    readonly catalogName: Locator;
    readonly catalogBeautyItem: Locator;
    readonly searchInput: Locator;
    readonly searchPreResult: Locator;
    readonly searchResults: Locator;
    readonly filtersBlock: Locator;
    readonly searchResult: Locator;
    readonly noResults: Locator;
    readonly shopProduct: Locator;
    readonly shopProductName: Locator;
    readonly addInCart: Locator;
    readonly counter: Locator;
    readonly InCart: Locator;
    readonly productInCart: Locator;
    readonly shoppingCartButton: Locator;
    readonly deleteSelectButton: Locator;
    readonly deleteButton: Locator;
    readonly emptyCart: Locator;
    readonly addToFavorites: Locator;
    readonly favoritesButton: Locator;
    readonly favoriteHeader: Locator;
    readonly favoriteProduct: Locator;
    readonly moreButton: Locator;
    readonly contactsButton: Locator;
    readonly pressEmail: Locator;
    readonly markdown: Locator;
    readonly markdownProduct: Locator;
    readonly product: Locator;

    constructor(page: Page) {
        super(page);
        this.cookiesButton = page.getByRole('button', { name: 'Принять' });
        this.accountButton = page.getByRole('button', { name: 'Аккаунт' });

        this.catalogButton = page.getByRole('button', { name: 'Каталог товаров' });
        this.catalogHeader = page.locator('//div[text()="Бытовая техника"]');
        this.catalogItem = page.getByText('Красота и стиль');
        this.catalogName = page.locator('h1.content__header', { hasText: 'Красота и стиль' });
        this.catalogBeautyItem = page.getByRole('link', { name: 'Уход за телом' });
        this.searchInput = page.locator('input[placeholder="Поиск товаров"]');
        this.searchPreResult = page.locator('//mark[text()="лампа"]');
        this.searchResults = page.locator('h1.content__header', { hasText: 'Результаты поиска' });
        this.filtersBlock = page.locator('.l-sidebar');
        this.searchResult = page.locator('span.result__name', { hasText: searchProduct });
        this.noResults = page.getByText('По данным параметрам товаров не найдено');
        this.shopProduct = page.locator('div[data-testid="image-container"]');
        this.shopProductName = page.locator('a[data-testid="card-info-a"]');
        this.addInCart = page.getByText('Добавить в корзину');
        this.counter = page.locator('span[data-testid="header-count"]');
        this.InCart = page.getByText('В корзине');
        this.productInCart = page.locator('a[target="_blank"][rel="noreferrer"]');
        this.shoppingCartButton = page.getByRole('link', { name: 'Корзина' });
        this.deleteSelectButton = page.getByText('Удалить выбранные');
        this.deleteButton = page.getByTestId('modal-confirmation-button');
        this.emptyCart = page.getByText('Корзина пуста');
        this.addToFavorites = page.getByTestId('product-card-static-block').getByLabel('В избранное');
        this.favoritesButton = page.getByText('Избранные товары');
        this.favoriteHeader = page.getByRole('heading', { name: 'Избранные товары' });
        this.favoriteProduct = page.locator('//div[contains(@class, "OldProductCard_name")]/a');
        this.moreButton = page.getByRole('button', { name: 'Еще' });
        this.contactsButton = page.locator('#dropdownCommunications').getByRole('link', { name: 'Контакты' });
        this.pressEmail = page.getByRole('link', { name: 'info@21vek.by' });
        this.markdown = page.locator('//a[text()="Уценка"]');
        this.markdownProduct = page.getByText('Уцененный товар');
        this.product = page.locator('[data-testid="product"]');
    }

}
