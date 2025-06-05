import { BasePage } from "./base-page";
import { Element } from "../core/element/element";
import { expect } from "@playwright/test";

export class LoginPage extends BasePage {
    loginButton: Element;
    userNameTextBox: Element;
    userNameLabel: Element;
    passwordTextBox: Element;
  
    constructor() {
        super();
        this.loginButton = new Element("#login");
        this.userNameTextBox = new Element("#userName");
        this.passwordTextBox = new Element("#password");
        this.userNameLabel = new Element("#userName-value");
    }

    async login(userName: string, password: string) {
        await this.userNameTextBox.fillText(userName);
        await this.passwordTextBox.fillText(password);
        await this.loginButton.click();
        await this.waitForUserNameDisplayed()
    }
}