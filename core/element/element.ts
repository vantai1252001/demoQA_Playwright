import { BrowserManagement } from "../browser/browser-management";

export enum LocatorType {
    ROLE = 0,
    TEXT = 1,
    LABEL = 2,
    PLACEHOLDER = 3,
    ALT_TEXT = 4,
    TITLE = 5,
    TEST_ID = 6,
    DEFAULT = 7
}

interface ElementOptions {
    [key: string]: any;
}
export class Element {
    locator: any;
    locatorType: LocatorType;
    options: ElementOptions;

    constructor(locator: string, locatorType: LocatorType = LocatorType.DEFAULT, options: ElementOptions = {}) {
        this.locator = locator;
        this.locatorType = locatorType;
        this.options = options;
    }
    getElement() {
        switch (this.locatorType) {
            case LocatorType.ROLE:
                return BrowserManagement.page.getByRole(this.locator, this.options);
            case LocatorType.TEXT:
                return BrowserManagement.page.getByText(this.locator, this.options);
            case LocatorType.LABEL:
                return BrowserManagement.page.getByLabel(this.locator, this.options);
            case LocatorType.PLACEHOLDER:
                return BrowserManagement.page.getByPlaceholder(this.locator, this.options);
            case LocatorType.ALT_TEXT:
                return BrowserManagement.page.getByAltText(this.locator, this.options);
            case LocatorType.TITLE:
                return BrowserManagement.page.getByTitle(this.locator, this.options);
            case LocatorType.TEST_ID:
                return BrowserManagement.page.getByTestId(this.locator);
            case LocatorType.DEFAULT:
                return BrowserManagement.page.locator(this.locator, this.options);
        }
    }

    async click() {
        await this.getElement().click();
    }
    async enter(text: string) {
        await this.getElement().type(text);
    }
    async waitForElement(options) {
        await this.getElement().waitFor(options);
    }
    async waitForElementToBeVisible(timeout: number = 5000) {
        await this.getElement().waitFor({ state: 'visible', timeout: timeout });
    }
    async waitForElementToBeHidden(timeout: number = 5000) {
        await this.getElement().waitFor({ state: 'hidden', timeout: timeout });
    }
    async fillText(text: string) {
        await this.getElement().fill(text);
    }
    async hover() {
        await this.getElement().hover();
    }
    async getText(): Promise<string> {
        const element = this.getElement();
        await element.waitFor({ state: 'visible' });
        return await element.textContent() || '';
    }
    async getInputValue() {
        const element = this.getElement();
        await element.waitFor({ state: 'visible' });
        return await element.inputValue() || '';
    }
    async getNumberOfElements(): Promise<number> {
        const element = await this.getElement().count();

        if (element > 0) {
            await this.locator.first().waitFor({ state: 'visible' });
        }
        return element;
    }
    async pressKey(key: string) {
        const element = this.getElement();
        await element.waitFor({ state: 'visible' });
        await element.press(key);
    }
    async rightClick() {
        const element = this.getElement();
        await element.waitFor({ state: 'visible' });
        await element.click({ button: 'right' });
    }

}