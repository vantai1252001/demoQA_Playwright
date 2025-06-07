
import { AccountHelper } from '../../helper/api/account-helper';
import test, { expect } from '@playwright/test';
import { LoginPage } from '../../page-object/login-page';
import { ProfilePage } from '../../page-object/profile-page';
import { BrowserManagement } from '../../core/browser/browser-management';
import { BookStorePage } from '../../page-object/book-store-page';
import { BookUtils } from '../../helper/api/book-utils';
import { baseUser } from '../../config/user-env';
import { JsonHelper } from '../../util/json-helper';

const randomBook = JsonHelper.getRandomItem("books.json", "books", 1);
const bookTitleToDelete = randomBook[0].title;

test.beforeEach(async ({ browser, context, page, request }) => {

  const userID = JsonHelper.readDataJson("userData.json").userID;
  await BrowserManagement.initializeBrowser(browser, context, page, request);
  const token = await AccountHelper.generateToken(
    baseUser.userName,
    baseUser.password,
    BrowserManagement.request
  );
  // Ensure the book exists if not then add it
  await BookUtils.ensureBookExistsForUser(token, userID, bookTitleToDelete, BrowserManagement.request);
});

test(`Verify that user can delete a random book`, async ({ baseURL }) => {
  await BrowserManagement.page.goto(`${baseURL}`);

  const loginPage = new LoginPage(BrowserManagement.page);
  const profilePage = new ProfilePage(BrowserManagement.page);
  const bookStorePage = new BookStorePage(BrowserManagement.page);

  await bookStorePage.goToBookStorePage();
  await bookStorePage.goToLoginPage();
  await loginPage.login(baseUser.userName, baseUser.password);
  await bookStorePage.goToProfilePage();
  await profilePage.searchBookByName(bookTitleToDelete);
  await profilePage.deleteBookByName(bookTitleToDelete);
  const doesBookExist = await profilePage.doesBookExist(bookTitleToDelete);
  expect(doesBookExist).toBe(false);
  console.log(`✅ Successfully deleted book: ${bookTitleToDelete}`);
});
