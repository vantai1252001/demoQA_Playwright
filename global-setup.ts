// global-setup.ts
import { request } from '@playwright/test';
import { AccountHelper } from './helper/api/account-helper';
import { BookHelper } from './helper/api/book-helper';
import { baseUser } from './config/user-env';
import { JsonHelper } from './util/json-helper';
import { updateEnvVariable } from './util/env-helper';
let actualUserId;
async function globalSetup() {
  const reqContext = await request.newContext();

  // 1) Create (or find) the user
  const createResp = await AccountHelper.createUser(
    baseUser.userName,
    baseUser.password,
    reqContext
  );
  const body = await createResp.json();
  console.log(`✅ User created: ${body.userID}`);
  JsonHelper.writeDataToJson("userData.json", body);
  // 3) Generate a token
  const tokenResp = await AccountHelper.generateToken(
    baseUser.userName,
    baseUser.password,
    reqContext
  );
  const { token } = await tokenResp.json();

  // 4) Fetch all books and save to books.json
  const allBooksResp = await BookHelper.getAllBooks(reqContext);
  const booksDataJson = await allBooksResp.json();
  JsonHelper.writeDataToJson("books.json", booksDataJson);

  // 5) Pick 2 random books
  const selectedBooks = JsonHelper.getRandomBooks(2);

  // 6) Add each selected book to the user using the *actual* userID
  for (const book of selectedBooks) {
    const addResp = await BookHelper.addBook(
      token,
      book.isbn,
      actualUserId,    // ← use the freshly returned ID, not baseUser.userId
      reqContext
    );
    if (!addResp.ok()) {
      console.error(
        `❌ Failed to add book ${book.title}: ${addResp.status()} - ${await addResp.text()}`
      );
    } else {
      console.log(`✅ Successfully added book: ${book.title}`);
    }
  }

  // 7) Clean up
  await reqContext.dispose();
}

export default globalSetup;
