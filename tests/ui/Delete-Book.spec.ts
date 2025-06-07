
import { AccountHelper } from '../../helper/api/account-helper';
import test, { expect } from '@playwright/test';
import { LoginPage } from '../../page-object/login-page';
import { ProfilePage } from '../../page-object/profile-page';
import { BrowserManagement } from '../../core/browser/browser-management';
import { BookStorePage } from '../../page-object/book-store-page';
import { BookUtils } from '../../helper/api/book-utils';
import { baseUser } from '../../config/user-env';
import { JsonHelper } from '../../util/json-helper';
import { config as loadDotenv } from 'dotenv';

loadDotenv(); 
let token: string;
const randomBook = JsonHelper.getRandomBooks(1);
const bookTitleToDelete = randomBook[0].title;
test.beforeEach(async ({ browser, context, page, request }) => {
  await BrowserManagement.initializeBrowser(browser, context, page, request);

  const tokenResponse = await AccountHelper.generateToken(
    baseUser.userName,
    baseUser.password,
    BrowserManagement.request
  );
  const jsonTokenResponse: { token: string } = await tokenResponse.json();
  token = jsonTokenResponse.token;
  console.log("userId in test file", baseUser.userId);
  // Ensure the book exists 
  await BookUtils.ensureBookExistsForUser(token, baseUser.userId, bookTitleToDelete, BrowserManagement.request);
});

test(`Verify that user can delete a random book`, async ({ baseURL }) => {
  await BrowserManagement.page.goto(`${baseURL}`);

  const loginPage = new LoginPage();
  const profilePage = new ProfilePage();
  const bookStorePage = new BookStorePage();

  await bookStorePage.goToBookStorePage();
  await bookStorePage.goToLoginPage();
  await loginPage.login(baseUser.userName, baseUser.password);
  await bookStorePage.waitForUserNameDisplayed();
  await bookStorePage.goToProfilePage();

  // Use the same randomBook object you got in beforeEach — consider sharing via a global or context
  await profilePage.searchBookByName(bookTitleToDelete);
  await profilePage.deleteBookByName(bookTitleToDelete);
  const doesBookExist = await profilePage.doesBookExist(bookTitleToDelete);
  expect(doesBookExist).toBe(false);
  console.log(`✅ Successfully deleted book: ${bookTitleToDelete}`);
});
