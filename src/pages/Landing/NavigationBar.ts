import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click } from "../../utils/actions/ui/elementActions";
import { assertHidden, assertText } from "../../utils/assertions/ui/elementAssertions";

export class NavigationBar {

    //=====================Locators=====================
    protected readonly page: Page;
    private readonly userEmailLabel: Locator;
    private readonly logoutButton: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.userEmailLabel = this.page.getByTestId('user-email-display');
        this.logoutButton = this.page.getByTestId('logout-btn');
    }

    //=====================Actions======================
    @step('Click on Logout Button')
    async clickOnLogoutButton() {
        await click(this.logoutButton, 'Logout Button');
    }

    //=====================Assertions===================
    @step('Assert User is Logged In Successfully')
    async assertUserIsLoggedIn(expectedEmail: string) {
        await assertText(this.userEmailLabel, expectedEmail, 'User Email Label');
    }

    @step('Assert User is Logged Out Successfully')
    async assertUserIsLoggedOut() {
        await assertHidden(this.userEmailLabel, 'User Email Label');
    }
}