import { test as baseTest, expect as baseExpect } from '@playwright/test';
import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { AccountHelper } from '../../helper/api/account-helper';
import { BookHelper } from '../../helper/api/book-helper';

test('API Test', async ({ request }: { request: APIRequestContext }) => {
    const genTokenResponse: APIResponse = await AccountHelper.generateToken("anhtien12345", "Abcd1234@");
    const jsonTokenResponse: any = await genTokenResponse.json();
    // const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token: string = jsonTokenResponse["token"];
    console.log(token);

    const deleteBookResponse: APIResponse = await BookHelper.deleteBook(token, "9781449325862", "9d4da11c-f6f5-4de6-86ef-1c0b8f1d3a2");
    const jsonDeleteBookResponse: any = await deleteBookResponse.json();
    console.log(jsonDeleteBookResponse);
});                                       