import { BrowserUtils } from "../core/browser/browser-utils";
import { Element } from "../core/element/element";

export class BasePage {
    userNameLabel: Element;
    profileMenu: Element;
    alertEvent: any; // Assuming the type is not known, using 'any'

    constructor() {
        this.userNameLabel = new Element("id=userName-value");
        this.profileMenu = new Element("xpath=//span[ .= 'Profile']");
        this.alertEvent = undefined;
    }
    async goToProfilePage(): Promise<void> {
        await this.profileMenu.click();
    }
    async registerAlert(timeout: number = 5000): Promise<void> {
        await BrowserUtils.registerAlert(timeout);
    }
    async handleAlert(): Promise<string> {
        return await BrowserUtils.handleAlert();
    }
    async waitForUserNameDisplayed() {

        await this.userNameLabel.waitForElementToBeVisible();
    }
}