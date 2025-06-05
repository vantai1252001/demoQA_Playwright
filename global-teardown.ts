import { request } from '@playwright/test';
import { AccountHelper } from './helper/api/account-helper';
import { BookHelper } from './helper/api/book-helper';
import { baseUser } from './config/user-env';

async function globalTeardown() {
    const reqContext = await request.newContext();
    const tokenResponse = await AccountHelper.generateToken(
        baseUser.userName,
        baseUser.password,
        reqContext
    );
    const { token } = await tokenResponse.json();
    await BookHelper.deleteAllBooks(token, baseUser.userId, reqContext);
}

export default globalTeardown;
