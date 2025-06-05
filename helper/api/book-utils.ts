import { APIRequestContext } from "@playwright/test";
import { AccountHelper } from "./account-helper";
import { BookHelper } from "./book-helper";

export class BookUtils {
    static async ensureBookExistsForUser(
        token: string,
        userId: string,
        bookTitle: string,
        request: APIRequestContext
    ): Promise<void> {
        // Step 1: Get books for the user
        const listResponse = await AccountHelper.getListBooksByUserId(token, userId, request);
        const userBookList = await listResponse.json();

        const alreadyHasBook = userBookList.books.some((book: any) => book.title === bookTitle);

        if (alreadyHasBook) {
            console.log(`✅ The user already has the book "${bookTitle}".`);
            return;
        }

        // Step 2: Get all books
        const allBooksResponse = await BookHelper.getAllBooks(request);
        const allBooksData = await allBooksResponse.json();

        const targetBook = allBooksData.books.find((b: any) => b.title === bookTitle);

        if (!targetBook) {
            console.warn(`❌ Book with title "${bookTitle}" not found in Profile User.`);
            return;
        }

        // Step 3: Add book
        await BookHelper.addBook(token, targetBook.isbn, userId, request);
        console.log(`✅ Book "${bookTitle}" added to Profile User.`);
    }
}
