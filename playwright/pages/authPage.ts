import {Page, Locator, expect} from '@playwright/test';
import { BasePage } from './basePage';


export class AuthPage extends BasePage {
    readonly cookiesButton: Locator;
    readonly accountButton: Locator;
    readonly loginFormButton: Locator;
    readonly logInButton: Locator;
    readonly registrationButton: Locator;
    readonly forgotButton: Locator;
    readonly continueButton: Locator;
    readonly phoneInput: Locator;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmationDataButton: Locator;
    readonly successRegiText: Locator;
    readonly entranceText: Locator;
    readonly refuseDataButton: Locator;
    readonly sendButton: Locator;
    readonly sentText: Locator;
    readonly userEmail: Locator;
    readonly errorEmailText: Locator;
    readonly errorRecoveryEmailText: Locator;
    readonly errorPasswordText: Locator;
    readonly emptyEmail: Locator;
    readonly emptyPassword: Locator;

    constructor(page: Page) {
        super(page);
        this.cookiesButton = page.getByRole('button', { name: 'Принять' });
        this.accountButton = page.getByRole('button', { name: 'Аккаунт' });

        this.loginFormButton = page.getByTestId('loginButton');
        this.logInButton = page.locator('//div[text()="Войти"]');
        this.registrationButton = page.getByRole('button', { name: 'Регистрация' });
        this.forgotButton = page.getByRole('button', { name: 'Забыли пароль' });
        this.continueButton = page.locator('div.Button-module__buttonText', { hasText: 'Продолжить' });
        this.phoneInput = page.locator('input[name="phone"][inputmode="numeric"]');
        this.emailInput = page.locator('input[name="email"][inputmode="text"]');
        this.passwordInput = page.locator('input[name="password"][inputmode="text"]');
        this.confirmationDataButton = page.locator('[data-testid="agreeButton"]');
        this.refuseDataButton = page.locator('div.Button-module__buttonText', { hasText: 'Отказываюсь' });
        this.successRegiText = page.locator('//h5[text()="Вы зарегистрированы"]');
        this.entranceText = page.locator('h5.Form-module__formTitle', { hasText: 'Вход' });
        this.sendButton = page.getByRole('button', { name: 'Отправить' });
        this.sentText = page.locator('//h5[text()="Письмо отправлено"]');
        this.userEmail = page.getByText('marmon.89@gmail.com');
        this.errorEmailText = page.getByText('Неправильный формат электронной почты');
        this.errorRecoveryEmailText = page.getByText('Проверьте электронную почту');
        this.errorPasswordText = page.getByText('Неправильный пароль');
        this.emptyEmail = page.getByText('Электронная почта не указана');
        this.emptyPassword = page.getByText('Пароль не указан');

    }

    async goToLoginForm() {
        await expect(this.accountButton).toBeVisible();
        await this.accountButton.click();
        await expect(this.loginFormButton).toBeVisible();
        await this.loginFormButton.click();
    }
}
