import test, { expect } from '@playwright/test';
import { BrowserManagement } from '../../core/browser/browser-management';
import { BookStorePage } from '../../page-object/book-store-page';
import { BookHelper } from '../../helper/api/book-helper';
import { JsonHelper } from '../../util/json-helper';

let listBookResponse;
let listBook;
const keywordData = JsonHelper.readDataJson("keywords.json");
const keywordToSearch : string [] = keywordData.keywords

test.beforeEach(async ({ browser, context, page, request }) => {
  await BrowserManagement.initializeBrowser(browser, context, page, request);
  listBookResponse = await BookHelper.getAllBooks(BrowserManagement.request);
  listBook = await listBookResponse.json();
});

keywordToSearch.forEach(keyword => {
  test(`Verify user can search books with keyword: "${keyword}"`, async ({ baseURL }) => {
    await BrowserManagement.page.goto(`${baseURL}`);
    const bookStorePage = new BookStorePage(BrowserManagement.page);
    // Filter books based on the keyword via API response
    const filteredBooks = listBook.books.filter(book =>
      book.title.toLowerCase().includes(keyword.toLowerCase())
    );
    // Get the number of books that match the keyword
    const numberOfBook = filteredBooks.length;

    await bookStorePage.goToBookStorePage();
    await bookStorePage.searchBookByName(keyword);
    // Verify that the number of books displayed matches the number of books filtered by the keyword
    await bookStorePage.expectAllBookTitlesContain(keyword, numberOfBook);
  });
});
