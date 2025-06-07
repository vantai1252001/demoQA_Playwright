import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
export class ProfilePage extends BasePage {

    readonly okButton: Locator;
    constructor(page: Page) {
        super(page);
        this.okButton = page.locator("#closeSmallModal-ok");

    }

    async doesBookExist(bookName: string): Promise<boolean> {
        const bookLink = this.page.locator(`xpath=//a[.='${bookName}']`);
        return await bookLink.count() > 0;
    }

    async deleteBookByName(bookName: string): Promise<void> {
        const bookDeleteButton = this.page.locator(`//span[.='${bookName}']/ancestor::div[@role='row']//span[@title='Delete']`);
        await bookDeleteButton.click();

        await this.registerAlert();
        await this.okButton.click();
        await this.handleAlert();
    }
}
