
import { AccountHelper } from '../../helper/api/account-helper';
import test, { APIRequestContext, expect } from '@playwright/test';
import { userData } from '../../test-data/user-data';
import { bookData } from '../../test-data/book-data';
import { BookHelper } from '../../helper/api/book-helper';
import { LoginPage } from '../../page-object/login-page';
import { ProfilePage } from '../../page-object/profile-page';
import { BrowserManagement } from '../../core/browser/browser-management';
import { BookStorePage } from '../../page-object/book-store-page';

test.beforeEach(async ({ browser, context, page, request }: any) => {
    BrowserManagement.initializeBrowser(browser, context, page, request);
});

test('Verify delete book successfully @smoke', async () => {

    await BrowserManagement.page.goto('https://demoqa.com/books');
    const loginPage = new LoginPage();
    const profilePage = new ProfilePage();
    const bookStorePage = new BookStorePage();

    await bookStorePage.goToLoginPage();
    await loginPage.login(userData.user1.userName, userData.user1.password);
    await bookStorePage.waitForUserNameDisplayed();
    await bookStorePage.goToProfilePage();
    await profilePage.deleteBookByName(bookData[0].title);
    const doesBookExist = await profilePage.doesBookExist(bookData[0].title);
    expect(doesBookExist).toBe(false);
});