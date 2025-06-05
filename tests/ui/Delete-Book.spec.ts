
import { AccountHelper } from '../../helper/api/account-helper';
import test, { APIRequestContext, expect } from '@playwright/test';
import { userData } from '../../test-data/user-data';
import { bookData } from '../../test-data/book-data';
import { BookHelper } from '../../helper/api/book-helper';
import { LoginPage } from '../../page-object/login-page';
import { ProfilePage } from '../../page-object/profile-page';
import { BrowserManagement } from '../../core/browser/browser-management';
import { BookStorePage } from '../../page-object/book-store-page';
import { BookUtils } from '../../helper/api/book-utils';
let token: string;
const bookTitleDelete = bookData[0].title;
test.beforeEach(async ({ browser, context, page, request }: any) => {

    await BrowserManagement.initializeBrowser(browser, context, page, request);
    // Generate token
    const tokenResponse = await AccountHelper.generateToken(
        userData.user1.userName,
        userData.user1.password,
        BrowserManagement.request
    );

    const jsonTokenResponse: { token: string } = await tokenResponse.json();
    token = jsonTokenResponse["token"];

    await BookUtils.ensureBookExistsForUser(token, userData.user1.userID, bookTitleDelete, BrowserManagement.request)

});

test(`Verify that user can delete book with title ${bookTitleDelete} successfully`, async ( {baseURL} ) => {

    await BrowserManagement.page.goto(`${baseURL}/books`);
    const loginPage = new LoginPage();
    const profilePage = new ProfilePage();
    const bookStorePage = new BookStorePage();

    await bookStorePage.goToLoginPage();
    await loginPage.login(userData.user1.userName, userData.user1.password);
    await bookStorePage.waitForUserNameDisplayed();
    await bookStorePage.goToProfilePage();
    await profilePage.searchBookByName(bookData[0].title);
    await profilePage.deleteBookByName(bookData[0].title);
    const doesBookExist1 = await profilePage.doesBookExist(bookData[0].title);
    expect(doesBookExist1).toBe(false);
});