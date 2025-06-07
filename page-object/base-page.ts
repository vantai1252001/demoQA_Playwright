import { expect, Locator, Page } from "@playwright/test";
import { BrowserUtils } from "../core/browser/browser-utils";

export class BasePage {
    readonly page: Page;
    readonly profileMenu: Locator;
    readonly bookStoreLink: Locator;
    readonly searchBox: Locator;


    alertEvent: any;
    constructor(page: Page) {
        this.page = page;
        this.profileMenu = page.locator("xpath=//span[ .= 'Profile']");
        this.bookStoreLink = page.getByRole('heading', { name: 'Book Store Application' })
        this.searchBox = page.locator('xpath=//input[@placeholder="Type to search"]');
        this.alertEvent = undefined;
    }
    async goToProfilePage(): Promise<void> {
        await this.profileMenu.click();
    }
    async goToBookStorePage(): Promise<void> {
        await this.bookStoreLink.click();
    }
    async registerAlert(timeout: number = 5000): Promise<void> {
        await BrowserUtils.registerAlert(timeout);
    }
    async handleAlert(): Promise<string> {
        return await BrowserUtils.handleAlert();
    }
    async searchBookByName(bookName: string): Promise<void> {
        await this.searchBox.fill(bookName);
    }
}