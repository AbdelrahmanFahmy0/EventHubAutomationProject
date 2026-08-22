import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click, type } from "../../utils/actions/ui/elementActions";
import { waitForPageToLoad } from "../../utils/waits/waits";
import { navigate } from "../../utils/actions/ui/browserActions";
import { assertText } from "../../utils/assertions/ui/elementAssertions";

export class RegisterPage {

    //=====================Locators=====================
    private readonly page: Page;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly confirmPasswordField: Locator;
    private readonly createAccountButton: Locator;
    private readonly errorMessage: Locator;
    private readonly emailErrorMessage: Locator;
    private readonly passwordErrorMessage: Locator;
    private readonly confirmPasswordErrorMessage: Locator;

    //=====================Variables====================
    public readonly registerUrl = '/register';

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.getByTestId('register-email');
        this.passwordField = this.page.getByTestId('register-password');
        this.confirmPasswordField = this.page.locator('//label[text() = "Confirm Password"]/following-sibling::input');
        this.createAccountButton = this.page.getByTestId('register-btn');
        this.errorMessage = this.page.locator('.pointer-events-auto p');
        this.emailErrorMessage = this.page.locator('//input[@id="register-email"]//following-sibling::p');
        this.passwordErrorMessage = this.page.locator('//input[@id="register-password"]//following-sibling::p');
        this.confirmPasswordErrorMessage = this.page.locator('//label[text()="Confirm Password"]//following-sibling::p');
    }

    //=====================Actions======================
    @step('Navigate to Registration Page')
    async navigate() {
        await navigate(this.page, this.registerUrl);
    }

    @step('Enter User Email: {email}')
    async enterEmail(email: string) {
        await type(this.emailField, email, 'Email Field');
    }

    @step('Enter User Password: {password}')
    async enterPassword(password: string) {
        await type(this.passwordField, password, 'Password Field');
    }

    @step('Enter User Confirm Password: {confirmPassword}')
    async enterConfirmPassword(confirmPassword: string) {
        await type(this.confirmPasswordField, confirmPassword, 'Confirm Password Field');
    }

    async enterRegistrationDetails(email: string, password: string) {
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterConfirmPassword(password);
    }

    @step('Click on Create Account Button')
    async clickOnCreateAccountButton() {
        await click(this.createAccountButton, 'Create Account Button');
    }

    async register(email: string, password: string) {
        await type(this.emailField, email, 'Email Field');
        await type(this.passwordField, password, 'Password Field');
        await type(this.confirmPasswordField, password, 'Confirm Password Field');
        await click(this.createAccountButton, 'Create Account Button');
        await waitForPageToLoad(this.page);
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

    @step('Assert Confirm Password Error Message is Displayed: {message}')
    async assertConfirmPasswordErrorMessageIsDisplayed(message: string) {
        await assertText(this.confirmPasswordErrorMessage, message, 'Confirm Password Error Message');
    }
}