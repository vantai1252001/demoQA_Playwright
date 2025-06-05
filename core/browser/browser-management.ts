import { Browser, BrowserContext, Page, APIRequestContext } from 'playwright';

export class BrowserManagement {
    static browser: Browser;
    static browserContext: BrowserContext;
    static page: Page;
    static request: APIRequestContext;

    static initializeBrowser(browser: Browser, browserContext: BrowserContext, page: Page, request: APIRequestContext): void {
        BrowserManagement.browser = browser;
        BrowserManagement.browserContext = browserContext;
        BrowserManagement.page = page;
        BrowserManagement.request = request;
    }
    static setCurrentContext(browserContext: BrowserContext): void {
        BrowserManagement.browserContext = browserContext;
    }
    static setCurrentPage(page: Page): void {
        BrowserManagement.page = page;
    }
}