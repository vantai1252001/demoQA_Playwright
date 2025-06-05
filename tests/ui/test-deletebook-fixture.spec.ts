
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
   await BrowserManagement.initializeBrowser(browser, context, page, request);
});

test('Verify delete book successfully @smoke', async (BrowserManagement) => {

    await BrowserManagement.page.goto('https://demoqa.com/books');
    const loginPage = new LoginPage();
    const profilePage = new ProfilePage();
    const bookStorePage = new BookStorePage();

    await bookStorePage.goToLoginPage();
    await loginPage.login(userData.user1.userName, userData.user1.password);
    await bookStorePage.waitForUserNameDisplayed();
    await bookStorePage.goToProfilePage();
    // Book that I want to delete has title: "Git Pocket Guide"
    // step1: filter book to check if the user already has this book in the profile
    // Step 2: if have then delete it else add this book via API
    // step 3: delete book
    await profilePage.deleteBookByName("Git Pocket Guide");
    const doesBookExist = await profilePage.doesBookExist("Git Pocket Guide");
    expect(doesBookExist).toBe(false);
});