import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click } from "../../utils/actions/ui/elementActions";
import { navigate } from "../../utils/actions/ui/browserActions";
import { NavigationBar } from "./NavigationBar";

export class LandingPage extends NavigationBar {

    //=====================Locators=====================
    private readonly browseEventsButton: Locator;

    //=====================Variables====================

    //=====================Constructor==================
    constructor(page: Page) {
        super(page);
        this.browseEventsButton = this.page.getByRole('link', { name: 'Browse Events →' })
    }

    //=====================Actions======================
    @step('Navigate to Landing Page')
    async navigate() {
        await navigate(this.page, '/');
    }

    @step('Click on Browse Events Button')
    async clickOnBrowseEventsButton() {
        await click(this.browseEventsButton, "Browse Events Button")
    }

    //=====================Assertions===================

}