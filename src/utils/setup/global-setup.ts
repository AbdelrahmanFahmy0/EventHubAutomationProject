import { chromium, type FullConfig } from '@playwright/test';
import authData from '../../../test-data/authData.json';
import { RegisterPage } from '../../pages/Authentication/RegisterPage';
import { getTimestamp } from '../timeUtils';

//===================Variables===================
const email = `${authData.email}${getTimestamp()}@example.com`;
const password = authData.password;

//===================Global Setup=======================
async function globalSetup(config: FullConfig) {
    /* Launch browser */
    const { baseURL, storageState } = config.projects[0].use;
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const registerPage = new RegisterPage(page);
    /* Login via UI */
    await page.goto(`${baseURL}${registerPage.registerUrl}`);
    await registerPage.register(email, password);
    /* Save storage state into a file */
    await page.context().storageState({ path: storageState as string });
    await browser.close();
}

export default globalSetup;