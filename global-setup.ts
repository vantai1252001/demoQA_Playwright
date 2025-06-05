import { request } from '@playwright/test';
import { AccountHelper } from './helper/api/account-helper';
import { BookHelper } from './helper/api/book-helper';
import { baseUser } from './config/user-env';
import { JsonHelper } from './util/json-helper';


async function globalSetup() {
  const reqContext = await request.newContext();

  const tokenResponse = await AccountHelper.generateToken(
    baseUser.userName,
    baseUser.password,
    reqContext
  );
  const { token } = await tokenResponse.json();

  // Fetch all books and save to books.json
  const booksResponse = await BookHelper.getAllBooks(reqContext);
  const booksDataJson = await booksResponse.json();
  JsonHelper.writeBooksJson(booksDataJson);

  // Get 2 random books from the saved JSON
  const selectedBooks = JsonHelper.getRandomBooks(2);

  // Add selected books to the user
  for (const book of selectedBooks) {
    const response = await BookHelper.addBook(token, book.isbn, baseUser.userId, reqContext);
    if (!response.ok()) {
      console.error(`❌ Failed to add book ${book.title}: ${response.status()} - ${await response.text()}`);
    } else {
      console.log(`✅ Successfully added book: ${book.title}`);
    }
  }

  await reqContext.dispose();
}

export default globalSetup;
