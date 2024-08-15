import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { AuthPage } from '../pages/authPage';
import { BASE_URL } from '../utils/constants';
import { generateRandomEmail, myEmail, myPassword, myPhone, fakeEmail, fakePassword, unregisteredEmail, items, categories, searchProduct, searchFakeProduct, searchList } from "../utils/constants";


test.describe('21vek authorization Tests', () => {

    test.beforeEach(async ({ page }) => {
        const basePage = new BasePage(page);
        await basePage.goto();

        const authPage = new AuthPage(page);
        await authPage.cookiesButton.waitFor();
        await authPage.cookiesButton.click();
    });

    test('1. Переход на главную страницу', async ({ page }) => {
        expect(page.url()).toBe(`${BASE_URL}/`);

        for (const item of items) {
            const locator = page.locator(`//h6[contains(text(), '${item}')]`);
            await expect(locator.first()).toBeVisible();
        }
    });

    test('2. Регистрация нового аккаунта с согласием на обработку персональных данных', async ({ page }) => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        const authPage = new AuthPage(page);
        const randomEmail = generateRandomEmail();

        await authPage.goToLoginForm();
        await expect(authPage.registrationButton).toBeVisible();
        await authPage.registrationButton.click();
        if (await authPage.phoneInput.isVisible()) {
            await authPage.phoneInput.fill('');
            await authPage.phoneInput.fill(myPhone);
        }
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(randomEmail);
        await expect(authPage.continueButton).toBeVisible();
        await authPage.continueButton.click();
        await expect(authPage.confirmationDataButton).toBeVisible();
        await authPage.confirmationDataButton.click();
        await delay(3000);
        await expect(authPage.successRegiText).toBeVisible();
        await expect(authPage.logInButton).toBeVisible();
        await authPage.logInButton.click();
        await expect(authPage.entranceText).toBeVisible();
    });

    test('3. Регистрация нового аккаунта без согласия на обработку персональных данных и проведение рассылок', async ({ page }) => {
        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        const authPage = new AuthPage(page);
        const randomEmail = generateRandomEmail();

        await authPage.goToLoginForm();
        await expect(authPage.registrationButton).toBeVisible();
        await authPage.registrationButton.click();
        if (await authPage.phoneInput.isVisible()) {
            await authPage.phoneInput.fill('');
            await authPage.phoneInput.fill(myPhone);
        }
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(randomEmail);
        await expect(authPage.continueButton).toBeVisible();
        await authPage.continueButton.click();
        await expect(authPage.refuseDataButton).toBeVisible();
        await authPage.refuseDataButton.click();
        await expect(authPage.refuseDataButton).toBeVisible();
        await authPage.refuseDataButton.click();
        await delay(3000);
        await expect(authPage.successRegiText).toBeVisible();
        await expect(authPage.logInButton).toBeVisible();
        await authPage.logInButton.click();
        await expect(authPage.entranceText).toBeVisible();
    });

    test('4. Восстановление пароля', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.goToLoginForm();
        await expect(authPage.forgotButton).toBeVisible();
        await authPage.forgotButton.click();
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(myEmail);
        await expect(authPage.sendButton).toBeVisible();
        await authPage.sendButton.click();
        await expect(authPage.sentText).toBeVisible();
    });

    test('5. Вход в аккаунт', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.goToLoginForm();
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(myEmail);
        await expect(authPage.passwordInput).toBeVisible();
        await authPage.passwordInput.fill('');
        await authPage.passwordInput.fill(myPassword);
        await expect(authPage.logInButton).toBeVisible();
        await authPage.logInButton.click();
        await expect(authPage.accountButton).toBeVisible();
        await authPage.accountButton.click();
        await expect(authPage.userEmail).toBeVisible();
    });

    test('6. Ввод невалидного адреса электронной почты при регистрации', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.goToLoginForm();
        await expect(authPage.registrationButton).toBeVisible();
        await authPage.registrationButton.click();
        if (await authPage.phoneInput.isVisible()) {
            await authPage.phoneInput.fill('');
            await authPage.phoneInput.fill(myPhone);
        }
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(fakeEmail);
        await expect(authPage.continueButton).toBeVisible();
        await authPage.continueButton.click();
        await expect(authPage.errorEmailText).toBeVisible();
    });

    test('7. Ввод незарегистрированного адреса электронной почты при восстановлении пароля', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.goToLoginForm();
        await expect(authPage.forgotButton).toBeVisible();
        await authPage.forgotButton.click();
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(unregisteredEmail);
        await expect(authPage.sendButton).toBeVisible();
        await authPage.sendButton.click();
        await expect(authPage.errorRecoveryEmailText).toBeVisible();
    });

    test('8. Ввод незарегистрированного адреса электронной почты при входе в аккаунт', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.goToLoginForm();
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(unregisteredEmail);
        await expect(authPage.passwordInput).toBeVisible();
        await authPage.passwordInput.fill('');
        await authPage.passwordInput.fill(myPassword);
        await expect(authPage.logInButton).toBeVisible();
        await authPage.logInButton.click();
        await expect(authPage.errorRecoveryEmailText).toBeVisible();
    });

    test('9. Ввод неверного пароля при входе в аккаунт', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.goToLoginForm();
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await authPage.emailInput.fill(myEmail);
        await expect(authPage.passwordInput).toBeVisible();
        await authPage.passwordInput.fill('');
        await authPage.passwordInput.fill(fakePassword);
        await expect(authPage.logInButton).toBeVisible();
        await authPage.logInButton.click();
        await expect(authPage.errorPasswordText).toBeVisible();
    });

    test('10. Вход в аккаунт без ввода электронной почты и пароля', async ({ page }) => {
        const authPage = new AuthPage(page);

        await authPage.goToLoginForm();
        await expect(authPage.emailInput).toBeVisible();
        await authPage.emailInput.fill('');
        await expect(authPage.passwordInput).toBeVisible();
        await authPage.passwordInput.fill('');
        await expect(authPage.logInButton).toBeVisible();
        await authPage.logInButton.click();
        await expect(authPage.emptyEmail).toBeVisible();
        await expect(authPage.emptyPassword).toBeVisible();
    });

});
