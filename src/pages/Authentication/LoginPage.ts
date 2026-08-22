import { type Page, type Locator, APIResponse } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click, type } from "../../utils/actions/ui/elementActions";
import { goBack, navigate, loginWithToken } from "../../utils/actions/ui/browserActions";
import { assertText } from "../../utils/assertions/ui/elementAssertions";

export class LoginPage {

    //=====================Locators=====================
    private readonly page: Page;
    private readonly registerPageLink: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly emailErrorMessage: Locator;
    private readonly passwordErrorMessage: Locator;

    //=====================Variables====================
    private readonly loginUrl = '/login';

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.registerPageLink = this.page.getByRole('link', { name: 'Register' });
        this.emailField = this.page.getByTestId('email');
        this.passwordField = this.page.getByTestId('password');
        this.loginButton = this.page.getByTestId('login-btn');
        this.errorMessage = this.page.locator('.pointer-events-auto p');
        this.emailErrorMessage = this.page.locator('//input[@id="email"]//following-sibling::p');
        this.passwordErrorMessage = this.page.locator('//input[@id="password"]//following-sibling::p');
    }

    //=====================Actions======================
    @step('Navigate to Login Page')
    async navigate() {
        await navigate(this.page, this.loginUrl);
    }

    @step('Navigate to Register Page')
    async clickOnRegisterPageLink() {
        await click(this.registerPageLink, 'Register Page Link');
    }

    @step('Navigate Back Using Browser Back Button')
    async navigateBackUsingBrowserBackButton() {
        await goBack(this.page);
    }

    @step('Log in to EventHub using the authentication token')
    async loginUsingToken(response: APIResponse) {
        const tokenData = await response.json();
        await loginWithToken(this.page, tokenData.token, 'eventhub_token');
    }

    @step('Enter User Email: {email}')
    async enterEmail(email: string) {
        await type(this.emailField, email, 'Email Field');
    }

    @step('Enter User Password: {password}')
    async enterPassword(password: string) {
        await type(this.passwordField, password, 'Password Field');
    }

    async enterLoginDetails(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
    }

    @step('Click on Login Button')
    async clickOnLoginButton() {
        await click(this.loginButton, 'Login Button');
    }

    //=====================Assertions===================
    @step('Assert Error Message is Displayed: {message}')
    async assertErrorMessageIsDisplayed(message: string) {
        await assertText(this.errorMessage, message, 'Error Message');
    }

    @step('Assert Email Error Message is Displayed: {message}')
    async assertEmailErrorMessageIsDisplayed(message: string) {
        await assertText(this.emailErrorMessage, message, 'Email Error Message');
    }

    @step('Assert Password Error Message is Displayed: {message}')
    async assertPasswordErrorMessageIsDisplayed(message: string) {
        await assertText(this.passwordErrorMessage, message, 'Password Error Message');
    }
}