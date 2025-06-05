import { test as baseTest, expect as baseExpect, request } from '@playwright/test';
import { test, expect, APIRequestContext, APIResponse } from '@playwright/test';
import { AccountHelper } from '../../helper/api/account-helper';
import { BookHelper } from '../../helper/api/book-helper';
import { userData } from '../../test-data/user-data';

test('API Test', async () => {
        const reqContext = await request.newContext();
    const genTokenResponse: APIResponse = await AccountHelper.generateToken(userData.user1.userName, userData.user1.password, reqContext);
    const jsonTokenResponse: any = await genTokenResponse.json();
    // const jsonTokenResponse: { token: string } = await genTokenResponse.json();
    const token: string = jsonTokenResponse["token"];
    console.log(token);
    const listBookByUser = await AccountHelper.getListBooksByUserId(token,userData.user1.userID, reqContext)
    console.log(await listBookByUser.json())
    // const deleteBookResponse: APIResponse = await BookHelper.deleteBook(token, "9781449325862", "9d4da11c-f6f5-4de6-86ef-1c0b8f1d3a2");
    // const jsonDeleteBookResponse: any = await deleteBookResponse.json();
    // console.log(jsonDeleteBookResponse);
});                                       