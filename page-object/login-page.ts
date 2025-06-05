import { BasePage } from "./base-page";
import { Element } from "../core/element/element";

export class LoginPage extends BasePage {
    loginButton: Element;
    userNameTextBox: Element
    passwordTextBox: Element;

    constructor() {
        super();
        this.loginButton = new Element("id=login");
        this.userNameTextBox = new Element("id=userName");
        this.passwordTextBox = new Element("id=password");
    }

    async login(userName: string, password: string): Promise<void> {
        await this.userNameTextBox.fillText(userName);
        await this.passwordTextBox.fillText(password);
        await this.loginButton.click();
    }
}