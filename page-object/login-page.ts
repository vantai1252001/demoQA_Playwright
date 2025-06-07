import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./base-page";
export class LoginPage extends BasePage {
    readonly loginButton: Locator;
    readonly userNameTextBox: Locator;
    readonly passwordTextBox: Locator;
    readonly userNameLabel: Locator;

    constructor(page: Page) {
        super(page);
        this.loginButton = page.locator("#login");
        this.userNameTextBox = page.locator("#userName");
        this.passwordTextBox = page.locator("#password");
        this.userNameLabel = page.locator('#userName-value');
    }

    async login(userName: string, password: string): Promise<void> {
        await this.userNameTextBox.fill(userName);
        await this.passwordTextBox.fill(password);
        await this.loginButton.click();
        await expect(this.userNameLabel).toBeVisible();
        await expect(this.userNameLabel).toContainText(userName);
    }
}
