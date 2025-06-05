import { Dialog } from '@playwright/test';
import { BrowserManagement } from './browser-management';

export class BrowserUtils {
    static alertEvent: Promise<string>;

    static async registerAlert(timeout: number = 5000, event: "accept" | "dismiss" = "accept"): Promise<void> {
        BrowserUtils.alertEvent = BrowserManagement.page.waitForEvent('dialog', { timeout: timeout }).then(async (d: Dialog) => {
            if (event === "dismiss") {
                await d.dismiss();
            } else {
                await d.accept();
            }
            return d.message();
        });
    }
    static async handleAlert(): Promise<string> {
        return await BrowserUtils.alertEvent;
    }
}