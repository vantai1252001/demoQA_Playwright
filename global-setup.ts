import { request } from '@playwright/test';
import { AccountHelper } from './helper/api/account-helper';
import { BookHelper } from './helper/api/book-helper';
import { baseUser } from './config/user-env';
import { JsonHelper } from './util/json-helper';
let userID: string;
async function globalSetup() {
  const reqContext = await request.newContext();
  console.log("🧹 Setting up data...");
  // Create (or find) the user
  const createResp = await AccountHelper.createUser(
    baseUser.userName,
    baseUser.password,
    reqContext
  );

  if (!createResp.ok()) {
    console.error(
      `User ${baseUser.userName} already existed!`
    )
    userID = JsonHelper.readDataJson("userData.json").userID;
  } else {
    console.log(`✅ User created successfully: ${baseUser.userName}`);
    const userInfo = await createResp.json();
    JsonHelper.writeDataToJson("userData.json", userInfo);
    userID = userInfo.userID;
  }

  const token = await AccountHelper.generateToken(
    baseUser.userName,
    baseUser.password,
    reqContext
  );

  // Fetch all books and save to books.json
  const allBooksResp = await BookHelper.getAllBooks(reqContext);
  const booksDataJson = await allBooksResp.json();
  JsonHelper.writeDataToJson("books.json", booksDataJson);

  // Pick 2 random books
  const selectedBooks = JsonHelper.getRandomItem("books.json", "books", 2);

  // Add each selected book to the user
  for (const book of selectedBooks) {
    const addResp = await BookHelper.addBook(
      token,
      book.isbn,
      userID,
      reqContext
    );
    if (!addResp.ok()) {
      console.error(
        `❌ Failed to add book ${book.title}', ${addResp.json().then(data => data.message)}`
      );
    } else {
      console.log(`✅ Successfully added book: ${book.title}`);
    }
  }
  // Clean up
  await reqContext.dispose();
}

export default globalSetup;
