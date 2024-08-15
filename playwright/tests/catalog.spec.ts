import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { CatalogPage } from '../pages/catalogPage';
import { categories, searchProduct, searchFakeProduct, searchList } from "../utils/constants";


test.describe('21vek catalog Tests', () => {

    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.goto();

        const catalogPage = new CatalogPage(page);
        await catalogPage.cookiesButton.waitFor();
        await catalogPage.cookiesButton.click();
    });

    test('11. Открытие каталога товаров', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.catalogButton).toBeVisible();
        await catalogPage.catalogButton.click();
        await expect(catalogPage.catalogHeader).toBeVisible();
    });

    test('12. Проверка перечня разделов в каталоге товаров', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.catalogButton).toBeVisible();
        await catalogPage.catalogButton.click();
        await expect(catalogPage.catalogHeader).toBeVisible();

        for (const categorie of categories) {
            const locator =  page.locator(`//span[contains(text(), '${categorie}')]`);
            await expect(locator.first()).toBeVisible();
        }
    });

    test('13. Переход в раздел каталога товаров', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.catalogButton).toBeVisible();
        await catalogPage.catalogButton.click();
        await expect(catalogPage.catalogItem).toBeVisible();
        await catalogPage.catalogItem.click();
        await expect(catalogPage.catalogName).toBeVisible();
        await expect(catalogPage.catalogBeautyItem).toBeVisible();
    });

    test('14. Поиск товара в каталоге, предварительные результаты поиска', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.searchInput).toBeVisible();
        await catalogPage.searchInput.click();
        await catalogPage.searchInput.fill('');
        await catalogPage.searchInput.fill(searchProduct);

        for (const list of searchList) {
            const locator =  page.locator(`//div[contains(text(), '${list}')]`);
            await expect(locator.first()).toBeVisible();
        }
        await expect(catalogPage.searchPreResult.first()).toBeVisible();
    });

    test('15. Поиск товара в каталоге, все результаты поиска', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.searchInput).toBeVisible();
        await catalogPage.searchInput.click();
        await catalogPage.searchInput.fill('');
        await catalogPage.searchInput.fill(searchProduct);
        await page.keyboard.press('Enter');
        await expect(catalogPage.searchResults).toBeVisible();
        await expect(catalogPage.filtersBlock).toBeVisible();
        await expect(catalogPage.searchResult.first()).toBeVisible();
    });

    test('16. Поиск несуществующего товара в каталоге', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.searchInput).toBeVisible();
        await catalogPage.searchInput.click();
        await catalogPage.searchInput.fill('');
        await catalogPage.searchInput.fill(searchFakeProduct);
        await page.keyboard.press('Enter');
        await expect(catalogPage.searchResults).toBeVisible();
        await expect(catalogPage.noResults).toBeVisible();
    });

    test('17. Добавление товара в корзину', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.shopProduct.first()).toBeVisible();
        const productName = await catalogPage.shopProductName.first().textContent();
        await catalogPage.shopProduct.first().click();
        await expect(catalogPage.counter).toBeEmpty();
        await expect(catalogPage.addInCart).toBeVisible();
        await catalogPage.addInCart.click();
        await expect(catalogPage.counter).toHaveText('1');
        await expect(catalogPage.InCart).toBeVisible();
        await catalogPage.InCart.click();
        await expect(catalogPage.productInCart.nth(1)).toBeVisible();
        const productNameInCart = await catalogPage.productInCart.nth(1).textContent();
        await expect(productName).toBe(productNameInCart);
    });

    test('18. Удаление товара из корзины', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.shopProduct.first()).toBeVisible();
        await catalogPage.shopProduct.first().click();
        await expect(catalogPage.counter).toBeEmpty();
        await expect(catalogPage.addInCart).toBeVisible();
        await catalogPage.addInCart.click();
        await expect(catalogPage.counter).toHaveText('1');
        await expect(catalogPage.InCart).toBeVisible();
        await catalogPage.shoppingCartButton.click();
        await expect(catalogPage.productInCart.nth(1)).toBeVisible();
        await expect(catalogPage.deleteSelectButton).toBeVisible();
        await catalogPage.deleteSelectButton.click();
        await expect(catalogPage.deleteButton).toBeVisible();
        await catalogPage.deleteButton.click();
        await expect(catalogPage.emptyCart).toBeVisible();
    });

    test('19. Добавление товара в избранное', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.shopProduct.first()).toBeVisible();
        const productName = await catalogPage.shopProductName.first().textContent();
        await catalogPage.shopProduct.first().click();
        await expect(catalogPage.addToFavorites).toBeVisible();
        await catalogPage.addToFavorites.click();
        await catalogPage.accountButton.click();
        await expect(catalogPage.favoritesButton).toBeVisible();
        await catalogPage.favoritesButton.click();
        await expect(catalogPage.favoriteHeader).toBeVisible();
        await expect(catalogPage.favoriteProduct).toBeVisible();
        const productNameFavorite = await catalogPage.favoriteProduct.textContent();
        await expect(productName).toBe(productNameFavorite);
    });

    test('20. Проверка контактов компании', async ({ page }) => {
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.moreButton.nth(1)).toBeVisible();
        await catalogPage.moreButton.nth(1).click();
        await expect(catalogPage.contactsButton).toBeVisible();
        await catalogPage.contactsButton.click();
        await expect(catalogPage.pressEmail).toBeVisible();
    });

    test('21. Проверка наличия метки "Уцененный товар" у уценённых товаров', async ({ page }) => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        const catalogPage = new CatalogPage(page);

        await expect(catalogPage.markdown).toBeVisible();
        await catalogPage.markdown.click();
        await delay(5000);

        const products = await catalogPage.product;
        const productCount = await products.count();
        console.log(`Количество продуктов: ${productCount}`);

        expect(productCount).toBeGreaterThan(0);

        for (let i = 0; i < productCount; i++) {
            const product = products.nth(i);

            const discountLabel = product.locator(catalogPage.markdownProduct);
            await expect(discountLabel).toBeVisible();
        }
    });
});
