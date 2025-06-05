import { test as base } from '@playwright/test';
import { BrowserManagement } from '../browser/browser-management';


export const test = base.extend<{ browserFixture: string }>({
browserFixture: [async({ browser, context, page, request }, use, testInfo) => {
BrowserManagement.initializeBrowser(browser, context, page, request);
await use('');
if (testInfo.status === "failed")

console.log(testInfo.title);
console.log(testInfo.duration);
console.log(testInfo.error);

},{ scope: 'test', auto: true }],
});
export const expect = base.expect;