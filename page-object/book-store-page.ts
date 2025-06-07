import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
export class BookStorePage extends BasePage {
    readonly okButton: Locator;
    readonly loginButton: Locator;
    readonly bookTitleRows: Locator;

    constructor(page: Page) {
        super(page);
        this.okButton = page.locator("#closeSmallModal-ok");
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.bookTitleRows = page.locator(".rt-tbody .rt-tr-group a");
    }

    async goToLoginPage(): Promise<void> {
        await this.loginButton.click();
    }

    async doesBookExist(bookName: string): Promise<boolean> {
        const bookLink = this.page.locator(`xpath=//a[ .= '${bookName}']`);
        return await bookLink.count() > 0;
    }

    async deleteBookByName(bookName: string): Promise<void> {
        const deleteButton = this.page.locator(`//span[ .= '${bookName}']/ancestor::div[@role='row']//span[@title='Delete']`);
        await deleteButton.click();
        await this.registerAlert();
        await this.okButton.click();
        await this.handleAlert();
    }

    async expectAllBookTitlesContain(keyword: string, minExpectedResults = 1): Promise<void> {
        const count = await this.bookTitleRows.count();
        expect(count).toBeGreaterThanOrEqual(minExpectedResults);

        for (let i = 0; i < count; i++) {
            const title = await this.bookTitleRows.nth(i).textContent();
            expect(title?.toLowerCase()).toContain(keyword.toLowerCase());
        }
        console.log(`✅ Found ${count} books containing "${keyword}" in the title on Book Store page.`);
    }
}
