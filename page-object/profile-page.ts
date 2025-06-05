import { BasePage } from "./base-page";
import { Element } from "../core/element/element";

export class ProfilePage extends BasePage {
    okButton: Element;

    constructor() {
        super();
        this.okButton = new Element("id=closeSmallModal-ok");
    }
    async doesBookExist(bookName: string): Promise<boolean> {
        const bookLinkLocator = `xpath=//a[ .= '${bookName}']`;
        const numberOfElement = await new Element(bookLinkLocator).getNumberOfElements();
        return numberOfElement > 0;
    }
    async deleteBookByName(bookName: string): Promise<void> {
        const bookDeleteButton = `//span[ .= '${bookName}']/ancestor :: div[@role='row']//span[@title='Delete']`;
        await new Element(bookDeleteButton).click();
        await this.registerAlert();
        await this.okButton.click();
        await this.handleAlert();
    }
}