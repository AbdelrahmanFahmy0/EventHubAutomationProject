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

test.beforeEach(async () => {
    await allure.epic('Authentication');
    await allure.feature('Registration');
    await allure.owner('Abdelrahman');
    // Generate a unique email for each test run to avoid conflicts with existing accounts
    email = `${authData.registerEmail}${getTimestamp()}@gmail.com`;
});

//============================================Tests===============================================

test.describe('User Registration Tests', { tag: "@regression" }, () => {

    test('Check Registration with Valid Credentials', { tag: "@smoke" }, async ({ registerPage, landingPage }) => {
        // Allure Configuration
        await allure.severity(Severity.BLOCKER);
        await allure.description('This test verifies that a user can successfully register with valid credentials.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterRegistrationDetails(email, password);
        await registerPage.clickOnCreateAccountButton();
        await landingPage.assertUserIsLoggedIn(email);
    });

    test('Check Registration with Existing Email', async ({ registerPage, request, registerEndpoint }) => {
        // Allure Configuration
        await allure.severity(Severity.CRITICAL);
        await allure.description('This test verifies that the registration fails when using an already registered email.');
        // Test Steps
        await registerPage.navigate();
        await registerEndpoint.registerUser(request, email, password);
        await registerPage.enterRegistrationDetails(email, password);
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertErrorMessageIsDisplayed(authData.messages.existingEmail);
    });

    test('Check Registration with Invalid Email Format', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the registration fails when using an invalid email format.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterRegistrationDetails(authData.invalidEmail, password);
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertEmailErrorMessageIsDisplayed(authData.messages.invalidEmail);
    });

    test('Check Registration with Mismatched Passwords', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the registration fails when the password and confirm password do not match.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterEmail(email);
        await registerPage.enterPassword(password);
        await registerPage.enterConfirmPassword('DifferentPassword123!');
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertConfirmPasswordErrorMessageIsDisplayed(authData.messages.mismatchedPassword);
    });

    test('Check Registration with Password less than 8 Characters', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the registration fails when the password is less than 8 characters.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterRegistrationDetails(email, 'Weak123');
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertPasswordErrorMessageIsDisplayed(authData.messages.weakPassword);
    });

    test('Check Registration with Password without Uppercase Letters', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the registration fails when the password does not contain uppercase letters.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterEmail(email);
        await registerPage.enterRegistrationDetails(email, 'weakpassword123');
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertPasswordErrorMessageIsDisplayed(authData.messages.weakPassword);
    });

    test('Check Registration with Password without Numbers', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the registration fails when the password does not contain numbers.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterEmail(email);
        await registerPage.enterRegistrationDetails(email, 'WeakPassword');
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertPasswordErrorMessageIsDisplayed(authData.messages.weakPassword);
    });

    test('Check Registration with Password without Special Characters', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.NORMAL);
        await allure.description('This test verifies that the registration fails when the password does not contain special characters.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterEmail(email);
        await registerPage.enterRegistrationDetails(email, 'WeakPassword123');
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertPasswordErrorMessageIsDisplayed(authData.messages.weakPassword);
    });

    test('Check Registration with Empty Confirm Password', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.MINOR);
        await allure.description('This test verifies that the registration fails when the confirm password field is empty.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterEmail(email);
        await registerPage.enterPassword(password);
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertConfirmPasswordErrorMessageIsDisplayed(authData.messages.mismatchedPassword);
    });

    test('Check Registration with Empty Password', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.MINOR);
        await allure.description('This test verifies that the registration fails when the password field is empty.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterEmail(email);
        await registerPage.enterConfirmPassword(password);
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertPasswordErrorMessageIsDisplayed(authData.messages.weakPassword);
    });

    test('Check Registration with Empty Email', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.MINOR);
        await allure.description('This test verifies that the registration fails when the email field is empty.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.enterPassword(password);
        await registerPage.enterConfirmPassword(password);
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertEmailErrorMessageIsDisplayed(authData.messages.invalidEmail);
    });

    test('Check Registration with All Fields Empty', async ({ registerPage }) => {
        // Allure Configuration
        await allure.severity(Severity.MINOR);
        await allure.description('This test verifies that the registration fails when all fields are empty.');
        // Test Steps
        await registerPage.navigate();
        await registerPage.clickOnCreateAccountButton();
        await registerPage.assertEmailErrorMessageIsDisplayed(authData.messages.invalidEmail);
        await registerPage.assertPasswordErrorMessageIsDisplayed(authData.messages.weakPassword);
    });

});