import { test, expect } from '@playwright/test';
import { bookData } from '../../test-data/book-data';

test('Check book data loaded', async () => {
  console.log(bookData);  // Your dynamically fetched books array

  expect(bookData.length).toBeGreaterThan(0);
  expect(bookData[0]).toHaveProperty('isbn');
});
