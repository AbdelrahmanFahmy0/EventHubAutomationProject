import { type Page, type Locator } from "@playwright/test";
import { step } from "../../utils/stepDecorator";
import { click } from "../../utils/actions/ui/elementActions";
import { assertText } from "../../utils/assertions/ui/elementAssertions";

export class CancelBookingDialog {

    //=====================Locators=====================
    protected readonly page: Page;
    protected readonly confirmationText: Locator;
    protected readonly confirmCancelBookingButton: Locator;
    protected readonly dismissCancelBookingButton: Locator;
    protected readonly cancelBookingSuccessMessage: Locator;

    //=====================Constructor==================
    constructor(page: Page) {
        this.page = page;
        this.confirmationText = this.page.locator('//button[@id="confirm-dialog-yes"]/ancestor::div[1]/preceding-sibling::p');
        this.confirmCancelBookingButton = this.page.getByTestId('confirm-dialog-yes');
        this.dismissCancelBookingButton = this.page.getByRole('dialog').getByRole('button', { name: 'Cancel', exact: true });
        this.cancelBookingSuccessMessage = this.page.locator('.pointer-events-auto p');
    }

    //=====================Actions======================
    @step('Click on Confirm Cancel Booking Button')
    async clickOnConfirmCancelBookingButton() {
        await click(this.confirmCancelBookingButton, 'Confirm Cancel Booking Button');
    }

    @step('Click on Dismiss Cancel Booking Button')
    async clickOnDismissCancelBookingButton() {
        await click(this.dismissCancelBookingButton, 'Dismiss Cancel Booking Button');
    }

    //=====================Assertions===================
    @step('Assert Cancel Booking Confirmation Text Is Correct: {expectedText}')
    async assertCancelBookingConfirmationTextIsCorrect(expectedText: string) {
        await assertText(this.confirmationText, expectedText, 'Cancel Booking Confirmation Text');
    }

    @step('Assert Cancel Booking Success Message Is Correct: {expectedMessage}')
    async assertCancelBookingSuccessMessageIsCorrect(expectedMessage: string) {
        await assertText(this.cancelBookingSuccessMessage, expectedMessage, 'Cancel Booking Success Message');
    }
}