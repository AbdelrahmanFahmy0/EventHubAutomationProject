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

test.beforeEach(async ({ request, loginPage, registerEndpoint }) => {
    await allure.epic('Authentication');
    await allure.feature('Logout');
    await allure.owner('Abdelrahman');
    // Generate a unique email for each test run to avoid conflicts with existing accounts
    email = `${authData.logoutEmail}${getTimestamp()}@gmail.com`;
    const response = await registerEndpoint.registerUser(request, email, password);
    await loginPage.navigate();
    await loginPage.loginUsingToken(response);
});

//============================================Tests===============================================

test.describe('User Logout Tests', { tag: "@regression" }, () => {

    test('Check Logout Functionality', { tag: "@smoke" }, async ({ landingPage }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a user can successfully log out after registration.');
        // Test Steps
        await landingPage.navigate();
        await landingPage.clickOnLogoutButton();
        await landingPage.assertUserIsLoggedOut();
    });

    test('Check User Cannot Access Landing Page after Logout', async ({ landingPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that a user cannot access the landing page after logging out.');
        // Test Steps
        await landingPage.navigate();
        await landingPage.clickOnLogoutButton();
        await landingPage.navigate();
        await landingPage.assertUserIsLoggedOut();
    });

    test('Check User Cannot Access Landing Page after Logout Using Browser Back Button', async ({ landingPage, loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that a user cannot access the landing page after logging out using the browser back button.');
        // Test Steps
        await landingPage.navigate();
        await landingPage.clickOnLogoutButton();
        await loginPage.navigateBackUsingBrowserBackButton();
        await landingPage.assertUserIsLoggedOut();
    });

    test('Check User Can Log In Again after Logging Out', async ({ landingPage, loginPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that a user can log in again after logging out.');
        // Test Steps
        await landingPage.navigate();
        await landingPage.clickOnLogoutButton();
        await loginPage.enterLoginDetails(email, password);
        await loginPage.clickOnLoginButton();
        await landingPage.assertUserIsLoggedIn(email);
    });

});