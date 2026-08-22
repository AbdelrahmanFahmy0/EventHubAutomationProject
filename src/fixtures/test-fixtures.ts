import { test as base } from '@playwright/test';
import * as Pages from '../pages/index';
import * as Apis from '../apis/index';
import { logger } from '../utils/logger/logger';

// Declare the types fixtures.
type MyFixtures = {
    loginPage: Pages.LoginPage,
    registerPage: Pages.RegisterPage,
    landingPage: Pages.LandingPage,
    eventsPage: Pages.EventsPage,
    addEventPage: Pages.AddEventPage,
    eventDetailsPage: Pages.EventDetailsPage,
    myBookingsPage: Pages.MyBookingsPage,
    bookingDetailsPage: Pages.BookingDetailsPage,
    registerEndpoint: Apis.RegisterEndpoint,
    eventsEndpoint: Apis.EventsEndpoint,
    bookingsEndpoint: Apis.BookingsEndpoint
};

// Extend the base test by providing the fixtures created above.
export const test = base.extend<MyFixtures>({
    // Initialize the LoginPage object before each test and make it available via the 'loginPage' fixture.
    loginPage: async ({ page }, use) => {
        await use(new Pages.LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new Pages.RegisterPage(page));
    },
    landingPage: async ({ page }, use) => {
        await use(new Pages.LandingPage(page));
    },
    eventsPage: async ({ page }, use) => {
        await use(new Pages.EventsPage(page));
    },
    addEventPage: async ({ page }, use) => {
        await use(new Pages.AddEventPage(page));
    },
    myBookingsPage: async ({ page }, use) => {
        await use(new Pages.MyBookingsPage(page));
    },
    eventDetailsPage: async ({ page }, use) => {
        await use(new Pages.EventDetailsPage(page));
    },
    bookingDetailsPage: async ({ page }, use) => {
        await use(new Pages.BookingDetailsPage(page));
    },
    registerEndpoint: async ({ }, use) => {
        await use(new Apis.RegisterEndpoint());
    },
    eventsEndpoint: async ({ }, use) => {
        await use(new Apis.EventsEndpoint());
    },
    bookingsEndpoint: async ({ }, use) => {
        await use(new Apis.BookingsEndpoint());
    }
});

// Add hooks to log test start and end events, including browser name, test title, status, and duration.
test.beforeEach(async ({ }, testInfo) => {
    const browserName = process.env.BROWSER?.toUpperCase();
    logger.info(`🚀 Starting test "${testInfo.title}" on ${browserName}`);
});

test.afterEach(({ }, testInfo) => {
    logger.info(`🏁 Completed test "${testInfo.title}" — status: ${testInfo.status}, duration: ${testInfo.duration}ms`);
});

// Export 'expect' to use them in test files.
export { expect } from '@playwright/test';