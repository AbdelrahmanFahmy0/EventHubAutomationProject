import * as allure from 'allure-js-commons';
import { Severity } from 'allure-js-commons';
import { test } from '../../src/fixtures/test-fixtures';
import authData from '../../test-data/authData.json';
import { getTimestamp } from '../../src/utils/timeUtils';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

//==========================================Variables=============================================

let email: string;
let password: string = authData.password;

//============================================Hooks===============================================

test.beforeAll(async ({ request, registerEndpoint }) => {
    // Generate a unique email for each test run to avoid conflicts with existing accounts
    email = `${authData.loginEmail}${getTimestamp()}@gmail.com`;
    await registerEndpoint.registerUser(request, email, password);
});

test.beforeEach(async () => {
    await allure.epic('Authentication');
    await allure.feature('Login');
    await allure.owner('Abdelrahman');
});

//============================================Tests===============================================

test.describe('User Login Tests', { tag: "@regression" }, () => {

    test('Check Login with Valid Credentials', { tag: "@smoke" }, async ({ loginPage, landingPage }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a user can successfully log in with valid credentials.');
        // Test Steps
        await loginPage.navigate();
        await loginPage.enterLoginDetails(email, password);
        await loginPage.clickOnLoginButton();
        await landingPage.assertUserIsLoggedIn(email);
    });

    test('Check Login with Invalid Password', { tag: "@smoke" }, async ({ loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a user cannot log in with an invalid password.');
        // Test Steps
        await loginPage.navigate();
        await loginPage.enterLoginDetails(email, 'wrongPassword');
        await loginPage.clickOnLoginButton();
        await loginPage.assertErrorMessageIsDisplayed(authData.messages.invalidCredentials);
    });

    test('Check Login with Non-Existing Email', async ({ loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that a user cannot log in with a non-existing email.');
        // Test Steps
        await loginPage.navigate();
        await loginPage.enterLoginDetails(authData.nonExistingEmail, password);
        await loginPage.clickOnLoginButton();
        await loginPage.assertErrorMessageIsDisplayed(authData.messages.invalidCredentials);
    });

    test('Check Login with Password less than 6 Characters', async ({ loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that a user cannot log in with a password less than 6 characters.');
        // Test Steps
        await loginPage.navigate();
        await loginPage.enterLoginDetails(email, "12345");
        await loginPage.clickOnLoginButton();
        await loginPage.assertPasswordErrorMessageIsDisplayed(authData.messages.invalidPassword);
    });

    test('Check Login with Empty Password', async ({ loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that a user cannot log in with an empty password.');
        // Test Steps
        await loginPage.navigate();
        await loginPage.enterEmail(email);
        await loginPage.clickOnLoginButton();
        await loginPage.assertPasswordErrorMessageIsDisplayed(authData.messages.invalidPassword);
    });

    test('Check Login with Empty Email', async ({ loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that a user cannot log in with an empty email.');
        // Test Steps
        await loginPage.navigate();
        await loginPage.enterPassword(password);
        await loginPage.clickOnLoginButton();
        await loginPage.assertEmailErrorMessageIsDisplayed(authData.messages.invalidEmail);
    });

    test('Check Login with Empty Email and Password', async ({ loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that a user cannot log in with an empty email and password.');
        // Test Steps
        await loginPage.navigate();
        await loginPage.clickOnLoginButton();
        await loginPage.assertEmailErrorMessageIsDisplayed(authData.messages.invalidEmail);
        await loginPage.assertPasswordErrorMessageIsDisplayed(authData.messages.invalidPassword);
    });

});