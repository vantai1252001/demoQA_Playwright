import * as fs from 'fs';
import * as path from 'path';
import { request } from '@playwright/test';
import { AccountHelper } from './helper/api/account-helper';
import { BookHelper } from './helper/api/book-helper';
import { userData } from './test-data/user-data';

async function globalSetup() {

    const reqContext = await request.newContext();
    const tokenResponse = await AccountHelper.generateToken(
        userData.user1.userName,
        userData.user1.password,
        reqContext
    );
    const { token } = await tokenResponse.json();

    // Fetch all books
    const booksResponse = await BookHelper.getAllBooks(reqContext);
    const booksDataJson = await booksResponse.json();

    // Write books data to a JSON file inside test-data folder
    const filePath = path.resolve(__dirname, 'test-data', 'books.json');
    fs.writeFileSync(filePath, JSON.stringify(booksDataJson, null, 2));
    // Read books.json
    const booksFilePath = path.resolve(__dirname, 'test-data', 'books.json');
    const booksDataRaw = fs.readFileSync(booksFilePath, 'utf-8');
    const booksData = JSON.parse(booksDataRaw);
    // Select 2 random books
    function getRandomBooks(arr: any[], count: number) {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    const selectedBooks = getRandomBooks(booksData.books, 2);

    // Add each selected book
    for (const book of selectedBooks) {
        await BookHelper.addBook(token, book.isbn, userData.user1.userID, reqContext);
    }
    await reqContext.dispose();
    // ... any other setup logic here
}

export default globalSetup;
